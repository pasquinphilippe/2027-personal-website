// Minimal Core Web Vitals reporter using native PerformanceObserver.
// Captures LCP, CLS, and INP without adding a dependency. Falls back silently
// where APIs aren't supported. Hook a sink in via `onReport`.

export type WebVitalMetric = {
  name: 'LCP' | 'CLS' | 'INP';
  value: number;
  id: string;
};

type ReportFn = (metric: WebVitalMetric) => void;

const supports = (entryType: string) =>
  typeof PerformanceObserver !== 'undefined' &&
  PerformanceObserver.supportedEntryTypes?.includes(entryType);

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function reportWebVitals(onReport: ReportFn) {
  if (typeof window === 'undefined') return;

  // LCP — largest-contentful-paint entry, take last one before page hidden
  if (supports('largest-contentful-paint')) {
    let lcpValue = 0;
    const lcpId = uuid();
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1] as PerformanceEntry & {
        renderTime?: number;
        loadTime?: number;
      };
      lcpValue = last.renderTime || last.loadTime || last.startTime;
    });
    try {
      lcpObserver.observe({type: 'largest-contentful-paint', buffered: true});
    } catch {
      // observer types not supported in this browser; skip silently
    }
    const flushLcp = () => {
      if (lcpValue > 0) onReport({name: 'LCP', value: lcpValue, id: lcpId});
      lcpObserver.disconnect();
    };
    addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushLcp();
    }, {once: true});
    addEventListener('pagehide', flushLcp, {once: true});
  }

  // CLS — layout-shift entries, sum of session windows
  if (supports('layout-shift')) {
    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries: PerformanceEntry[] = [];
    const clsId = uuid();
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as Array<
        PerformanceEntry & {hadRecentInput?: boolean; value?: number}
      >) {
        if (entry.hadRecentInput) continue;
        const first = sessionEntries[0];
        const last = sessionEntries[sessionEntries.length - 1];
        if (
          sessionEntries.length &&
          first &&
          last &&
          entry.startTime - last.startTime < 1000 &&
          entry.startTime - first.startTime < 5000
        ) {
          sessionValue += entry.value || 0;
          sessionEntries.push(entry);
        } else {
          sessionValue = entry.value || 0;
          sessionEntries = [entry];
        }
        if (sessionValue > clsValue) clsValue = sessionValue;
      }
    });
    try {
      clsObserver.observe({type: 'layout-shift', buffered: true});
    } catch {
      // observer types not supported in this browser; skip silently
    }
    const flushCls = () => {
      onReport({name: 'CLS', value: clsValue, id: clsId});
      clsObserver.disconnect();
    };
    addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushCls();
    }, {once: true});
    addEventListener('pagehide', flushCls, {once: true});
  }

  // INP — approximate via longest event duration on interaction
  if (supports('event')) {
    let inpValue = 0;
    const inpId = uuid();
    const inpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as Array<
        PerformanceEntry & {duration: number; interactionId?: number}
      >) {
        if (!entry.interactionId) continue;
        if (entry.duration > inpValue) inpValue = entry.duration;
      }
    });
    try {
      inpObserver.observe({type: 'event', buffered: true, durationThreshold: 16} as any);
    } catch {
      // observer types not supported in this browser; skip silently
    }
    const flushInp = () => {
      if (inpValue > 0) onReport({name: 'INP', value: inpValue, id: inpId});
      inpObserver.disconnect();
    };
    addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushInp();
    }, {once: true});
    addEventListener('pagehide', flushInp, {once: true});
  }
}

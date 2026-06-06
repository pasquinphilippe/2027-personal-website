import {useEffect} from 'react';
import {useAnalytics} from '@shopify/hydrogen';
import {reportWebVitals} from '~/lib/webVitals';

export function WebVitals() {
  const {publish} = useAnalytics();

  useEffect(() => {
    reportWebVitals((metric) => {
      publish('custom_web_vital', metric);
    });
  }, [publish]);

  return null;
}

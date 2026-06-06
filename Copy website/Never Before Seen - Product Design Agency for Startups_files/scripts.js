(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function slideDown(el, duration) {
    duration = duration || 200;
    el.style.removeProperty('display');
    var display = window.getComputedStyle(el).display;
    if (display === 'none') display = 'block';
    el.style.display = display;
    var height = el.scrollHeight;
    el.style.overflow = 'hidden';
    el.style.height = '0px';
    el.offsetHeight;
    el.style.transition = 'height ' + duration + 'ms';
    el.style.height = height + 'px';
    window.setTimeout(function () {
      el.style.removeProperty('height');
      el.style.removeProperty('overflow');
      el.style.removeProperty('transition');
    }, duration);
  }

  function slideUp(el, duration) {
    duration = duration || 200;
    el.style.transition = 'height ' + duration + 'ms';
    el.style.overflow = 'hidden';
    el.style.height = el.offsetHeight + 'px';
    el.offsetHeight;
    el.style.height = '0px';
    window.setTimeout(function () {
      el.style.display = 'none';
      el.style.removeProperty('height');
      el.style.removeProperty('overflow');
      el.style.removeProperty('transition');
    }, duration);
  }

  function fadeIn(el, duration) {
    duration = duration || 300;
    el.style.opacity = '0';
    el.style.display = 'block';
    el.style.transition = 'opacity ' + duration + 'ms';
    el.offsetHeight;
    el.style.opacity = '1';
    window.setTimeout(function () { el.style.removeProperty('transition'); }, duration);
  }

  function fadeOut(el, duration) {
    duration = duration || 300;
    el.style.transition = 'opacity ' + duration + 'ms';
    el.style.opacity = '0';
    window.setTimeout(function () {
      el.style.display = 'none';
      el.style.removeProperty('opacity');
      el.style.removeProperty('transition');
    }, duration);
  }

  function smoothScrollTo(targetY, duration) {
    duration = duration || 500;
    var startY = window.pageYOffset;
    var diff = targetY - startY;
    var startTime;
    function step(ts) {
      if (!startTime) startTime = ts;
      var t = Math.min(1, (ts - startTime) / duration);
      var ease = 0.5 - Math.cos(t * Math.PI) / 2;
      window.scrollTo(0, startY + diff * ease);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  ready(function () {
    var header = document.querySelector('.header');

    // scroll nav (hide on scroll down, show on scroll up)
    if (!document.body.classList.contains('noStickyHeader') && header) {
      var lastScrollTop = 0;
      window.addEventListener('scroll', function () {
        var current = window.pageYOffset;
        var delta = current - lastScrollTop;
        if (Math.abs(delta) > 5) {
          if (delta > 0 && current > 0) header.classList.add('hideNav');
          else header.classList.remove('hideNav');
          lastScrollTop = current;
        }
      });
    }

    // homepage scroll prompt
    var scrollPrompt = document.querySelector('.homepageScrollPrompt');
    window.addEventListener('scroll', function () {
      if (!scrollPrompt) return;
      if (window.pageYOffset > window.innerHeight * 0.3) scrollPrompt.classList.add('hide');
      else scrollPrompt.classList.remove('hide');
    });

    // mob nav
    var menuToggle = document.querySelector('.menuToggle');
    var hamburger = document.querySelector('.hamburger');
    var navWrap = document.querySelector('.navWrap');
    if (menuToggle && hamburger && navWrap) {
      menuToggle.addEventListener('click', function () {
        hamburger.classList.toggle('clicked');
        if (hamburger.classList.contains('clicked')) {
          fadeIn(navWrap, 300);
          document.body.style.overflow = 'hidden';
        } else {
          fadeOut(navWrap, 300);
          document.body.style.overflow = 'auto';
        }
      });
    }

    window.addEventListener('resize', function () {
      if (!hamburger || !navWrap) return;
      hamburger.classList.remove('clicked');
      if (window.innerWidth >= 800) navWrap.style.display = '';
      else navWrap.style.display = 'none';
    });

    document.querySelectorAll('.navLink').forEach(function (link) {
      link.addEventListener('click', function () {
        document.querySelectorAll('.navDropdown.open').forEach(function (d) { slideUp(d, 200); });
        var dropdown = link.querySelector('.navDropdown');
        if (dropdown) {
          if (link.classList.contains('active')) {
            link.classList.remove('active');
          } else {
            link.classList.add('active');
            dropdown.classList.add('open');
            slideDown(dropdown, 200);
          }
        }
      });
    });

    // case scroller offset
    function offsetCaseScroller() {
      var cont = document.querySelector('.container');
      if (!cont) return;
      var contWidth = cont.offsetWidth;
      var offset = (window.innerWidth - contWidth) / 2;
      document.querySelectorAll('.caseScroller').forEach(function (scroller) {
        var inner = scroller.querySelector('.caseScrollerInnerPadd');
        if (inner) inner.style.width = offset + 'px';
      });
    }
    offsetCaseScroller();
    window.addEventListener('resize', offsetCaseScroller);
    window.addEventListener('load', offsetCaseScroller);

    // library: lazy-load + size on archive pages
    if (document.body.classList.contains('archivePage')) {
      function librarySizer(target) {
        var scope = target ? [target] : Array.from(document.querySelectorAll('.archivePage .imageSizer'));
        scope.forEach(function (sizer) {
          var img = sizer.querySelector('img:not(.mainImg)');
          if (!img || !img.naturalWidth) return;
          var maxSize = Math.min(sizer.offsetWidth, sizer.offsetHeight);
          var nw = img.naturalWidth;
          var nh = img.naturalHeight;
          var scale = Math.min(maxSize / nw, maxSize / nh);
          var finalWidth = Math.min(nw * scale, nw);
          img.style.width = finalWidth + 'px';
          img.style.height = 'auto';
        });
      }

      function libraryLazyLoad() {
        var scrl = window.pageYOffset;
        var hgt = window.innerHeight;
        document.querySelectorAll('.archivePage img[data-lazy-src]').forEach(function (img) {
          var pos = img.getBoundingClientRect().top + window.pageYOffset;
          if (pos < scrl + hgt + 200) {
            if (!img.getAttribute('src')) {
              img.setAttribute('src', img.getAttribute('data-lazy-src'));
              img.addEventListener('load', function () { librarySizer(img.closest('.imageSizer')); });
            }
          }
        });
      }

      document.querySelectorAll('.archivePage .imageSizer img').forEach(function (img) {
        img.addEventListener('load', function () { librarySizer(img.closest('.imageSizer')); });
      });
      window.addEventListener('load', function () { librarySizer(); });
      window.addEventListener('resize', function () { librarySizer(); });
      window.addEventListener('scroll', libraryLazyLoad);
      libraryLazyLoad();
    }

    // copy link
    document.querySelectorAll('.copyPostLink').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var link = btn.getAttribute('data-link');
        if (!link) return;
        var span = btn.querySelector('span');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(link).then(function () {
            if (span) {
              span.textContent = 'Copied!';
              window.setTimeout(function () { span.textContent = 'Copy Link'; }, 2000);
            }
          });
        } else {
          var temp = document.createElement('input');
          document.body.appendChild(temp);
          temp.value = link;
          temp.select();
          document.execCommand('copy');
          temp.remove();
          if (span) {
            span.textContent = 'Copied!';
            window.setTimeout(function () { span.textContent = 'Copy Link'; }, 2000);
          }
        }
      });
    });

    // card tilt
    var weight = 10;
    document.querySelectorAll('.tilt').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var bRect = el.getBoundingClientRect();
        var pX = Math.floor(((e.clientX - bRect.left) / bRect.width) * 100);
        var pY = Math.floor(((e.clientY - bRect.top) / bRect.height) * 100);
        var bgi = 'radial-gradient(' + bRect.width + 'px at ' + pX + '% ' + pY + '%, rgba(255,255,255,.5), rgba(255,255,255,0))';
        var rotX = -(pY - 50) / weight;
        var rotY = -(pX - 50) / weight;
        var trs = 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(1.08)';
        el.style.backgroundImage = bgi;
        el.classList.add('hover');
        el.style.transform = trs;
      });
      el.addEventListener('mouseleave', function () {
        el.style.backgroundImage = '';
        el.classList.remove('hover');
        el.style.transform = '';
      });
    });

    // client wins ticker — continuous left-pan
    (function initClientPressTicker() {
      var sections = document.querySelectorAll('.cptSection');
      if (!sections.length) return;
      var first = sections[0];
      var sectionWidth = first.getBoundingClientRect().width + parseFloat(getComputedStyle(first).marginLeft || 0) + parseFloat(getComputedStyle(first).marginRight || 0);
      var currentPosition = 0;
      function animate() {
        if (!sectionWidth) {
          var rect = first.getBoundingClientRect();
          var ml = parseFloat(getComputedStyle(first).marginLeft || 0);
          var mr = parseFloat(getComputedStyle(first).marginRight || 0);
          sectionWidth = rect.width + ml + mr;
        }
        currentPosition -= 1;
        if (sectionWidth && Math.abs(currentPosition) >= sectionWidth) currentPosition = 0;
        sections.forEach(function (s) { s.style.transform = 'translateX(' + currentPosition + 'px)'; });
        requestAnimationFrame(animate);
      }
      window.addEventListener('resize', function () {
        var rect = first.getBoundingClientRect();
        var ml = parseFloat(getComputedStyle(first).marginLeft || 0);
        var mr = parseFloat(getComputedStyle(first).marginRight || 0);
        sectionWidth = rect.width + ml + mr;
      });
      requestAnimationFrame(animate);
    })();

    // responsive text
    function applyResponsiveText() {
      document.querySelectorAll('.responsiveText').forEach(function (el) {
        if (!el.parentElement || !el.parentElement.classList.contains('responsiveTextWrap')) {
          var wrap = document.createElement('div');
          wrap.className = 'responsiveTextWrap';
          el.parentNode.insertBefore(wrap, el);
          wrap.appendChild(el);
        }
        el.style.zoom = '0.1';
        var width = 0;
        el.querySelectorAll('span').forEach(function (s) {
          var w = s.getBoundingClientRect().width;
          if (w > width) width = w;
        });
        var parentWidth = el.parentElement.getBoundingClientRect().width;
        if (width > 0) el.style.zoom = String((parentWidth / width) * 0.99);
      });
    }
    window.addEventListener('load', applyResponsiveText);
    window.addEventListener('resize', applyResponsiveText);

    // header scrolled class
    function updateHeader() {
      if (!header) return;
      if (window.pageYOffset > 10) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    window.addEventListener('load', updateHeader);
    window.addEventListener('scroll', updateHeader);

    function updateHeaderSpacer() {
      var spacer = document.querySelector('.headerSpacer');
      if (spacer && header) spacer.style.height = header.offsetHeight + 'px';
    }
    window.addEventListener('load', updateHeaderSpacer);
    window.addEventListener('resize', updateHeaderSpacer);
    updateHeaderSpacer();

    // smooth anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (event) {
        event.preventDefault();
        var href = a.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          var top = target.getBoundingClientRect().top + window.pageYOffset;
          smoothScrollTo(top, 500);
        }
      });
    });

    window.addEventListener('scroll', function () {
      document.querySelectorAll('[id]').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var elementTop = rect.top + window.pageYOffset;
        var elementBottom = elementTop + el.offsetHeight;
        var scrollPosition = window.pageYOffset + window.innerHeight / 2;
        var elementId = el.getAttribute('id');
        document.querySelectorAll('a[href="#' + elementId + '"]').forEach(function (link) {
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) link.classList.add('active');
          else link.classList.remove('active');
        });
      });
    });

    // tab gallery
    document.querySelectorAll('.tabGalleryNavItem').forEach(function (item) {
      item.addEventListener('click', function () {
        var parent = item.closest('.tabGallery');
        if (!parent) return;
        var id = item.getAttribute('data-gallery-item');
        parent.querySelectorAll('.tabGalleryNavItem').forEach(function (n) { n.classList.remove('active'); });
        item.classList.add('active');
        parent.querySelectorAll('.tabGalleryItem').forEach(function (n) { n.classList.remove('active'); });
        var match = parent.querySelector('.tabGalleryItem[data-gallery-item="' + id + '"]');
        if (match) match.classList.add('active');
      });
    });

    // team map
    var teamMap = document.querySelector('.teamMap.hoverable');
    if (teamMap) {
      var isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
      teamMap.querySelectorAll('.teamAvatar').forEach(function (av) {
        if (isTouch) {
          av.addEventListener('click', function () {
            var head = av.closest('.teamHead');
            if (!head) return;
            var wasOpen = head.classList.contains('open');
            document.querySelectorAll('.teamHead').forEach(function (h) { h.classList.remove('open'); });
            if (!wasOpen) head.classList.add('open');
          });
        } else {
          av.addEventListener('mouseenter', function () {
            var head = av.closest('.teamHead');
            if (head) head.classList.add('open');
          });
          av.addEventListener('mouseleave', function () {
            var head = av.closest('.teamHead');
            if (head) head.classList.remove('open');
          });
        }
      });
    }

    // services
    function serviceInt(target) {
      if (!target) return;
      var siblings = Array.from(target.parentElement.children).filter(function (c) {
        return c !== target && c.classList.contains('service');
      });
      siblings.forEach(function (s) { s.classList.remove('active'); });
      target.classList.add('active');
      var serviceCount = target.parentElement.querySelectorAll('.service').length;
      var inactiveServiceWidth = 50 / serviceCount;
      target.style.width = '50%';
      siblings.forEach(function (s) { s.style.width = inactiveServiceWidth + 'px'; });
    }
    document.querySelectorAll('.services .service').forEach(function (s) {
      s.addEventListener('mouseenter', function () { serviceInt(s); });
    });
    document.querySelectorAll('.services').forEach(function (group) {
      var first = group.querySelector(':scope > .service');
      if (first) serviceInt(first);
    });

    // dark bg
    window.addEventListener('scroll', function () {
      document.querySelectorAll('.goDark').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var elementTop = rect.top + window.pageYOffset;
        var elementBottom = elementTop + el.offsetHeight;
        var viewportTop = window.pageYOffset;
        var viewportBottom = viewportTop + window.innerHeight;
        var offset = 500;
        if (elementBottom > viewportTop + offset && elementTop < viewportBottom - offset) {
          document.documentElement.classList.add('darkMode');
        } else {
          document.documentElement.classList.remove('darkMode');
        }
      });
    });
  });
})();

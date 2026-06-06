(function() {
  // Chocchip Plugin
  window.chocchip = function(options) {
    document.addEventListener('DOMContentLoaded', function() {
      const defaults = {
        bannerText: 'We use cookies to enhance your experience. By clicking "Accept", you consent to our use of cookies for analytics and tracking.',
        acceptBtnText: 'Accept',
        rejectBtnText: 'Reject',
        storageKey: 'userConsent',  // Key to store user consent in localStorage
        cookieExpireDays: 365,      // Default expiration days
        autoOptIn: true             // If based on their timezone or language, the user is outside of a country that requires consent, auto-opt them in
      };

      const settings = Object.assign({}, defaults, options);

      // Hardcoded European timezones
      const europeanTimezones = [
        'Europe/London', 'Europe/Berlin', 'Europe/Paris', 'Europe/Rome', 'Europe/Madrid',
        'Europe/Amsterdam', 'Europe/Brussels', 'Europe/Vienna', 'Europe/Stockholm',
        'Europe/Oslo', 'Europe/Warsaw', 'Europe/Copenhagen', 'Europe/Helsinki'
      ];

      // Hardcoded European languages
      const europeanLanguages = ['fr', 'de', 'es', 'it', 'nl', 'pl', 'sv', 'da', 'fi'];

      // Detect the user's timezone
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Detect the user's browser language
      const userLanguage = navigator.language || navigator.languages[0];
      
      // Check if the user's timezone is in a European timezone
      const isEuropeanTimezone = europeanTimezones.includes(userTimeZone);
      
      // Check if the user's language is a European language
      const isEuropeanLanguage = europeanLanguages.some(lang => userLanguage.startsWith(lang));

      // Check if user consent is already stored in localStorage and hasn't expired
      const storedData = JSON.parse(localStorage.getItem(settings.storageKey));

      if (storedData) {
        const now = new Date();
        const expirationTime = new Date(storedData.timestamp + (settings.cookieExpireDays * 24 * 60 * 60 * 1000));

        if (storedData.value === 'true' && now < expirationTime) {
          loadTrackingScripts();
          return; // User has already accepted and the expiration date hasn't passed
        } else if (storedData.value === 'false' && now < expirationTime) {
          return; // User has rejected, so no scripts should load, and the banner should not appear
        } else {
          // If the expiration has passed, remove the stored data to show the banner again
          localStorage.removeItem(settings.storageKey);
        }
      }

      // Auto opt-in based on timezone or language if they are not European
      if (settings.autoOptIn && !isEuropeanTimezone && !isEuropeanLanguage) {
        const timestamp = new Date().getTime();
        localStorage.setItem(settings.storageKey, JSON.stringify({ value: 'true', timestamp }));
        loadTrackingScripts();
        return; // Auto-opted in, so no need to show the banner
      }

      // Create consent banner
      const consentBanner = document.createElement('div');
      consentBanner.id = 'chocChipBanner'; // Use external CSS for styling
      consentBanner.innerHTML = `
        <p>${settings.bannerText}</p>
        <div id="chocChipButtons">
          <button id="reject-cookies">${settings.rejectBtnText}</button>
          <button id="accept-cookies">${settings.acceptBtnText}</button>
        </div>
      `;
      
      document.body.appendChild(consentBanner);
      
      const acceptBtn = document.getElementById('accept-cookies');
      const rejectBtn = document.getElementById('reject-cookies');
      
      // On "Accept" button click
      acceptBtn.addEventListener('click', function() {
        const timestamp = new Date().getTime();
        localStorage.setItem(settings.storageKey, JSON.stringify({ value: 'true', timestamp }));
        loadTrackingScripts();
        document.body.removeChild(consentBanner);
      });
      
      // On "Reject" button click
      rejectBtn.addEventListener('click', function() {
        const timestamp = new Date().getTime();
        localStorage.setItem(settings.storageKey, JSON.stringify({ value: 'false', timestamp }));
        document.body.removeChild(consentBanner);
      });

      // Function to load and execute tracking scripts inside <template> elements after consent is given
      function loadTrackingScripts() {
        const chocchipTemplates = document.querySelectorAll('template.chocchip');
        chocchipTemplates.forEach(template => {
          const content = template.content;
          document.head.appendChild(content); // Add the script tags back to the DOM, allowing them to run
        });
      }
    });
  };
})();

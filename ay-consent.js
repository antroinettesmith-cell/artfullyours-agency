/* The Artfullyours Agency: cookie consent + Google Analytics (Consent Mode v2).
   Analytics stays off until a visitor accepts. The choice is remembered in this browser.
   To turn analytics on, put the GA4 measurement ID (G-XXXXXXXXXX) in GA_ID. */
(function () {
  var GA_ID = 'G-50M7STNEKB';
  var KEY = 'ay_cookie_consent';

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var choice = read();
  var granted = choice === 'granted';
  gtag('consent', 'default', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  if (GA_ID) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function setChoice(v) {
    save(v);
    gtag('consent', 'update', { analytics_storage: v === 'granted' ? 'granted' : 'denied' });
    var b = document.getElementById('ay-cookie');
    if (b) b.parentNode.removeChild(b);
  }

  function banner() {
    if (document.getElementById('ay-cookie')) return;
    var css = document.createElement('style');
    css.textContent =
      '#ay-cookie{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:760px;margin:0 auto;' +
      'background:#3D1A2E;color:#F5F0E8;border:1px solid rgba(212,168,67,.45);border-radius:3px;' +
      'box-shadow:0 18px 48px rgba(26,15,22,.35);padding:1.15rem 1.4rem;display:flex;align-items:center;gap:1.4rem;' +
      'font-family:"Cormorant Garamond",Georgia,serif}' +
      '#ay-cookie p{margin:0;font-size:1.05rem;line-height:1.5;flex:1}' +
      '#ay-cookie .ay-k{display:block;font-family:Jost,system-ui,sans-serif;font-size:.62rem;letter-spacing:.28em;' +
      'text-transform:uppercase;color:#D4A843;margin-bottom:.3rem}' +
      '#ay-cookie .ay-b{display:flex;gap:.6rem;flex-shrink:0}' +
      '#ay-cookie button{font-family:Jost,system-ui,sans-serif;font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;' +
      'padding:.75rem 1.2rem;border-radius:2px;cursor:pointer;border:1px solid #D4A843;transition:background .25s ease,color .25s ease}' +
      '#ay-cookie .ay-yes{background:#D4A843;color:#3D1A2E}#ay-cookie .ay-yes:hover{background:#E8D5A3}' +
      '#ay-cookie .ay-no{background:transparent;color:#E8D5A3}#ay-cookie .ay-no:hover{background:rgba(212,168,67,.14)}' +
      '@media(max-width:620px){#ay-cookie{flex-direction:column;align-items:stretch;gap:1rem}#ay-cookie .ay-b button{flex:1}}';
    document.head.appendChild(css);
    var d = document.createElement('div');
    d.id = 'ay-cookie';
    d.setAttribute('role', 'region');
    d.setAttribute('aria-label', 'Cookie preferences');
    d.innerHTML =
      '<p><span class="ay-k">Cookies</span>We use cookies to understand how visitors find and use our site. ' +
      'You can accept analytics cookies or decline them.</p>' +
      '<div class="ay-b"><button type="button" class="ay-no">Decline</button>' +
      '<button type="button" class="ay-yes">Accept</button></div>';
    d.querySelector('.ay-yes').addEventListener('click', function () { setChoice('granted'); });
    d.querySelector('.ay-no').addEventListener('click', function () { setChoice('denied'); });
    document.body.appendChild(d);
  }

  window.AYCookies = { open: banner };
  if (choice !== 'granted' && choice !== 'denied') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner);
    else banner();
  }
})();

/* Polymer global settings (laziregister, shadowdom) */
window.Polymer = {
//  dom: 'shadow',
 lazyRegister: true
};

/* Remove loading spinner when WebComponents polyfill is fully loaded */
window.addEventListener('WebComponentsReady', function(e) {
  document.querySelector('.spinner-overlay.app-load').style.display = 'none';
  var script = document.createElement('script');
  script.src = 'assets/js/bundle-min.js';
  document.body.appendChild(script);
});

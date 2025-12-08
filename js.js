/* site.js - provides slideshow, collapsibles, dropdown mobile toggle, cookie banner, header/footer replacement */
(function(){
  'use strict';
  // Header/footer replace if files exist
  function attemptReplace(id, path){
    fetch(path).then(function(r){ if(!r.ok) throw new Error('not found'); return r.text(); }).then(function(html){
      document.getElementById(id).innerHTML = html;
    }).catch(function(){ /* fallback: keep inline */ });
  }
  attemptReplace('header','/header.html');
  attemptReplace('footer','/footer.html');

  // Update header logo var
  function updateLogoVar(){
    var logo = document.querySelector('.logo img');
    if(logo) document.documentElement.style.setProperty('--header-logo-height', logo.offsetHeight + 'px');
  }
  window.addEventListener('load', updateLogoVar);
  window.addEventListener('resize', updateLogoVar);

  // Slideshow
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide')||[]);
  if(slides.length){
    var idx = slides.findIndex(function(s){ return s.classList.contains('active'); });
    if(idx<0) idx=0;
    function show(i){
      slides.forEach(function(s){ s.classList.remove('active'); });
      slides[i].classList.add('active');
    }
    var nextBtn = document.querySelector('.slideshow .next');
    var prevBtn = document.querySelector('.slideshow .prev');
    if(nextBtn) nextBtn.addEventListener('click', function(){ idx=(idx+1)%slides.length; show(idx); });
    if(prevBtn) prevBtn.addEventListener('click', function(){ idx=(idx-1+slides.length)%slides.length; show(idx); });
    document.addEventListener('keydown', function(e){ if(e.key==='ArrowRight'){ if(nextBtn) nextBtn.click(); } if(e.key==='ArrowLeft'){ if(prevBtn) prevBtn.click(); } });
    // autoplay optional:
    // setInterval(function(){ if(nextBtn) nextBtn.click(); }, 6000);
  }

  // Collapsibles
  var coll = document.querySelectorAll('.collapsible');
  Array.prototype.forEach.call(coll, function(btn){
    btn.addEventListener('click', function(){
      btn.classList.toggle('active');
      var content = btn.nextElementSibling;
      if(!content) return;
      if(content.style.display === 'block') content.style.display = 'none';
      else content.style.display = 'block';
    });
  });

  // Mobile toggle
  var toggle = document.querySelector('.mobile-toggle');
  var header = document.querySelector('header');
  if(toggle){
    toggle.addEventListener('click', function(){
      header.classList.toggle('mobile-nav');
    });
  }

  // Cookie banner with localStorage
  (function(){
    var key = 'cookie-accepted-v1';
    var banner = document.getElementById('cookie');
    var accept = document.getElementById('cookie-accept');
    var more = document.getElementById('cookie-more');
    function hideBanner(){ if(banner) banner.classList.add('hidden'); }
    function showBanner(){ if(banner) banner.classList.remove('hidden'); }
    if(!banner) return;
    if(localStorage.getItem(key) === 'true') hideBanner(); else setTimeout(showBanner, 800);
    if(accept) accept.addEventListener('click', function(){ localStorage.setItem(key,'true'); hideBanner(); });
    if(more) more.addEventListener('click', function(){ window.location = '/privacy.html'; });
  })();

  // set footer year
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();

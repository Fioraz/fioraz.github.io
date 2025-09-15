<!-- FILE: /assets/js/main.js -->
(function(){
  // Simple nav toggle
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      if(nav.style.display === 'flex') nav.style.display = '';
      else nav.style.display = 'flex';
    });
  }

  // Portfolio filtering
  function filterProjects(cat){
    var items = document.querySelectorAll('.project');
    items.forEach(function(it){
      if(cat === 'all' || it.dataset.cat === cat){
        it.style.display = '';
      } else {
        it.style.display = 'none';
      }
    });
  }
  var buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
      var cat = btn.dataset.filter;
      filterProjects(cat);
    });
  });

  // Contact form (client-side only)
  window.handleContactSubmit = function(e){
    e.preventDefault();
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var status = document.getElementById('formStatus');
    if(!name || !email || !message){ status.textContent = 'Please complete all fields.'; return false; }
    // This is a demo: in production send to an email service or server endpoint.
    status.textContent = 'Thanks — your message was recorded locally (demo).';
    e.target.reset();
    return false;
  };
})();


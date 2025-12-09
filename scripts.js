(function(){
// load header and footer into pages
function includeHTML(){
var header = document.getElementById('include-header');
var footer = document.getElementById('include-footer');
if(header){fetch('header.html').then(r=>r.text()).then(t=>header.innerHTML=t)}
if(footer){fetch('footer.html').then(r=>r.text()).then(t=>footer.innerHTML=t)}
}
// mobile nav toggle
function setupNav(){
var btn = document.getElementById('mobile-nav-toggle');
var nav = document.getElementById('primary-nav');
if(btn && nav){
btn.addEventListener('click',function(){
var expanded = btn.getAttribute('aria-expanded')==='true';
btn.setAttribute('aria-expanded',!expanded);
nav.classList.toggle('show');
})
}
}
// smooth scroll to top
function setupToTop(){
var t = document.querySelector('.to-top');
if(t){t.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})})}
}
// load everything
document.addEventListener('DOMContentLoaded',function(){includeHTML();setupNav();setupToTop();});
})();
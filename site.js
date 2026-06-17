/* TAKELSA — site.js : barres de profil (cohérent étiquette) + apparition douce */
(function(){
  var AXES = ['Fruité','Vert','Amertume','Ardence','Douceur','Rondeur'];
  var MAX = 5;

  // valeurs partagées (mêmes que l'étiquette)
  window.TAKELSA_PROFILES = {
    chetoui:   [4,5,4,3,2,3],
    chemlali:  [4,2,2,1,4,4],
    picholine: [5,4,5,4,2,3]
  };

  function buildBars(){
    document.querySelectorAll('[data-profile]').forEach(function(host){
      var key = host.getAttribute('data-profile');
      var vals = window.TAKELSA_PROFILES[key];
      if(!vals) return;
      vals.forEach(function(v,i){
        var bar = document.createElement('div'); bar.className='bar';
        var segs=''; for(var s=1;s<=MAX;s++) segs+='<i class="'+(s<=v?'on':'')+'"></i>';
        bar.innerHTML='<div class="blab"><span>'+AXES[i]+'</span><span class="num">'+v+'/'+MAX+'</span></div><div class="segs">'+segs+'</div>';
        host.appendChild(bar);
      });
    });
  }

  function reveal(){
    var els = document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add('in');}); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    },{threshold:.14});
    els.forEach(function(e){ io.observe(e); });
  }

  function init(){ document.documentElement.classList.add('js'); buildBars(); reveal(); }
  if(document.readyState!=='loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();

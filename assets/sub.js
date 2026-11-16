(function(){
const $=s=>document.querySelector(s),q=new URLSearchParams(location.search),page=document.body.dataset.page;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const M=["January","February","March","April","May","June","July","August","September","October","November","December"];
const fd=d=>{const[y,m,dd]=d.split("-");return M[+m-1]+" "+(+dd)+", "+y};
const nav=[["news","news.html","News"],["game","game.html","Game"],["media","media.html","Media"],["patch","patch-notes.html","Patch notes"],["online","game.html?id=online","Online"]];
const cur=page=="game"&&q.get("id")=="online"?"online":page;
document.body.insertAdjacentHTML("afterbegin",'<header class="top solid" id="top"><a class="logo" href="index.html"><img src="assets/icon.png" alt=""><b>SQUAD MAESTRO</b></a><nav class="menu">'+nav.map(n=>'<a href="'+n[1]+'"'+(n[0]==cur?' class="cur"':'')+'>'+n[2]+'</a>').join("")+'</nav><a class="cta" href="patch-notes.html?v='+SM.patches[0].v+'">What\'s new</a></header>');
document.body.insertAdjacentHTML("beforeend",'<footer><div class="wrap"><a class="logo" href="index.html"><img src="assets/icon.png" alt=""><b>SQUAD MAESTRO</b></a><div class="fl">'+nav.map(n=>'<a href="'+n[1]+'">'+n[2]+'</a>').join("")+'</div><div>© Braca Studio. All clubs, players, managers and brands in Squad Maestro are fictional.<br>Fonts: Barlow, SIL Open Font License.</div></div></footer><div class="lb" id="lb" onclick="this.style.display=\'none\'"><img id="lbimg" alt=""></div>');
const main=$("#main");
const hero=(img,crumbs,title,p)=>'<section class="sub-hero"><div class="img" style="background-image:url(assets/'+img+')"></div><div class="wrap"><div class="crumb"><a href="index.html">Home</a>'+crumbs.map(c=>'<i>/</i>'+(c[1]?'<a href="'+c[1]+'">'+esc(c[0])+'</a>':esc(c[0]))).join("")+'</div><h1>'+esc(title)+'</h1>'+(p?'<p>'+esc(p)+'</p>':'')+'</div></section>';
const secs=ss=>ss.map(s=>'<h2>'+esc(s.h)+'</h2>'+(s.p?'<p>'+esc(s.p)+'</p>':'')+(s.items?'<ul>'+s.items.map(i=>'<li>'+esc(i)+'</li>').join("")+'</ul>':'')).join("");
const card=(href,img,tg,t,p,dt)=>'<a class="card in" href="'+href+'"><div class="im" style="background-image:url(assets/'+img+')"></div><div class="bd"><div class="tg">'+esc(tg)+'</div><h3>'+esc(t)+'</h3><p>'+esc(p)+'</p>'+(dt?'<div class="dt">'+fd(dt)+'</div>':'')+'</div></a>';
const related=ids=>ids&&ids.length?'<div class="rel"><small>KEEP READING</small><div class="cards">'+ids.map(id=>{const f=SM.features[id];return card("game.html?id="+id,f.img,f.tag,f.title,f.lead)}).join("")+'</div></div>':"";
const notFound=(back,label)=>{main.innerHTML=hero("stadium.jpg",[[label,back]],"Page not found","")+'<div class="art"><a class="ghost back" href="'+back+'">Back to '+label+'</a></div>'};
let title="";
if(page=="patch"){
  const v=q.get("v");
  if(!v){title="Patch notes";main.innerHTML=hero("awards.jpg",[["Patch notes"]],"Patch notes","Every Squad Maestro update with its release date. Click an update to read the full notice.")+'<div class="board">'+SM.patches.map(p=>'<a class="row" href="?v='+p.v+'"><div class="th" style="background-image:url(assets/'+p.img+')"></div><div><div class="tg">Update · Version '+p.v+'</div><h3>Patch notes: '+esc(p.title)+'</h3><p>'+esc(p.summary)+'</p></div><div class="dt">'+fd(p.date)+'</div></a>').join("")+'</div>'}
  else{const i=SM.patches.findIndex(p=>p.v==v);if(i<0)return notFound("patch-notes.html","Patch notes");const p=SM.patches[i],nw=SM.patches[i-1],od=SM.patches[i+1];title="Patch notes "+p.v;
    main.innerHTML=hero(p.img,[["Patch notes","patch-notes.html"],["Version "+p.v]],"Version "+p.v+": "+p.title,"")+'<article class="art"><div class="meta"><span class="tg">Update</span><span>Released '+fd(p.date)+'</span><span>Version '+p.v+'</span></div><p class="lead">'+esc(p.summary)+'</p>'+secs(p.sections)+'<div class="pn">'+(od?'<a href="?v='+od.v+'"><small>← Previous update</small><b>'+od.v+': '+esc(od.title)+'</b></a>':'<span></span>')+(nw?'<a class="nx" href="?v='+nw.v+'"><small>Next update →</small><b>'+nw.v+': '+esc(nw.title)+'</b></a>':'')+'</div><a class="ghost back" href="patch-notes.html">Back to all patch notes</a></article>'}
}
if(page=="news"){
  const id=q.get("id");
  if(!id){title="News";main.innerHTML=hero("stadium.jpg",[["News"]],"News","Updates, features and notices from Braca Studio.")+'<div class="board"><div class="btabs">'+["All","Update","Feature","Notice"].map((t,i)=>'<button'+(i?'':' class="on"')+' data-f="'+t+'">'+(i?t+"s":t)+'</button>').join("")+'</div>'+SM.news.map(n=>'<a class="row" data-k="'+n.cat+'" href="'+n.href+'"><div class="th" style="background-image:url(assets/'+n.img+')"></div><div><div class="tg">'+n.cat+'</div><h3>'+esc(n.title)+'</h3><p>'+esc(n.p)+'</p></div><div class="dt">'+fd(n.date)+'</div></a>').join("")+'</div>';
    document.querySelectorAll(".btabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".btabs button").forEach(x=>x.classList.toggle("on",x==b));document.querySelectorAll(".row").forEach(r=>r.style.display=b.dataset.f=="All"||r.dataset.k==b.dataset.f?"":"none")})}
  else{const a=SM.articles[id];if(!a)return notFound("news.html","News");title=a.title;
    main.innerHTML=hero(a.img,[["News","news.html"],[a.cat]],a.title,"")+'<article class="art"><div class="meta"><span class="tg">'+a.cat+'</span><span>'+fd(a.date)+'</span></div><p class="lead">'+esc(a.lead)+'</p>'+secs(a.sections)+related(a.related)+'<a class="ghost back" href="news.html">Back to news</a></article>'}
}
if(page=="game"){
  const id=q.get("id");
  if(!id){title="The game";main.innerHTML=hero("stadium.jpg",[["Game"]],"The game","Everything you can do in Squad Maestro. Pick a part of the game to read more.")+'<div class="board" style="max-width:1280px"><div class="fgrid">'+Object.entries(SM.features).map(([k,f])=>'<a class="fcard" href="?id='+k+'"><div class="im" style="background-image:url(assets/'+f.img+')"></div><div class="tx"><small>'+esc(f.tag)+'</small><h3>'+esc(f.title)+'</h3><p>'+esc(f.lead)+'</p></div></a>').join("")+'</div></div>'}
  else{const f=SM.features[id];if(!f)return notFound("game.html","Game");title=f.tag;
    main.innerHTML=hero(f.img,[["Game","game.html"],[f.tag]],f.title,f.lead)+'<article class="art">'+secs(f.sections)+related(f.related.filter(r=>r!=id))+'<a class="ghost back" href="game.html">Back to the game</a></article>'}
}
if(page=="media"){title="Media";main.innerHTML=hero("stadium.jpg",[["Media"]],"Media","Screenshots and artwork from Squad Maestro. Click a picture to enlarge it.")+'<div class="board" style="max-width:1280px"><div class="mgrid">'+SM.media.map(m=>'<figure><img src="assets/'+m[0]+'" alt="'+esc(m[1])+'" loading="lazy"><figcaption>'+esc(m[1])+'</figcaption></figure>').join("")+'</div></div>';
  document.querySelectorAll(".mgrid figure").forEach(f=>f.onclick=()=>{lbimg.src=f.querySelector("img").src;lb.style.display="flex"})}
document.title=title+" | Squad Maestro";scrollTo(0,0);
})();

const $=id=>document.getElementById(id);
let resources=JSON.parse(localStorage.getItem("tt_resources")||"[]");
function save(){localStorage.setItem("tt_resources",JSON.stringify(resources))}
function esc(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function render(){
 $("resourceList").innerHTML="";
 resources.forEach((r,i)=>{
  const pct=r.needed?Math.min(100,Math.round(r.owned/r.needed*100)):100, miss=Math.max(0,r.needed-r.owned);
  const el=document.createElement("div");el.className="resource";
  el.innerHTML=`<div class="resourceTop"><b>${esc(r.name)}</b><small>${r.owned}/${r.needed}</small></div><div class="bar"><i style="width:${pct}%"></i></div><div class="${miss?"missing":"ok"}">${miss?"Kurang "+miss:"✓ Resource cukup"}</div>`;
  el.onclick=()=>{if(confirm("Hapus resource ini?")){resources.splice(i,1);save();render()}};
  $("resourceList").appendChild(el);
 });
 $("clearResources").style.display=resources.length?"block":"none";
 $("itemCount").textContent=resources.length;
 $("score").textContent=resources.filter(r=>r.owned>=r.needed).length;
}
$("addResource").onclick=()=>{let name=$("itemName").value.trim(),owned=+($("owned").value)||0,needed=+($("needed").value)||0;if(!name)return alert("Isi nama item.");resources.push({name,owned,needed});save();render();$("itemName").value="";$("owned").value="";$("needed").value=""};
$("clearResources").onclick=()=>{if(confirm("Hapus semua resource?")){resources=[];save();render()}};
function calc(){let q=Math.max(0,+$("quantity").value||0),m=Math.max(0,+$("minutes").value||0),t=q*m,h=Math.floor(t/60),mi=Math.floor(t%60);$("totalTime").textContent=`${h}j ${mi}m`;$("totalMinutes").textContent=Math.round(t)}
$("quantity").oninput=calc;$("minutes").oninput=calc;calc();render();

function openTab(id){document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===id));document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("active",p.id===id));scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>openTab(b.dataset.tab));
document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>openTab(b.dataset.go));
$("themeBtn").onclick=()=>document.body.classList.toggle("light");
if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));

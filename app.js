var K='tradepulse_v2',MIS=['FOMO / Chased Entry','Moved / No Stop-Loss','Revenge Trade','Overtraded','Oversized Position'],GOOD=['Waited for Confirmation','Followed Plan','Respected Stop-Loss'];
var S=null;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
if(!S||!Array.isArray(S.trades))S={pastLoss:0,startBalance:0,customPills:[],days:{},trades:[]};
S.startBalance=+S.startBalance||0;S.days=S.days&&typeof S.days==='object'?S.days:{};S.customPills=Array.isArray(S.customPills)?S.customPills:[];
var sel=[],oc='PROFIT',md='TRADE',cm=new Date();cm.setDate(1);
function $(i){return document.getElementById(i)}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function inr(n){return'₹'+Math.abs(Math.round(n)).toLocaleString('en-IN')}
function sg(n){return(n<0?'-':n>0?'+':'')+inr(n)}
function kf(n){var a=Math.abs(n);return a>=1000?(a/1000).toFixed(1).replace('.0','')+'k':a}
function p2(n){return String(n).padStart(2,'0')}
function ds(d){return d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate())}
function sum(a){return a.reduce(function(s,t){return s+t.pnl},0)}
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
function all(){return MIS.concat(GOOD,S.customPills)}
function eff(){return document.documentElement.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}
function th(){var n=eff()==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);try{localStorage.setItem('tp_theme',n)}catch(e){}$('tb').textContent=n==='dark'?'☀️':'🌙'}
function fill(){$('sb').value=S.startBalance||'';$('sp').value=S.pastLoss||'';$('fd').value=ds(new Date())}
function so(o){oc=o;$('bp').className=o==='PROFIT'?'on p':'';$('bl').className=o==='LOSS'?'on l':''}
function tg(i){var g=all()[i],k=sel.indexOf(g);if(k<0)sel.push(g);else sel.splice(k,1);render()}
function mv(n){cm.setMonth(cm.getMonth()+n);render()}
function sn(k,v){S[k]=Math.max(0,+v||0);save();render()}
function ap(){var v=$('np').value.trim();if(v&&all().indexOf(v)<0){S.customPills.push(v);save();$('np').value='';render()}}
function rp(i){var g=S.customPills[i];S.customPills.splice(i,1);sel=sel.filter(function(x){return x!==g});save();render()}
function del(id){S.trades=S.trades.filter(function(t){return t.id!==id});save();render()}
function add(){
var dt=$('fd').value||ds(new Date()),has=S.trades.some(function(t){return t.date===dt});
if(md!=='TRADE'){if(has){$('fmsg').textContent='That day already has trades.';return}
S.days[dt]={type:md,note:$('fr').value.trim()};save();$('fr').value='';$('fmsg').textContent=md==='NOTRADE'?'Saved as a no-trade day.':'Saved as a holiday.';render();return}
var a=+$('fa').value,c=Math.max(0,+$('fc').value||0),tk=$('ft').value.trim().toUpperCase();
if(!tk||!(a>0)){$('fmsg').textContent='Enter an instrument and a gross amount above zero.';return}
var gr=oc==='LOSS'?-a:a,net=gr-c;
delete S.days[dt];
S.trades.push({id:'t_'+Date.now(),date:dt,session:$('fs').value,ticker:tk,outcome:net>=0?'PROFIT':'LOSS',gross:gr,charges:c,pnl:net,tags:sel.slice(),reflection:$('fr').value.trim(),createdAt:Date.now()});
save();sel=[];$('fa').value='';$('fc').value='';$('fr').value='';$('fmsg').textContent='Trade added'+(c?' (net '+sg(net)+' after '+inr(c)+' charges).':'.');render()}
function bk(){var b=$('io'),t=JSON.stringify(S);$('bx').hidden=false;b.value=t;
var ok=function(){$('smsg').textContent='Backup copied. Paste it somewhere safe, like a note to yourself.'},no=function(){b.select();$('smsg').textContent='Select and copy the text above to keep your backup.'};
try{navigator.clipboard.writeText(t).then(ok,no)}catch(e){no()}}
function rst(){var b=$('io');if($('bx').hidden||!b.value.trim()){$('bx').hidden=false;b.value='';b.focus();$('smsg').textContent='Paste your backup above, then press Restore again.';return}
try{var d=JSON.parse(b.value);if(!d||!Array.isArray(d.trades))throw 0;
S={pastLoss:+d.pastLoss||0,startBalance:+d.startBalance||0,days:d.days&&typeof d.days==='object'?d.days:{},customPills:Array.isArray(d.customPills)?d.customPills:[],trades:d.trades.map(function(t,i){return{id:String(t.id||'i_'+i+'_'+Date.now()),date:t.date,session:t.session||'Morning',ticker:t.ticker||'',outcome:t.pnl>=0?'PROFIT':'LOSS',gross:t.gross!=null?+t.gross:(+t.pnl||0),charges:+t.charges||0,pnl:+t.pnl||0,tags:t.tags||[],reflection:t.reflection||'',createdAt:t.createdAt||Date.now()}})};
save();fill();render();b.value='';$('bx').hidden=true;$('smsg').textContent='Restored.'}catch(e){$('smsg').textContent='That does not look like a TradePulse backup.'}}
var QUOTES=['Your edge is the plan. Your enemy is the urge to improvise.','A skipped trade costs nothing. A forced trade can cost a week.','Protect your capital first. Profits are what is left when you do.','The market does not owe you a bounce. Cut the loss and move on.','Wins make you careless. Losses make you angry. Stay level in both.','If you have to hurry, you are probably chasing.','Confidence is built by following rules, not by a lucky streak.','Moving a stop-loss is just a bigger bet you never planned.','A revenge trade is paid for twice: once in money, once in confidence.','Small losses are tuition. Big losses are a choice.','Boring and consistent beats exciting and broke.','Today’s goal is not to win. It is to follow your rules.','One good trade does not make you right. One bad trade does not make you wrong.','Be patient at the entry and ruthless at the stop.','Overtrading is fear of missing out wearing a disguise.','Hit your target, close the screen, and keep the day a win.','The best traders are comfortable doing nothing.','Risk a little to learn. Risk a lot and you may never use the lesson.','Every rule you break today becomes tomorrow’s habit.','Size down when you feel sure. Certainty is loudest just before a loss.','Review your mistakes like a coach, not like a critic.','You are not trading to prove yourself right. You are trading to stay in the game.','A calm mind spots the setup. An anxious mind spots the excuse.','Missed a trade? Another will come. Lost your capital? It will not.','Discipline is choosing what you want most over what you want now.','Charges add up quietly. Fewer, better trades keep more of your profit.','Do not trade to get money back. Trade only when the setup is there.','Win streaks need more discipline than losing streaks.','Write the reason before the trade. If you cannot, skip it.','Slow progress with rules beats fast gains with luck.','Rest is part of the strategy. Come back sharp.'];
function sm(m){md=m;var b=document.querySelectorAll('#mode button'),k=['TRADE','NOTRADE','HOLIDAY'];for(var i=0;i<b.length;i++)b[i].className=k[i]===m?'on':'';$('tf').hidden=m!=='TRADE';$('ab').textContent=m==='TRADE'?'Add trade':'Mark day';$('fr').placeholder=m==='TRADE'?'What happened? What will you do differently?':m==='NOTRADE'?'Why did you stay out? (optional)':'Holiday note (optional)'}
function delDay(k){delete S.days[k];save();render()}
function coach(T,td,tn){var dm=S.days[td],o=T.slice().sort(function(a,b){return a.date<b.date?-1:a.date>b.date?1:a.createdAt-b.createdAt}),l=o[o.length-1],r3=o.slice(-3),m;

if(dm)return dm.type==='HOLIDAY'?'Market holiday. Rest, review your journal and come back sharp.':'Staying out is a position too. Well done for protecting your capital.';
if(r3.length===3&&r3.every(function(t){return t.pnl>0}))return'Three wins in a row. This is when overconfidence strikes, so keep your size and your rules exactly the same.';
if(l&&l.pnl<0){m=(l.tags||[]).filter(function(g){return GOOD.indexOf(g)<0})[0];return m?'Your last loss was tagged “'+m+'”. Do not repeat it today.':'Your last trade was a loss. Do not chase it back; wait for a setup that fits your plan.'}
return'Plan the trade, then trade the plan. Skip anything you cannot explain in one line.'}
function vw(v){$('vh').hidden=v!=='H';$('vy').hidden=v==='H';$('t1').className=v==='H'?'on':'';$('t2').className=v==='H'?'':'on';window.scrollTo(0,0)}
function render(){
var T=S.trades,td=ds(new Date()),tn=sum(T.filter(function(t){return t.date===td})),tot=sum(T),tcg=T.filter(function(t){return t.date===td}).reduce(function(s,t){return s+(t.charges||0)},0),chg=T.reduce(function(s,t){return s+(t.charges||0)},0);
$('tb').textContent=eff()==='dark'?'☀️':'🌙';var nw=new Date();$('qt').textContent=QUOTES[Math.floor(Date.UTC(nw.getFullYear(),nw.getMonth(),nw.getDate())/864e5)%QUOTES.length];$('co').textContent=coach(T,td,tn);sm(md);
$('todayLbl').textContent=new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});
var P=S.pastLoss,rec=Math.max(0,tot),rp_=P?Math.min(100,rec/P*100):0;
$('bal').textContent=inr(S.startBalance+tot);
$('bs').textContent=S.startBalance?'Net P&L after charges: '+sg(tot):'Enter your starting balance above to see your account total.';
$('rb').style.width=rp_+'%';
$('rt').textContent=P?(rec>=P?'Fully recovered':rp_.toFixed(0)+'% recovered · '+inr(P-rec)+' to go'):'Enter your previous loss above.';

$('chips').innerHTML=all().map(function(x,i){var c=MIS.indexOf(x)>=0?'m':GOOD.indexOf(x)>=0?'d':'c',xb=c==='c'?'<button type="button" class="x" onclick="rp('+(i-MIS.length-GOOD.length)+')" aria-label="Remove tag">×</button>':'';return'<span class="cw"><button type="button" class="chip '+c+(sel.indexOf(x)>=0?' on':'')+'" onclick="tg('+i+')">'+esc(x)+'</button>'+xb+'</span>'}).join('');
var y=cm.getFullYear(),m=cm.getMonth(),dim=new Date(y,m+1,0).getDate(),off=(cm.getDay()+6)%7,mp={},mt=0,pre=y+'-'+p2(m+1);
T.forEach(function(t){mp[t.date]=(mp[t.date]||0)+t.pnl;if(String(t.date).slice(0,7)===pre)mt+=t.pnl});
$('calT').textContent=cm.toLocaleDateString('en-IN',{month:'long',year:'numeric'})+' · '+sg(mt);
var h=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(function(d){return'<b>'+d+'</b>'}).join(''),i,d,v;
for(i=0;i<off;i++)h+='<div></div>';
for(d=1;d<=dim;d++){var key=pre+'-'+p2(d),dm=S.days[key];v=mp[key];h+='<div class="day'+(v>0?' g':v<0?' r':dm?(dm.type==='HOLIDAY'?' h':' o'):'')+'"><span class="mut">'+d+'</span>'+(v?'<div class="'+(v>0?'g':'r')+'">'+(v>0?'+':'-')+kf(v)+'</div>':dm?'<div class="sub">'+(dm.type==='HOLIDAY'?'Holiday':'Off')+'</div>':'')+'</div>'}
$('cal').innerHTML=h;
var it=T.map(function(t){return{k:'t',d:t.date,c:t.createdAt,t:t}}).concat(Object.keys(S.days).map(function(k){return{k:'d',d:k,c:0,x:S.days[k]}}));
it.sort(function(a,b){return a.d<b.d?1:a.d>b.d?-1:b.c-a.c});
$('list').innerHTML=it.length?it.map(function(e){
if(e.k==='d')return'<div class="t"><div class="th"><b>'+(e.x.type==='HOLIDAY'?'Market holiday':'No-trade day')+'</b><span class="sub">'+esc(e.d)+'</span></div>'+(e.x.note?'<div>'+esc(e.x.note)+'</div>':'')+'<button class="del" data-id="'+esc(e.d)+'" onclick="delDay(this.dataset.id)">Remove</button></div>';
var t=e.t,c=t.charges||0;
return'<div class="t"><div class="th"><b>'+esc(t.ticker)+'</b><b class="'+(t.pnl>=0?'g':'r')+'">'+sg(t.pnl)+'</b></div><div class="tg">'+esc(t.date)+' · '+esc(t.session)+(c?' · gross '+sg(t.gross!=null?t.gross:t.pnl)+', charges '+inr(c):'')+(t.tags&&t.tags.length?' · '+t.tags.map(esc).join(', '):'')+'</div>'+(t.reflection?'<div>'+esc(t.reflection)+'</div>':'')+'<button class="del" data-id="'+esc(t.id)+'" onclick="del(this.dataset.id)">Delete</button></div>'}).join(''):'<p class="mut">Nothing logged yet.</p>'}
fill();render();

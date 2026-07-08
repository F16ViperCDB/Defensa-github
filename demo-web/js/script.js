const canvas=document.getElementById('stage'),ctx=canvas.getContext('2d');
function resize(){canvas.width=canvas.clientWidth;canvas.height=420}
resize();window.addEventListener('resize',resize);

let cx=()=>canvas.width/2,cy=()=>canvas.height/2,running=true;
let count=60,speed=2;
let particles=[];

function initParticles(){
particles=[];
for(let i=0;i<count;i++){
particles.push({
angle:Math.random()*Math.PI*2,
radius:40+Math.random()*(Math.min(canvas.width,600)*0.32),
size:1.5+Math.random()*2.5,
hue:90+Math.random()*220,
dir:Math.random()<0.5?-1:1
});
}
}
initParticles();

function draw(){
ctx.fillStyle='rgba(1,4,9,0.25)';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.beginPath();
ctx.arc(cx(),cy(),8,0,Math.PI*2);
ctx.fillStyle='#39d353';
ctx.shadowColor='#39d353';ctx.shadowBlur=15;
ctx.fill();
ctx.shadowBlur=0;
particles.forEach(p=>{
p.angle+=0.01*speed*p.dir;
const x=cx()+Math.cos(p.angle)*p.radius;
const y=cy()+Math.sin(p.angle)*p.radius*0.55;
ctx.beginPath();
ctx.arc(x,y,p.size,0,Math.PI*2);
ctx.fillStyle=`hsl(${p.hue},85%,65%)`;
ctx.shadowColor=`hsl(${p.hue},85%,65%)`;ctx.shadowBlur=6;
ctx.fill();
});
ctx.shadowBlur=0;
if(running)requestAnimationFrame(draw);
}
draw();

document.getElementById('countRange').addEventListener('input',e=>{
count=+e.target.value;
document.getElementById('countVal').textContent=count;
initParticles();
});
document.getElementById('speedRange').addEventListener('input',e=>{
speed=+e.target.value;
document.getElementById('speedVal').textContent=speed;
});
document.getElementById('toggleBtn').addEventListener('click',e=>{
running=!running;
e.target.textContent=running?'Pausar':'Reanudar';
if(running)draw();
});

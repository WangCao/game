import "./styles/main.scss";
import Bird from './bird';
import handleParticles from './particles';
import {handleObstacles, handleCollisions} from './obstacles';


const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let spacePressed = false; // 按键是否按下
let angle = 0; // 鸟的方向
let hue = 0; // 红色 绿色 蓝色之间循环
let frame = 0; // 帧数 
let score = 0; // 分数
let gamespeed = 2; // 移动障碍物，粒子背景  使其有视察效果

let temp = canvas.height - 90;
let brid = new Bird(canvas);

const gradient = ctx.createLinearGradient(0,0,0,70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');


function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleObstacles(frame, canvas, hue, gamespeed, brid,(()=> {
    score++;
  }).bind(this));


  brid.update(spacePressed, angle);
  brid.draw();

  ctx.fillStyle = gradient;
  ctx.font = "90px 微软雅黑";
  ctx.strokeText(score,450,70);
  ctx.fillText(score,450,70);


  handleParticles(brid, canvas, gamespeed, hue);
  if (handleCollisions(brid, canvas, score)) return;
  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;        
  frame++;          
}
animate();

window.addEventListener('keydown', function(e) {
  console.log(e.code); 
  if (e.code === 'Space') spacePressed = true;
})

window.addEventListener('keyup', function(e) { 
  if (e.code === 'Space') spacePressed = false;
})


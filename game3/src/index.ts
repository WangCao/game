import "./styles/main.scss";

const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 600;

// global variables 全局变量
const cellSize = 100; // 游戏网格
const cellGap = 3;
const gameGrid:Cell[] = [];

// end

interface Pos {
  x: number | undefined,
  y: number | undefined,
  width: number,
  height: number,
} 



const mouse:Pos = {
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1
}

// getBoundingClientRect 返回元素的大小及相对于视口的位置
const canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
})

canvas.addEventListener("mouseleave", function(e) {
  mouse.x = undefined;
  mouse.y = undefined;
})


// 游戏面板
const controlsBar = {
  width: canvas.width,
  height: cellSize
}
class Cell {
  x: any;
  y: any;
  width: number;
  height: number;
  constructor(x: number,y: number) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }
  draw() {
    if (!ctx) return;
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

function createGrid() {
  for(let y = cellSize; y < canvas.height; y += cellSize) {
    for(let x = 0; x < canvas.width; x += cellSize) {
      gameGrid.push(new Cell(x, y));
    }
  }
}

createGrid();

function handleGameGrid() {
  for(let i = 0; i < gameGrid.length; i++) {
    gameGrid[i].draw();
  }
}
// end


function animate() {
  if (!ctx) return;
  ctx.fillStyle = "blue";
  ctx.fillRect(0,0,controlsBar.width, controlsBar.height);
  handleGameGrid();
  requestAnimationFrame(animate);
}

animate();

function collision< T extends Pos>(first: T, second: T):boolean | null {
  if (!first.x || !first.y || !second.x || !second.y) {
    return null;
  }
  if ( !(
    first.x > second.x + second.width ||
    first.x + first.width  < second.x ||
    first.y > second.y + second.height || 
    first.y + first.height < second.y
  )) {
    return true;
  }else {
    return false;
  }
}
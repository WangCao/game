import Game from "./Game";
import "./styles/main.scss"

async function run() {
  const canvasEl = document.getElementById("canvas") as HTMLCanvasElement | undefined
  if (canvasEl == null) {
    console.log("没有发现canvas标签")
    return;
  }

  const game = new Game(canvasEl);
  game.run();
}

run()
// 障碍物

const obstaclesArray = [];

class Obstacle {
	constructor(canvas, hue) {
		this.top = (Math.random() * canvas.height) / 3;
		this.bottom = (Math.random() * canvas.height) / 3;
		this.x = canvas.width;
		this.width = 20;
		this.color = `hsla(${hue}, 100%, 50%, 1)`;

		this.canvas = canvas;
    this.counted = false;
		this.ctx = canvas.getContext("2d");
	}

	draw() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, 0, this.width, this.top);
		this.ctx.fillRect(
			this.x,
			this.canvas.height - this.bottom,
			this.width,
			this.bottom
		);
	}

	update(gamespeed,brid, pass) {
		this.x -= gamespeed;
    if (!this.counted && this.x < brid.x) {
      pass();
      this.counted = true;
    }
		this.draw();
	}
}

export function handleObstacles(frame, canvas, hue, gamespeed, brid,pass) {
	if (frame % 50 === 0) {
		// unshift 将一个或者多个元素添加到数组的开头，并且返回该数组的长度，该方法会修改原来数组
		obstaclesArray.unshift(new Obstacle(canvas, hue));
	}
	for (let i = 0; i < obstaclesArray.length; i++) {
		obstaclesArray[i].update(gamespeed, pass);
	}
	if (obstaclesArray.length > 20) {
		// pop 删除数组中最后一个元素，并且返回该元素的值，该方法会修改原来数组
		obstaclesArray.pop(obstaclesArray[0]);
	}
}

const bang = new Image();
bang.src = "./images/bang.png";

export function handleCollisions(brid, canvas, score) {
	let ctx = canvas.getContext("2d");
	for (let i = 0; i < obstaclesArray.length; i++) {
		if (
			brid.x < obstaclesArray[i].x + obstaclesArray[i].width &&
			brid.x + brid.width > obstaclesArray[i].x &&
			((brid.y < 0 + obstaclesArray[i].top && brid.y + brid.height > 0) ||
				(brid.y > canvas.height - obstaclesArray[i].bottom &&
					brid.y + brid.height < canvas.height))
		) {
			ctx.drawImage(bang, brid.x, brid.y, 50, 50);
			ctx.font = "25px";
			ctx.fillStyle = "black";
			ctx.fillText("游戏结束，你的得分：" + score, 160, canvas.height / 2 - 10);
			return true;
		}
	}
}

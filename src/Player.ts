import Sprite from "./Sprite";
import { GameData } from "./types";
import Utils from "./Utils";

class Player {
    private _sprites: { [direction: string]: Sprite } = {};
    private _xPos: number = 0;
    private _yPos: number = 0;
    private _width: number = 0;
    private _height: number = 0;
    private _speed: number = 200;
    private _velX: number = 0;
    private _velY: number = 0;

    public async setup() {
        const imageF = await Utils.loadImgFromUrl("./images/player_f00.png");
        const imageB = await Utils.loadImgFromUrl("./images/player_b00.png");
        const imageR = await Utils.loadImgFromUrl("./images/player_r00.png");


        this._sprites = {
            forward: new Sprite(imageF),
            backward: new Sprite(imageB),
            right: new Sprite(imageR),
            left: new Sprite(imageR, { flippedX: true }),
        }

        this._width = 64;
        this._height = 128;
    }

    public render(gameData: GameData, timespacing: number) {
        this._velX = 0;
        this._velY = 0;
        const { keyListener } = gameData;
        if (keyListener.isAnyKeyDown(["d", "ArrowRight"])) {
            this._velX = this._speed * timespacing
        } else if (keyListener.isAnyKeyDown(["a", "ArrowLeft"])) {
            this._velX = -this._speed * timespacing
        }

        if (keyListener.isAnyKeyDown(["w", "ArrowUp"])) {
            this._velY = -this._speed * timespacing
        } else if (keyListener.isAnyKeyDown(["s", "ArrowDown"])) {
            this._velY = this._speed * timespacing
        }

        this._xPos += this._velX;
        this._yPos += this._velY;

        this._getMovingSprite().render(gameData, this._xPos, this._yPos, this._width, this._height);
    }

    private _getMovingSprite(): Sprite {
        if (this._velX > 0) return this._sprites["right"];
        if (this._velX < 0) return this._sprites["left"];
        if (this._velY < 0) return this._sprites["backward"];
        return this._sprites["forward"];
    }
}

export default Player;
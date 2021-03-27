import { GameData } from "./types";

class GameMap {
    private _tileImage: HTMLImageElement;
    private _width: number;
    private _height: number;

    constructor(tileImage: HTMLImageElement, width: number, height: number) {
        this._tileImage = tileImage;
        this._width = width;
        this._height = height;
    }

    render({ context }: GameData) {
        const tileSize = 64;
        const tileCountX = Math.ceil(this._width / tileSize);
        const tileCountY = Math.ceil(this._height / tileSize);

        for (let y = 0; y < tileCountY; y++) {
            for (let x = 0; x < tileCountX; x++) {
                context.drawImage(this._tileImage, tileSize * x, tileSize * y, tileSize, tileSize);
            }
        }
    }
}

export default GameMap;
import { GameData } from "./types";

class Sprite {
    private _image: HTMLImageElement
    private _flippedX: boolean

    constructor(image: HTMLImageElement, { flippedX = false }: { flippedX?: boolean } = {}) {
        this._image = image;
        this._flippedX = flippedX;
    }

    public render({ context }: GameData, x: number, y: number, width: number, height: number) {
        let renderx = x;
        if (this._flippedX) {
            context.save();
            context.scale(-1, 1);
            renderx = -(x + width);
        }
        context.drawImage(this._image, renderx, y, width, height);
        if (this._flippedX) {
            context.restore();
        }
    }
}

export default Sprite;
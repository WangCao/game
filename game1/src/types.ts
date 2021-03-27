import KeyListener from "./KeyListener";

export interface GameData {
    context: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    keyListener: KeyListener
}
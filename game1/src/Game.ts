import GameLoop from "./GameLoop";
import GameMap from "./GameMap";
import KeyListener from "./KeyListener";
import Player from "./Player";
import { GameData } from "./types";
import Utils from "./Utils";

class Game {
    private _canvasEl: HTMLCanvasElement;
    private _gameData: GameData | null = null;

    private _map: GameMap | null = null;
    private _player: Player | null = null;

    constructor(canvasEl: HTMLCanvasElement) {
        this._canvasEl = canvasEl;
        let context = canvasEl.getContext("2d");
        if (!context) {
            console.error("canvas上下文创建失败")
            return;
        }
        this._gameData = {
            context,
            canvasWidth: canvasEl.width,
            canvasHeight: canvasEl.height,
            keyListener: new KeyListener()
        }
    }

    public async run() {
        await this.setup();
        const loop = new GameLoop(this._loop.bind(this));
        loop.run();
    }

    public async setup() {
        if (!this._gameData) {
            console.error("游戏数据创建失败")
            return;
        }
        this._gameData.keyListener.setup();

        const img = await Utils.loadImgFromUrl("./images/bg.png");
        this._map = new GameMap(img, this._gameData.canvasWidth, this._gameData.canvasHeight);

        this._player = new Player();
        await this._player.setup();
    }

    private _loop(spacing: number) {
        if (!this._map) {
            console.error("map实例未设定")
            return;
        }
        if (!this._player) {
            console.error("任务没初始化")
            return;
        }
        if (!this._gameData) {
            console.error("游戏数据创建失败")
            return;
        }

        this._map.render(this._gameData);
        this._player.render(this._gameData, spacing)
    }
}

export default Game;

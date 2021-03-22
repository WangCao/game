import Utils from "./Utils";

type GameLoopFunction = (timeSpacing: number) => void;

class GameLoop {
    private _loopFunction: GameLoopFunction;
    private _lastTime: number | null = null;

    constructor(loopFunction: GameLoopFunction) {
        this._loopFunction = loopFunction;
    }

    public run() {
        this._lastTime = Utils.getTimeStamp();
        window.requestAnimationFrame(this._loop.bind(this));
    }
    private _loop() {
        if (!this._lastTime) {
            console.error("上一帧时间未设定");
            return;
        }
        if (!this._loopFunction) {
            console.error("未设置loop回调函数");
            return;
        }

        const currentTime = Utils.getTimeStamp();
        // 时间间距，单位秒
        const spacing: number = (currentTime - this._lastTime) / 1000;
        this._lastTime = currentTime;
        this._loopFunction(spacing);

        window.requestAnimationFrame(this._loop.bind(this));
    }
}

export default GameLoop;
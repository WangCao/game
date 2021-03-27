class KeyListener {
    private _keyStates: { [key: string]: boolean } = {};

    constructor() {

    }

    public setup(): void {
        document.addEventListener("keydown", e => {
            e.preventDefault();
            this._keyStates[e.key] = true;
        })
        document.addEventListener("keyup", e => {
            e.preventDefault();
            this._keyStates[e.key] = false;
        })
    }

    public isKeyDown(key: string): boolean {
        return this._keyStates[key] === true;
    }

    public isAnyKeyDown(keys: string[]): boolean {
        return keys.some(key => this.isKeyDown(key));
    }
}

export default KeyListener;
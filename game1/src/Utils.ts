class Utils {
    public static loadImgFromUrl(url: string): Promise<HTMLImageElement> {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => {
                resolve(img);
            };
            img.src = url;
        })
    }
    public static getTimeStamp(): number {
        return (new Date()).getTime();
    }
}

export default Utils;

export default class AudioPlayer extends Audio {
    constructor() {
        super();
        this._key = undefined;
        this._playHandler = function() {};
        this._pauseHandler = function() {};
    }

    functional(fun) {
        if (fun && typeof fun == 'function') {
            return fun
        } else {
            return function() {}
        }
    }

    // key 当key不变时，认为src可不变，key改变时，src必须替换，来重新加载音频
    // key的意义还在于当src为相对路径时，audio在获取资源后的src会发生更改，使用key来表示同样的audio
    continue(src, playHandler, pauseHandler, key) {
        console.log('current audio:', key, this._key, src, this.src, this.paused);
        if ((key && key == this._key) || src == this.src) { // src不需要更新
            if(this.paused) { // 暂停时播放
                this.play();
                this._playHandler();
            } else { // 播放时暂停
                this.pause();
                this._pauseHandler();
            }
        } else {
            this.src = src;
            this._key = key;
            if (playHandler && typeof playHandler == 'function') {
                this._playHandler = playHandler;
            }
            if (pauseHandler && typeof pauseHandler == 'function') {
                this._pauseHandler = pauseHandler;
            }
            this.addEventListener('loadeddata', (e) => {
                this.play();
                this._playHandler();
            })
            this.addEventListener('ended', () => {
                this.currentTime = 0;
                this.pause();
                this._pauseHandler();
            })
        }
    }


    // 主动关闭当前音频
    suspend() {
        this.pause();
        this._pauseHandler();
    }
}
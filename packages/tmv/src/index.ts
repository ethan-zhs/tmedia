import Player from './components/Player'
import window from './global/window'
import './index.less'

class Tmv {
    options_: any

    player_: any

    media_: any

    constructor(options: any = {}) {
        this.options_ = options
    }

    /**
     * 连接媒体元素
     *
     * @param {HTMLVideoElement} video 媒体元素
     */
    attachMedia(video: any) {
        this.media_ = video.cloneNode()
        this.player_ = new Player(this.media_, this.options_)
        this.player_.attachMedia(video)
    }

    /**
     * 加载/解析视频
     *
     */
    load() {
        this.player_.load()
    }

    /**
     * 播放视频
     *
     */
    play() {
        this.player_.play()
    }

    /**
     * 监听media事件
     *
     * @param {String} eventName 事件类型
     * @param {Func} cb 回调函数
     */
    on(eventName: string, cb: any) {
        this.media_.addEventListener(eventName, cb)
    }

    /**
     * 获得媒体元素
     *
     * @return {HTMLVideoElement}
     */
    media() {
        return this.media_
    }

    /**
     * 销毁视频解析器
     *
     */
    destroy() {
        this.player_.destroy()
    }
}

window.Tmv = Tmv

export default Tmv

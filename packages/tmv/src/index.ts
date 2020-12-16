import Player from './components/Player'
import window from './global/window'
import './index.less'

class Tmv {
    options_: any

    player_: any

    video_: any

    constructor(options: any = {}) {
        this.options_ = options
    }

    attachMedia(video: any) {
        this.video_ = video.cloneNode()
        this.player_ = new Player(this.video_, this.options_)
        this.player_.attachMedia(video)
    }

    load() {
        this.player_.load()
    }

    play() {
        this.player_.play()
    }

    on(eventName: string, cb: any) {
        this.video_.addEventListener(eventName, cb)
    }

    video() {
        return this.video_
    }
}

window.Tmv = Tmv

export default Tmv

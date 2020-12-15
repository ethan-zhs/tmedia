import Player from './components/Player'
import window from './global/window'
import './index.less'

class Tmv {
    options_: any

    player_: any

    constructor(options: any = {}) {
        this.options_ = options
    }

    attachMedia(video: any) {
        const video_ = video.cloneNode()
        this.player_ = new Player(video_, this.options_)
        this.player_.attachMedia(video)
    }

    load() {
        this.player_.load()
    }

    play() {
        this.player_.play()
    }
}

window.Tmv = Tmv

export default Tmv

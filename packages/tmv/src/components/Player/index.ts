import Component from '../Component'
import Controls from '../Controls'
import Error from '../Error'
import { videoInitialize } from '../../utils'

import './index.less'

class Player extends Component {
    constructor(player: any, options: any = {}) {
        super(player, Object.assign({}, options, { state: {} }))
    }

    attachMedia(video: any) {
        this.addClass('tmv-video-wrapper')

        this.player_.controls = false
        this.player_.src = this.options_.src || this.player_.src
        this.addClass('tmv-video', this.player_)

        this.appendContent(this.player_)

        video.parentNode?.replaceChild(this.el(), video)

        const controls = new Controls(this.player_, this.options_)

        this.appendContent(controls.el())
        this.on(this.player_, 'error', this.mediaError)
    }

    load() {
        const { type, autoPlay = false } = this.options_

        this.player_ && this.player_.load()

        videoInitialize({ type, autoPlay, video: this.player_ }, (err: any) => {
            console.log(err)
            this.mediaError()
        })
    }

    play() {
        this.player_ && this.player_.play()
    }

    mediaError = () => {
        const error = new Error(this.player_, this.options_)
        error.render('NETWORK_ERROR')

        this.appendContent(error.el())
    }
}

export default Player

import Component from '../Component'

import './index.less'

class NextVideo extends Component {
    constructor(player: any, option: any = {}) {
        super(player, option)

        this.render()
    }

    render() {
        this.addClass('tmv-next-video-btn')
        this.html(`
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
            <path class="tmv-svg-fill" d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z"></path>
        </svg>`)

        const { toNextVideo } = this.options_

        this.on(this.el(), 'click', () => {
            toNextVideo && toNextVideo()
        })

        if (!toNextVideo) {
            this.addClass('tmv-svg-btn-disable')
        }
    }
}

Component.registerComponent('NextVideo', NextVideo)

export default NextVideo

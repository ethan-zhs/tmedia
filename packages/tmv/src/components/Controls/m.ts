import Progress from '../Progress'
import Loading from '../Loading'
import Component from '../Component'

import '../NextVideo'
import '../FullScreen'
import '../Timer'

class MobileControls extends Component {
    _isProgressSliding: false

    _controls: null

    isVisible: boolean

    constructor(player: any, options: any = {}) {
        super(player, options)

        this.addClass('tmv-m-controls')
        this.on(this.el(), 'click', this.handleVideoPlay)

        const controlsBar = this.createEl('div', { class: 'tmv-m-controls-bar-box' })
        this.appendContent(controlsBar)

        this.initChildren(['NextVideo', 'Timer', 'Fullscreen'], controlsBar)
    }

    handleVideoPlay = (e: any) => {
        e && e.stopPropagation()
        const paused = this.player_.paused
        paused ? this.player_.play() : this.player_.pause()
    }

    toggleControls(visible: boolean) {
        if (visible) {
            this.removeClass('tmv-m-controls-hide')
        } else {
            this.addClass('tmv-m-controls-hide')
        }
        this.isVisible = visible
    }

    handleMackClick() {
        this.toggleControls(!this.isVisible)
        this.clearTimer()

        if (this.isVisible) {
            this.setTimer(() => {
                this.toggleControls(false)
                this.clearTimer()
            }, 4000)
        }
    }
}

Component.registerComponent('MobileControls', MobileControls)

export default MobileControls

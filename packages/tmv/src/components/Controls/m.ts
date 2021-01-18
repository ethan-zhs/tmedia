import Component from '../Component'

import '../PlayBtn'
import '../FullScreen'
import '../Timer'
import '../Progress'
import '../BigPlayBtn'

class MobileControls extends Component {
    controlsWrapper_: any

    isVisible_: boolean

    constructor(player: any, options: any = {}) {
        super(player, options)

        this.render()
    }

    toggleControls = (visible: boolean) => {
        if (visible) {
            this.removeClass('tmv-m-controls-hide', this.controlsWrapper_)
        } else {
            !this.player_.paused && this.addClass('tmv-m-controls-hide', this.controlsWrapper_)
        }
        this.isVisible_ = visible
    }

    handleMarkClick = (visible?: boolean) => {
        this.toggleControls(visible || !this.isVisible_)
        this.clearTimer()

        if (this.isVisible_) {
            this.setTimer(() => {
                this.toggleControls(false)
                this.clearTimer()
            }, 4000)
        }
    }

    render() {
        this.addClass('tmv-m-controls')

        this.controlsWrapper_ = this.createEl('div', { class: 'tmv-m-controls-bar-box' })
        const controlsBar = this.createEl('div', { class: 'tmv-m-controls-bar' })

        this.appendContent(this.controlsWrapper_)
        this.appendContent(controlsBar, this.controlsWrapper_)
        // this.initChildren(['BigPlayBtn'], this.controlsWrapper_)
        this.initChildren(['PlayBtn', 'Timer', 'Progress', 'Fullscreen'], controlsBar)

        this.on(this.player_, 'play', () => this.handleMarkClick(true))

        // 播放结束显示播放器控件
        this.on(this.player_, 'ended', () => this.toggleControls(true))

        this.on(this.el(), 'click', () => this.handleMarkClick())
        this.on(controlsBar, 'click', (e: any) => e.stopPropagation())
    }
}

Component.registerComponent('MobileControls', MobileControls)

export default MobileControls

import Component from '../Component'

import '../NextVideo'
import '../FullScreen'
import '../Timer'
import '../Progress'
import '../Title'
import '../Setting'
import '../Volume'
import '../PlayBtn'
import '../PlaybackRate'
import '../Definition'

class PCControls extends Component {
    isProgressSliding_: false

    controlsWrapper_: any

    constructor(player: any, options: any = {}) {
        super(player, options)

        this.addClass('tmv-controls')

        this.controlsWrapper_ = this.createEl('div', { class: 'tmv-controls-wrapper' })
        const controlsBar = this.createEl('div', { class: 'tmv-controls-bar' })
        const controlsComs = this.createEl('div', { class: 'tmv-controls-coms' })

        this.on(controlsBar, 'click', (e: any) => e.stopPropagation())
        this.on(controlsBar, 'dblclick', (e: any) => e.stopPropagation())

        this.appendContent(this.controlsWrapper_)
        this.appendContent(controlsBar, this.controlsWrapper_)
        this.initChildren(['Progress'], controlsBar)
        this.appendContent(controlsComs, controlsBar)
        this.initChildren(
            ['PlayBtn', 'NextVideo', 'Timer', 'Title', 'Definition', 'PlaybackRate', 'Volume', 'Setting', 'Fullscreen'],
            controlsComs
        )
        this.render()
    }

    initControlMarkEvents = () => {
        this.on(this.el(), 'mousemove', this.showControls)

        this.on(this.el(), 'mouseleave', this.hideControls)

        // 播放结束显示播放器控件
        this.on(this.player_, 'ended', this.showControls)

        // 单击派发视频点击事件
        this.on(this.el(), 'click', () => {
            const clickEvent = document.createEvent('MouseEvents')
            clickEvent.initEvent('click', true, true)
            this.player_.dispatchEvent(clickEvent)
        })

        // 双击派发视频双击事件
        this.on(this.el(), 'dblclick', () => {
            const clickEvent = document.createEvent('MouseEvents')
            clickEvent.initEvent('dblclick', true, true)
            this.player_.dispatchEvent(clickEvent)
        })
    }

    showControls = () => {
        this.removeClass('tmv-controls-hide', this.controlsWrapper_)
        this.clearTimer()

        this.setTimer(() => {
            this.hideControls()
        }, 3000)
    }

    hideControls = () => {
        !this.player_.paused && this.addClass('tmv-controls-hide', this.controlsWrapper_)
        this.clearTimer()
    }

    render() {
        this.showControls()
        this.initControlMarkEvents()
    }
}

Component.registerComponent('PCControls', PCControls)

export default PCControls

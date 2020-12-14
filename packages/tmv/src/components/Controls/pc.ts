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
    _isProgressSliding: false

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
        this.on(this.el(), 'click', () => {
            const clickEvent = document.createEvent('MouseEvents')
            clickEvent.initEvent('click', true, true)
            this.player_.dispatchEvent(clickEvent)
        })

        this.on(this.el(), 'mousemove', () => {
            this.removeClass('tmv-controls-hide', this.controlsWrapper_)
            this.clearTimer()

            this.setTimer(() => {
                !this.player_.paused && this.addClass('tmv-controls-hide', this.controlsWrapper_)
                this.clearTimer()
            }, 3000)
        })

        this.on(this.el(), 'mouseleave', () => {
            !this.player_.paused && this.addClass('tmv-controls-hide', this.controlsWrapper_)
            this.clearTimer()
        })

        this.on(this.el(), 'dblclick', () => {
            const clickEvent = document.createEvent('MouseEvents')
            clickEvent.initEvent('dblclick', true, true)
            this.player_.dispatchEvent(clickEvent)
        })
    }

    render() {
        this.initControlMarkEvents()
    }
}

Component.registerComponent('PCControls', PCControls)

export default PCControls

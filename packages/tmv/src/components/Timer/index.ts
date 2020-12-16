import { timeFormat } from '../../utils'
import Component from '../Component'

import './index.less'

class Timer extends Component {
    constructor(player: any, options: any = {}) {
        super(player, options)

        this.render()
    }

    render() {
        this.addClass('tmv-controls-time')
        const currTime = this.createEl('span', { class: 'tmv-time-currtime' })
        const separator = this.createEl('span', { class: 'tmv-time-separator' })
        const duration = this.createEl('span', { class: 'tmv-time-duration' })
        const liveBadge = this.createEl('span', { class: 'tmv-live-badge' })

        this.on(this.player_, 'timeupdate', () => {
            currTime.innerHTML = timeFormat(this.player_.currentTime)
        })

        this.on(this.player_, 'durationchange', () => {
            const isLive = !this.player_.duration || this.player_.duration === Infinity

            this.appendContent(currTime)
            currTime.innerHTML = timeFormat(0)

            if (isLive) {
                this.appendContent(liveBadge)
            } else {
                separator.innerHTML = '/'
                this.appendContent(separator)

                duration.innerHTML = timeFormat(isLive ? 0 : this.player_.duration)
                this.appendContent(duration)
            }
        })
    }
}

Component.registerComponent('Timer', Timer)

export default Timer

import { timeFormat } from '../../utils/tools'
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
        const separator = this.createEl('span', { class: 'tmv-time-separator tmv-hide' })
        const duration = this.createEl('span', { class: 'tmv-time-duration tmv-hide' })
        const liveBadge = this.createEl('span', { class: 'tmv-live-badge tmv-hide' })

        this.appendContent([currTime, separator, duration, liveBadge])
        currTime.innerHTML = timeFormat(0)

        this.on(this.player_, 'timeupdate', () => {
            // 节流，防止频繁更新dom
            const newTime = timeFormat(this.player_.currentTime)
            if (newTime !== currTime.innerHTML) {
                currTime.innerHTML = newTime
            }
        })

        this.on(this.player_, 'durationchange', () => {
            const isLive = this.player_.isLive || this.player_.duration === Infinity

            separator.innerHTML = '/'
            duration.innerHTML = timeFormat(isLive ? 0 : this.player_.duration)
            liveBadge.innerHTML = '直播'

            if (isLive) {
                this.addClass('tmv-hide', separator)
                this.addClass('tmv-hide', duration)
                this.removeClass('tmv-hide', liveBadge)
            } else {
                this.player_.duration && this.removeClass('tmv-hide', separator)
                this.player_.duration && this.removeClass('tmv-hide', duration)
                this.addClass('tmv-hide', liveBadge)
            }
        })
    }
}

Component.registerComponent('Timer', Timer)

export default Timer

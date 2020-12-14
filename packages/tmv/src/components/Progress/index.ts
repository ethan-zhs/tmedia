import { timeFormat } from '../../utils'
import Component from '../Component'

import './index.less'

class Progress extends Component {
    _video: any
    _isLive: boolean
    _historyPauseStatus: boolean
    _progressHoverElem: any
    _progressBufferElem: any
    _progressBarElem: any
    _progressPointElem: any
    _progressTimeElem: any

    constructor(player: any, options: any = {}) {
        super(player, options)

        this.render()
    }

    handleProgressChange() {
        this.player_.addEventListener('timeupdate', () => {
            if (!this._isLive) {
                const timeRange = this.player_.buffered

                this._progressBufferElem.style.width = `${
                    timeRange.length > 0 ? (timeRange.end(timeRange.length - 1) / this.player_.duration) * 100 : 0
                }%`

                this._progressBarElem.style.width = `${(this.player_.currentTime / this.player_.duration) * 100}%`
                this._progressPointElem.style.transform = `translate(${this._progressBarElem.clientWidth}px ,-50%)`
            }
        })

        this.player_.addEventListener('durationchange', () => {
            this._isLive = !this.player_.duration || this.player_.duration === Infinity
        })
    }

    progressMove = (e: any) => {
        const pos: any = this.getProgressPos(e.pageX)

        this._progressHoverElem.style.width = `${pos.percent * 100}%`
        this._progressTimeElem.style.left = `${pos.hoveredTimePos}px`
        this._progressTimeElem.innerHTML = timeFormat(pos.percent * this.player_.duration)
    }

    slideStart = () => {
        // 为了更好的体验，在移动触点的时候我选择将视频暂停
        this._historyPauseStatus = this.player_.paused
        this.player_.pause()
        // this.progressSlidingChange(true)

        document.addEventListener('mousemove', this.slideMoveOrClick, false)
        document.addEventListener('mouseup', this.slideEnd, false)
        document.addEventListener('touchmove', this.slideMoveOrClick, false)
        document.addEventListener('touchend', this.slideEnd, false)
    }

    slideMoveOrClick = (e: any) => {
        e.stopPropagation()
        const pageX = e.pageX || e.targetTouches[0].pageX

        const pos: any = this.getProgressPos(pageX)

        this.player_.currentTime = pos.percent * this.player_.duration

        this._progressBarElem.style.width = `${pos.percent * 100}%`
        this._progressTimeElem.style.left = `${pos.hoveredTimePos}px`
        this._progressPointElem.style.transform = `translate(${this._progressBarElem.clientWidth}px ,-50%)`
    }

    slideEnd = () => {
        // this.progressSlidingChange(false)
        document.removeEventListener('mousemove', this.slideMoveOrClick, false)
        document.removeEventListener('mouseup', this.slideEnd, false)
        document.removeEventListener('touchmove', this.slideMoveOrClick, false)
        document.removeEventListener('touchend', this.slideEnd, false)

        // 拖动进度条结束时，恢复播放状态
        !this._historyPauseStatus && this.player_.play()
    }

    getProgressPos(pageX: number) {
        try {
            const progressElem = this.el().querySelector('.tmv-progress-base')
            const progressTimeElem = this.el().querySelector('.tmv-progress-time')
            const maxWidth = progressElem.clientWidth
            const { left } = progressElem.getBoundingClientRect()

            let mx = pageX - left - document.documentElement.scrollLeft // 滑动的距离
            mx = mx > maxWidth ? maxWidth : mx < 0 ? 0 : mx

            const phtw = progressTimeElem.offsetWidth

            // 鼠标悬浮时间模块位置计算
            let hoveredTimePos = mx - phtw / 2

            if (mx - phtw / 2 < 0) {
                hoveredTimePos = 0
            } else if (mx + phtw > maxWidth) {
                hoveredTimePos = maxWidth - phtw
            }

            const percent = mx / maxWidth

            return {
                percent,
                hoveredTimePos
            }
        } catch (err) {}
    }

    render(progressSlidingChange?: (isSliding: boolean) => void) {
        this.addClass('tmv-controls-progress-bar')
        const progressBase = this.createEl('div', { class: 'tmv-progress-base' })
        this._progressHoverElem = this.createEl('div', { class: 'tmv-progress-hover' })
        this._progressBufferElem = this.createEl('div', { class: 'tmv-progress-buffer' })
        this._progressBarElem = this.createEl('div', { class: 'tmv-progress' })
        this._progressPointElem = this.createEl('div', { class: 'tmv-progress-point' })
        this._progressTimeElem = this.createEl('div', { class: 'tmv-progress-time' })

        this.appendContent(this._progressHoverElem, progressBase)
        this.appendContent(this._progressBufferElem, progressBase)
        this.appendContent(this._progressBarElem, progressBase)
        this.appendContent(progressBase)
        this.appendContent(this._progressPointElem)
        this.appendContent(this._progressTimeElem)

        // this.progressSlidingChange = progressSlidingChange

        this.on(this.el(), 'mousemove', this.progressMove)
        this.on(this.el(), 'click', this.slideMoveOrClick)
        this.on(this._progressPointElem, 'mousedown', this.slideStart)
        this.on(this._progressPointElem, 'touchstart', this.slideStart)

        this.handleProgressChange()
    }
}

Component.registerComponent('Progress', Progress)

export default Progress

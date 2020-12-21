import { timeFormat } from '../../utils/tools'
import Component from '../Component'

import './index.less'

class Progress extends Component {
    isLive_: boolean
    historyPauseStatus_: boolean
    progressHoverElem_: any
    progressBufferElem_: any
    progressBarElem_: any
    progressPointElem_: any
    progressTimeElem_: any

    constructor(player: any, options: any = {}) {
        super(player, options)

        this.render()
    }

    /**
     * 监听video timeupdate / durationchange事件
     * 改变进度条状态
     */
    handleProgressChange = () => {
        this.player_.addEventListener('timeupdate', () => {
            if (!this.isLive_) {
                const timeRange = this.player_.buffered

                this.progressBufferElem_.style.width = `${
                    timeRange.length > 0 ? (timeRange.end(timeRange.length - 1) / this.player_.duration) * 100 : 0
                }%`

                this.progressBarElem_.style.width = `${(this.player_.currentTime / this.player_.duration) * 100}%`
                this.progressPointElem_.style.transform = `translate(${this.progressBarElem_.clientWidth}px ,-50%)`
            }
        })

        this.player_.addEventListener('durationchange', () => {
            this.isLive_ = this.player_.isLive || !this.player_.duration || this.player_.duration === Infinity

            if (this.isLive_) {
                this.html('<div class="tmv-progress-base"></div>')
            }
        })
    }

    /**
     * 鼠标相对进度条悬停移动
     *
     */
    progressMove = (e: any) => {
        const pos: any = this.getProgressPos(e.pageX)

        this.progressHoverElem_.style.width = `${pos.percent * 100}%`
        this.progressTimeElem_.style.left = `${pos.hoveredTimePos}px`
        this.progressTimeElem_.innerHTML = timeFormat(pos.percent * this.player_.duration)
    }

    /**
     * 拖动开始
     *
     */
    slideStart = () => {
        // 为了更好的体验，在移动触点的时候我选择将视频暂停
        this.historyPauseStatus_ = this.player_.paused
        this.player_.pause()
        this.setState({ isProgressSliding: true })

        document.addEventListener('mousemove', this.slideMoveOrClick, false)
        document.addEventListener('mouseup', this.slideEnd, false)
        document.addEventListener('touchmove', this.slideMoveOrClick, false)
        document.addEventListener('touchend', this.slideEnd, false)
    }

    /**
     * 点击或拖动触发进度条改变
     *
     */
    slideMoveOrClick = (e: any) => {
        // 直播不触发进度条点击事件
        if (this.isLive_) {
            return
        }

        e.stopPropagation()
        const pageX = e.pageX || e.targetTouches[0].pageX

        const pos: any = this.getProgressPos(pageX)

        this.player_.currentTime = pos.percent * this.player_.duration

        this.progressBarElem_.style.width = `${pos.percent * 100}%`
        this.progressTimeElem_.style.left = `${pos.hoveredTimePos}px`
        this.progressPointElem_.style.transform = `translate(${this.progressBarElem_.clientWidth}px ,-50%)`
    }

    /**
     * 拖动结束
     *
     */
    slideEnd = () => {
        this.setState({ isProgressSliding: false })
        document.removeEventListener('mousemove', this.slideMoveOrClick, false)
        document.removeEventListener('mouseup', this.slideEnd, false)
        document.removeEventListener('touchmove', this.slideMoveOrClick, false)
        document.removeEventListener('touchend', this.slideEnd, false)

        // 拖动进度条结束时，恢复播放状态
        !this.historyPauseStatus_ && this.player_.play()
    }

    /**
     * 获得播放进度条位置相关信息
     *
     * @param {Number} pageX 鼠标位置
     */
    getProgressPos = (pageX: number) => {
        try {
            const maxWidth = this.el().clientWidth
            const { left } = this.el().getBoundingClientRect()

            let mx = pageX - left - document.documentElement.scrollLeft // 滑动的距离
            mx = mx > maxWidth ? maxWidth : mx < 0 ? 0 : mx

            const phtw = this.progressTimeElem_.offsetWidth

            // 鼠标悬浮时间模块位置计算
            let hoveredTimePos = mx - phtw / 2

            if (mx - phtw / 2 < 0) {
                hoveredTimePos = 0
            } else if (mx + phtw > maxWidth) {
                hoveredTimePos = maxWidth - phtw
            }

            const percent = mx / maxWidth

            return {
                percent, // 播放进度百分比
                hoveredTimePos // 鼠标悬停相对进度条位置
            }
        } catch (err) {}
    }

    render() {
        this.addClass('tmv-controls-progress-bar')
        const progressBase = this.createEl('div', { class: 'tmv-progress-base' })
        this.progressHoverElem_ = this.createEl('div', { class: 'tmv-progress-hover' })
        this.progressBufferElem_ = this.createEl('div', { class: 'tmv-progress-buffer' })
        this.progressBarElem_ = this.createEl('div', { class: 'tmv-progress' })
        this.progressPointElem_ = this.createEl('div', { class: 'tmv-progress-point' })
        this.progressTimeElem_ = this.createEl('div', { class: 'tmv-progress-time' })

        this.appendContent(this.progressHoverElem_, progressBase)
        this.appendContent(this.progressBufferElem_, progressBase)
        this.appendContent(this.progressBarElem_, progressBase)
        this.appendContent(progressBase)
        this.appendContent(this.progressPointElem_)
        this.appendContent(this.progressTimeElem_)

        this.on(this.el(), 'mousemove', this.progressMove)
        this.on(this.el(), 'click', this.slideMoveOrClick)
        this.on(this.progressPointElem_, 'mousedown', this.slideStart)
        this.on(this.progressPointElem_, 'touchstart', this.slideStart)

        this.handleProgressChange()
    }
}

Component.registerComponent('Progress', Progress)

export default Progress

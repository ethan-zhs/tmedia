import { createDomWithClass, timeFormat } from '../../utils'

import './index.less'

const Progress = {
    _progress: null,
    _video: null,
    _isLive: false,
    _historyPauseStatus: false,

    handleProgressChange() {
        this._video.addEventListener('timeupdate', () => {
            if (!this._isLive) {
                const timeRange = this._video.buffered

                this._progressBufferElem.style.width = `${
                    timeRange.length > 0 ? (timeRange.end(timeRange.length - 1) / this._video.duration) * 100 : 0
                }%`

                this._progressBarElem.style.width = `${(this._video.currentTime / this._video.duration) * 100}%`
                this._progressPointElem.style.transform = `translate(${this._progressBarElem.clientWidth}px ,-50%)`
            }
        })

        this._video.addEventListener('durationchange', () => {
            this._isLive = !this._video.duration || this._video.duration === Infinity
        })
    },

    progressMove(e: any) {
        const pos: any = this.getProgressPos(e.pageX)

        this._progressHoverElem.style.width = `${pos.percent * 100}%`
        this._progressTimeElem.style.left = `${pos.hoveredTimePos}px`
        this._progressTimeElem.innerHTML = timeFormat(pos.percent * this._video.duration)
    },

    slideStart() {
        // 为了更好的体验，在移动触点的时候我选择将视频暂停
        this.historyPauseStatus = this._video.paused
        this._video.pause()
        this.progressSlidingChange(true)

        document.addEventListener('mousemove', this.slideMoveOrClick, false)
        document.addEventListener('mouseup', this.slideEnd, false)
        document.addEventListener('touchmove', this.slideMoveOrClick, false)
        document.addEventListener('touchend', this.slideEnd, false)
    },

    slideMoveOrClick(e: any) {
        e.stopPropagation()
        const pageX = e.pageX || e.targetTouches[0].pageX

        const pos: any = this.getProgressPos(pageX)

        this._video.currentTime = pos.percent * this._video.duration

        this._progressBarElem.style.width = `${pos.percent * 100}%`
        this._progressTimeElem.style.left = `${pos.hoveredTimePos}px`
        this._progressPointElem.style.transform = `translate(${this._progressBarElem.clientWidth}px ,-50%)`
    },

    slideEnd() {
        this.progressSlidingChange(false)
        document.removeEventListener('mousemove', this.slideMoveOrClick, false)
        document.removeEventListener('mouseup', this.slideEnd, false)
        document.removeEventListener('touchmove', this.slideMoveOrClick, false)
        document.removeEventListener('touchend', this.slideEnd, false)

        // 拖动进度条结束时，恢复播放状态
        !this.historyPauseStatus && this._video.play()
    },

    getProgressPos(pageX: number) {
        try {
            const progressElem = this._progress.querySelector('.tmv-progress-base')
            const progressTimeElem = this._progress.querySelector('.tmv-progress-time')
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
    },

    render(video: any, progressSlidingChange: (isSliding: boolean) => void) {
        const progress = createDomWithClass('tmv-controls-progress-bar')
        const progressBase = createDomWithClass('tmv-progress-base')
        this._progressHoverElem = createDomWithClass('tmv-progress-hover')
        this._progressBufferElem = createDomWithClass('tmv-progress-buffer')
        this._progressBarElem = createDomWithClass('tmv-progress')
        this._progressPointElem = createDomWithClass('tmv-progress-point')
        this._progressTimeElem = createDomWithClass('tmv-progress-time')

        progressBase.appendChild(this._progressHoverElem)
        progressBase.appendChild(this._progressBufferElem)
        progressBase.appendChild(this._progressBarElem)
        progress.appendChild(progressBase)
        progress.appendChild(this._progressPointElem)
        progress.appendChild(this._progressTimeElem)

        this._progress = progress
        this._video = video
        this.progressSlidingChange = progressSlidingChange

        this.slideEnd = this.slideEnd.bind(this)
        this.slideMoveOrClick = this.slideMoveOrClick.bind(this)
        this.slideStart = this.slideStart.bind(this)

        progress.addEventListener('mousemove', this.progressMove.bind(this))
        progress.addEventListener('click', this.slideMoveOrClick.bind(this))
        this._progressPointElem?.addEventListener('mousedown', this.slideStart)
        this._progressPointElem?.addEventListener('touchstart', this.slideStart)

        this.handleProgressChange()

        return progress
    }
}

export default Progress

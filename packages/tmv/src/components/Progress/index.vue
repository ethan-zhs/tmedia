<template>
    <div
        class="tmv-controls-progress-bar"
        @mouseleave="progressLeave"
        @mousemove="progressMove"
        @click="slideMoveOrClick"
    >
        <div class="tmv-progress-base" ref="progressRef">
            <div :style="{ width: `${hovered}%` }" class="tmv-progress-hover"></div>
            <div class="tmv-progress-buffer" :style="{ width: `${buffered}%` }"></div>
            <div class="tmv-progress" :style="{ width: `${progress}%` }"></div>
        </div>
        <div
            class="tmv-progress-point"
            @mousedown="slideStart"
            @touchstart="slideStart"
            :style="{ transform: `translate(${(maxWidth * progress) / 100}px, -50%)` }"
        ></div>
        <div
            class="tmv-progress-time"
            :style="{ left: `${hoveredTimePos}px` }"
            ref="progressHoverTimeRef"
            @mousemove="e => e.stopPropagation()"
        >
            {{ timeFormat(currentTime) }}
        </div>
    </div>
</template>

<script>
import { timeFormat } from '../../utils'
import './index.less'

export default {
    name: 'Progress',
    props: ['platform', 'videoId', 'type', 'handleVideoPlay', 'onSlideStatusChange'],
    data: () => {
        return {
            video: null,
            maxWidth: 0,
            currentTime: 0,
            buffered: 0,
            progress: 0,
            hovered: 0,
            hoveredTimePos: 0,
            isLive: false,
            historyPauseStatus: false
        }
    },

    methods: {
        handleProgressChange() {
            this.video.addEventListener('timeupdate', () => {
                if (this.video.currentTime != this.currentTime && !this.isLive) {
                    const timeRange = this.video.buffered
                    this.buffered =
                        timeRange.length > 0 ? (timeRange.end(timeRange.length - 1) / this.video.duration) * 100 : 0
                    this.progress = (this.video.currentTime / this.video.duration) * 100
                    this.maxWidth = this.$refs.progressRef.clientWidth
                }
            })

            this.video.addEventListener('durationchange', () => {
                this.isLive = !this.video.duration || this.video.duration === Infinity
            })
        },

        progressMove(e) {
            const pos = this.getProgressPos(e.pageX)
            this.hovered = pos.percent * 100
            this.hoveredTimePos = pos.hoveredTimePos
            this.currentTime = pos.percent * this.video.duration
        },

        progressLeave() {
            this.isShowHover = false
        },

        slideStart() {
            // 为了更好的体验，在移动触点的时候我选择将视频暂停
            this.historyPauseStatus = this.video.paused
            console.log(document.getElementById(this.videoId).paused)
            this.video.pause()
            this.onSlideStatusChange('start')

            document.addEventListener('mousemove', this.slideMoveOrClick, false)
            document.addEventListener('mouseup', this.slideEnd, false)
            document.addEventListener('touchmove', this.slideMoveOrClick, false)
            document.addEventListener('touchend', this.slideEnd, false)
        },

        slideMoveOrClick(e) {
            const pageX = e.pageX || e.targetTouches[0].pageX

            const pos = this.getProgressPos(pageX)

            this.video.currentTime = pos.percent * this.video.duration

            this.progress = pos.percent * 100
            this.hoveredTimePos = pos.hoveredTimePos
        },

        slideEnd() {
            this.onSlideStatusChange('end')
            document.removeEventListener('mousemove', this.slideMoveOrClick, false)
            document.removeEventListener('mouseup', this.slideEnd, false)
            document.removeEventListener('touchmove', this.slideMoveOrClick, false)
            document.removeEventListener('touchend', this.slideEnd, false)

            // 拖动进度条结束时，恢复播放状态
            !this.historyPauseStatus && this.video.play()
        },

        getProgressPos(pageX) {
            try {
                const progressElem = this.$refs.progressRef
                const maxWidth = progressElem.clientWidth
                const { left } = progressElem.getBoundingClientRect()

                let mx = pageX - left - document.documentElement.scrollLeft // 滑动的距离
                mx = mx > maxWidth ? maxWidth : mx < 0 ? 0 : mx

                const phtw = this.$refs.progressHoverTimeRef.offsetWidth

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

        timeFormat: timeFormat
    },

    mounted() {
        this.video = document.getElementById(this.videoId)
        this.handleProgressChange()
    }
}
</script>

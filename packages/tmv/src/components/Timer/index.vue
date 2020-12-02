<template>
    <div class="tmv-controls-time">
        {{ `${currentTime}${isLive ? '' : ' / ' + duration}` }}
        <span v-if="isLive" class="tmv-live-prompt">直播</span>
    </div>
</template>

<script>
import { timeFormat } from '../../utils'
import './index.less'
export default {
    name: 'Timer',
    props: ['videoId'],
    data: () => {
        return {
            video: null,
            isLive: false,
            currentTime: '0:00',
            duration: '0:00'
        }
    },

    methods: {
        handleControlsBar() {
            this.video.addEventListener('timeupdate', () => {
                if (timeFormat(this.video.currentTime) != this.currentTime) {
                    this.currentTime = timeFormat(this.video.currentTime)
                }
            })

            this.video.addEventListener('durationchange', () => {
                if (timeFormat(this.video.duration) != this.duration) {
                    this.isLive = !this.video.duration || this.video.duration === Infinity
                    this.duration = timeFormat(this.isLive ? 0 : this.video.duration)
                }
            })
        }
    },

    mounted() {
        this.video = document.getElementById(this.videoId)
        this.handleControlsBar()
    }
}
</script>

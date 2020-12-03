<template>
    <div class="tmv-controls-container" @click="handleClick">
        <div class="tmv-m-controls-mark" :class="{ 'tmv-m-controls-mark-hide': isPlaying && !visible }">
            <Loading v-if="isLoading && !isProgressSliding" />
            <div v-else class="tmv-big-play-btn" @click="handleVideoPlay">
                <div class="tmv-big-play-btn-icon">
                    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                        <path
                            class="tmv-svg-fill"
                            :d="
                                isPlaying
                                    ? 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'
                                    : 'M 13,26 19.5,22 19.5,14 13,10 z M 19.5,22 26,18 26,18 19.5,14 z'
                            "
                            id="ytp-id-156"
                        ></path>
                    </svg>
                </div>
            </div>

            <div
                class="tmv-m-controls"
                @click="
                    e => {
                        e.stopPropagation()
                    }
                "
            >
                <div class="tmv-m-controls-bar">
                    <div class="tmv-m-svg-btn" :class="{ 'tmv-m-svg-btn-disable': !toNextVideo }">
                        <NextVideo :toNextVideo="toNextVideo" />
                    </div>

                    <Timer :videoId="videoId" />
                    <div class="tmv-m-progress-bar">
                        <Progress :videoId="videoId" :onSlideStatusChange="changeProgressSlideStatus" />
                    </div>
                    <div class="tmv-m-svg-btn">
                        <FullScreen :videoId="videoId" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NextVideo from '../../NextVideo/index.vue'
import Progress from '../../Progress/index.vue'
import Timer from '../../Timer/index.vue'
import Loading from '../../Loading/index.vue'
import FullScreen from '../../FullScreen/index.vue'

import './mobile.less'

export default {
    name: 'MobileControl',
    props: ['videoId', 'toNextVideo', 'handleVideoPlay', 'isPlaying', 'isLoading'],
    components: {
        NextVideo,
        Progress,
        Timer,
        Loading,
        FullScreen
    },
    data: () => {
        return {
            timer: null,
            visible: false,
            isProgressSliding: false
        }
    },

    methods: {
        changeProgressSlideStatus(status) {
            this.isProgressSliding = status === 'start'
        },

        handleClick() {
            this.visible = !this.visible
            this.clearTimer()

            if (this.visible) {
                this.timer = setTimeout(() => {
                    this.visible = false
                    this.clearTimer()
                }, 4000)
            }
        },

        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
        }
    }
}
</script>

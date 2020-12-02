<template>
    <div
        class="tmv-controls-container"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        @click="clickToPlayVideo"
        @dblclick="dispatchVideoDblClick"
    >
        <Bezel :type="bezelType" />
        <Loading v-if="isLoading && !isProgressSliding" />
        <div class="tmv-controls" :class="{ 'tmv-controls-hide': isPlaying && !visible }">
            <div class="tmv-controls-bar" @click="stopPropagation" @dblclick="stopPropagation">
                <Progress :videoId="videoId" :onSlideStatusChange="changeProgressSlideStatus" />
                <div class="tmv-controls-coms">
                    <div class="tmv-svg-btn">
                        <PlayBtn :handleVideoPlay="handleVideoPlay" :isPlaying="isPlaying" />
                    </div>

                    <div class="tmv-svg-btn" :class="{ 'tmv-svg-btn-disable': !toNextVideo }">
                        <NextVideo :toNextVideo="toNextVideo" />
                    </div>

                    <Timer :videoId="videoId" />
                    <div class="tmv-controls-title"></div>

                    <Definition
                        v-if="qualityList.length"
                        :videoId="videoId"
                        :qualityList="qualityList"
                        :autoPlay="autoPlay"
                    />

                    <PlaybackRate :videoId="videoId" />

                    <div class="tmv-svg-btn">
                        <Volume :videoId="videoId" :mute="mute" />
                    </div>
                    <div class="tmv-svg-btn">
                        <Setting :videoId="videoId" />
                    </div>
                    <div class="tmv-svg-btn">
                        <Fullscreen :videoId="videoId" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PlayBtn from '../../PlayBtn/index.vue'
import NextVideo from '../../NextVideo/index.vue'
import Progress from '../../Progress/index.vue'
import Timer from '../../Timer/index.vue'
import Loading from '../../Loading/index.vue'
import Bezel from '../../Bezel/index.vue'
import Fullscreen from '../../FullScreen/index.vue'
import Setting from '../../Setting/index.vue'
import Volume from '../../Volume/index.vue'
import Definition from '../../Definition/index.vue'
import PlaybackRate from '../../PlaybackRate/index.vue'

import './pc.less'

export default {
    name: 'PCControl',
    props: ['videoId', 'toNextVideo', 'handleVideoPlay', 'isPlaying', 'isLoading', 'mute', 'qualityList', 'autoPlay'],
    components: {
        PlayBtn,
        NextVideo,
        Progress,
        Timer,
        Loading,
        Bezel,
        Fullscreen,
        Setting,
        Volume,
        Definition,
        PlaybackRate
    },
    data: () => {
        return {
            bezelType: '',
            timer: null,
            video: null,
            visible: false,
            isProgressSliding: false
        }
    },
    mounted() {
        this.video = document.getElementById(this.videoId)
    },
    methods: {
        stopPropagation(e) {
            e.stopPropagation()
        },
        dispatchVideoDblClick() {
            const clickEvent = document.createEvent('MouseEvents')
            clickEvent.initEvent('dblclick', true, true)
            this.video.dispatchEvent(clickEvent)
        },

        handleMouseMove() {
            this.visible = true

            this.clearTimer()

            this.timer = setTimeout(() => {
                this.visible = false
                this.clearTimer()
            }, 3000)
        },

        handleMouseLeave() {
            this.visible = false
            this.clearTimer()
        },

        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
        },

        clickToPlayVideo() {
            this.handleVideoPlay()
            this.bezelType = this.video.paused ? 'play' : 'pause'
        },

        changeProgressSlideStatus(status) {
            this.isProgressSliding = status === 'start'
        }
    }
}
</script>

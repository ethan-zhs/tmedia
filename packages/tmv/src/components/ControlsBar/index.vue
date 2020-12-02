<template>
    <Fragment>
        <MobileControl v-if="platform === 'mobile'" v-bind="$props" />
        <PCControl
            v-else
            :videoId="videoId"
            v-bind="$props"
            :handleVideoPlay="handleVideoPlay"
            :isPlaying="isPlaying"
            :isLoading="isLoading"
        />
    </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import PCControl from './pc/PC.vue'
import MobileControl from './mobile/Mobile.vue'

export default {
    name: 'ControlsBar',
    props: ['autoPlay', 'toNextVideo', 'platform', 'videoId', 'mute', 'qualityList'],
    components: {
        MobileControl,
        PCControl,
        Fragment
    },
    data: () => {
        return {
            video: null,
            isPlaying: false,
            isLoading: false
        }
    },
    mounted() {
        this.video = document.getElementById(this.videoId)
    },

    methods: {
        handleVideoPlay(e) {
            e && e.stopPropagation()
            if (this.video.paused) {
                this.video.play()
            } else {
                this.video.pause()
            }
        },
        handleVideoEvents() {
            this.video.addEventListener('play', this.videoPlaying)
            this.video.addEventListener('pause', this.videoPaused)
            this.video.addEventListener('end', this.videoPaused)
            this.video.addEventListener('seeking', this.startLoading)
            this.video.addEventListener('seeked', this.cancelLoading)
            this.video.addEventListener('loadstart', this.startLoading)
            this.video.addEventListener('loadedmetadata', this.cancelLoading)
            this.video.addEventListener('canplay', this.cancelLoading)
        },

        videoPlaying() {
            this.isPlaying = true
        },

        videoPaused() {
            this.isPlaying = false
        },

        startLoading() {
            this.isLoading = true
        },

        cancelLoading() {
            this.isLoading = false
        }
    },

    mounted() {
        this.video = document.getElementById(this.videoId)
        this.handleVideoEvents()
    }
}
</script>

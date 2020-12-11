<template>
    <video
        :id="videoId"
        class="tmv-video"
        :poster="poster"
        :src="url"
        :autoplay="autoPlay"
        playsinline
        webkit-playsinline="true"
    ></video>
</template>

<script>
import { randomHash } from './utils'
import Tmv from './index'

export default {
    name: 'VueApp',
    props: {
        poster: String,
        toNextVideo: {
            default: null
        },
        qualityList: {
            default: null
        },
        url: {
            required: true
        },
        type: {
            default: 'mp4'
        },
        autoPlay: {
            default: true
        },
        controls: {
            default: true
        },

        platform: {
            default: 'pc'
        },
        mute: {
            default: false
        },
        playbackRateList: {
            default: null
        }
    },
    data: () => {
        return {
            videoId: `video_${randomHash(6)}`,
            video: null
        }
    },
    mounted() {
        this.video = document.getElementById(this.videoId)
        console.log(this.$props)
        const tmv = new Tmv(this.$props)
        tmv.load()
        tmv.attachMedia(this.video)
        tmv.play()
    }
}
</script>

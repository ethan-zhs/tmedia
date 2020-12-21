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
import { randomHash } from './utils/tools'
import Tmv from './index'

export default {
    name: 'VueApp',
    props: {
        poster: String,
        toNextVideo: {
            default: null
        },
        definition: {
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
            video: null,
            tmv: null
        }
    },
    watch: {
        // url更新后重load视频
        url: function (val) {
            const video = document.getElementById(this.videoId)

            // 销毁播放流Hls/Flv
            this.tmv.destroy()

            // 重新加载新地址
            video.src = val
            this.tmv.load()
        }
    },
    mounted() {
        this.video = document.getElementById(this.videoId)
        this.tmv = new Tmv(this.$props)
        this.tmv.attachMedia(this.video)
        this.tmv.load()
    },
    destroyed() {
        this.tmv.destroy()
    }
}
</script>

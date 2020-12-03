<template>
    <div class="tmv-video-wrapper">
        <video :id="videoId" class="tmv-video" :poster="poster" :src="url" :autoplay="autoPlay"></video>
        <Error v-if="isError" errorMessage="NETWORK_ERROR" />
        <ControlsBar v-if="!isError && controls" v-bind="$props" :videoId="videoId" />
    </div>
</template>

<script>
import ControlsBar from './components/ControlsBar/index.vue'
import Error from './components/Error/index.vue'
import { loadScript, randomHash, getDevice } from './utils'
import './index.less'

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
    components: {
        ControlsBar,
        Error
    },
    data: () => {
        return {
            videoId: `video_${randomHash(6)}`,
            video: null,
            isError: false
        }
    },
    mounted() {
        this.video = document.getElementById(this.videoId)
        this.playVideo()
    },
    methods: {
        playVideo() {
            switch (this.type) {
                case 'hls':
                    // 如果是PC则用hls.js播放m3u8
                    const { isPC } = getDevice()
                    isPC &&
                        loadScript('https://sitecdn.itouchtv.cn/sitecdn/cdn-lib/hls/hls.min.js').then(() => {
                            if (window.Hls.isSupported()) {
                                const hls = new window.Hls({
                                    liveDurationInfinity: true
                                })
                                hls.loadSource(this.video.src)
                                hls.attachMedia(this.video)
                                hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
                                    this.autoPlay && this.video.play()
                                })
                            }
                        })

                    break
                case 'flv':
                    loadScript('https://sitecdn.itouchtv.cn/sitecdn/cdn-lib/flv/flv.min.js').then(() => {
                        if (window.flvjs.isSupported()) {
                            const flv = window.flvjs.createPlayer({
                                type: 'flv',
                                url: this.video.src
                            })
                            flv.attachMediaElement(this.video)
                            flv.load()
                            this.autoPlay && flv.play()
                            flv.on('error', err => {
                                console.log(err)
                                this.isError = true
                            })
                        }
                    })
                    break

                default:
                    this.autoPlay &&
                        this.video.play().catch(() => {
                            console.log('[TMVR] Video cannot play')
                        })
            }
        }
    }
}
</script>

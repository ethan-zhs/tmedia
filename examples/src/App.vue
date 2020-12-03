<template>
    <div>
        <h1>Vue Components</h1>
        <div class="video-demo">
            <h2>Vue视频组件</h2>
            <Tmvv
                poster="https://img2-cloud.itouchtv.cn/news/877c305a8fce17015150622dad25be06.png"
                url="http://video2-cloud.itouchtv.cn/video/2020/03/10/45dca3e86339ab421583827925794923__hd.mp4"
                type="mp4"
                platform="pc"
                :autoPlay="false"
                :toNextVideo="toNextVideo"
                :playbackRateList="[
                    {
                        value: '0.5'
                    },
                    {
                        value: '1.0',
                        default: true
                    },
                    {
                        value: '1.25'
                    },
                    {
                        value: '1.5'
                    },
                    {
                        value: '2.5'
                    }
                ]"
            />
        </div>
        <div class="audio-demo">
            <h2>Vue音频组件</h2>
            <Tmav />
        </div>
    </div>
</template>

<script>
import Tmvv from '@tmedia/tmv/src/VueApp.vue'
import Tmav from '@tmedia/tma/src/VueApp.vue'

export default {
    name: 'app',
    components: {
        Tmvv,
        Tmav
    },
    methods: {
        toNextVideo() {
            alert('下一个视频的回调')
        }
    }
}
</script>

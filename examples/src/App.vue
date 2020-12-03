<template>
    <div>
        <h1>Vue Components</h1>
        <div class="video-demo">
            <h2>Vue视频组件</h2>
            <Tmvv
                poster="'https://img2-cloud.itouchtv.cn/news/877c305a8fce17015150622dad25be06.png'"
                url="https://wslizhi.gdtv.cn/live/gdws.m3u8?auth_key=1606961796-0-0-2564ee0713d899959413ae2580b1b347"
                type="hls"
                platform="mobile"
                :autoPlay="false"
                :controls="true"
                :toNextVideo="toNextVideo"
                :mute="false"
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

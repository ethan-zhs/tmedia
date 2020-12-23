<template>
    <div>
        <h1>Vue Components</h1>
        <div class="video-demo">
            <h2>Vue视频组件</h2>
            <Tmvv
                poster="https://img2-cloud.itouchtv.cn/news/877c305a8fce17015150622dad25be06.png"
                :url="url"
                type="flv"
                device="mobile"
                :autoPlay="true"
                :toNextVideo="toNextVideo"
            />
        </div>
        <div class="audio-demo">
            <h2 @click="changeSrc">Vue音频组件</h2>
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
    data() {
        return {
            url: 'https://pili-live-hdl.itouchtv.cn/touchtv-1/5fdb2c97a95be77ce76ec5e4.flv'
        }
    },
    methods: {
        toNextVideo() {
            alert('下一个视频的回调')
        },

        changeSrc() {
            console.log(1111111)
            this.url = 'https://vod.gdtv.cn/dev-m3u8/202006/159327076794.m3u8'
        }
    }
}
</script>

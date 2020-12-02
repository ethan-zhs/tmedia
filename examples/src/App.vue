<template>
    <div>
        <h1>Vue Components</h1>
        <div class="video-demo">
            <h2>Vue视频组件</h2>
            <Tmvv
                poster="'https://img2-cloud.itouchtv.cn/news/877c305a8fce17015150622dad25be06.png'"
                url="http://video2-cloud.itouchtv.cn/video/2020/03/10/45dca3e86339ab421583827925794923__hd.mp4"
                type="mp4"
                platform="pc"
                :autoPlay="false"
                :controls="true"
                :toNextVideo="toNextVideo"
                :mute="false"
                :qualityList="[
                    {
                        name: 'fhd',
                        cName: '超清',
                        url: 'http://video2-cloud.itouchtv.cn/video/2020/03/10/45dca3e86339ab421583827925794923__hd.mp4'
                    },
                    {
                        name: 'hd',
                        cName: '高清',
                        url: 'http://video2-cloud.itouchtv.cn/video/2020/03/18/687d9605547661c31584506645569577__hd.mp4'
                    },
                    {
                        name: 'sd',
                        cName: '标清',
                        url: 'http://video2-cloud.itouchtv.cn/video/2020/06/04/0cd6b2d3e3899e771591262568549928__hd.mp4'
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

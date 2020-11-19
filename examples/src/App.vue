<template>
    <div>
        <h1> Vue Components </h1>
        <div className="video-demo">
            <h2>Vue视频组件</h2>
            <Tmvv />
        </div>
        <div className="audio-demo">
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
    }
}
</script>
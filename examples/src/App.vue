<template>
    <div>
        <h1> Vue Components </h1>
        <div className="video-demo">
            <h2>Vue视频组件</h2>
            <TestVideo />
        </div>
        <div className="audio-demo">
            <h2>Vue音频组件</h2>
            <TestAudio />
        </div>
    </div>    
</template>

<script>
import TestVideo from '@tmedia/video-player/src/VueApp.vue'
import TestAudio from '@tmedia/audio-player/src/VueApp.vue'

export default {
    name: 'app',
    components: {
        TestVideo,
        TestAudio
    }
}
</script>
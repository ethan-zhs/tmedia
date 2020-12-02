<template>
    <div class="tmv-next-video-btn" @click="handleClickToNext">
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
            <path class="tmv-svg-fill" d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z"></path>
        </svg>
    </div>
</template>

<script>
import './index.less'
export default {
    name: 'NextVideo',
    props: ['toNextVideo'],
    data: () => {
        return {
            video: null
        }
    },

    methods: {
        handleClickToNext() {
            this.toNextVideo && this.toNextVideo()
        }
    }
}
</script>

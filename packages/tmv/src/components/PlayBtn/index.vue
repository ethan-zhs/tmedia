<template>
    <div class="tmv-play-btn" @click="handleVideoPlay">
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
            <path
                class="tmv-svg-fill"
                :d="
                    isPlaying
                        ? 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'
                        : 'M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z'
                "
            ></path>
        </svg>
    </div>
</template>

<script>
import './index.less'
export default {
    name: 'PlayBtn',
    props: ['platform', 'videoId', 'type', 'handleVideoPlay', 'isPlaying'],
    data: () => {
        return {
            video: null
        }
    },

    methods: {}
}
</script>

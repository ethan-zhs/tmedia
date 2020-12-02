<template>
    <div class="tmv-controls-container" onClick="{this.handleClick}">
        <div class="tmv-m-controls-mark" :class="{ 'tmv-m-controls-mark-hide': isPlaying && !visible }">
            <Loading v-if="isLoading && !isProgressSliding" />
            <div v-else class="tmv-big-play-btn" onClick="{handleVideoPlay}">
                <div class="tmv-big-play-btn-icon">
                    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                        <path
                            class="tmv-svg-fill"
                            :d="
                                isPlaying
                                    ? 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'
                                    : 'M 13,26 19.5,22 19.5,14 13,10 z M 19.5,22 26,18 26,18 19.5,14 z'
                            "
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './mobile.less'

export default {
    name: 'MobileControl',
    props: ['platform', 'videoId', 'type', 'autoPlay'],
    data: () => {
        return {
            video: null
        }
    },
    mounted() {
        this.video = document.getElementById(this.videoId)
    },
    methods: {}
}
</script>

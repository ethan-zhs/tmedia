<template>
    <div class="tmv-bezel tmv-bezel-show" ref="bezelRef">
        <div class="tmv-bezel-icon">
            <svg v-if="type === 'play'" height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                <path class="tmv-svg-fill" d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"></path>
            </svg>

            <svg v-if="type === 'pause'" height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                <path class="tmv-svg-fill" d="M 13,26 19.5,22 19.5,14 13,10 z M 19.5,22 26,18 26,18 19.5,14 z"></path>
            </svg>
        </div>
    </div>
</template>

<script>
import './index.less'
export default {
    name: 'ControlsBar',
    props: ['type'],

    updated() {
        this.$nextTick(() => {
            this.$refs.bezelRef.classList.remove('tmv-bezel-show')
            setTimeout(() => {
                this.$refs.bezelRef.classList.add('tmv-bezel-show')
            }, 10)
        })
    }
}
</script>

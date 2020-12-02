<template>
    <div class="tmv-popover" @mouseleave="handleMouseLeave">
        <slot name="popoverBtn" :togglePopover="togglePopover" />

        <div v-if="popoverVisible || visible" class="tmv-popover-mark" ref="popover">
            <div class="tmv-popover-panel">
                <slot name="popoverContent" />
            </div>
        </div>
    </div>
</template>

<script>
import './index.less'

export default {
    name: 'Popover',
    props: ['visible', 'onVisibleChange'],
    data: () => {
        return {
            video: null,
            popoverVisible: false
        }
    },

    watch: {
        visible: function (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.popoverVisible = newVal
            }
        }
    },

    methods: {
        handleMouseLeave() {
            this.popoverVisible = false
            this.onVisibleChange(false, 'mouseleave')
        },

        togglePopover() {
            this.popoverVisible = !this.popoverVisible
            this.onVisibleChange(this.popoverVisible, 'click')
        }
    }
}
</script>

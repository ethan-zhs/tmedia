<template>
    <div class="tmv-playbackrate">
        <Popover :visible="popoverVisible" :onVisibleChange="handlePopoverVisibleChange">
            <template v-slot:popoverBtn="{ togglePopover }">
                <div class="tmv-playbackrate-btn" @click="togglePopover">
                    {{ currRate == 1 ? '倍速' : `${currRate}x` }}
                </div>
            </template>
            <template v-slot:popoverContent>
                <div class="tmv-playbackrate-list">
                    <div
                        v-for="item in playbackRateArr"
                        class="tmv-playbackrate-item"
                        :class="{ 'tmv-playbackrate-item-active': item.value === currRate }"
                        :key="item.value"
                        @click="handleChangeRate(item.value)"
                    >
                        {{ item.value }}x
                    </div>
                </div>
            </template>
        </Popover>
    </div>
</template>

<script>
import Popover from '../Popover/index.vue'
import './index.less'

export default {
    name: 'PlaybackRate',
    props: ['playbackRateList', 'videoId'],
    components: {
        Popover
    },
    data: () => {
        return {
            video: null,
            currRate: null,
            popoverVisible: false,
            playbackRateArr: []
        }
    },

    methods: {
        initData() {
            this.playbackRateArr = this.playbackRateList || [
                {
                    value: '0.5'
                },
                {
                    value: '1.0',
                    default: true
                },
                {
                    value: '1.25'
                },
                {
                    value: '1.5'
                },
                {
                    value: '2.0'
                }
            ]

            const localRate = this.playbackRateArr.filter(
                item => item.value == localStorage.getItem('tmv-playbackrate')
            )
            const defaultRate = this.playbackRateArr.filter(item => item.default)

            // 优先级，先判断本地，再判断默认值, 否则取1
            let defaultRateValue = 1

            if (localRate.length) {
                defaultRateValue = localRate[0].value
            } else if (defaultRate.length) {
                defaultRateValue = defaultRate[0].value
            }

            this.currRate = defaultRateValue
            this.video.playbackRate = defaultRateValue
        },

        handleChangeRate(rate) {
            this.video.playbackRate = rate
            this.popoverVisible = false
            this.currRate = rate

            localStorage.setItem('tmv-playbackrate', rate.toString())
        },

        handlePopoverVisibleChange(visible) {
            this.popoverVisible = visible
        }
    },

    mounted() {
        this.video = document.getElementById(this.videoId)
        this.initData()
    }
}
</script>

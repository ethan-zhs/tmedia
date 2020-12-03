<template>
    <div class="tmv-quality">
        <Popover :visible="popoverVisible" :onVisibleChange="handlePopoverVisibleChange">
            <template v-slot:popoverBtn="{ togglePopover }">
                <div class="tmv-quality-btn" @click="togglePopover">{{ currQuality ? currQuality.cName : '画质' }}</div>
            </template>
            <template v-slot:popoverContent>
                <div class="tmv-quality-list">
                    <div
                        v-for="item in qualityList"
                        class="tmv-quality-item"
                        :class="{ 'tmv-quality-item-active': item.name === currQuality.name }"
                        :key="item.name"
                        @click="handleQualityChange(item, true)"
                    >
                        <div class="tmv-quality-name">{{ item.cName }}</div>
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
    name: 'Definition',
    props: ['qualityList', 'autoPlay', 'videoId'],
    components: {
        Popover
    },
    data: () => {
        return {
            video: null,
            popoverVisible: false,
            currQuality: {}
        }
    },

    methods: {
        initData() {
            const tmvDefinition = localStorage.getItem('tmv-definition') || {}

            const localDefinition = this.qualityList.filter(item => item.name === tmvDefinition)
            const defaultDefinition = this.qualityList.filter(item => item.url === this.video.src)

            let initDefinition = {}

            // 初始化时, 先看本地有没有清晰度设置记录，如果没有再看默认播放地址是否匹配的清晰度
            if (localDefinition.length) {
                initDefinition = localDefinition[0]
            } else if (defaultDefinition.length) {
                initDefinition = defaultDefinition[0]
            }

            this.handleQualityChange(initDefinition, this.autoPlay)
        },

        handleQualityChange(item, autoPlay = false) {
            // 记录上个视频的播放时间
            this.videoCurrTime = this.video.currentTime

            this.video.src = item.url
            this.video.autoplay = autoPlay
            this.video.load()

            this.video.addEventListener('loadeddata', this.changeVideoTime, false)

            this.popoverVisible = false
            this.currQuality = item
            localStorage.setItem('tmv-definition', item.name)
        },

        // 修改播放源后还原当前播放时间
        changeVideoTime() {
            this.video.currentTime = this.videoCurrTime
            this.video.removeEventListener('loadeddata', this.changeVideoTime, false)
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

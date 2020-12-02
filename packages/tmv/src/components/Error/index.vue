<template>
    <div class="tmv-error">{{ ERROR_MESSAGES[errorMessage] }}</div>
</template>

<script>
import './index.less'

export default {
    name: 'Error',
    props: ['errorMessage'],
    data: () => {
        return {
            ERROR_MESSAGES: {
                NETWORK_ERROR: '媒体类型不支持播放或文件路径无效'
            }
        }
    }
}
</script>

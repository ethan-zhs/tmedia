import { createDomWithClass } from '../../utils'

import './index.less'

const Loading = {
    _loading: null,
    _isProgressSliding: false,

    progressSlidingChange(isSliding: boolean) {
        this._isProgressSliding = isSliding
    },

    startLoading() {
        // 正在拖动进度条时不显示loading
        !this._isProgressSliding && this._loading.classList.remove('tmv-loading-hide')
    },

    cancelLoading() {
        this._loading.classList.add('tmv-loading-hide')
    },

    render(video: any) {
        this._loading = createDomWithClass('tmv-loading')
        this._loading.innerHTML = `
                <svg 
                    class="tmv-loading-ico" 
                    width="80px" 
                    height="80px" 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="xMidYMid">
                    <circle
                        cx="50"
                        cy="50"
                        fill="rgba(0,0,0,0)"
                        stroke="#f8f8f8"
                        stroke-width="4"
                        r="30"
                        stroke-dasharray="120 100"
                    ></circle>
                </svg>`

        this.startLoading = this.startLoading.bind(this)
        this.cancelLoading = this.cancelLoading.bind(this)

        video.addEventListener('seeking', this.startLoading)
        video.addEventListener('seeked', this.cancelLoading)
        video.addEventListener('loadstart', this.startLoading)
        video.addEventListener('loadedmetadata', this.cancelLoading)
        video.addEventListener('canplay', this.cancelLoading)

        return this._loading
    }
}

// 在外部引用时this可以绑定到Loading对象
Loading.progressSlidingChange = Loading.progressSlidingChange.bind(Loading)

export default Loading

import Component from '../Component'

import './index.less'

class Loading extends Component {
    isProgressSliding_: boolean

    constructor(player: any, options: any = {}) {
        super(player, options)

        this.render()
    }

    /**
     * 开始loading
     */
    startLoading = () => {
        // 正在拖动进度条时不显示loading
        !this.state_.isProgressSliding && this.removeClass('tmv-loading-hide')
        this.setState({ isLoading: true })
    }

    /**
     * 停止loading
     */
    cancelLoading = () => {
        this.addClass('tmv-loading-hide')
        this.setState({ isLoading: false })
    }

    render() {
        this.addClass('tmv-loading')
        this.html(`
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
            </svg>`)

        this.player_.addEventListener('seeking', this.startLoading)
        this.player_.addEventListener('seeked', this.cancelLoading)
        this.player_.addEventListener('loadstart', this.startLoading)
        this.player_.addEventListener('loadedmetadata', this.cancelLoading)
        this.player_.addEventListener('canplay', this.cancelLoading)

        this.setState({ a: 1 })
    }
}

Component.registerComponent('Loading', Loading)

export default Loading

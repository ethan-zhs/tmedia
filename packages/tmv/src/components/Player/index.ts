import Component from '../Component'
import Controls from '../Controls'
import Error from '../Error'
import { videoInitialize } from '../../utils/tools'

import './index.less'

class Player extends Component {
    // 错误面板Element
    errorEl_: any

    // media解析器
    interpreter_: any

    constructor(player: any, options: any = {}) {
        super(player, Object.assign({}, options, { state: {} }))
    }

    /**
     * 连接媒体元素
     *
     * @param {HTMLVideoElement} media 媒体元素
     */
    attachMedia(media: any) {
        this.addClass('tmv-video-wrapper')

        this.player_.controls = false
        this.player_.autoPlay = this.options_.autoPlay === true
        this.player_.src = this.options_.src = this.options_.src || this.player_.src
        this.addClass('tmv-video', this.player_)

        this.appendContent(this.player_)

        // 置换媒体Element为tmv视频播放器组件
        let replaceNode = media

        // 如果已经初始化过了player，需删除原有的dom
        if (
            media.parentNode &&
            media.parentNode.classList &&
            media.parentNode.classList.contains('tmv-video-wrapper')
        ) {
            replaceNode = media.parentNode
        }

        replaceNode.parentNode?.replaceChild(this.el(), replaceNode)

        if (this.options_.controls !== false) {
            const controls = new Controls(this.player_, this.options_)
            this.appendContent(controls.el())
        }

        this.errorEl_ = new Error(this.player_, this.options_)
        this.appendContent(this.errorEl_.el())

        // video错误处理
        this.on(this.player_, 'error', () => {
            const error = this.player_.error

            if (
                error.code === error.MEDIA_ERR_NETWORK ||
                error.code === error.MEDIA_ERR_SRC_NOT_SUPPORTED
                //  || error.code === error.MEDIA_ERR_DECODE ||
                // error.code === error.MEDIA_ERR_ABORTED
            ) {
                this.mediaError(error)
            }
        })
    }

    /**
     * 加载初始化视频
     *
     */
    async load() {
        const { type, autoPlay = false } = this.options_

        this.player_ && this.player_.load()

        this.errorEl_.hide()

        this.interpreter_ = await videoInitialize({ type, autoPlay, video: this.player_ }, (err: any) => {
            this.mediaError(err)
        })
    }

    /**
     * 播放视频
     *
     */
    play() {
        this.player_ && this.player_.play()
    }

    /**
     * 媒体播放错误
     *
     * @param {Object} err 错误信息
     */
    mediaError = (err: any) => {
        // 视频播放出错触发 显示Error
        console.log(err)

        this.errorEl_.setErrorMessage()
    }

    /**
     * 销毁视频解析器
     *
     */
    destroy() {
        if (this.interpreter_ && this.interpreter_.destroy) {
            this.interpreter_.destroy()
        }
    }
}

export default Player

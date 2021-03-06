import window from '../../global/window'
import { loadScript, getDevice } from '../../utils/tools'
import Component from '../Component'

import './index.less'

const FULLSCREEN_EVENT: any = {
    request: [
        'requestFullscreen',
        'mozRequestFullScreen',
        'webkitRequestFullScreen',
        'webkitRequestFullscreen',
        'msRequestFullscreen'
    ],
    exit: ['exitFullscreen', 'mozCancelFullScreen', 'webkitCancelFullScreen', 'msExitFullscreen'],
    change: {
        fullscreenEnabled: 'fullscreenchange',
        webkitFullscreenEnabled: 'webkitfullscreenchange',
        mozFullScreenEnabled: 'mozfullscreenchange',
        msFullscreenEnabled: 'MSFullscreenChange'
    }
}

class Fullscreen extends Component {
    isFullscreen_: boolean

    constructor(player: any, options: any = {}) {
        super(player, options)

        this.isFullscreen_ = false
        this.render()
    }

    /**
     * 获取系统支持的fullscreenChange事件
     *
     */
    getFullscreenChangeEvent = () => {
        let fullscreenEvent: any = null
        const dom: any = document
        const fullscreenChangeEvent: any = FULLSCREEN_EVENT.change

        for (const enableItem in fullscreenChangeEvent) {
            if (dom[enableItem]) {
                fullscreenEvent = fullscreenChangeEvent[enableItem]
                return fullscreenEvent
            }
        }

        return fullscreenEvent
    }

    /**
     * fullscreenChange事件处理方法
     *
     * @param {Object} event 事件目标对象
     */
    fullscreenChangeHandler = (event: any) => {
        const videoElem: any = this.player_?.parentNode
        const svgPathElem = this.el().querySelector('.tmv-svg-fill')
        const elem = event.target
        const doc: any = document

        // 判断当前是否全屏，兼容各浏览器
        const fullscreenElement =
            doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement

        // IE 要对比elem.activeElement
        this.isFullscreen_ =
            fullscreenElement === elem || (elem.activeElement && fullscreenElement === elem.activeElement)

        if (this.isFullscreen_) {
            svgPathElem.setAttribute(
                'd',
                'M 10,16 16,16 16,10 14,10 14,14 10,14 z M 27,16 21,16 21,10 23,10 23,14 27,14 z M 10,20 16,20 16,26 14,26 14,22 10,22 z M 27,20 21,20 21,26 23,26 23,22 27,22 z'
            )
            videoElem.classList.add('tmv-video-wrapper-fullscreen')
        } else {
            svgPathElem.setAttribute(
                'd',
                'M 10,10 16,10 16,12 12,12 12,16 10,16 z M 27,10 21,10 21,12 25,12 25,16 27,16 z M 10,26 16,26 16,24 12,24 12,20 10,20 z M 27,26 21,26 21,24 25,24 25,20 27,20 z'
            )
            videoElem.classList.remove('tmv-video-wrapper-fullscreen')
        }
    }

    /**
     * 监听fullscreenChange事件
     *
     */
    handleFullscreenChange = () => {
        const dom: any = document
        const fullscreenEvent = this.getFullscreenChangeEvent()

        fullscreenEvent && dom.addEventListener(fullscreenEvent, this.fullscreenChangeHandler.bind(this))
    }

    /**
     * 进入全屏
     *
     * @param {HTMLElement} dom 执行全屏事件的element
     */
    requestFullscreen = (dom: any) => {
        const { isPhone, isApp } = getDevice()

        if (this.getFullscreenChangeEvent()) {
            for (let i = 0; i < FULLSCREEN_EVENT.request.length; i++) {
                if (dom[FULLSCREEN_EVENT.request[i]]) {
                    dom[FULLSCREEN_EVENT.request[i]]()
                    break
                }
            }
        } else if (isPhone && this.player_.webkitEnterFullscreen) {
            this.player_.webkitEnterFullscreen()
        } else if (isApp) {
            // 针对android 5.x版本以下的webview，不支持全屏事件，通过app提供的方法实现全屏
            loadScript('https://sitecdn.itouchtv.cn/sitecdn/sdk/touchtvapp/touchtvapp-ee92629b.min.js').then(() => {
                window.touchtvapp.playVideo(this.player_.src)
            })
        } else {
            console.error('[TMV]: Device not support fullscreen')
        }
    }

    /**
     * 退出全屏
     *
     */
    exitFullscreen = () => {
        const dom: any = document
        for (let i = 0; i < FULLSCREEN_EVENT.exit.length; i++) {
            if (dom[FULLSCREEN_EVENT.exit[i]]) {
                dom[FULLSCREEN_EVENT.exit[i]]()
                break
            }
        }
    }

    /**
     * toggle fullscreen
     *
     */
    handleFullscreen = () => {
        const videoElem: any = this.player_?.parentNode
        this.isFullscreen_ ? this.exitFullscreen() : this.requestFullscreen(videoElem)
    }

    /**
     * 监听视频双击事件, 触发进入/退出全屏
     *
     */
    handleDoubleClickFullscreen = () => {
        this.on(this.player_, 'dblclick', (e: any) => {
            e.preventDefault()
            this.handleFullscreen()
        })
    }

    render() {
        this.addClass('tmv-controls-fullscreen')

        this.html(`
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
            <path class="tmv-svg-fill" d="M 10,10 16,10 16,12 12,12 12,16 10,16 z M 27,10 21,10 21,12 25,12 25,16 27,16 z M 10,26 16,26 16,24 12,24 12,20 10,20 z M 27,26 21,26 21,24 25,24 25,20 27,20 z"></path>
        </svg>`)

        this.on(this.el(), 'click', this.handleFullscreen)

        this.handleFullscreenChange()
        this.handleDoubleClickFullscreen()
    }
}

Component.registerComponent('Fullscreen', Fullscreen)

export default Fullscreen

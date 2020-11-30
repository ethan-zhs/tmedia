import * as React from 'react'
import { getDevice, loadScript } from '../../utils'
import './index.less'

interface IProps {
    videoId: string
}

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

class Fullscreen extends React.Component<IProps, any> {
    private video: any
    constructor(props: IProps) {
        super(props)

        this.state = {
            isFullscreen: false
        }
    }

    componentDidMount() {
        const { videoId } = this.props
        this.video = document.getElementById(videoId)

        this.handleFullscreenChange()
        this.handleDoubleClickFullscreen()
    }

    render() {
        const { isFullscreen } = this.state

        return (
            <div className="tmv-controls-fullscreen" onClick={this.handleFullscreen}>
                <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                    {isFullscreen ? (
                        <path
                            className="tm-svg-fill"
                            d="M 10,16 16,16 16,10 14,10 14,14 10,14 z M 27,16 21,16 21,10 23,10 23,14 27,14 z M 10,20 16,20 16,26 14,26 14,22 10,22 z M 27,20 21,20 21,26 23,26 23,22 27,22 z"></path>
                    ) : (
                        <path
                            className="tm-svg-fill"
                            d="M 10,10 16,10 16,12 12,12 12,16 10,16 z M 27,10 21,10 21,12 25,12 25,16 27,16 z M 10,26 16,26 16,24 12,24 12,20 10,20 z M 27,26 21,26 21,24 25,24 25,20 27,20 z"></path>
                    )}
                </svg>
            </div>
        )
    }

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

    handleFullscreenChange = () => {
        const dom: any = document
        const fullscreenEvent = this.getFullscreenChangeEvent()

        fullscreenEvent && dom.addEventListener(fullscreenEvent, this.fullscreenChangeHandler)
    }

    fullscreenChangeHandler = (event: any) => {
        const videoElem: any = this.video?.parentNode
        const elem = event.target
        const doc: any = document

        // 判断当前是否全屏，兼容各浏览器
        const fullscreenElement =
            doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement

        // IE 要对比elem.activeElement
        const isFullscreen =
            fullscreenElement === elem || (elem.activeElement && fullscreenElement === elem.activeElement)

        this.setState({
            isFullscreen
        })

        if (isFullscreen) {
            videoElem.classList.add('tmv-video-wrapper-fullscreen')
        } else {
            videoElem.classList.remove('tmv-video-wrapper-fullscreen')
        }
    }

    handleFullscreen = () => {
        const { isFullscreen } = this.state
        const videoElem: any = this.video?.parentNode

        isFullscreen ? this.exitFullscreen() : this.requestFullscreen(videoElem)
    }

    handleDoubleClickFullscreen = () => {
        this.video.addEventListener('dblclick', (e: any) => {
            e.preventDefault()
            this.handleFullscreen()
        })
    }

    // 进入全屏用Element对象, ios仅支持video Element进入全屏
    requestFullscreen = (dom: any) => {
        const { isPhone, isApp } = getDevice()

        if (this.getFullscreenChangeEvent()) {
            for (let i = 0; i < FULLSCREEN_EVENT.request.length; i++) {
                if (dom[FULLSCREEN_EVENT.request[i]]) {
                    dom[FULLSCREEN_EVENT.request[i]]()
                    break
                }
            }
        } else if (isPhone && this.video.webkitEnterFullscreen) {
            this.video.webkitEnterFullscreen()
        } else if (isApp) {
            // 针对android 5.x版本以下的webview，不支持全屏事件，通过app提供的方法实现全屏
            loadScript('https://domain/app-ee92629b.min.js').then(() => {
                window.touchtvapp.playVideo(this.video.src)
            })
        } else {
            console.error('[TMV]: Device not support fullscreen')
        }
    }

    // 退出全屏要用Document对象
    exitFullscreen = () => {
        const dom: any = document
        for (let i = 0; i < FULLSCREEN_EVENT.exit.length; i++) {
            if (dom[FULLSCREEN_EVENT.exit[i]]) {
                dom[FULLSCREEN_EVENT.exit[i]]()
                break
            }
        }
    }
}

export default Fullscreen

import * as React from 'react'
import './index.less'

class Fullscreen extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            isFullscreen: false
        }
    }

    componentDidMount() {
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

    handleFullscreenChange = () => {
        let fullscreenEvent = ''
        const dom: any = document

        if (dom.fullscreenEnabled) {
            fullscreenEvent = 'fullscreenchange'
        } else if (dom.webkitFullscreenEnabled) {
            fullscreenEvent = 'webkitfullscreenchange'
        } else if (dom.mozFullScreenEnabled) {
            fullscreenEvent = 'mozfullscreenchange'
        } else if (dom.msFullscreenEnabled) {
            fullscreenEvent = 'MSFullscreenChange'
        }

        dom.addEventListener(fullscreenEvent, this.fullscreenChangeHandler)
    }

    fullscreenChangeHandler = (event: any) => {
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
    }

    handleFullscreen = () => {
        const { isFullscreen } = this.state
        const { videoId } = this.props
        const videoElem: any = document.getElementById(videoId)?.parentNode

        if (videoElem) {
            isFullscreen ? this.exitFullscreen() : this.requestFullscreen(videoElem)
        }
    }

    handleDoubleClickFullscreen = () => {
        const { videoId } = this.props
        document.getElementById(videoId)?.addEventListener('dblclick', (e: any) => {
            e.preventDefault()
            this.handleFullscreen()
        })
    }

    // Element
    requestFullscreen = (dom: any) => {
        if (dom.requestFullscreen) {
            dom.requestFullscreen()
        } else if (dom.mozRequestFullScreen) {
            dom.mozRequestFullScreen()
        } else if (dom.webkitRequestFullScreen) {
            dom.webkitRequestFullScreen()
        } else if (dom.msRequestFullscreen) {
            dom.msRequestFullscreen()
        }
    }

    // Document
    exitFullscreen = () => {
        const dom: any = document
        if (dom.exitFullscreen) {
            dom.exitFullscreen()
        } else if (dom.mozCancelFullScreen) {
            dom.mozCancelFullScreen()
        } else if (dom.webkitCancelFullScreen) {
            dom.webkitCancelFullScreen()
        } else if (dom.msExitFullscreen) {
            dom.msExitFullscreen()
        }
    }
}

export default Fullscreen

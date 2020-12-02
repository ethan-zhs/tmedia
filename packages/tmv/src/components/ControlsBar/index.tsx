import * as React from 'react'
import PCControl from './pc/PC'
import MobileControl from './mobile/Mobile'

class ControlsBar extends React.Component<any, any> {
    private video: any
    constructor(props: any) {
        super(props)

        this.state = {
            isPlaying: false,
            isLoading: false
        }
    }

    componentDidMount() {
        const { videoId } = this.props
        this.video = document.getElementById(videoId)

        this.handleVideoEvents()
    }

    render() {
        const { isPlaying, isLoading } = this.state
        const { platform } = this.props

        // 默认pc模式
        const Control = platform === 'mobile' ? MobileControl : PCControl

        return (
            <Control
                {...this.props}
                isPlaying={isPlaying}
                isLoading={isLoading}
                handleVideoPlay={this.handleVideoPlay}
            />
        )
    }

    handleVideoEvents = () => {
        this.video.addEventListener('play', this.videoPlaying)
        this.video.addEventListener('pause', this.videoPaused)
        this.video.addEventListener('end', this.videoPaused)
        this.video.addEventListener('seeking', this.startLoading)
        this.video.addEventListener('seeked', this.cancelLoading)
        this.video.addEventListener('loadstart', this.startLoading)
        this.video.addEventListener('loadedmetadata', this.cancelLoading)
        this.video.addEventListener('canplay', this.cancelLoading)
    }

    videoPlaying = () => {
        this.setState({
            isPlaying: true
        })
    }

    videoPaused = () => {
        this.setState({
            isPlaying: false
        })
    }

    startLoading = () => {
        this.setState({
            isLoading: true
        })
    }

    cancelLoading = () => {
        this.setState({
            isLoading: false
        })
    }

    handleVideoPlay = (e: any) => {
        e && e.stopPropagation()
        if (this.video.paused) {
            this.video.play()
        } else {
            this.video.pause()
        }
    }
}

export default ControlsBar

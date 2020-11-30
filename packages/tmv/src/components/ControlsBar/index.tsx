import * as React from 'react'
import PCControl from './PC'
import MobileControl from './Mobile'

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
        this.video.addEventListener('play', () => {
            this.setState({
                isPlaying: true
            })
        })

        this.video.addEventListener('pause', () => {
            this.setState({
                isPlaying: false
            })
        })

        this.video.addEventListener('end', () => {
            this.setState({
                isPlaying: false
            })
        })

        this.video.addEventListener('seeking', () => {
            this.setState({
                isLoading: true
            })
        })

        this.video.addEventListener('seeked', () => {
            this.setState({
                isLoading: false
            })
        })

        this.video.addEventListener('loadstart', () => {
            this.setState({
                isLoading: true
            })
        })

        this.video.addEventListener('loadedmetadata', () => {
            this.setState({
                isLoading: false
            })
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

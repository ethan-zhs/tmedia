import * as React from 'react'
import ControlsBar from './components/ControlsBar'
import Loading from './components/Loading'
import { randomHash } from './utils/randomUtils'
import './index.less'

class Tmvr extends React.Component<any, any> {
    private videoRef: any
    private videoId: any
    private video: any

    constructor(props: any) {
        super(props)

        this.state = {
            isShowControlsbar: false,
            isLoading: false
        }

        this.videoId = `video_${randomHash(6)}`
    }

    componentDidMount() {
        this.video = document.getElementById(this.videoId)
        // this.video.playbackRate = 2
        // const context = new AudioContext()
        // this.video.muted = true
        // this.video
        //     .play()
        //     .then(() => {
        //         console.log('success')
        //     })
        //     .catch(() => {
        //         console.log('err')
        //     })
        console.log(this.video.paused)
        this.aa()
    }

    render() {
        const { isPlaying, isLoading } = this.state
        const { poster, url } = this.props

        return (
            <div className="tmv-video-wrapper">
                <video
                    className="tmv-video"
                    src={url}
                    poster={poster}
                    id={this.videoId}
                    onClick={this.handleVideoPlay}></video>

                {/* <div
                    className="tmv-poster"
                    style={{
                        backgroundImage: `url(${poster})`
                    }}></div>

                <div className="tmv-big-play-btn-mask">
                    <div className="tmv-big-play-btn"></div>
                </div> */}

                {isLoading && <Loading />}

                <ControlsBar
                    videoId={this.videoId}
                    isPlaying={isPlaying}
                    handleVideoPlay={this.handleVideoPlay}
                    {...this.props}
                />
            </div>
        )
    }

    aa = () => {
        this.video.addEventListener('playing', () => {
            this.setState({
                isPlaying: true
            })
        })

        this.video.addEventListener('seeking', () => {
            this.setState({
                isLoading: true
            })
            console.log(1)
        })

        this.video.addEventListener('seeked', () => {
            this.setState({
                isLoading: false
            })
            console.log(2)
        })
    }

    handleVideoPlay = () => {
        if (this.video.paused) {
            this.video.play()
            this.setState({
                isPlaying: true
            })
        } else {
            this.video.pause()
            this.setState({
                isPlaying: false
            })
        }
    }
}

export default Tmvr

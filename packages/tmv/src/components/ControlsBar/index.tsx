import * as React from 'react'
import classNames from 'classnames'
import Progress from '../Progress'
import FullScreen from '../FullScreen'
import Volume from '../Volume'
import Setting from '../Setting'
import Timer from '../Timer'
import NextVideo from '../NextVideo'
import PlayBtn from '../PlayBtn'
import PlaybackRate from '../PlaybackRate'
import Quality from '../Quality'
import { timeFormat } from '../../utils/timeUtils'
import './index.less'

class ControlsBar extends React.Component<any, any> {
    private timer: any
    constructor(props: any) {
        super(props)

        this.state = {
            visible: false,
            isPlaying: false,
            currentTime: '0:00',
            duration: '0:00'
        }

        this.timer = null
    }

    componentDidMount() {
        this.handleControlsBar()
    }

    render() {
        const { visible } = this.state
        const { isPlaying, handleVideoPlay, videoId, toNextVideo, mute } = this.props

        return (
            <div
                className={classNames({
                    ['tmv-controls']: true,
                    ['tmv-controls-hide']: isPlaying && !visible
                })}>
                <div className="tmv-controls-bar">
                    <Progress videoId={videoId} />
                    <div className="tmv-controls-coms">
                        <PlayBtn handleVideoPlay={handleVideoPlay} isPlaying={isPlaying} />

                        <NextVideo toNextVideo={toNextVideo} />
                        <Timer videoId={videoId} />
                        <div className="tmv-controls-title"></div>
                        <Quality videoId={videoId} />
                        <PlaybackRate videoId={videoId} />

                        <Volume videoId={videoId} mute={mute} />
                        <Setting videoId={videoId} />
                        <FullScreen videoId={videoId} />
                    </div>
                </div>
            </div>
        )
    }

    handleControlsBar = () => {
        const { videoId } = this.props
        const video: any = document.getElementById(videoId)
        const videoWapper = video?.parentNode

        if (videoWapper) {
            videoWapper.addEventListener('mousemove', () => {
                this.handleMouseMove()
            })

            videoWapper.addEventListener('mouseleave', () => {
                this.handleMouseLeave()
            })
        }

        video.addEventListener('timeupdate', () => {
            if (timeFormat(video.currentTime) != this.state.currentTime) {
                this.setState({
                    currentTime: timeFormat(video.currentTime)
                })
            }
        })

        video.addEventListener('durationchange', () => {
            if (timeFormat(video.duration) != this.state.duration) {
                this.setState({
                    duration: timeFormat(video.duration)
                })
            }
        })
    }

    handleMouseMove = () => {
        this.setState({ visible: true })

        this.clearTimer()

        this.timer = setTimeout(() => {
            this.setState({ visible: false })
            this.clearTimer()
        }, 3000)
    }

    handleMouseLeave = () => {
        this.setState({ visible: false })
        this.clearTimer()
    }

    clearTimer = () => {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }
}

export default ControlsBar

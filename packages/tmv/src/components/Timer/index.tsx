import * as React from 'react'
import { timeFormat } from '../../utils'
import './index.less'

interface IProps {
    videoId: string
}

class Timer extends React.Component<IProps, any> {
    private video: any
    constructor(props: IProps) {
        super(props)

        this.state = {
            isLive: false,
            currentTime: '0:00',
            duration: '0:00'
        }
    }

    componentDidMount() {
        this.video = document.getElementById(this.props.videoId)
        this.handleControlsBar()
    }

    render() {
        const { currentTime, duration, isLive } = this.state

        return (
            <div className="tmv-controls-time">
                {`${currentTime}${isLive ? '' : ' / ' + duration}`}
                {isLive && <span className="tmv-live-prompt">直播</span>}
            </div>
        )
    }

    handleControlsBar = () => {
        this.video.addEventListener('timeupdate', () => {
            if (timeFormat(this.video.currentTime) != this.state.currentTime) {
                this.setState({
                    currentTime: timeFormat(this.video.currentTime)
                })
            }
        })

        this.video.addEventListener('durationchange', () => {
            if (timeFormat(this.video.duration) != this.state.duration) {
                const isLive = !this.video.duration || this.video.duration === Infinity
                this.setState({
                    duration: timeFormat(isLive ? 0 : this.video.duration),
                    isLive
                })
            }
        })
    }
}

export default Timer

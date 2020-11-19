import * as React from 'react'
import { timeFormat } from '../../utils/timeUtils'
import './index.less'

class Timer extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            currentTime: '0:00',
            duration: '0:00'
        }
    }

    componentDidMount() {
        this.handleControlsBar()
    }

    render() {
        const { currentTime, duration } = this.state

        return (
            <div className="tmv-controls-time">
                {currentTime} / {duration}
            </div>
        )
    }

    handleControlsBar = () => {
        const { videoId } = this.props
        const video: any = document.getElementById(videoId)

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
}

export default Timer

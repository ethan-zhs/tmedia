import * as React from 'react'
import classNames from 'classnames'
import Progress from '../../Progress'
import FullScreen from '../../FullScreen'
import Timer from '../../Timer'
import NextVideo from '../../NextVideo'
import Loading from '../../Loading'
import './mobile.less'

class MobileControl extends React.Component<any, any> {
    private timer: any
    private video: any
    constructor(props: any) {
        super(props)

        this.state = {
            visible: false,
            isPlaying: false,
            isProgressSliding: false
        }

        this.timer = null
    }

    componentDidMount() {
        const { videoId } = this.props
        this.video = document.getElementById(videoId)
    }

    render() {
        const { visible, isProgressSliding } = this.state
        const { isPlaying, handleVideoPlay, videoId, toNextVideo, isLoading } = this.props

        return (
            <div className="tmv-controls-container" onClick={this.handleClick}>
                <div
                    className={classNames({
                        ['tmv-m-controls-mark']: true,
                        ['tmv-m-controls-mark-hide']: isPlaying && !visible
                    })}>
                    {isLoading && !isProgressSliding ? (
                        <Loading />
                    ) : (
                        <div className="tmv-big-play-btn" onClick={handleVideoPlay}>
                            <div className="tmv-big-play-btn-icon">
                                <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                                    <path
                                        className="tmv-svg-fill"
                                        d={
                                            isPlaying
                                                ? 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'
                                                : 'M 13,26 19.5,22 19.5,14 13,10 z M 19.5,22 26,18 26,18 19.5,14 z'
                                        }
                                        id="ytp-id-156"></path>
                                </svg>
                            </div>
                        </div>
                    )}

                    <div
                        className="tmv-m-controls"
                        onClick={e => {
                            e.stopPropagation()
                        }}>
                        <div className="tmv-m-controls-bar">
                            <div
                                className={classNames({
                                    ['tmv-m-svg-btn']: true,
                                    ['tmv-m-svg-btn-disable']: !toNextVideo
                                })}>
                                <NextVideo toNextVideo={toNextVideo} />
                            </div>

                            <Timer videoId={videoId} />
                            <div className="tmv-m-progress-bar">
                                <Progress videoId={videoId} onSlideStatusChange={this.changeProgressSlideStatus} />
                            </div>
                            <div className="tmv-m-svg-btn">
                                <FullScreen videoId={videoId} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    changeProgressSlideStatus = (status: string) => {
        this.setState({ isProgressSliding: status === 'start' })
    }

    handleClick = () => {
        this.setState({ visible: !this.state.visible })
        this.clearTimer()

        if (!this.state.visible) {
            this.timer = setTimeout(() => {
                this.setState({ visible: false })
                this.clearTimer()
            }, 4000)
        }
    }

    clearTimer = () => {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }
}

export default MobileControl

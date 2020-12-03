import * as React from 'react'
import classNames from 'classnames'
import Progress from '../../Progress'
import Fullscreen from '../../FullScreen'
import Volume from '../../Volume'
import Setting from '../../Setting'
import Timer from '../../Timer'
import NextVideo from '../../NextVideo'
import PlayBtn from '../../PlayBtn'
import PlaybackRate from '../../PlaybackRate'
import Definition from '../../Definition'
import Bezel from '../../Bezel'
import Loading from '../../Loading'
import './pc.less'

class PCControl extends React.Component<any, any> {
    private timer: any
    private video: any
    constructor(props: any) {
        super(props)

        this.state = {
            visible: false,
            bezelType: '',
            isProgressSliding: false
        }

        this.timer = null
    }

    componentDidMount() {
        const { videoId } = this.props
        this.video = document.getElementById(videoId)
    }

    render() {
        const { visible, bezelType, isProgressSliding } = this.state
        const { videoId, toNextVideo, mute, qualityList = [], isLoading, isPlaying, autoPlay, playbackRateList } = this.props

        return (
            <div
                className="tmv-controls-container"
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleVideoPlay}
                onDoubleClick={this.dispatchVideoDblClick}>
                <Bezel type={bezelType} />
                {isLoading && !isProgressSliding && <Loading />}
                <div
                    className={classNames({
                        ['tmv-controls']: true,
                        ['tmv-controls-hide']: isPlaying && !visible
                    })}>
                    <div
                        className="tmv-controls-bar"
                        onClick={this.stopPropagation}
                        onDoubleClick={this.stopPropagation}>
                        <Progress videoId={videoId} onSlideStatusChange={this.changeProgressSlideStatus} />
                        <div className="tmv-controls-coms">
                            <div className="tmv-svg-btn">
                                <PlayBtn handleVideoPlay={this.handleVideoPlay} isPlaying={isPlaying} />
                            </div>

                            <div
                                className={classNames({
                                    ['tmv-svg-btn']: true,
                                    ['tmv-svg-btn-disable']: !toNextVideo
                                })}>
                                <NextVideo toNextVideo={toNextVideo} />
                            </div>

                            <Timer videoId={videoId} />
                            <div className="tmv-controls-title"></div>
                            {qualityList.length > 0 && (
                                <Definition videoId={videoId} qualityList={qualityList} autoPlay={autoPlay} />
                            )}
                            <PlaybackRate videoId={videoId} playbackRateList={playbackRateList} />

                            <div className="tmv-svg-btn">
                                <Volume videoId={videoId} mute={mute} />
                            </div>
                            <div className="tmv-svg-btn">
                                <Setting videoId={videoId} />
                            </div>
                            <div className="tmv-svg-btn">
                                <Fullscreen videoId={videoId} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    stopPropagation = (e: any) => {
        e.stopPropagation()
    }

    dispatchVideoDblClick = () => {
        const clickEvent = document.createEvent('MouseEvents')
        clickEvent.initEvent('dblclick', true, true)
        this.video.dispatchEvent(clickEvent)
    }

    changeProgressSlideStatus = (status: string) => {
        this.setState({ isProgressSliding: status === 'start' })
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

    handleVideoPlay = () => {
        this.props.handleVideoPlay()

        this.setState({
            bezelType: this.video.paused ? 'play' : 'pause'
        })
    }
}

export default PCControl

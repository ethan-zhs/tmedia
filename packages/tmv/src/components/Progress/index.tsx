import * as React from 'react'
import { timeFormat } from '../../utils'
import './index.less'

interface IProps {
    videoId: string
    onSlideStatusChange: (status: string) => void
}

class Progress extends React.Component<IProps, any> {
    private video: any
    private progressRef: any
    private progressHoverTimeRef: any
    private historyPauseStatus: boolean

    constructor(props: IProps) {
        super(props)

        this.state = {
            maxWidth: 0,
            currentTime: 0,
            buffered: 0,
            progress: 0,
            hovered: 0,
            hoveredTimePos: 0,
            isLive: false
        }
        this.progressHoverTimeRef = React.createRef()
        this.progressRef = React.createRef()
        this.video = null
    }

    componentDidMount() {
        this.video = document.getElementById(this.props.videoId)
        this.handleProgressChange()
    }

    render() {
        const { maxWidth, currentTime, buffered, progress, hovered, hoveredTimePos, isLive } = this.state

        // 直播不显示进度条元件
        if (isLive) {
            return (
                <div className="tmv-controls-progress-bar">
                    <div className="tmv-progress-base"></div>
                </div>
            )
        }

        return (
            <div
                className="tmv-controls-progress-bar"
                onMouseLeave={this.progressLeave}
                onMouseMove={this.progressMove}
                onClick={this.slideMoveOrClick}>
                <div className="tmv-progress-base" ref={this.progressRef}>
                    <div style={{ width: `${hovered}%` }} className="tmv-progress-hover"></div>
                    <div className="tmv-progress-buffer" style={{ width: `${buffered}%` }}></div>
                    <div className="tmv-progress" style={{ width: `${progress}%` }}></div>
                </div>
                <div
                    className="tmv-progress-point"
                    onMouseDown={this.slideStart}
                    onTouchStart={this.slideStart}
                    style={{ transform: `translate(${(maxWidth * progress) / 100}px, -50%)` }}></div>
                <div
                    className="tmv-progress-time"
                    style={{ left: `${hoveredTimePos}px` }}
                    ref={this.progressHoverTimeRef}
                    onMouseMove={e => e.stopPropagation()}>
                    {timeFormat(currentTime)}
                </div>
            </div>
        )
    }

    handleProgressChange = () => {
        this.video.addEventListener('timeupdate', () => {
            if (this.video.currentTime != this.state.currentTime && !this.state.isLive) {
                const timeRange = this.video.buffered
                this.setState({
                    buffered:
                        timeRange.length > 0 ? (timeRange.end(timeRange.length - 1) / this.video.duration) * 100 : 0,
                    progress: (this.video.currentTime / this.video.duration) * 100,
                    maxWidth: this.progressRef.current.clientWidth
                })
            }
        })

        this.video.addEventListener('durationchange', () => {
            const isLive = !this.video.duration || this.video.duration === Infinity
            this.setState({
                isLive
            })
        })
    }

    progressMove = (e: any) => {
        const pos: any = this.getProgressPos(e.pageX)

        this.setState({
            hovered: pos.percent * 100,
            hoveredTimePos: pos.hoveredTimePos,
            currentTime: pos.percent * this.video.duration
        })
    }

    progressLeave = () => {
        this.setState({
            isShowHover: false
        })
    }

    slideStart = () => {
        // 为了更好的体验，在移动触点的时候我选择将视频暂停
        this.historyPauseStatus = this.video.paused
        this.video.pause()
        this.props.onSlideStatusChange('start')

        document.addEventListener('mousemove', this.slideMoveOrClick, false)
        document.addEventListener('mouseup', this.slideEnd, false)
        document.addEventListener('touchmove', this.slideMoveOrClick, false)
        document.addEventListener('touchend', this.slideEnd, false)
    }

    slideMoveOrClick = (e: any) => {
        const pageX = e.pageX || e.targetTouches[0].pageX

        const pos: any = this.getProgressPos(pageX)

        this.video.currentTime = pos.percent * this.video.duration

        this.setState({
            progress: pos.percent * 100,
            hoveredTimePos: pos.hoveredTimePos
        })
    }

    slideEnd = () => {
        this.props.onSlideStatusChange('end')
        document.removeEventListener('mousemove', this.slideMoveOrClick, false)
        document.removeEventListener('mouseup', this.slideEnd, false)
        document.removeEventListener('touchmove', this.slideMoveOrClick, false)
        document.removeEventListener('touchend', this.slideEnd, false)

        // 拖动进度条结束时，恢复播放状态
        !this.historyPauseStatus && this.video.play()
    }

    getProgressPos = (pageX: number) => {
        try {
            const progressElem = this.progressRef.current
            const maxWidth = progressElem.clientWidth
            const { left } = progressElem.getBoundingClientRect()

            let mx = pageX - left - document.documentElement.scrollLeft // 滑动的距离
            mx = mx > maxWidth ? maxWidth : mx < 0 ? 0 : mx

            const phtw = this.progressHoverTimeRef.current.offsetWidth

            // 鼠标悬浮时间模块位置计算
            let hoveredTimePos = mx - phtw / 2

            if (mx - phtw / 2 < 0) {
                hoveredTimePos = 0
            } else if (mx + phtw > maxWidth) {
                hoveredTimePos = maxWidth - phtw
            }

            const percent = mx / maxWidth

            return {
                percent,
                hoveredTimePos
            }
        } catch (err) {}
    }
}

export default Progress

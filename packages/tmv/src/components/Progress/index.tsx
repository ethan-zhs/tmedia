import * as React from 'react'
import { timeFormat } from '../../utils/timeUtils'
import './index.less'

class Progress extends React.Component<any, any> {
    private video: any
    private progressRef: any
    private progressHoverTimeRef: any

    constructor(props: any) {
        super(props)

        this.state = {
            maxWidth: 0,
            currentTime: 0,
            buffered: 0,
            progress: 0,
            hovered: 0,
            hoveredTimePos: 0
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
        const { maxWidth, currentTime, buffered, progress, hovered, hoveredTimePos } = this.state

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
        this.setState({
            maxWidth: this.progressRef.current.clientWidth
        })

        this.video.addEventListener('timeupdate', () => {
            if (this.video.currentTime != this.state.currentTime) {
                this.setState({
                    buffered: Math.round((this.video.buffered.end(0) / this.video.duration) * 100),
                    progress: (this.video.currentTime / this.video.duration) * 100
                })
            }
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
        this.video.pause()

        document.addEventListener('mousemove', this.slideMoveOrClick, false)
        document.addEventListener('mouseup', this.slideEnd, false)
    }

    slideMoveOrClick = (e: any) => {
        const pos: any = this.getProgressPos(e.pageX)
        this.video.currentTime = pos.percent * this.video.duration

        this.setState({
            progress: pos.percent * 100,
            hoveredTimePos: pos.hoveredTimePos
        })
    }

    slideEnd = () => {
        document.removeEventListener('mousemove', this.slideMoveOrClick, false)
        document.removeEventListener('mouseup', this.slideEnd, false)
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

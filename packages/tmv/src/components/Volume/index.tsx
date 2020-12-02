import * as React from 'react'
import Propover from '../Popover'
import './index.less'

interface IProps {
    mute?: boolean
    volume?: number
    videoId: string
}

class Volume extends React.Component<IProps, any> {
    private video: any
    private volumeSliderRef: any
    constructor(props: IProps) {
        super(props)

        this.state = {
            percent: 1,
            isMuted: false,
            popoverVisible: false
        }

        this.volumeSliderRef = React.createRef()
    }

    componentDidMount() {
        this.video = document.getElementById(this.props.videoId)
        this.initData()
    }

    render() {
        const { percent, isMuted, popoverVisible } = this.state
        return (
            <div className="tmv-controls-volume" onClick={this.showSlider}>
                <Propover
                    visible={popoverVisible}
                    onVisibleChange={this.handleVisibleChange}
                    content={
                        <div
                            className="tmv-volume-slider"
                            onClick={e => {
                                e.stopPropagation()
                            }}>
                            <div
                                className="tmv-volume-slider-base"
                                ref={this.volumeSliderRef}
                                onClick={this.slideMoveOrClick}>
                                <div
                                    className="tmv-volume-slider-percent"
                                    style={{ height: `${isMuted ? 0 : percent * 100}%` }}>
                                    <div className="tmv-volume-slider-point" onMouseDown={this.slideStart}></div>
                                </div>
                            </div>
                        </div>
                    }>
                    <div className="tmv-controls-volume-btn">
                        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                            {isMuted ? (
                                <path
                                    className="tmv-svg-fill"
                                    d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"></path>
                            ) : (
                                <path
                                    className="tmv-svg-fill"
                                    d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"></path>
                            )}
                        </svg>
                    </div>
                </Propover>
            </div>
        )
    }

    initData = () => {
        const tmvVolume: any = localStorage.getItem('tmv-volume') || 1
        const tmvMuted: any = localStorage.getItem('tmv-muted') || '0'
        const { mute, volume = tmvVolume } = this.props
        const isMuted = mute || tmvMuted === '1'

        this.setState({
            percent: volume,
            isMuted
        })

        this.video.volume = volume
        this.video.muted = isMuted
    }

    showSlider = () => {
        const { popoverVisible, isMuted } = this.state
        const mute = !popoverVisible ? false : !isMuted
        localStorage.setItem('tmv-muted', mute ? '1' : '0')

        this.setState({
            popoverVisible: true,
            isMuted: mute
        })

        this.video.muted = mute
    }

    handleVisibleChange = (visible: boolean, type?: string) => {
        type === 'mouseleave' &&
            this.setState({
                popoverVisible: visible
            })
    }

    slideStart = () => {
        document.addEventListener('mousemove', this.slideMoveOrClick, false)
        document.addEventListener('mouseup', this.slideEnd, false)
    }

    slideMoveOrClick = (e: any) => {
        try {
            const progressElem = this.volumeSliderRef.current
            const maxHeight = progressElem.clientHeight
            const { top } = progressElem.getBoundingClientRect()

            let my = e.pageY - top - document.documentElement.scrollTop // 滑动的距离
            my = my > maxHeight ? maxHeight : my < 0 ? 0 : my

            this.video.volume = 1 - my / maxHeight
            localStorage.setItem('tmv-volume', this.video.volume)
            localStorage.setItem('tmv-muted', this.video.volume === 0 ? '1' : '0')

            this.setState({
                percent: 1 - my / maxHeight,
                isMuted: my === maxHeight
            })
        } catch (err) {}
    }

    slideEnd = () => {
        document.removeEventListener('mousemove', this.slideMoveOrClick, false)
        document.removeEventListener('mouseup', this.slideEnd, false)
    }
}

export default Volume

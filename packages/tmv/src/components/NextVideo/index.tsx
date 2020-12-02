import * as React from 'react'
import './index.less'

interface IProps {
    toNextVideo: () => void
}

class NextVideo extends React.Component<IProps, any> {
    private video: any
    constructor(props: IProps) {
        super(props)
    }

    render() {
        return (
            <div className="tmv-next-video-btn" onClick={this.handleClickToNext}>
                <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                    <path className="tmv-svg-fill" d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z"></path>
                </svg>
            </div>
        )
    }

    handleClickToNext = () => {
        const { toNextVideo } = this.props
        toNextVideo && toNextVideo()
    }
}

export default NextVideo

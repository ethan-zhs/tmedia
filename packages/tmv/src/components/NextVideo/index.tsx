import * as React from 'react'
import classNames from 'classnames'
import './index.less'

class NextVideo extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        const { toNextVideo } = this.props
        return (
            <div
                className={classNames({
                    ['tmv-next-video-btn']: true,
                    ['tmv-next-video-disable']: !toNextVideo
                })}
                onClick={this.handleClickToNext}>
                <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                    <path className="tm-svg-fill" d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z"></path>
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

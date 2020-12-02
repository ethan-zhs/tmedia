import * as React from 'react'
import './index.less'

interface IProps {
    isPlaying: boolean
    handleVideoPlay: () => void
}

class PlayBtn extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        const { isPlaying, handleVideoPlay } = this.props

        return (
            <div className="tmv-play-btn" onClick={handleVideoPlay}>
                <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                    <path
                        className="tmv-svg-fill"
                        d={
                            isPlaying
                                ? 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'
                                : 'M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z'
                        }></path>
                </svg>
            </div>
        )
    }
}

export default PlayBtn

import * as React from 'react'
import { randomHash } from './utils'
import Tmv from './index'

class Tmvr extends React.Component<any, any> {
    private videoId: any
    private video: any

    constructor(props: any) {
        super(props)

        this.state = {
            isError: false,
            isLoading: false
        }

        this.videoId = `video_${randomHash(6)}`
    }

    componentDidMount() {
        this.video = document.getElementById(this.videoId)
        this.video.setAttribute('webkit-playsinline', 'true')

        const tmv = new Tmv(this.props)
        tmv.attachMedia(this.video)
        tmv.load()   
    }

    render() {
        const { poster, url, autoPlay = false } = this.props

        return (
            <video
                className="tmv-video"
                src={url}
                poster={poster}
                id={this.videoId}
                playsInline
                autoPlay={autoPlay}
            ></video>
        )
    }
}

export default Tmvr

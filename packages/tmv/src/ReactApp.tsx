import * as React from 'react'
import { randomHash } from './utils/tools'
import Tmv from './index'

class Tmvr extends React.Component<any, any> {
    videoId: any
    video: any
    tmv: any

    constructor(props: any) {
        super(props)

        this.state = {
            isError: false,
            isLoading: false
        }

        this.videoId = `video_${randomHash(6)}`
    }

    componentWillUnmount() {
        // 组件销毁时销毁tmv
        this.tmv.destroy() 
    }

    componentDidMount() {
        this.video = document.getElementById(this.videoId)
        this.video.setAttribute('webkit-playsinline', 'true')

        this.tmv = new Tmv(this.props)
        this.tmv.attachMedia(this.video)
        this.tmv.load()   
    }

    // url更新后重load视频
    componentDidUpdate(preProps: any) {
        if(this.props.url !== preProps.url) {
            const video: any = document.getElementById(this.videoId)

            // 销毁播放流Hls/Flv
            this.tmv.destroy() 

            video.src = this.props.url
            this.tmv.load()
        }
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

import * as React from 'react'
import ControlsBar from './components/ControlsBar'
import Error from './components/Error'
import { loadScript, randomHash, getDevice } from './utils'
import './index.less'

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
        this.playVideo()
    }

    render() {
        const { isError } = this.state
        const { poster, url, controls = true, autoPlay = false } = this.props

        return (
            <div className="tmv-video-wrapper">
                <video
                    className="tmv-video"
                    src={url}
                    poster={poster}
                    id={this.videoId}
                    playsInline
                    autoPlay={autoPlay}></video>

                {isError ? (
                    <Error errorMessage={'NETWORK_ERROR'} />
                ) : (
                    controls && <ControlsBar videoId={this.videoId} {...this.props} />
                )}
            </div>
        )
    }

    playVideo = () => {
        const { type, autoPlay } = this.props
        switch (type) {
            case 'hls':
                // 如果是PC则用hls.js播放m3u8
                const { isPC } = getDevice()
                isPC &&
                    loadScript('https://cdn.bootcdn.net/ajax/libs/hls.js/0.14.17-0.alpha.6017/hls.min.js').then(() => {
                        if (window.Hls.isSupported()) {
                            const hls = new window.Hls({
                                liveDurationInfinity: true
                            })
                            hls.loadSource(this.video.src)
                            hls.attachMedia(this.video)
                            hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
                                autoPlay && this.video.play()
                            })
                        }
                    })

                break
            case 'flv':
                loadScript('https://cdn.bootcdn.net/ajax/libs/flv.js/1.5.0/flv.min.js').then(() => {
                    if (window.flvjs.isSupported()) {
                        const flv = window.flvjs.createPlayer({
                            type: 'flv',
                            url: this.video.src
                        })
                        flv.attachMediaElement(this.video)
                        flv.load()
                        autoPlay && flv.play()
                        flv.on('error', (err: any) => {
                            console.log(err)
                            this.setState({ isError: true })
                        })
                    }
                })
                break

            default:
                autoPlay &&
                    this.video.play().catch(() => {
                        console.log('[TMVR] Video cannot play')
                    })
        }
    }
}

export default Tmvr

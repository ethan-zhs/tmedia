import React from 'react'

import Tmv from '@tmedia/tmv/src/index'

export default class App extends React.Component<any, any> {
    tmv: any
    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        const video: any = document.getElementById('tmv')
        video.setAttribute('webkit-playsinline', 'true')
        video.setAttribute('x-webkit-airplay', 'true')
        video.setAttribute('x5-video-player-type', 'h5')
        video.setAttribute('x5-video-player-fullscreen', 'true')
        video.setAttribute('x5-video-orientation', 'portraint')

        this.tmv = new Tmv({ 
            device: 'mobile',
            type: 'hls',
            autoPlay: true, 
            toNextVideo: () => { alert('下一个视频回调函数') },
            // definition: [
            //     {
            //         name: 'fhd',
            //         cName: '超清',
            //         url:
            //             'http://video2-cloud.itouchtv.cn/video/2020/03/10/45dca3e86339ab421583827925794923__hd.mp4'
            //     },
            //     {
            //         name: 'hd',
            //         cName: '高清',
            //         url:
            //             'http://video2-cloud.itouchtv.cn/video/2020/03/18/687d9605547661c31584506645569577__hd.mp4'
            //     },
            //     {
            //         name: 'sd',
            //         cName: '标清',
            //         url:
            //             'http://video2-cloud.itouchtv.cn/video/2020/06/04/0cd6b2d3e3899e771591262568549928__hd.mp4'
            //     }
            // ]
            
        })
        this.tmv.attachMedia(video)
        this.tmv.load()  
    }

    render() {
        return (
            <React.Fragment>
                <h1> JS Components </h1>
                <div className="video-demo">
                    <h2>JS视频组件</h2>
                    <video id="tmv" src="https://nclive.grtn.cn/tvs5/sd/live.m3u8?_upt=89fcc32d1611663000&auth_key=1611657992-0-0-f570133c9e5293d0968c2b358acd38c1"></video>
                </div>
                <div className="audio-demo">
                    <h2>JS音频组件</h2>
                </div>
            </React.Fragment>
        )
    }
}

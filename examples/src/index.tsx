import React from 'react'

import Tmv from '@tmedia/tmv/src/index'

export default class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        const video = document.getElementById('tmv')
        const tmv = new Tmv({ 
            device: 'pc',
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
        tmv.attachMedia(video)
        tmv.load()  
    }

    render() {
        return (
            <React.Fragment>
                <h1> JS Components </h1>
                <div className="video-demo">
                    <h2>JS视频组件</h2>
                    <video id="tmv" src="https://tcdn.itouchtv.cn/zjpd/sd/live.m3u8?t_token=c52ae113d38224cc4dc2f7acecd3fb0c-3WJ8%2F0%2Bbi3HmSBl8MShrgsZuY6RLfYrn%2F%2ByJNn55ubhmCOpUSIGnk6uB00PunQfcbHA5QGSR15l27r1nxxM8CStF3o6iv1U8iS5JCb1UxeZEe%2FNPVGMBT9GR062bcomEHHj5e%2BWkrsq1%2BjXZziSwYEGY2zORminHxYLgjeap1%2BD%2Bpt%2FQrXMaFxqJqFo51Zie2tqHovUoy2S1stKkZ4KYbl7UcT50Rq6VdPOMxCnC1SM%3D"></video>
                </div>
                <div className="audio-demo">
                    <h2>JS音频组件</h2>
                </div>
            </React.Fragment>
        )
    }
}

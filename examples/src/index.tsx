import React from 'react'

import Tmv from '@tmedia/tmv/src/index'

export default class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        const video = document.getElementById('tmv')
        const tmv = new Tmv({ 
            device: 'mobile',
            type: 'hls', 
            toNextVideo: () => { alert('下一个视频回调函数') },
            definition: [
                {
                    name: 'fhd',
                    cName: '超清',
                    url:
                        'http://video2-cloud.itouchtv.cn/video/2020/03/10/45dca3e86339ab421583827925794923__hd.mp4'
                },
                {
                    name: 'hd',
                    cName: '高清',
                    url:
                        'http://video2-cloud.itouchtv.cn/video/2020/03/18/687d9605547661c31584506645569577__hd.mp4'
                },
                {
                    name: 'sd',
                    cName: '标清',
                    url:
                        'http://video2-cloud.itouchtv.cn/video/2020/06/04/0cd6b2d3e3899e771591262568549928__hd.mp4'
                }
            ]
            
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
                    <video id="tmv" src="https://nclive.grtn.cn/jjkt/sd/live.m3u8?_upt=edcdc3b91608109201&auth_key=1608104015-0-0-df54e630a29b9133939a7013b0790c58" controls></video>
                </div>
                <div className="audio-demo">
                    <h2>JS音频组件</h2>
                </div>
            </React.Fragment>
        )
    }
}

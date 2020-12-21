import React from 'react'

import Tmv from '@tmedia/tmv/src/index'

export default class App extends React.Component<any, any> {
    tmv: any
    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        const video = document.getElementById('tmv')
        this.tmv = new Tmv({ 
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
        this.tmv.attachMedia(video)
        this.tmv.load()  
    }
    a = () => {
        const video: any = document.getElementById('tmv')
        video.src="https://nclive.grtn.cn/typd/sd/live.m3u8?_upt=fd3622bc1608523800&auth_key=1608518744-0-0-88a0102375a4aa0c768d901efbed33da"
        console.log(111)
        // this.tmv.destory()
        this.tmv.load() 
    }

    render() {
        return (
            <React.Fragment>
                <h1> JS Components </h1>
                <div className="video-demo">
                    <h2>JS视频组件</h2>
                    <video id="tmv" src="https://tcdn.itouchtv.cn/live/gdws.m3u8?t_token=637b1d4b9d90bc2dac1685e8db36045e-Iz03D6ceOZZCIuqGbB5cy3z1YyrQ2XuISm8S0qnkyN0w8b3EivMjc%2BsLnCWumQXt3nyYLn0nPu3UPvTan%2FMhCA9uViH6x8mnADfF2xVw4ovLz8z4TRv6WDoI%2FaFMeF8x7CzzqCq506I1QYBlSIWH1ukeqz%2FjQFPeqZ6CB%2BkB9LzxOg%2FmISOnfUJJnIDmFEf%2F"></video>
                </div>
                <div className="audio-demo">
                    <h2 onClick={this.a}>JS音频组件</h2>
                </div>
            </React.Fragment>
        )
    }
}

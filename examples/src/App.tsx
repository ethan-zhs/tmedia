import React from 'react'

import Tmvr from '@tmedia/tmv/src/ReactApp'
import Tmar from '@tmedia/tma/src/ReactApp'

export default class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1> React Components </h1>
                <div className="video-demo">
                    <h2>React视频组件</h2>
                    <a href="http://demo.itouchtv.cn:7777">aaa</a>
                    <Tmvr
                        poster="https://img2-cloud.itouchtv.cn/news/877c305a8fce17015150622dad25be06.png"
                        url="http://video2-cloud.itouchtv.cn/video/2020/06/04/0cd6b2d3e3899e771591262568549928__hd.mp4"
                        toNextVideo={() => {
                            alert('下一个视频的回调')
                        }}
                        mute={true}
                    />
                </div>
                <div className="audio-demo">
                    <h2>React音频组件</h2>
                    <Tmar />
                </div>
            </div>
        )
    }
}

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
                    <a href="http://demo.itouchtv.cn:7777">测试跳转自动播放</a>
                    <Tmvr
                        poster="url"
                        url="url"
                        toNextVideo={() => {
                            alert('下一个视频的回调')
                        }}
                        platform="mobile"
                        type="flv"
                        // controls={false}
                        autoPlay={true}
                        // mute={true}
                        // qualityList={[
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
                        // ]}
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

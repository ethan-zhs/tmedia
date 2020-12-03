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
                        poster="https://img2-cloud.itouchtv.cn/news/877c305a8fce17015150622dad25be06.png"
                        // url="https://wslizhi.gdtv.cn/live/gdws.m3u8?auth_key=1606463949-0-0-057d8173e4e7240542f883d6ba85a191"
                        // url="https://pili-live-hdl.itouchtv.cn/touchtv-1/5fbdb08ea3d5ec2d5128f3a9.flv"
                        // url="https://vod.gdtv.cn/m3u8/202011/160614192836.m3u8"
                        // url="https://sitecdn.itouchtv.cn/sitecdn/assets/videos/demo.flv"
                        url="http://video2-cloud.itouchtv.cn/video/2020/03/10/45dca3e86339ab421583827925794923__hd.mp4"
                        toNextVideo={() => {
                            alert('下一个视频的回调')
                        }}
                        platform="pc"
                        type="mp4"
                        // controls={false}
                        autoPlay={false}
                        // mute={true}
                        qualityList={[
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
                        ]}
                        playbackRateList={[
                            {
                                value: '0.5'
                            },
                            {
                                value: '1.0',
                                default: true
                            },
                            {
                                value: '1.25'
                            },
                            {
                                value: '1.5'
                            },
                            {
                                value: '2.5'
                            }
                        ]}
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

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

    render() {
        return (
            <React.Fragment>
                <h1> JS Components </h1>
                <div className="video-demo">
                    <h2>JS视频组件</h2>
                    <video id="tmv" src="https://tcdn.itouchtv.cn/live/gdws.m3u8?t_token=f04c0e8129482f6a517866f0bcbec3f0-O7sJrLNiZfo7mGehqr7KLG3o8bIQbfI0TpODNU27YEWDvuoQt9%2BTYnDOx%2FIxlMmt8%2Fw952Uf50NZ%2BX%2BcY9cuycRmIhfr1vfc3kq92ILVZyqIEt7uxh7OFbVQZsPFOx%2BbQTFgIM6O5oyAFY%2FewE15uoyKyH55MJBXrnA%2B8G0f0ux%2FzwWZcl3ZZKFSbPUVNf32"></video>
                </div>
                <div className="audio-demo">
                    <h2>JS音频组件</h2>
                </div>
            </React.Fragment>
        )
    }
}

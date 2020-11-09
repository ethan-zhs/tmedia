import React from 'react'

import TestVideo from '@tmedia/video-player/src/ReactApp'
import TestAudio from '@tmedia/audio-player/src/ReactApp'

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
                    <TestVideo />
                </div>
                <div className="audio-demo">
                    <h2>React音频组件</h2>
                    <TestAudio />
                </div>
            </div>
        )
    }
}

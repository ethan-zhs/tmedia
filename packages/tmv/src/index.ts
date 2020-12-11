import Controls from './components/Controls'
import window from './global/window'
import { videoInitialize, createDomWithClass } from './utils'
import './index.less'

class Tmv {
    private _options: any
    private _video: any
    private _tmvWrapper: any
    constructor(options: any = {}) {
        this._options = options
    }

    attachMedia(video: any) {
        this._tmvWrapper = createDomWithClass('tmv-video-wrapper')

        this._video = video.cloneNode()
        this._video.controls = false
        this._video.setAttribute('class', 'tmv-video')
        this._video.src = this._options.src || this._video.src

        this._tmvWrapper.appendChild(this._video)

        video.parentNode?.replaceChild(this._tmvWrapper, video)
    }

    load() {
        this._video && this._video.load()
    }

    play() {
        const { type, autoPlay } = this._options
        videoInitialize({ type, autoPlay, video: this._video }, (err: any) => {
            console.log(err)
        })

        const controls = new Controls(this._video, this._options)

        this._tmvWrapper.appendChild(controls.el())
    }
}

window.Tmv = Tmv

export default Tmv

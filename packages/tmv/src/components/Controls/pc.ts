import Fullscreen from '../Fullscreen'
import Progress from '../Progress'
import Loading from '../Loading'
import Bezel from '../Bezel'
import NextVideo from '../NextVideo'
import PlayBtn from '../PlayBtn'
import Volume from '../Volume'
import Setting from '../Setting'
import Timer from '../Timer'
import PlaybackRate from '../PlaybackRate'
import Definition from '../Definition'
import { createDomWithClass } from '../../utils'

const PCControls = {
    _timer: null,
    _video: null,
    _options: {},

    renderControls() {
        const controls = createDomWithClass('tmv-controls tmv-controls-hide')
        const controlsBar = createDomWithClass('tmv-controls-bar')
        const controlsCom = createDomWithClass('tmv-controls-coms')

        controlsCom.appendChild(PlayBtn.render(this._video, this.handleVideoPlay.bind(this)))
        // controlsCom.appendChild(NextVideo.render(this._options.toNextVideo))
        // controlsCom.appendChild(Timer.render(this._video))
        controlsCom.appendChild(createDomWithClass('tmv-controls-title'))
        controlsCom.appendChild(Definition.render(this._video, this._options))
        controlsCom.appendChild(PlaybackRate.render(this._video, this._options))
        controlsCom.appendChild(Volume.render(this._video))
        controlsCom.appendChild(Setting.render())
        // controlsCom.appendChild(Fullscreen.render(this._video))

        controlsBar.appendChild(Progress.render(this._video, Loading.progressSlidingChange))
        controlsBar.appendChild(controlsCom)
        controls.appendChild(controlsBar)

        controlsBar.onclick = e => e.stopPropagation()
        controlsBar.ondblclick = e => e.stopPropagation()

        return controls
    },

    clearTimer() {
        if (this._timer) {
            clearTimeout(this._timer)
            this._timer = null
        }
    },

    handleVideoPlay(e: any) {
        e && e.stopPropagation()
        const paused = this._video.paused
        paused ? this._video.play() : this._video.pause()
        Bezel.bezelChange(paused ? 'play' : 'pause')
    },

    render(video: any, options: any) {
        this._video = video
        this._options = options

        const controlMark = createDomWithClass('tmv-controls-mark')
        const controls = this.renderControls()
        const loading = Loading.render(this._video)

        controlMark.appendChild(Bezel.render())
        controlMark.appendChild(loading)
        controlMark.appendChild(controls)
        controlMark.addEventListener('mousemove', () => {
            controls.classList.remove('tmv-controls-hide')
            this.clearTimer()

            this._timer = setTimeout(() => {
                !this._video.paused && controls.classList.add('tmv-controls-hide')
                this.clearTimer()
            }, 3000)
        })

        controlMark.addEventListener('mouseleave', () => {
            !this._video.paused && controls.classList.add('tmv-controls-hide')
            this.clearTimer()
        })

        controlMark.addEventListener('click', this.handleVideoPlay.bind(this))
        controlMark.addEventListener('dblclick', () => {
            const clickEvent = document.createEvent('MouseEvents')
            clickEvent.initEvent('dblclick', true, true)
            this._video.dispatchEvent(clickEvent)
        })

        return controlMark
    }
}

export default PCControls

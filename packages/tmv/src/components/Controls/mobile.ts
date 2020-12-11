import Fullscreen from '../Fullscreen'
import Progress from '../Progress'
import Loading from '../Loading'
import Bezel from '../Bezel'
import NextVideo from '../NextVideo'
import Timer from '../Timer'
import { createDomWithClass } from '../../utils'

const MobileControls = {
    _timer: null,
    _video: null,
    _options: {},
    _isProgressSliding: false,
    _controls: null,
    _isVisible: false,

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

    toggleControls(visible: boolean) {
        if (visible) {
            this._controls.classList.remove('tmv-m-controls-hide')
        } else {
            this._controls.classList.add('tmv-m-controls-hide')
        }
        this._isVisible = visible
    },

    handleMackClick() {
        this.toggleControls(!this._isVisible)
        this.clearTimer()

        if (this._isVisible) {
            this._timer = setTimeout(() => {
                this.toggleControl(false)
                this.clearTimer()
            }, 4000)
        }
    },

    render(video: any, options: any) {
        this._video = video
        this._options = options

        const controlsMark: any = createDomWithClass('tmv-controls-mark')
        this._controls = createDomWithClass('tmv-m-controls tmv-m-controls-hide')
        const controlsBigBtn = createDomWithClass('tmv-big-play-btn')
        const controlsBarBox = createDomWithClass('tmv-m-controls-bar-box')
        const controlsBar = createDomWithClass('tmv-m-controls-bar')
        const progress = createDomWithClass('tmv-m-progress-bar')
        const loading = Loading.render(this._video)

        controlsBar.onclick = e => e.stopPropagation()
        controlsBarBox.appendChild(controlsBar)
        progress.appendChild(Progress.render(this._video, Loading.progressSlidingChange))

        // controlsBar.appendChild(NextVideo.render(this._options.toNextVideo))
        // controlsBar.appendChild(Timer.render(this._video))
        controlsBar.appendChild(progress)
        // controlsBar.appendChild(Fullscreen.render(this._video))

        this._controls.appendChild(loading)
        this._controls.appendChild(controlsBigBtn)
        this._controls.appendChild(controlsBarBox)

        controlsBigBtn.innerHTML = `
            <div class="tmv-big-play-btn-icon">
                <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                    <path
                        class="tmv-svg-fill"
                        d="${
                            true
                                ? 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'
                                : 'M 13,26 19.5,22 19.5,14 13,10 z M 19.5,22 26,18 26,18 19.5,14 z'
                        }"></path>
                </svg>
            </div>`

        controlsMark.appendChild(this._controls)
        controlsMark.onclick = this.handleMackClick.bind(this)
        controlsBigBtn.onclick = this.handleVideoPlay.bind(this)

        return controlsMark
    }
}

export default MobileControls

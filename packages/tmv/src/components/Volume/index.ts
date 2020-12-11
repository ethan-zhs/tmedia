import { createDomWithClass } from '../../utils'
import SvgBtn from '../SvgBtn'
import Popover from '../Popover'

import './index.less'

const popover = new Popover()

const Volume = {
    _video: null,
    _volumeElem: null,
    _volume: 0,

    initVolumeData(options: any) {
        const tmvVolume: any = localStorage.getItem('tmv-volume') || 1
        const tmvMuted: any = localStorage.getItem('tmv-muted') || '0'
        const { mute, volume = tmvVolume } = options
        const isMuted = mute || tmvMuted === '1'

        this._volume = volume || this._volume
        this.volumeChange(isMuted)
    },

    volumeChange(isMuted: boolean) {
        const svgBtn = this._volumeElem.querySelector('.tmv-svg-fill')
        svgBtn.setAttribute(
            'd',
            isMuted
                ? 'm 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z'
                : 'M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z'
        )

        this.volumeSliderPercent.style.height = `${isMuted ? 0 : this._volume * 100}%`

        this._video.volume = this._volume
        this._video.muted = isMuted
    },

    showSlider() {
        const isMuted = this._video.muted
        const popoverVisible = popover.getPopoverVisibility()
        const mute = !popoverVisible ? false : !isMuted
        localStorage.setItem('tmv-muted', mute ? '1' : '0')

        popover.popoverShow()
        this.volumeChange(mute)
    },

    slideStart() {
        document.addEventListener('mousemove', this.slideMoveOrClick, false)
        document.addEventListener('mouseup', this.slideEnd, false)
    },

    slideMoveOrClick(e: any) {
        try {
            const maxHeight = this.volumeSliderBase.clientHeight
            const { top } = this.volumeSliderBase.getBoundingClientRect()

            let my = e.pageY - top - document.documentElement.scrollTop // 滑动的距离
            my = my > maxHeight ? maxHeight : my < 0 ? 0 : my

            this._volume = 1 - my / maxHeight || this._volume
            localStorage.setItem('tmv-volume', this._volume)
            localStorage.setItem('tmv-muted', this._volume === 0 ? '1' : '0')

            this.volumeChange(this._volume === 0)
        } catch (err) {}
    },

    slideEnd() {
        document.removeEventListener('mousemove', this.slideMoveOrClick, false)
        document.removeEventListener('mouseup', this.slideEnd, false)
    },

    volumeSlider() {
        const volumeSlider = createDomWithClass('tmv-volume-slider')
        this.volumeSliderBase = createDomWithClass('tmv-volume-slider-base')
        this.volumeSliderPercent = createDomWithClass('tmv-volume-slider-percent')
        const volumeSliderPoint = createDomWithClass('tmv-volume-slider-point')

        volumeSlider.appendChild(this.volumeSliderBase)
        this.volumeSliderBase.appendChild(this.volumeSliderPercent)
        this.volumeSliderPercent.appendChild(volumeSliderPoint)

        this.slideMoveOrClick = this.slideMoveOrClick.bind(this)
        this.slideEnd = this.slideEnd.bind(this)
        this.slideStart = this.slideStart.bind(this)

        volumeSlider.onclick = e => e.stopPropagation()
        this.volumeSliderBase.onclick = this.slideMoveOrClick
        volumeSliderPoint.onmousedown = this.slideStart

        return volumeSlider
    },

    render(video: any, options: any = {}) {
        const volume = createDomWithClass('tmv-controls-volume')
        const volumeBtn = createDomWithClass('tmv-controls-volume-btn')

        this._video = video
        this._volumeElem = volume

        volumeBtn.innerHTML = `
            <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                <path class="tmv-svg-fill" d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"></path>
            </svg>`

        volume.appendChild(popover.render(volumeBtn, this.volumeSlider()))
        volumeBtn.onclick = null
        volume.onclick = this.showSlider.bind(this)
        this.initVolumeData(options)

        return SvgBtn.render(volume)
    }
}

export default Volume

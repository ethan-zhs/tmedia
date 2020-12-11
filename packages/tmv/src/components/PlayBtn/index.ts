import { createDomWithClass } from '../../utils'
import SvgBtn from '../SvgBtn'

import './index.less'

const PlayBtn = {
    render(video: any, handleVideoPlay: any) {
        const playBtn = createDomWithClass('tmv-play-btn')
        playBtn.onclick = handleVideoPlay

        const pausePath = 'M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z'
        const playPath = 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'

        playBtn.innerHTML = `
                <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                    <path class="tmv-svg-fill" d="${pausePath}"></path>
                </svg>`

        const playBtnSvgPath = playBtn.querySelector('.tmv-svg-fill')

        video.addEventListener('play', () => {
            playBtnSvgPath?.setAttribute('d', playPath)
        })

        video.addEventListener('pause', () => {
            playBtnSvgPath?.setAttribute('d', pausePath)
        })

        return SvgBtn.render(playBtn)
    }
}

export default PlayBtn

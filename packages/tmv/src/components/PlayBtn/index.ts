import Component from '../Component'

import './index.less'

class PlayBtn extends Component {
    constructor(player: any, options: any) {
        super(player, options)

        this.render()
    }

    render() {
        this.addClass('tmv-play-btn')

        const pausePath = 'M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z'
        const playPath = 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'

        this.html(`
            <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                <path class="tmv-svg-fill" d="${pausePath}"></path>
            </svg>`)

        const playBtnSvgPath = this.el().querySelector('.tmv-svg-fill')

        this.on(this.player_, 'play', () => {
            playBtnSvgPath?.setAttribute('d', playPath)
        })

        this.on(this.player_, 'pause', () => {
            playBtnSvgPath?.setAttribute('d', pausePath)
        })

        // 派发视频点击事件
        this.on(this.el(), 'click', () => {
            const clickEvent = document.createEvent('MouseEvents')
            clickEvent.initEvent('click', true, true)
            this.player_.dispatchEvent(clickEvent)
        })
    }
}

Component.registerComponent('PlayBtn', PlayBtn)

export default PlayBtn

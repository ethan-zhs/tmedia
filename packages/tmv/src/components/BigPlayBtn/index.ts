import Component from '../Component'

import './index.less'

class BigPlayBtn extends Component {
    constructor(player: any, options: any) {
        super(player, options)

        this.render()
    }

    render() {
        this.addClass('tmv-big-play-btn')

        const pausePath = 'M 13,26 19.5,22 19.5,14 13,10 z M 19.5,22 26,18 26,18 19.5,14 z'
        const playPath = 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'

        this.html(`
        <div class="tmv-big-play-btn-icon">
            <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                <path
                    class="tmv-svg-fill"
                    d="${pausePath}"></path>
            </svg>
        </div>`)

        const playBtnSvgPath = this.el().querySelector('.tmv-svg-fill')

        this.on(this.player_, 'play', () => {
            playBtnSvgPath?.setAttribute('d', playPath)
        })

        this.on(this.player_, 'pause', () => {
            playBtnSvgPath?.setAttribute('d', pausePath)
        })

        this.on(this.el(), 'click', (e: any) => {
            e.stopPropagation()
            const clickEvent = document.createEvent('MouseEvents')
            clickEvent.initEvent('click', true, true)
            this.player_.dispatchEvent(clickEvent)
        })
    }
}

Component.registerComponent('BigPlayBtn', BigPlayBtn)

export default BigPlayBtn

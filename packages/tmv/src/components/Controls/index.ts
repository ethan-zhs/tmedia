import Bezel from '../Bezel'
import Component from '../Component'

import './m'
import './pc'
import '../Loading'
import '../Bezel'

import './index.less'

class Controls extends Component {
    bezel_: any

    constructor(player: any, options: any) {
        super(player, options)

        const controls = options.device === 'mobile' ? 'MobileControls' : 'PCControls'

        this.addClass('tmv-controls-container')

        if (options.device !== 'mobile') {
            this.bezel_ = new Bezel(player, options)
            this.appendContent(this.bezel_.el())
        }

        this.initChildren(['Loading', controls])

        this.render()
    }

    handleVideoClick = (e: any) => {
        e && e.stopPropagation()
        const paused = this.player_.paused
        paused ? this.player_.play() : this.player_.pause()

        // 移动端不需要bezel组件
        if (this.options_.device !== 'mobile') {
            this.bezel_.bezelChange(paused ? 'play' : 'pause')
        }
    }

    togglePlay = () => {
        const paused = this.player_.paused
        paused ? this.player_.play() : this.player_.pause()
    }

    render() {
        this.on(this.player_, 'click', this.handleVideoClick)
    }
}

export default Controls

import Component from '../Component'

import './index.less'

class SvgBtn extends Component {
    constructor(player: any, options: any = {}) {
        super(player, options)

        this.addClass('tmv-svg-btn')
    }

    render(com: any, disabled?: boolean) {
        if (disabled) {
            this.addClass('tmv-svg-btn-disable')
        }
        this.appendContent(com)
    }
}

export default SvgBtn

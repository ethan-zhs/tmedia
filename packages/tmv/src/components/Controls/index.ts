// import MobileControls from './mobile'
import PCControls from './pc'
import Component from '../Component'

import './m'

import './index.less'

class Controls extends Component {
    constructor(player: any, options: any) {
        super(player, options)

        // const child = options.device === 'mobile' ? 'MobileControls' : 'PCControls'
        this.addClass('tmv-controls-container')
        const markEl: any = this.createEl('div', { class: 'tmv-controls-mark' })
        this.appendContent(markEl)
        this.initChildren(['MobileControls'], markEl)
    }
}

export default Controls

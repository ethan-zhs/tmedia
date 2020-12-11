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
        this.initChildren(['MobileControls'])
    }
}

export default Controls

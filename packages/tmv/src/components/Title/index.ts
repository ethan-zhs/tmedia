import Component from '../Component'

import './index.less'

class Title extends Component {
    constructor(player: any, options: any = {}) {
        super(player, options)

        this.render()
    }

    render() {
        this.addClass('tmv-controls-title')
    }
}

Component.registerComponent('Title', Title)

export default Title

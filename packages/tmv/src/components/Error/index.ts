import Component from '../Component'
import './index.less'

const ERROR_MESSAGES: any = {
    NETWORK_ERROR: '媒体类型不支持播放或文件路径无效'
}

class Error extends Component {
    constructor(player: any, options: any = {}) {
        super(player, options)
    }

    render(errorMessage: string) {
        this.addClass('tmv-error')
        this.html(ERROR_MESSAGES[errorMessage])
    }
}

Component.registerComponent('Error', Error)

export default Error

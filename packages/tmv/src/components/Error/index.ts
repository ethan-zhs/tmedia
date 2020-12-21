import Component from '../Component'
import './index.less'

const ERROR_MESSAGES: any = {
    NETWORK_ERROR: '媒体类型不支持播放或播放地址无效'
}

class Error extends Component {
    constructor(player: any, options: any = {}) {
        super(player, options)

        this.addClass('tmv-error')
        this.hide()
    }

    setErrorMessage(errorMessage: string) {
        this.show()
        this.html(errorMessage || ERROR_MESSAGES['NETWORK_ERROR'])
    }

    show() {
        this.removeClass('tmv-hide')
    }

    hide() {
        this.addClass('tmv-hide')
    }
}

Component.registerComponent('Error', Error)

export default Error

import * as React from 'react'
import './index.less'

interface IProp {
    errorMessage: string
}

class Error extends React.Component<IProp, any> {
    constructor(props: IProp) {
        super(props)
    }

    render() {
        const { errorMessage } = this.props
        const ERROR_MESSAGES: any = {
            NETWORK_ERROR: '媒体类型不支持播放或文件路径无效'
        }

        return <div className="tmv-error">{ERROR_MESSAGES[errorMessage]}</div>
    }
}

export default Error

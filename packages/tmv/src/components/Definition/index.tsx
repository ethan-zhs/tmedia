import * as React from 'react'
import classNames from 'classnames'
import Popover from '../Popover'
import './index.less'

interface IProps {
    videoId: string
    qualityList: Array<any>
    autoPlay: boolean
}

class Definition extends React.Component<IProps, any> {
    private video: any
    private videoCurrTime: any
    constructor(props: IProps) {
        super(props)

        this.state = {
            popoverVisible: false,
            currQuality: {}
        }
    }

    componentDidMount() {
        const { videoId } = this.props
        this.video = document.getElementById(videoId)

        this.initData()
    }

    render() {
        const { popoverVisible, currQuality = {} } = this.state
        const { qualityList = [] } = this.props

        return (
            <div className="tmv-quality">
                <Popover
                    visible={popoverVisible}
                    onVisibleChange={visible => {
                        this.setState({ popoverVisible: visible })
                    }}
                    content={
                        <div className="tmv-quality-list">
                            {qualityList.map(item => (
                                <div
                                    className={classNames({
                                        ['tmv-quality-item']: true,
                                        ['tmv-quality-item-active']: item.name === currQuality.name
                                    })}
                                    key={item.name}
                                    onClick={() => this.handleQualityChange(item, true)}>
                                    <div className="tmv-quality-name">{item.cName}</div>
                                </div>
                            ))}
                        </div>
                    }>
                    <div className="tmv-quality-btn">{currQuality ? currQuality.cName : '画质'}</div>
                </Popover>
            </div>
        )
    }

    initData = () => {
        const { qualityList = [], autoPlay } = this.props
        const tmvDefinition: any = localStorage.getItem('tmv-definition') || {}

        const localDefinition = qualityList.filter(item => item.name === tmvDefinition)
        const defaultDefinition = qualityList.filter(item => item.url === this.video.src)

        let initDefinition = {}

        // 初始化时, 先看本地有没有清晰度设置记录，如果没有再看默认播放地址是否匹配的清晰度
        if (localDefinition.length) {
            initDefinition = localDefinition[0]
        } else if (defaultDefinition.length) {
            initDefinition = defaultDefinition[0]
        }

        this.handleQualityChange(initDefinition, autoPlay)
    }

    handleQualityChange = (item: any, autoPlay: boolean = false) => {
        // 记录上个视频的播放时间
        this.videoCurrTime = this.video.currentTime

        this.video.src = item.url
        this.video.autoplay = autoPlay
        this.video.load()

        this.video.addEventListener('loadeddata', this.changeVideoTime, false)

        this.setState({
            popoverVisible: false,
            currQuality: item
        })
        localStorage.setItem('tmv-definition', item.name)
    }

    // 修改播放源后还原当前播放时间
    changeVideoTime = () => {
        this.video.currentTime = this.videoCurrTime
        this.video.removeEventListener('loadeddata', this.changeVideoTime, false)
    }
}

export default Definition

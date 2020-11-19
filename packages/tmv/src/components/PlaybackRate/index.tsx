import * as React from 'react'
import classNames from 'classnames'
import Popover from '../Popover'
import './index.less'

interface IProps {
    videoId: string
    playbackRateList?: Array<any>
}

class PlaybackRate extends React.Component<IProps, any> {
    private video: any
    private playbackRateList: Array<any>
    constructor(props: IProps) {
        super(props)

        this.state = {
            popoverVisible: false,
            currRate: null
        }

        this.playbackRateList = [
            {
                value: '0.5'
            },
            {
                value: '1.0',
                default: true
            },
            {
                value: '1.25'
            },
            {
                value: '1.5'
            },
            {
                value: '2.0'
            }
        ]
    }

    componentDidMount() {
        const { videoId } = this.props
        this.video = document.getElementById(videoId)

        this.initData()
    }

    render() {
        const { popoverVisible, currRate } = this.state
        const { playbackRateList = this.playbackRateList } = this.props

        return (
            <div className="tmv-playbackrate">
                <Popover
                    visible={popoverVisible}
                    onVisibleChange={visible => {
                        this.setState({ popoverVisible: visible })
                    }}
                    content={
                        <div className="tmv-playbackrate-list">
                            {playbackRateList.map((item: any) => (
                                <div
                                    className={classNames({
                                        ['tmv-playbackrate-item']: true,
                                        ['tmv-playbackrate-item-active']: item.value === currRate
                                    })}
                                    key={item.value}
                                    onClick={() => this.handleChangeRate(item.value)}>
                                    {item.value}x
                                </div>
                            ))}
                        </div>
                    }>
                    <div className="tmv-playbackrate-btn">{currRate == 1 ? '倍速' : `${currRate}x`}</div>
                </Popover>
            </div>
        )
    }

    initData = () => {
        const { playbackRateList = this.playbackRateList } = this.props

        const localRate = playbackRateList.filter((item: any) => item.value == localStorage.getItem('tmv-playbackrate'))
        const defaultRate = playbackRateList.filter((item: any) => item.default)

        // 优先级，先判断本地，再判断默认值, 否则取1
        let defaultRateValue = 1

        if (localRate.length) {
            defaultRateValue = localRate[0].value
        } else if (defaultRate.length) {
            defaultRateValue = defaultRate[0].value
        }

        this.setState({ currRate: defaultRateValue })
        this.video.playbackRate = defaultRateValue
    }

    handleChangeRate = (rate: string | number) => {
        this.video.playbackRate = rate
        this.setState({
            popoverVisible: false,
            currRate: rate
        })

        localStorage.setItem('tmv-playbackrate', rate.toString())
    }
}

export default PlaybackRate

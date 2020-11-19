import * as React from 'react'
import Popover from '../Popover'
import './index.less'

class Quality extends React.Component<any, any> {
    private video: any
    constructor(props: any) {
        super(props)

        this.state = {
            popoverVisible: false
        }
    }

    componentDidMount() {
        const { videoId } = this.props
        this.video = document.getElementById(videoId)
    }

    render() {
        const { popoverVisible } = this.state

        const playbackRateList = ['0.5', '1.0', '1.25', '1.5', '2.0']

        return (
            <div className="tmv-controls-quality">
                <Popover
                    visible={popoverVisible}
                    onVisibleChange={visible => {
                        this.setState({ popoverVisible: visible })
                    }}
                    content={
                        <div className="tmv-playbackrate-list">
                            {playbackRateList.map(item => (
                                <div
                                    className="tmv-playbackrate-item"
                                    key={item}
                                    onClick={() => this.handleChangeRate(item)}>
                                    {item}x
                                </div>
                            ))}
                        </div>
                    }>
                    <div className="tmv-quality-btn">画质</div>
                </Popover>
            </div>
        )
    }

    handleChangeRate = (rate: string | number) => {
        this.video.playbackRate = rate
        this.setState({ popoverVisible: false })
    }
}

export default Quality

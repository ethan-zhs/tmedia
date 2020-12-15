import Component from '../Component'
import Popover from '../popover'

import './index.less'

const DEFAULT_LIST = [
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
class PlaybackRate extends Component {
    popover_: any
    currRate_: string | number
    playbackrateBtn_: any
    playbackRateElemList_: any
    playbackRateList_: any

    constructor(player: any, options: any) {
        super(player, options)

        this.popover_ = new Popover(player, options)
        this.render()
    }

    initPlaybackRateData = () => {
        this.playbackRateList_ = this.options_.playbackRateList || DEFAULT_LIST

        const localRate = this.playbackRateList_.filter(
            (item: any) => item.value == localStorage.getItem('tmv-playbackrate')
        )
        const defaultRate = this.playbackRateList_.filter((item: any) => item.default)

        // 优先级，先判断本地，再判断默认值, 否则取1
        let defaultRateValue = 1

        if (localRate.length) {
            defaultRateValue = localRate[0].value
        } else if (defaultRate.length) {
            defaultRateValue = defaultRate[0].value
        }

        return defaultRateValue
    }

    changePlaybackRate = (rate: string | number) => {
        this.currRate_ = rate
        this.playbackrateBtn_.innerHTML = `${this.currRate_ == 1 ? '倍速' : this.currRate_ + 'x'}`
        this.player_.playbackRate = this.currRate_

        this.playbackRateElemList_.map(({ dom, value }: any) => {
            if (value === rate) {
                this.addClass('tmv-playbackrate-item-active', dom)
            } else {
                this.removeClass('tmv-playbackrate-item-active', dom)
            }
        })
    }

    handleChangeRate = (rate: string | number) => {
        this.changePlaybackRate(rate)
        this.popover_.popoverHide()

        localStorage.setItem('tmv-playbackrate', rate.toString())
    }

    playbackRateList = (rate: string | number) => {
        const playbackRateListElem = this.createEl('div', { class: 'tmv-playbackrate-list' })
        this.playbackRateElemList_ = this.playbackRateList_.map((item: any) => {
            const pbrItem = this.createEl('div', { class: 'tmv-playbackrate-item' })
            pbrItem.onclick = () => this.handleChangeRate(item.value)
            pbrItem.innerHTML = `${item.value}x`
            playbackRateListElem.appendChild(pbrItem)
            return {
                value: item.value,
                dom: pbrItem
            }
        })

        this.changePlaybackRate(rate)

        return playbackRateListElem
    }

    render() {
        this.addClass('tmv-playbackrate')
        this.playbackrateBtn_ = this.createEl('div', { class: 'tmv-playbackrate-btn' })

        const currRate = this.initPlaybackRateData()
        this.appendContent(this.popover_.render(this.playbackrateBtn_, this.playbackRateList(currRate)))
    }
}

Component.registerComponent('PlaybackRate', PlaybackRate)

export default PlaybackRate

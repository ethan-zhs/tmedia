import { createDomWithClass } from '../../utils'
import Popover from '../popover'

import './index.less'

const popover = new Popover()

const PlaybackRate = {
    _video: null,
    _currRate: '1.0',
    _playbackrateBtn: null,
    _playbackRateElemList: [],
    _playbackRateList: [
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
    ],

    initPlaybackRateData(options: any) {
        const { playbackRateList = this._playbackRateList } = options

        const localRate = playbackRateList.filter((item: any) => item.value == localStorage.getItem('tmv-playbackrate'))
        const defaultRate = playbackRateList.filter((item: any) => item.default)

        // 优先级，先判断本地，再判断默认值, 否则取1
        let defaultRateValue = 1

        if (localRate.length) {
            defaultRateValue = localRate[0].value
        } else if (defaultRate.length) {
            defaultRateValue = defaultRate[0].value
        }

        this._playbackRateList = playbackRateList
        this.changePlaybackRate(defaultRateValue)
    },

    changePlaybackRate(rate: string | number) {
        this._currRate = rate
        this._playbackrateBtn.innerHTML = `${this._currRate == 1 ? '倍速' : this._currRate + 'x'}`
        this._video.playbackRate = this._currRate

        this._playbackRateElemList.map(({ dom, value }: any) => {
            if (value === rate) {
                dom.classList.add('tmv-playbackrate-item-active')
            } else {
                dom.classList.remove('tmv-playbackrate-item-active')
            }
        })
    },

    handleChangeRate(rate: string | number) {
        this.changePlaybackRate(rate)
        popover.popoverHide()

        localStorage.setItem('tmv-playbackrate', rate.toString())
    },

    playbackRateList() {
        const playbackRateListElem = createDomWithClass('tmv-playbackrate-list')
        this._playbackRateElemList = this._playbackRateList.map((item: any) => {
            const pbrItem = createDomWithClass('tmv-playbackrate-item')
            pbrItem.onclick = () => this.handleChangeRate(item.value)
            pbrItem.innerHTML = `${item.value}x`
            playbackRateListElem.appendChild(pbrItem)
            return {
                value: item.value,
                dom: pbrItem
            }
        })

        return playbackRateListElem
    },

    render(video: any, options: any = {}) {
        const playbackrate = createDomWithClass('tmv-playbackrate')
        this._playbackrateBtn = createDomWithClass('tmv-playbackrate-btn')

        this._video = video

        playbackrate.appendChild(popover.render(this._playbackrateBtn, this.playbackRateList()))
        this.initPlaybackRateData(options)

        return playbackrate
    }
}

export default PlaybackRate

import { videoInitialize } from '../../utils'
import Component from '../Component'
import Popover from '../Popover'
import './index.less'

class Definition extends Component {
    popover_: any
    videoCurrTime_: 0
    definitionBtn_: any
    definitionList_: Array<any>
    definition_: Array<any>

    constructor(player: any, options: any) {
        super(player, options)

        const { definition = [] } = options

        this.popover_ = new Popover(player, options)
        this.addClass('tmv-definition')

        definition && definition.length && this.render()
    }

    initPlaybackRateData() {
        const tmvDefinition: any = localStorage.getItem('tmv-definition') || {}

        const localDefinition = this.definition_.filter((item: any) => item.name === tmvDefinition)
        const defaultDefinition = this.definition_.filter((item: any) => item.url === this.player_.src)

        let initDefinition = {}

        // 初始化时, 先看本地有没有清晰度设置记录，如果没有再看默认播放地址是否匹配的清晰度
        if (localDefinition.length) {
            initDefinition = localDefinition[0]
        } else if (defaultDefinition.length) {
            initDefinition = defaultDefinition[0]
        } else if (this.definition_.length) {
            initDefinition = this.definition_[0]
        }

        this.changeDefinition(initDefinition, false)
    }

    changeDefinition = (item: any, _autoPlay?: boolean) => {
        const { autoPlay = false } = this.options_

        // 先判断是否传入自动播放, 如果没有判断配置是否配置自动播放
        _autoPlay = _autoPlay || autoPlay

        // 记录上个视频的播放时间
        this.videoCurrTime_ = this.player_.currentTime

        this.player_.src = item.url
        this.player_.autoplay = _autoPlay

        this.player_.addEventListener('loadeddata', this.changeVideoTime, false)

        this.definitionBtn_.innerHTML = item.cName

        this.definitionList_.map(({ dom, value }: any) => {
            if (value === item.name) {
                dom.classList.add('tmv-definition-item-active')
            } else {
                dom.classList.remove('tmv-definition-item-active')
            }
        })

        localStorage.setItem('tmv-definition', item.name)
    }

    // 修改播放源后还原当前播放时间
    changeVideoTime = () => {
        this.player_.currentTime = this.videoCurrTime_
        this.player_.removeEventListener('loadeddata', this.changeVideoTime, false)
    }

    handleChangeDefinition = (item: any) => {
        const { type } = this.options_
        this.changeDefinition(item, true)

        // 只有点击切换清晰度时才重新初始化视频
        // 默认清晰度切换会在attachMedia时执行视频初始化
        videoInitialize({
            type,
            autoPlay: true,
            video: this.player_
        })
        this.popover_.popoverHide()
    }

    definitionList = () => {
        const definitionListElem = this.createEl('div', { class: 'tmv-definition-list' })
        this.definitionList_ = this.definition_.map((item: any) => {
            const definitionItem = this.createEl('div', { class: 'tmv-definition-item' })
            definitionItem.onclick = () => this.handleChangeDefinition(item)
            definitionItem.innerHTML = item.cName
            definitionListElem.appendChild(definitionItem)
            return {
                value: item.name,
                dom: definitionItem
            }
        })

        return definitionListElem
    }

    render() {
        this.definitionBtn_ = this.createEl('div', { class: 'tmv-definition-btn' })

        this.definition_ = this.options_.definition || []

        this.appendContent(this.popover_.render(this.definitionBtn_, this.definitionList()))
        this.initPlaybackRateData()
    }
}

Component.registerComponent('Definition', Definition)

export default Definition

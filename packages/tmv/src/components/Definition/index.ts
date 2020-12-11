import { createDomWithClass, videoInitialize } from '../../utils'
import Popover from '../Popover'
import './index.less'

const popover = new Popover()

const Definition = {
    _video: null,
    _options: {},
    _videoCurrTime: 0,
    _definitionBtn: null,
    _definitionList: [],
    _definition: [],

    initPlaybackRateData() {
        const tmvDefinition: any = localStorage.getItem('tmv-definition') || {}

        const localDefinition = this._definition.filter((item: any) => item.name === tmvDefinition)
        const defaultDefinition = this._definition.filter((item: any) => item.url === this._video.src)

        let initDefinition = {}

        // 初始化时, 先看本地有没有清晰度设置记录，如果没有再看默认播放地址是否匹配的清晰度
        if (localDefinition.length) {
            initDefinition = localDefinition[0]
        } else if (defaultDefinition.length) {
            initDefinition = defaultDefinition[0]
        } else if (this._definition.length) {
            initDefinition = this._definition[0]
        }

        this.changeDefinition(initDefinition, false)
    },

    changeDefinition(item: any, _autoPlay?: boolean) {
        const { autoPlay = false } = this._options

        // 先判断是否传入自动播放, 如果没有判断配置是否配置自动播放
        _autoPlay = _autoPlay || autoPlay

        // 记录上个视频的播放时间
        this._videoCurrTime = this._video.currentTime

        this._video.src = item.url
        this._video.autoplay = _autoPlay

        this._video.addEventListener('loadeddata', this.changeVideoTime, false)

        this._definitionBtn.innerHTML = item.cName

        this._definitionList.map(({ dom, value }: any) => {
            if (value === item.name) {
                dom.classList.add('tmv-definition-item-active')
            } else {
                dom.classList.remove('tmv-definition-item-active')
            }
        })

        localStorage.setItem('tmv-definition', item.name)
    },

    // 修改播放源后还原当前播放时间
    changeVideoTime() {
        this._video.currentTime = this._videoCurrTime
        this._video.removeEventListener('loadeddata', this.changeVideoTime, false)
    },

    handleChangeDefinition(item: any) {
        const { type } = this._options
        this.changeDefinition(item, true, type)

        // 只有点击切换清晰度时才重新初始化视频
        // 默认清晰度切换会在attachMedia时执行视频初始化
        videoInitialize({
            type: this._options.type,
            autoPlay: true,
            video: this._video
        })
        popover.popoverHide()
    },

    definitionList() {
        const definitionListElem = createDomWithClass('tmv-definition-list')
        this._definitionList = this._definition.map((item: any) => {
            const definitionItem = createDomWithClass('tmv-definition-item')
            definitionItem.onclick = () => this.handleChangeDefinition(item)
            definitionItem.innerHTML = item.cName
            definitionListElem.appendChild(definitionItem)
            return {
                value: item.name,
                dom: definitionItem
            }
        })

        return definitionListElem
    },

    render(video: any, options: any = {}) {
        const definition = createDomWithClass('tmv-definition')
        this._definitionBtn = createDomWithClass('tmv-definition-btn')

        this._video = video
        this._options = options
        this._definition = options.definition || []
        this.changeVideoTime = this.changeVideoTime.bind(this)

        definition.appendChild(popover.render(this._definitionBtn, this.definitionList()))
        this.initPlaybackRateData()

        return definition
    }
}

export default Definition

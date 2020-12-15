import Popover from '../Popover'

import './index.less'
import Component from '../Component'

class Setting extends Component {
    popover_: any
    isAutoPlay_: boolean

    constructor(player: any, options: any) {
        super(player, options)

        this.popover_ = new Popover(player, options)

        this.render()
    }

    nextVideoAutoPlay = () => {
        const autoPlaySitch = this.createEl('div', { class: 'tmv-switch' })
        autoPlaySitch.innerHTML = '<div class="tmv-switch-point"></div>'

        const changeNextVideoAutoPlay = (autoPlay: boolean) => {
            if (autoPlay) {
                this.addClass('tmv-switch-active', autoPlaySitch)
            } else {
                this.removeClass('tmv-switch-active', autoPlaySitch)
            }
        }

        this.isAutoPlay_ = localStorage.getItem('nextvideo-autoplayer') === '1'

        if (this.isAutoPlay_) {
            changeNextVideoAutoPlay(this.isAutoPlay_)
        }

        this.on(autoPlaySitch, 'click', () => {
            this.isAutoPlay_ = !this.isAutoPlay_
            localStorage.setItem('nextvideo-autoplayer', this.isAutoPlay_ ? '1' : '0')
            changeNextVideoAutoPlay(this.isAutoPlay_)
        })

        this.on(this.player_, 'ended', () => {
            const { toNextVideo } = this.options_
            this.isAutoPlay_ && toNextVideo && toNextVideo()
        })

        return autoPlaySitch
    }

    popoverContent = () => {
        const content = this.createEl('div', { class: 'tmv-setting-panel' })

        const coms: any = [{ name: '自动连播', com: this.nextVideoAutoPlay() }]

        coms.forEach((item: any) => {
            const settingItem = this.createEl('div', { class: 'tmv-setting-item' })
            const settingItemLabel = this.createEl('label')
            settingItemLabel.innerHTML = item.name
            this.appendContent(settingItemLabel, settingItem)
            this.appendContent(item.com, settingItem)
            this.appendContent(settingItem, content)
        })

        return content
    }

    render() {
        this.addClass('tmv-setting')
        const settingBtn = this.createEl('div', { class: 'tmv-setting-btn' })

        settingBtn.innerHTML = `
            <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                <path
                    class="tmv-svg-fill"
                    d="m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z"></path>
            </svg>`

        this.appendContent(this.popover_.render(settingBtn, this.popoverContent()))
    }
}

Component.registerComponent('Setting', Setting)

export default Setting

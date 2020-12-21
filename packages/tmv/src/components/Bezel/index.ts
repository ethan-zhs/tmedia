import Component from '../Component'
import './index.less'

class Bezel extends Component {
    bezelIcon_: any

    constructor(player: any, options: any) {
        super(player, options)

        this.render()
    }

    /**
     * 触发bezel显示
     *
     * @param {String} type 图标类型
     */
    bezelChange = (type: string) => {
        switch (type) {
            case 'play':
                this.bezelIcon_.innerHTML = `
                    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                        <path class="tmv-svg-fill" d="M 13,26 19.5,22 19.5,14 13,10 z M 19.5,22 26,18 26,18 19.5,14 z"></path>
                    </svg>`
                break
            case 'pause':
                this.bezelIcon_.innerHTML = `
                    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                        <path class="tmv-svg-fill" d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"></path>
                    </svg>`
                break
        }

        // 点击触发播放或暂停的动画效果
        this.removeClass('tmv-bezel-show')
        this.setTimer(() => {
            this.addClass('tmv-bezel-show')
            this.clearTimer()
        }, 10)
    }

    render() {
        this.addClass('tmv-bezel')
        this.addClass('tmv-bezel-show')
        this.bezelIcon_ = this.createEl('div', { class: 'tmv-bezel-icon' })

        this.appendContent(this.bezelIcon_)
    }
}

Component.registerComponent('Bezel', Bezel)

export default Bezel

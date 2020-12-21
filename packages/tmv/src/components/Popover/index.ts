import Component from '../Component'

import './index.less'

class Popover extends Component {
    popoverMark_: any

    constructor(player: any, options: any) {
        super(player, options)
    }

    /**
     * 获得popover显示状态
     */
    getPopoverVisibility = () => {
        return this.popoverMark_.getAttribute('class').indexOf('tmv-popover-hide') < 0
    }

    /**
     * 隐藏popover
     */
    popoverHide = () => {
        this.popoverMark_.classList.add('tmv-popover-hide')
    }

    /**
     * 显示popover
     */
    popoverShow = () => {
        this.popoverMark_.classList.remove('tmv-popover-hide')
    }

    render = (children: any, content: any) => {
        this.addClass('tmv-popover')
        const popoverPanel = this.createEl('div', { class: 'tmv-popover-panel' })

        this.popoverMark_ = this.createEl('div', { class: 'tmv-popover-mark tmv-popover-hide' })
        this.appendContent(popoverPanel, this.popoverMark_)
        this.appendContent(content, popoverPanel)
        this.appendContent(children)
        this.appendContent(this.popoverMark_)

        children.onclick = () => {
            const isVisible = this.getPopoverVisibility()
            isVisible ? this.popoverHide() : this.popoverShow()
        }
        this.on(this.el(), 'mouseleave', this.popoverHide)

        return this.el()
    }
}

Component.registerComponent('Popover', Popover)

export default Popover

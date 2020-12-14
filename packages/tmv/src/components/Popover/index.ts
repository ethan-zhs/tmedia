import Component from '../Component'

import './index.less'

class Popover extends Component {
    _popoverMark: any

    constructor(player: any, options: any) {
        super(player, options)
    }

    getPopoverVisibility = () => {
        return this._popoverMark.getAttribute('class').indexOf('tmv-popover-hide') < 0
    }

    popoverHide = () => {
        this._popoverMark.classList.add('tmv-popover-hide')
    }

    popoverShow = () => {
        this._popoverMark.classList.remove('tmv-popover-hide')
    }

    render = (children: any, content: any) => {
        this.addClass('tmv-popover')
        const popoverPanel = this.createEl('div', { class: 'tmv-popover-panel' })

        this._popoverMark = this.createEl('div', { class: 'tmv-popover-mark tmv-popover-hide' })
        this.appendContent(popoverPanel, this._popoverMark)
        this.appendContent(content, popoverPanel)
        this.appendContent(children)
        this.appendContent(this._popoverMark)

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

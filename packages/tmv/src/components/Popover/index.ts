import { createDomWithClass } from '../../utils'

import './index.less'

class Popover {
    private _popoverMark: any

    getPopoverVisibility = function () {
        return this._popoverMark.getAttribute('class').indexOf('tmv-popover-hide') < 0
    }

    popoverHide = function () {
        this._popoverMark.classList.add('tmv-popover-hide')
    }

    popoverShow = function () {
        this._popoverMark.classList.remove('tmv-popover-hide')
    }

    render = function (children: any, content: any) {
        const popover = createDomWithClass('tmv-popover')
        const popoverPanel = createDomWithClass('tmv-popover-panel')

        this._popoverMark = createDomWithClass('tmv-popover-mark tmv-popover-hide')
        this._popoverMark.appendChild(popoverPanel)

        popoverPanel.appendChild(content)
        popover.appendChild(children)
        popover.appendChild(this._popoverMark)

        children.onclick = () => {
            const isVisible = this.getPopoverVisibility()
            isVisible ? this.popoverHide() : this.popoverShow()
        }

        popover.addEventListener('mouseleave', this.popoverHide.bind(this))

        return popover
    }
}

export default Popover

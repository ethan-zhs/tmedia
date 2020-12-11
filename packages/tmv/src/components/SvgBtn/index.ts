import { createDomWithClass } from '../../utils'

import './index.less'

const SvgBtn = {
    render(com: any) {
        const svgBtn = createDomWithClass('tmv-svg-btn')
        svgBtn.appendChild(com)
        return svgBtn
    }
}

export default SvgBtn

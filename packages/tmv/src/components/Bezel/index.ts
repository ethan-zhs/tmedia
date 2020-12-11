import { createDomWithClass } from '../../utils'
import './index.less'

const Bezel = {
    _bezel: null,
    _bezelIcon: null,

    bezelChange(type: string) {
        switch (type) {
            case 'play':
                this._bezelIcon.innerHTML = `
                    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                        <path class="tmv-svg-fill" d="M 13,26 19.5,22 19.5,14 13,10 z M 19.5,22 26,18 26,18 19.5,14 z"></path>
                    </svg>`
                break
            case 'pause':
                this._bezelIcon.innerHTML = `
                    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                        <path class="tmv-svg-fill" d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"></path>
                    </svg>`
                break
        }
        this._bezel.classList.remove('tmv-bezel-show')
        setTimeout(() => {
            this._bezel.classList.add('tmv-bezel-show')
        }, 10)
    },

    render() {
        this._bezel = createDomWithClass('tmv-bezel tmv-bezel-show')
        this._bezelIcon = createDomWithClass('tmv-bezel-icon')

        this._bezel.appendChild(this._bezelIcon)
        return this._bezel
    }
}

export default Bezel

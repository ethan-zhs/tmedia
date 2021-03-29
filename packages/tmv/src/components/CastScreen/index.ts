import Component from '../Component'

import './index.less'

class CastScreen extends Component {
    constructor(player: any, options: any) {
        super(player, options)

        this.render()
    }

    render() {
        this.addClass('tmv-cast-screen')

        this.html(`
        <svg viewBox="0 0 1024 1024" width="26" height="26">
            <path class="tmv-svg-fill" d="M742.4 861.866667a21.333333 21.333333 0 0 1-17.066667 34.133333H298.666667a21.333333 21.333333 0 0 1-17.066667-34.133333l213.333333-284.458667a21.333333 21.333333 0 0 1 34.133334 0l213.333333 284.458667zM426.666667 810.666667h170.666666l-85.333333-113.92L426.666667 810.666667z m341.333333-85.333334h85.333333V213.333333H170.666667v512h85.333333v85.333334H127.658667A42.410667 42.410667 0 0 1 85.333333 768V170.666667c0-23.552 19.413333-42.666667 42.325334-42.666667h768.682666c23.381333 0 42.325333 18.986667 42.325334 42.666667v597.333333c0 23.552-19.413333 42.666667-42.325334 42.666667H768v-85.333334z" p-id="1936"></path>
        </svg>`)


        this.on(this.el(), 'click', (e: any) => {
            const { castScreen } = this.options_
            castScreen && castScreen()
        })
    }
}

Component.registerComponent('CastScreen', CastScreen)

export default CastScreen

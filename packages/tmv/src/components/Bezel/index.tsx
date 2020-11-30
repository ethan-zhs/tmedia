import * as React from 'react'
import './index.less'

interface IProps {
    type: string
}

class Bezel extends React.Component<IProps, any> {
    private bezelRef: any

    constructor(props: IProps) {
        super(props)

        this.state = {
            isLoading: false
        }

        this.bezelRef = React.createRef()
    }

    componentDidUpdate(preProps: any) {
        if (preProps.type !== this.props.type) {
            this.bezelRef.current.classList.remove('tmv-bezel-show')
            setTimeout(() => {
                this.bezelRef.current.classList.add('tmv-bezel-show')
            }, 10)
        }
    }

    render() {
        const { type } = this.props

        const a: any = {
            play: this.playingBezel(),
            pause: this.pauseBezel()
        }

        if (Object.keys(a).indexOf(type) < 0) {
            return null
        }

        return (
            <div className="tmv-bezel tmv-bezel-show" ref={this.bezelRef}>
                <div className="tmv-bezel-icon">{a[type]}</div>
            </div>
        )
    }

    playingBezel = () => {
        return (
            <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                <path
                    className="tmv-svg-fill"
                    d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
                    id="ytp-id-156"></path>
            </svg>
        )
    }

    pauseBezel = () => {
        return (
            <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                <path
                    className="tmv-svg-fill"
                    d="M 13,26 19.5,22 19.5,14 13,10 z M 19.5,22 26,18 26,18 19.5,14 z"
                    id="ytp-id-213"></path>
            </svg>
        )
    }
}

export default Bezel

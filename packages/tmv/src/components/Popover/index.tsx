import * as React from 'react'
import './index.less'

interface IProps {
    visible?: boolean
    content: React.ReactElement | string
    children: React.ReactElement
    onVisibleChange?: (visible: boolean, type?: string) => void
}

class Popover extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        this.updateVisibleFromProps()
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.visible !== this.props.visible) {
            this.updateVisibleFromProps()
        }
    }

    render() {
        const { children, content, visible } = this.props
        return (
            <div className="tmv-popover" onMouseLeave={this.handleMouseLeave}>
                {React.cloneElement(children, { onClick: this.togglePopover })}
                {(visible || this.state.visible) && (
                    <div className="tmv-popover-mark">
                        <div className="tmv-popover-panel">
                            {content}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    handleMouseLeave = () => {
        this.setState({ visible: false })
        this.onVisibleChange(false, 'mouseleave')
    }

    togglePopover = () => {
        this.setState(
            {
                visible: !this.state.visible
            },
            () => {
                this.onVisibleChange(this.state.visible, 'click')
            }
        )
    }

    updateVisibleFromProps = () => {
        const { visible = false } = this.props
        this.setState({ visible })
    }

    onVisibleChange = (visible: boolean, type?: string) => {
        const { onVisibleChange } = this.props
        onVisibleChange && onVisibleChange(visible, type)
    }
}

export default Popover

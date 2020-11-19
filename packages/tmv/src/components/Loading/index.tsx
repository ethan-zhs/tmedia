import * as React from 'react'
import './index.less'

class Loading extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div className="tmv-loading">
                <svg
                    className="tmv-loading-ico"
                    width="80px"
                    height="80px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid">
                    <circle
                        cx="50"
                        cy="50"
                        fill="rgba(0,0,0,0)"
                        stroke="#f8f8f8"
                        strokeWidth="4"
                        r="30"
                        strokeDasharray="120 100"></circle>
                </svg>
            </div>
        )
    }
}

export default Loading

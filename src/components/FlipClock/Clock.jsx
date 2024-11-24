import React, { Component } from "react";
import AppConsumer from "../../context/AppConsumer";
import "./index.scss";
import FlipClock from "./FlipClock";

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ... this.props
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {

        let { CRYPTOTimeremaining, CRYPTOStartDateClock  } = this.state.appProps;

        if(CRYPTOTimeremaining > 0 ) {
            return (
                <div className="clockbox" style={{ width: 270 }} >
                    <FlipClock
                        type="countdown"
                        count_to={CRYPTOStartDateClock}
                    />
                </div>
            )
        }else{
            return (
                <div className="clockbox" style={{ width: 270 }} >
                    <FlipClock
                        type="countup"
                        count_from={CRYPTOStartDateClock}
                    />
                </div>
            )
        }
    }
}

export default Clock;
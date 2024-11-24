import React, { Component } from "react";
import AppConsumer from "../../context/AppConsumer";
import "./index.scss";
import FlipClock from "./FlipClock";

class Clock1 extends Component {
    render() {
        return(
            <AppConsumer>
            {(appProps) => (
                <div className="clockbox" style={{width:270}} >
                    <FlipClock 
                        type = "countup"
                        count_from =  {appProps.CRYPTOStartDateClock}
                    />
                </div>
            )}
        </AppConsumer>
        )
    }
}

export default Clock1;
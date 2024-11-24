import React, { Component } from "react";
import AppConsumer from "../../context/AppConsumer";


class Bonus extends Component {
    render() {
        return (
            <AppConsumer>
                {(context) => {
                    return (
                        <p className="stikytext">
                            Bonus :
                            <br />
                            <span className="price">
                                {context.bidderBonus && 'Avaliable '}
                                {!context.bidderBonus && 'Not Avaliable'}
                            </span>
                        </p>
                    )
                }}
            </AppConsumer>
        )
    }

}

export default Bonus;
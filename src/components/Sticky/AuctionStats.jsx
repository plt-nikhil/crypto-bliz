import React, { Component } from "react";
import AppConsumer from "../../context/AppConsumer";


class CRYPTOStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
            ... this.props
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let { isHidden, appProps } = this.state;
        let { amountUpForCRYPTO, totalBonusTokens , CRYPTOStage , currentBidders } = appProps;

        let CRYPTOTokens = (amountUpForCRYPTO - totalBonusTokens)/ 1000000;

        if (appProps.CRYPTOTimeremaining < 0) {
            return (
                <p className="stikytext">
                    CRYPTO Status : <span className="price"> {appProps.CRYPTOStage} &nbsp;</span>
                    <br />
                    Bidding Status: <span className="price">{appProps.currentBidders} bidders own {CRYPTOTokens} million tokens.</span>
                </p>
            )
        } else {
            return (
                <p className="stikytext">CRYPTO Starts in : </p>
            )
        }
    }

}

export default CRYPTOStats;
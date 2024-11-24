import React, { Component } from "react";
import AppConsumer from "../../context/AppConsumer";


class Price extends Component {
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

        if (appProps.CRYPTOTimeremaining < 0) {
            return (
                <p className="stikytext">
                        Current price : 
                        <br/>
                        <span className="price">
                            { Number(appProps.ktyTokenPriceUSD).toFixed(2) }USD  
                            &nbsp;/&nbsp;
                            { Number(appProps.currentPrice).toFixed(4) }ETH
                        </span>
                </p>
            )
        } else {
            return (
                <p className="stikytext"></p>
            )
        }
    }

}

export default Price;
import React, { Component } from "react";
import AppConsumer from "../../context/AppConsumer";
import "./StickyHeader.css";


class Web3warning extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const {networkName, isWeb3Browser } = this.props.appProps;
        console.log('networkName : ', networkName, 'isWeb3Browser :', isWeb3Browser, typeof(isWeb3Browser) );

        return null;

        if(!isWeb3Browser) {

            return ( 
                <div className="network-banner--warning">
                    <div className="col">
                        <p className="text-center">Non-Ethereum browser detected. You should consider trying MetaMask!</p>
                    </div>
                </div>
             );
        
        }else if( isWeb3Browser && networkName !== 'main') {

            return ( 
                <div className="network-banner--warning">
                    <div className="col">
                        <p className="text-center">Connect to Mainnet via Metamask!</p>
                    </div>
                </div>
             );

        } else {
            return null;
        }
    }
}
 
export default Web3warning;
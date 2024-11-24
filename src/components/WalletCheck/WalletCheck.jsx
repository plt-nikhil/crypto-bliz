import React, { Component } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const messages = {
    "nowallet" : "To participate bid CRYPTO, you need a digital wallet. We support all digital wallets, like Metamask, Coinbase Wallet, or Trust.",
    "metamaskloked" : "Please unlock metamask",
    "nomainnetwork" : "Please Switch to Main Ethereum Network"
}

class WalletCheck extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ... this.props.appProps
        };
    }

    async componentDidMount() {
        const { web3 } = this.props.appProps;
        this.setState({web3});
        this.generateNotifications();
    }

    generateNotifications() {
        const { isMetamask, myAccounts, networkName } = this.state;
        let msg;

        if(isMetamask && myAccounts.length === 0) {
            msg = messages["metamaskloked"];
            NotificationManager.warning('', msg, 300000);
        }
        
        if(!isMetamask && myAccounts.length === 0 ) {
            msg = messages["nowallet"];
            NotificationManager.warning('', msg, 300000);
        }

        if(isMetamask && networkName !== "main") {
            msg = messages["nomainnetwork"]
            NotificationManager.error('', msg, 300000);
        }
    }

    render() {
        return (
            <div>            
                <NotificationContainer/>
            </div>
        )
    }
}
export default WalletCheck;

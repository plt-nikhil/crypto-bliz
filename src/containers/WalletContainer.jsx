import React, { Component } from "react";
import AppConsumer from  "../context/AppConsumer";
import WalletCheck from "../components/WalletCheck/WalletCheck"

class WalletContainer extends Component {
    render() {
        return (
            <AppConsumer>
                {(appProps) => (
                    <WalletCheck  appProps={appProps} />
                )}
            </AppConsumer>
        )
    }
}
export default WalletContainer;

import React, { Component } from "react";
import AppConsumer from  "../context/AppConsumer";
import Admin from "../components/MarketingAdmin/Admin"

class MarketingAdmin extends Component {
    render() {
        return (
            <AppConsumer>
                {(appProps) => (
                    <Admin  appProps={appProps} />
                )}
            </AppConsumer>
        )
    }
}
export default MarketingAdmin;

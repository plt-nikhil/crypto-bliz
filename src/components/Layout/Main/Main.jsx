import React, { Component } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import MainContainer from "../../../containers/MainContainer"
import WalletContainer from "../../../containers/WalletContainer";
import TestContainer from "../../../containers/Testcontainer";
import MarketingAdmin from "../../../containers/MarketingAdmin";

class Main extends Component {
    
    render() {
        return (
            
            <Switch>
                    <Route path="/" exact={true} component={MainContainer} />
                    <Route path="/wallet" component={WalletContainer} />
                    <Route path="/marketingadmin" component={MarketingAdmin} />
            </Switch> 
        );
    }
}

export default Main;

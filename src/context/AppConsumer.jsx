import React, { Component } from "react";

import AppContext from "./AppContext";

class AppConsumer extends Component {
    render() {
        return <AppContext.Consumer {...this.props} />;
    }
}

export default AppConsumer;

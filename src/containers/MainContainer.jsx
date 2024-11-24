import React, { Component } from "react";
import Section2 from "../components/Layout/Sections/Section2";
import crypto-bliz from "../components/Layout/Sections/crypto-bliz";
import Bid from "../components/Layout/Sections/Bid";
import Claim from "../components/Layout/Sections/Claim";
import Section7 from "../components/Layout/Sections/Section7";
import TeamMembers from "../components/Layout/Sections/Team/TeamMembers";
import AppConsumer from  "../context/AppConsumer";

import Header from "../components/Layout/Header/Header";
import StickyHeader from "../components/Sticky/StickyHeader";
import Popup from "../components/Popup/Popup";
import Footer from "../components/Layout/Footer/Footer";


class MainContainer extends Component {
    render() {
        return (
            <div>
                <main>
                    <AppConsumer>
                        {(appProps) => ( <Popup appProps={appProps} />  )}
                    </AppConsumer>
                    <StickyHeader enabled={true} />
                    <AppConsumer>
                            {(appProps) => ( <Header appProps={appProps} /> )}
                    </AppConsumer>

                    <Section2 />
                    <crypto-bliz />
                    <AppConsumer>
                        {(appProps) => (
                            <Bid  appProps={appProps} />
                        )}
                    </AppConsumer>
                    <AppConsumer>                       
                        {(appProps) => (
                            <Claim appProps={appProps} />
                        )}
                    </AppConsumer>
                    <TeamMembers />
                    <Section7 />
                    <Footer />
                </main>
            </div>
        )
    }
}
export default MainContainer;

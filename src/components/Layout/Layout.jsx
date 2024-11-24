import React, { Component } from "react";
import Main from "./Main/Main";
import Loading from "../Loading/Loading";
import Web3warning from '../Sticky/Web3warning';


class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statesLoaded : false,
            setStateInterval : null
        };
    }

    componentDidMount() {
        const setStateInterval =  setInterval(() => {
            this.setState({ statesLoaded : this.props.appProps.statesLoaded });
            if(this.props.appProps.statesLoaded) clearInterval(this.state.setStateInterval);
        }, 1000 )
        this.setState({setStateInterval});
    }

    componentWillUnmount() {
        clearInterval(this.state.setStateInterval);
    }

    render() {

        // if(!this.state.statesLoaded) {
        //     return  ( <Loading /> )
        // }

        return (
        
            <div>
                <Web3warning appProps={this.props.appProps} />

                {/* <div className="fixed-top">
                    <div className="network-banner--warning">
                        <div className="col">
                            <p className="text-center">Non-Ethereum browser detected. You should consider trying MetaMask!</p>
                        </div>
                    </div>
                </div> */}

                {/* <div className="Layout network-banner--warning">
                    <div className="fixed-top"> 
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-6">
                                    No Metamask or web3 browser detected ...    
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div>
                    <Main />
                </div>

            </div>
        );
    }
}

export default Layout;

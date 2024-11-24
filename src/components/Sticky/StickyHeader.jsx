import React, { Component } from "react";
//import { goToAnchor } from 'react-scrollable-anchor'
import Clock from "../FlipClock/Clock";
import AppConsumer from "../../context/AppConsumer";
import CRYPTOStats from "./CRYPTOStats";
import Price from "./Price";
import Bonus from "./Bonus";
import "./StickyHeader.css";

import Web3warning from './Web3warning';

import { HashLink as Link } from 'react-router-hash-link';


class StickyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
            ... this.props
        };
        this.goToBidSection = this.goToBidSection.bind(this);
    }

    goToBidSection = (event) => {
        event.preventDefault();
        //goToAnchor('bidsection');
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        let scrollPosition = window.scrollY;
        if (scrollPosition > 100) {
            this.setState({ isHidden: false })
        } else {
            this.setState({ isHidden: true })
        }
    }

    render() {
        let { isHidden, enabled } = this.state;
        if(!enabled) {
            return (<span></span>);
        }

        return (
            <AppConsumer>
                {(appProps) => (
                    <div className={`${isHidden ? 'top_div_hidden' : 'top_div_active'}`}>

                        <div className="d-md-none">
                            <div className="row">
                                <div className="col-sm">
                                    <CRYPTOStats appProps={appProps} />
                                </div>
                                <div className="col-sm">                          
                                    <Clock appProps={appProps} />
                                </div>
                                <div className="col-sm stickyMobile">
                                    <button onClick={this.goToBidSection}> BID  </button>
                                </div>
                            </div>
                        </div>
                    
                        <div className="d-none d-md-block">
                            <div className="row">
                                <div className="col-md-1 text-center">
                                    <img className="stickyImage" src="img/cat-diamond-violet.png"></img>
                                </div>
                                <div className="col-md-3 text-center">
                                    <CRYPTOStats appProps={appProps} />
                                </div>

                                <div className="col-md-2 col-centered">
                                        <Clock appProps={appProps} />  
                                </div>

                                <div className="col-md-2 col-centered">
                                    <div className="d-flex justify-content-end">
                                        <Bonus />
                                    </div>
                                </div>  
                                
                                <div className="col-md-2">
                                    {/* <div className="d-flex justify-content-end"> */}
                                        <Price appProps={appProps} />
                                    {/* </div> */}
                                </div>

                                <div className="col-md-2 stickyButton">
                                    
                                    {/* <div className="d-flex justify-content-start"> */}
                                    {/* <button onClick={this.goToBidSection} className="float-left"> BID </button> */}
                                    {/* </div> */}
                                   
                                        <Link  to="#section4">
                                            <div className="anchoButton">
                                                BID
                                            </div>
                                        </Link>
                                </div>
                            </div>    
                        </div>

                        <Web3warning appProps={appProps}></Web3warning>

                    </div>
            )}
            </AppConsumer>
    )}
}

export default StickyHeader;
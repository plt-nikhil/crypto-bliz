import React, { Component } from "react";
import AppConsumer from "../../../context/AppConsumer";
import NumberFormat from 'react-number-format';


const styles = {
    style1 : {
        marginBottom : "50px"
    },
    style2 : {
        width: "40px",
        height: "40px", 
        backgroundColor : "#ffffff", 
        transform: "rotate(44deg)", 
        marginBottom: "-120px"
    }
  }

class crypto-bliz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <AppConsumer>
                {(appProps) => (    
                    <div>
                        <section id="section3"> 
                            <div className="container">
                                <div>
                                    <div className="mx-auto text-center mt-5 mb-3" style={styles.style1}>
                                        <span className="light-title">crypto-bliz</span>&nbsp;
                                        <span className="bold-title text-nowrap">Crypto CRYPTO</span>
                                    </div>
                                </div>
                                <p className="mx-auto sub-text text-center">
                                Why a Crypto CRYPTO? To determine market based Initial token economy valuation to determine some key metrics like scheduling fees, redemption fees and awards token quantities to fight winners. Also to fund crypto-bliz Endowment fund for prize pools. Learn more here:
                                </p>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-3 text-center mb-5">
                                            <img alt="" className="img-utility" src="img/vector-2.png" />
                                            <p className="mt-4">crypto-bliz Token Economy</p>
                                            <p className="purple-text bold-text">
                                                <NumberFormat value={appProps.crypto-blizTokenEconomy} displayType={'text'} thousandSeparator={true} />
                                            </p>
                                        </div>
                                        <div className="col-md-3 text-center mb-5">
                                            <img alt="" className="img-utility" src="img/vector-1.png" />
                                            <p className="mt-4">Amount Up For CRYPTO</p>
                                            <p className="purple-text bold-text">         
                                                <NumberFormat value={ Number(appProps.amountUpForCRYPTO) - Number(appProps.totalBonusTokens) } 
                                                    displayType={'text'} thousandSeparator={true} />
                                            </p>
                                        </div>
                                        <div className="col-md-3 text-center mb-5">
                                            <img alt="" className="img-utility" src="img/vector-4.png" />
                                            <p className="mt-4">Start Price</p>
                                            <p className="purple-text bold-text">
                                                <NumberFormat value={Number(appProps.startPrice).toFixed(4)} displayType={'text'} decimalScale={4} /> &nbsp; ETH
                                            </p>
                                        </div>
                                        <div className="col-md-3 text-center mb-5">
                                            <img alt="" className="img-utility" src="img/vector-7.png" />
                                            <p className="mt-4">Decrease rate</p>
                                            <p className="purple-text bold-text">{ Number(appProps.decreaseRate).toFixed(4) } &nbsp; %</p>
                                        </div>
                                        <div className="col-md-3 text-center mb-5">
                                            <img alt="" className="img-utility" src="img/vector-12.png" />
                                            <p className="mt-4">Current Price</p>
                                            <p className="skyblue-text bold-text"> 
                                                <NumberFormat value={Number(appProps.currentPrice).toFixed(4)} displayType={'text'} decimalScale={4} />
                                                &nbsp;ETH
                                            </p>
                                        </div>
                                        <div className="col-md-3 text-center mb-5">
                                            <img alt="" className="img-utility" src="img/vector-9.png" />
                                            <p className="mt-4">Current Bidders</p>
                                            <p className="skyblue-text bold-text">{appProps.currentBidders}</p>
                                        </div>
                                        <div className="col-md-3 text-center mb-5">
                                            <img alt="" className="img-utility" src="img/vector-11.png" />
                                            <p className="mt-4">CRYPTO Ceiling</p>
                                            <p className="skyblue-text bold-text">{appProps.CRYPTOCeiling} ETH</p>
                                        </div>
                                        <div className="col-md-3 text-center mb-5">
                                            <img alt="" className="img-utility" src="img/vector-10.png" />
                                            <p className="mt-4">CRYPTO Stage</p>
                                            <p className="skyblue-text bold-text">{appProps.CRYPTOStage}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="container-fluid">
                                    <div className="row mt-5 mb-5">
                                        <div className="container CRYPTO-timing">
                                            <div className="row mt-5 mb-5">
                                                <div className="col-4 text-center">
                                                    <img alt="" className="img-utility" src="img/vector-14.png" />
                                                    <p className="mt-4">Start Time</p>
                                                    <p className="bold-text">{appProps.CRYPTOStartTime}</p>
                                                </div>
                                                <div className="col-4 text-center">
                                                    <img alt="" className="img-utility" src="img/vector-15.png" />
                                                    <p className="mt-4">End Time</p>
                                                    <p className="bold-text">{appProps.CRYPTOEndTime}</p>
                                                </div>
                                                <div className="col-4 text-center">
                                                    <img alt="" className="img-utility" src="img/vector-13.png" />
                                                    <p className="mt-4">Total Received</p>
                                                    <p className="bold-text">
                                                        <NumberFormat value={ appProps.totalReceived }  displayType={'text'} thousandSeparator={true} /> ETH
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="row mx-auto intersection-triangle" style={styles.style2} >
                        
                        </div>

                    </div>
                )}
            </AppConsumer>
        )
    }
}
export default crypto-bliz;

import React, { Component } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import "./Bid.css";
import 'react-notifications/lib/notifications.css';
import BidConfirmModal from "./BidConfirmModal";


const Styles = {
    Style1 : {
        "width" : "450px",
        marginBottom : "50px"
    },
    Style2 : {
        maxWidth : "650px"
    }
}


class Bid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CRYPTOContract : null,
            bidAmount: 0,
            isLoading : false,
            transactionConfirmed : false,
            transactionError : false,
            transactionConfirmations : 0,
            myBalance : 0,
            disabled: '',
            referalcode : null,
            appProps : this.props.appProps,
            estimateTokensAmount : 0,
            estimatedPromissoryTokens : 0,
            BidConfirmModalOpen : false,
            tx : null
        };
        this.BidClicked = this.BidClicked.bind(this);
    }

    async componentDidMount() {
        console.log('----------------------------------------');
        let urlParams = new URLSearchParams(window.location.search);
        if(urlParams.has('ref')) {
            console.log('REFERRAL CODE : ', urlParams.get('ref') );
            this.setState({ referalcode : urlParams.get('ref') });
        }

        //const { web3 } = this.props.appProps;
        //console.log('Web3 : ', web3);
        // const myAccounts = await  web3.eth.getAccounts();

        // if(myAccounts.length !== 0) {
        //     const myBalance = await web3.eth.getBalance(myAccounts[0]);
        //     this.setState({ myBalance : web3.utils.fromWei(myBalance, 'ether') });
        // }
    }

    bidAmountChanged =  (event) => {
        const bidAmount = event.target.value;
        if(!this.isNumeric(bidAmount) || bidAmount < 0  ) { 
            this.setState({ estimateTokensAmount: 0 }) 
            return;
        }
        let { web3, currentPrice, promissoryTokenLastPrice } = this.state.appProps;
        let estimateTokensAmount = web3.utils.toWei( bidAmount, 'ether') / web3.utils.toWei( currentPrice , 'ether') ;
        let estimatedPromissoryTokens = web3.utils.toWei( bidAmount, 'ether') / promissoryTokenLastPrice;
        this.setState({ estimatedPromissoryTokens : Number(estimatedPromissoryTokens).toFixed(0) });
        this.setState({bidAmount: event.target.value });
        this.setState({ estimateTokensAmount :  Number(estimateTokensAmount).toFixed(0) });
    }
    
    isNumeric = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    BidClicked = async  (event) => {
        event.preventDefault();
        console.log('Bid clicked !!! ');
        let web3 = window.web3;
        if (window.ethereum) {
            try {
                await window.ethereum.enable();
            } catch (error) {
                console.log('Error', error);
            }
        }

        let accounts = await window.web3.eth.getAccounts();
        
        console.log('Accounts:  ', accounts);
        const myAccount = accounts[0];
        console.log('myAccount on Bid  : ', myAccount);

        // if(myAccount === undefined) {
        //     NotificationManager.error('Error');
        //     throw "exit";
        // }

        const bidAmount = web3.utils.toWei( (this.state.bidAmount).toString(), 'ether');

        if(this.state.referalcode) {
            console.log('Go To Bidreferral ');
            this.BidReferral(myAccount, bidAmount, this.state.referalcode);
        }else{
            console.log('Go To Bid !!! ');
            this.Bid(myAccount, bidAmount);
        }

    }


    BidReferral = (account, bidAmount, refCode) => {

        console.log('BID REFERRAL :::');
        console.log('account : ', account);
        console.log('bidAmount : ', bidAmount);
        console.log('RefCode  : ', refCode);

        const CRYPTOContract = this.props.appProps.CRYPTOContract;

        CRYPTOContract.methods.bidReferral(account,refCode)
        .send({ 
            from: account, 
            value : bidAmount
        })
        .on('transactionHash', (hash) => {
            console.log('thash:  ', hash)
            NotificationManager.info(`Transaction Submited: hash : ${hash}`);
            this.setState({ tx : hash });
            this.setState({ BidConfirmModalOpen : true });
            this.setState({ transactionConfirmations: 0  });
        })
        .on('receipt',(receipt) => {
            console.log('recipt :  ', receipt);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            if(this.state.transactionConfirmations === 0) {
                console.log('confirmationNumber', confirmationNumber, receipt);
                NotificationManager.success('Transaction Confirmed', 'Success');
            }
            this.setState({ transactionConfirmations: 1  });
        })
        .on('error', (error) => {
            console.log('error: ', error);
            NotificationManager.error('Error');
            this.setState({ transactionConfirmations: 0  });
        });
    }
    

    Bid = (account, bidAmount) => {

        const CRYPTOContract = this.props.appProps.CRYPTOContract;
        CRYPTOContract.methods.bid(account)
        .send({ 
            from: account, 
            value : bidAmount
        })
        .on('transactionHash', (hash) => {
            console.log('thash:  ', hash)
            this.setState({ tx : hash });
            NotificationManager.info(`Transaction Submited: hash : ${hash}`);
            this.setState({ transactionConfirmations: 0  });
            this.setState({ BidConfirmModalOpen : true });
        })
        .on('receipt',(receipt) => {
            console.log('recipt :  ', receipt);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            if(this.state.transactionConfirmations === 0) {
                console.log('confirmationNumber', confirmationNumber, receipt);
                NotificationManager.success('Transaction Confirmed', 'Success');
            }
            this.setState({ transactionConfirmations: 1  });
        })
        .on('error', (error) => {
            console.log('error: ', error);
            NotificationManager.error('Error');
            this.setState({ transactionConfirmations: 0  });
        });
    }
    
    render() {

        const { isLoading, 
                transactionConfirmed, 
                transactionError,
                appProps,
                estimateTokensAmount
            } = this.state;

       
 
        return (
            <div>

            <NotificationContainer/>
            
                {this.state.BidConfirmModalOpen ?  <BidConfirmModal tx={this.state.tx} open={true} /> : null}

                <section id="section4">
                    <div className="container">
                        <div className="row">
                            <div className="mx-auto text-center mt-5" style={Styles.Style1}>
                                <span className="light-title">crypto-bliz</span>&nbsp;
                                <span className="bold-title">Utility Token Benefits</span>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="inline text-center col">
                                <div className="white-bg mx-auto">
                                    <img alt="" className="img-utility" src="img/vector-3.png" />
                                </div>
                                <p className="bold-text">Staking</p>
                                <p className="purple-text">for higher rewards</p>
                            </div>
                            <div className="inline text-center col">
                                <div className="white-bg mx-auto">
                                    <img alt="" className="img-utility" src="img/vector-16.png" />
                                </div>
                                <p className="bold-text">Listing</p>
                                <p className="purple-text">fees</p>
                            </div>
                            <div className="inline text-center col">
                                <div className="white-bg mx-auto">
                                    <img alt="" className="img-utility" src="img/vector-5.png" />
                                </div>
                                <p className="bold-text">Redemption</p>
                                <p className="purple-text">fees</p>
                            </div>
                            <div className="inline text-center col">
                                <div className="white-bg mx-auto">
                                    <img alt="" className="img-utility" src="img/vector-6.png" />
                                </div>
                                <p className="bold-text">Bonus</p>
                                <p className="purple-text">SuperDAO Tokens</p>
                            </div>

                        </div>
                        <div className="container">
                            <div className="row mx-auto" style={Styles.Style2}>
                                <form className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">

                                            {  isLoading &&    
                                                <div className="alert alert-danger" role="alert">
                                                    Waiting Transaction Confirmation Please wait .... 
                                                </div>
                                            }

                                            {
                                                transactionConfirmed &&
                                                <div className="alert alert-info" role="alert">
                                                    Transaction Confirmed Successfully
                                                </div>
                                            }

                                            {
                                                transactionError &&
                                                <div className="alert alert-info" role="alert">
                                                    Transaction Error
                                                </div>
                                            }

                                        </div>
                                    <div className="col-md-6">
                                        <input className="mb-4"  
                                            onChange={this.bidAmountChanged}
                                            type="text" 
                                            name="BidAmount"
                                            placeholder="Ether Amount to Bid"
                                            />
                                    </div>
                                    <div className="col-md-6">
                                        <button   
                                            onClick={this.BidClicked}>
                                          BID
                                        </button>
                                    </div>
                                    <div className="col-md-12">

                                          {  estimateTokensAmount !== 0 &&    
                                                <div className="alert alert-info" role="alert">
                                                    <p>Approx : {this.state.estimateTokensAmount} KTY tokens @currentPrice: &nbsp;
                                                        { Number(appProps.ktyTokenPriceUSD).toFixed(2) } USD | { Number(appProps.currentPrice).toFixed(4) }  [ Eth ]</p>
                                                    <p>SuperDAO bonus tokens :  { this.state.estimatedPromissoryTokens} </p>
                                                </div>
                                        }
                                        
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default Bid;

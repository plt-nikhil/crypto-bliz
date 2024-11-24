import React, { Component } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import FlipClock from "../../FlipClock/FlipClock";
import 'react-notifications/lib/notifications.css';

const Styles = {
    Style1 : {
        marginBottom : "155px"
    },
    Style2 : {
        minHeight : "200px", 
        width: "100%"
    }
}

class Claim extends Component {

    constructor(props) {
        super(props);
        this.state = {
            days : "0",
            hours : "00",
            minutes : "00",
            seconds : "00",
            timerInterval : null,
            CRYPTOEndDate : null,
            claimAddress : '',
            tokenAddress : '',
            transactionConfirmations : 0,
            tokenBalance : 0,
            tokenSymbol : 0,

            claimTokenLoading : false,
            claimTokenLoaded : false ,
            
            tokenBalanceRequestLoading : false,
            tokenBalanceRequestLoaded : false,

            claimBonusTokensLoading : false,
            claimBonusTokensLoaded : false ,
            

            superDaoTokenBalanceRequestLoading : false,
            superDaoTokenBalanceRequestLoaded : false,

            superDaoTokenBalance : 0,
            campaignHash : ''
            
        };  
        this.input = React.createRef();

        this.claimTokenClicked = this.claimTokenClicked.bind(this);
        this.claimAddressChaned = this.claimAddressChaned.bind(this);
        this.campaignHashChanged = this.campaignHashChanged.bind(this);

        this.tokenAddressChaned = this.tokenAddressChaned.bind(this);
        this.checkTokenBalanceCliked = this.checkTokenBalanceCliked.bind(this);
        this.checkSuperDaoTokenBalance = this.checkSuperDaoTokenBalance.bind(this);
        this.claimBonusTokensClicked = this.claimBonusTokensClicked.bind(this);
    }

    tokenAddressChaned = (event) => {
        this.setState({tokenAddress: event.target.value});
    }

    campaignHashChanged = (e) => {
        console.log('Referral Hash Changed ...', e.target.value);
        this.setState({ referralHash : e.target.value });
    }

    claimBonusTokensClicked = async (event) => {
        event.preventDefault();
        console.log('Claim Bonus Token  Clicked !!!!');
        console.log('claim Hash : ', this.state.referralHash);
        const { CRYPTOContract, myAccount, claimAddress } = this.state;
        //this.setState({ claimBonusTokensLoading : true });

        CRYPTOContract.methods.claimCampaignTokenBonus(this.state.referralHash)
        .send({ 
            from: myAccount
        })
        .on('transactionHash', (hash) => {
            console.log('thash:  ', hash)
            NotificationManager.info(`Transaction Submited: hash : ${hash}`);
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
            this.setState({ claimBonusTokensLoading : false });
        });
        this.setState({ claimBonusTokensLoading : false });
    }

    checkTokenBalanceCliked = async (event) => {
        event.preventDefault();
        this.setState({ tokenBalanceRequestLoading : true });
        this.setState({ tokenBalanceRequestLoaded : false });
        const { tokenContract, myAccount, tokenAddress } = this.state;
        const tokenBalance = await tokenContract.methods.balanceOf(tokenAddress).call();        
        this.setState({ tokenBalance : tokenBalance / 10 ** 18 })
        this.setState({ tokenBalanceRequestLoading : false });
        this.setState({ tokenBalanceRequestLoaded : true });
    } 

    checkSuperDaoTokenBalance = async (event) => {
        event.preventDefault();
        console.log('Check SuperDao Tokens ...');
        this.setState({ superDaoTokenBalanceRequestLoading : true });
        this.setState({ superDaoTokenBalanceRequestLoaded : false });
        const { CRYPTOContract, myAccount, tokenAddress } = this.state;
        const superDaoTokenBalance = await CRYPTOContract.methods.SuperDAOTokens(tokenAddress).call();
        await this.setState({ superDaoTokenBalance : superDaoTokenBalance });
        this.setState({ superDaoTokenBalanceRequestLoading : false });
        this.setState({ superDaoTokenBalanceRequestLoaded : true });
    }

    claimTokenClicked = (event) => {
        event.preventDefault();
        const { CRYPTOContract, myAccount, claimAddress } = this.state;
        this.setState({ claimTokenLoading : true });
        
        CRYPTOContract.methods.claimTokens(claimAddress)
        .send({ 
            from: myAccount
        })
        .on('transactionHash', (hash) => {
            console.log('thash:  ', hash)
            NotificationManager.info(`Transaction Submited: hash : ${hash}`);
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
            this.setState({ claimTokenLoading : false });
        })
        .on('error', (error) => {
            console.log('error: ', error);
            NotificationManager.error('Error');
            this.setState({ claimTokenLoading : false });
        });
    }

    claimAddressChaned =  (event) => {
        this.setState({claimAddress: event.target.value});
    }

    async componentDidMount() {

       try {
            const { CRYPTOContract, tokenContract,  web3 } = this.props.appProps; 
            this.setState({CRYPTOContract, tokenContract, web3 })
            const tokenSymbol =  await tokenContract.methods.symbol().call();
            this.setState({ tokenSymbol : tokenSymbol });
            const { networkLaunchDay, startBlock } = this.props.appProps;
            await this.setState({ startBlock }); 
            await this.setState({ networkLaunchDay });
            const myAccount = this.props.appProps.myAccounts[0];
            this.setState({claimAddress : myAccount});
            this.setState({tokenAddress : myAccount});
            this.setState({myAccount})

        }catch(error){
            console.log(error);
        }
    }

    componentWillUnmount() {
    }
    
    render() {
        let { 
            networkLaunchDay,
            myAccount, 
            claimAddress, 
            tokenAddress,
            claimTokenLoading,
            transactionConfirmations,
            tokenBalanceRequestLoading,
            tokenBalanceRequestLoaded,
            superDaoTokenBalanceRequestLoading,
            superDaoTokenBalanceRequestLoaded,
            claimBonusTokensLoading,
            tokenBalance,
            tokenSymbol,
            superDaoTokenBalance

        } = this.state;

        return (
            <div>
                <NotificationContainer/>

                <section id="section5">

                    <div className="container">
                        <div className="row" style={Styles.Style1}>
                            <div className="col-md-12">
                                 <div className="claim-time-card" style={Styles.Style2}>
                                    <h6 className="claim-time-card__title">Tokens can be claimed in</h6>
                                    <div className="d-table claim-time-card__timer">
                                            <FlipClock
                                                type="countdown"
                                                count_to={networkLaunchDay}
                                            />        
                                    </div>
                                </div>
                            </div>

                            {/* {'Claim Tokens'} */}
                            <div className="col-md-12 pt-4">
                                <form>
                                    {  claimTokenLoading &&    
                                        <div className="alert alert-danger" role="alert">
                                            Loading ...
                                        </div>
                                    }
                                    {
                                        transactionConfirmations === 1 &&

                                        <div className="alert alert-info" role="alert">
                                            Transaction Confirmed Successfully
                                        </div>
                                    }
                                    <input className="mb-4" 
                                            type="text" 
                                            defaultValue={claimAddress} 
                                            ref={this.input}
                                            onChange={this.claimAddressChaned}
                                            name="address" 
                                            placeholder="" />

                                    <button onClick={this.claimTokenClicked}>CLAIM TOKENS</button>

                                </form>
                            </div>
                        

                            {/* { 'claim Bonus Tokens' } */}
                            <div className="col-md-6 pt-4">
                                <form>
                                    {  claimBonusTokensLoading &&    
                                        <div className="alert alert-danger" role="alert">
                                            Sending Transaction 
                                        </div>
                                    
                                    }
                                    <input className="mb-4" 
                                            type="text" 
                                            ref={this.input}
                                            name="address" 
                                            onChange={this.campaignHashChanged}
                                            placeholder="Campaign hash" />

                                    <button onClick={this.claimBonusTokensClicked}>CLAIM BONUS TOKENS</button>

                                </form>
                            </div>

                            
                            {/* { 'claim Bonus Tokens' } */}
                            <div className="col-md-6 pt-4">
                                <form>
                                    {  claimBonusTokensLoading &&    
                                        <div className="alert alert-danger" role="alert">
                                            Sending Transaction 
                                        </div>
                                    
                                    }
                                    <input className="mb-4" 
                                            type="text" 
                                            ref={this.input}
                                            name="address" 
                                            onChange={this.campaignHashChanged}
                                            placeholder="Campaign hash" />

                                    <button onClick={this.claimBonusTokensClicked}>MARKETING BONUS TOKENS</button>

                                </form>
                            </div>
                            
                            
                        
                        </div>

                        <div className="title-1 mb-5">
                            <h5 className="title text-center">
                                Check
                                <strong className="font-weight-bold">Token Balances</strong>
                            </h5>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <form>
                                    {  
                                     tokenBalanceRequestLoading &&    
                                        <div className="alert alert-danger" role="alert">
                                            Loading ...
                                        </div>
                                    }
                                    {  
                                     tokenBalanceRequestLoaded  &&    
                                        <div className="alert alert-info" role="alert">
                                           Your balance is : <strong> {tokenBalance} &nbsp; {tokenSymbol} </strong>
                                        </div>
                                    }
                                    <input 
                                        className="mb-4" 
                                        type="text" 
                                        name="address" 
                                        defaultValue={tokenAddress} 
                                        ref={this.input}
                                        onChange={this.tokenAddressChaned}
                                        placeholder="" 
                                        />
                                    <button onClick={this.checkTokenBalanceCliked}>crypto-bliz BALANCE</button>
                                </form>
                            </div>
                            <div className="col-md-6">
                                <form>

                                    {  
                                     superDaoTokenBalanceRequestLoading &&    
                                        <div className="alert alert-danger" role="alert">
                                            Loading ...
                                        </div>
                                    }
                                    {  
                                     superDaoTokenBalanceRequestLoaded  &&    
                                        <div className="alert alert-info" role="alert">
                                           Your Superdao balance is : <strong> {superDaoTokenBalance} &nbsp; SUP </strong>
                                        </div>
                                    }

                                    <input 
                                            className="mb-4" 
                                            type="text"
                                            defaultValue={myAccount} 
                                            ref={this.input}
                                            name="address" placeholder="" 
                                        />
                                    <button onClick={this.checkSuperDaoTokenBalance} className="mb-3">SUPERDAO BALANCE</button>
                                    <small className="help-text">
                                        SuperDAO tokens are utility access tokens giving the right to collectively govern and actively unlock rewards from multiple
                                        dapps like crypto-bliz.
                                    </small>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default Claim;

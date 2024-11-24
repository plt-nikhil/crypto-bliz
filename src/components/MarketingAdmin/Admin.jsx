import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import "./Admin.css";

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ethereumAddress: null,
            web3: null,
            marketingPartnersTable: null,
            tokenreferralsTable: null,
            confirmSocialTx: null,
            top20Table : null
        };

        this.referralSignUp = this.referralSignUp.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.marketingPartners = this.marketingPartners.bind(this);
        this.tokenReferrals = this.tokenReferrals.bind(this);
        this.socialReferrals = this.socialReferrals.bind(this);
        this.getPersonalHashByAddress = this.getPersonalHashByAddress.bind(this);
    }

    inputChanged = (e) => {
        console.log('Input Changed ', e);
        const target = e.target;
        console.log('Name : ', target.name, 'Value : ', e.target.value);
        this.setState({ [target.name]: e.target.value });

    }

    socialReferrals = async (e) => {
        console.log('.... get socialrefrreals .... ');
        const { CRYPTOContract } = this.props.appProps;
        const response = await CRYPTOContract.methods.SocialCampaigns(this.state.socialReferralsHash).call();
        console.log(response);
        const socialreferralsTable = this.buildSocialferralsTable(response);
        this.setState({ socialreferralsTable: socialreferralsTable })
    }

    tokenReferrals = async (e) => {
        console.log('.... get tokenReferrals .... ');
        const { CRYPTOContract } = this.props.appProps;
        const personalHash = await CRYPTOContract.methods.calculatPersonalHash().call({ from: this.state.ethereumAddress });
        console.log(personalHash);
        const response = await CRYPTOContract.methods.TokenReferrals(personalHash).call();
        console.log(response);
        const tokenreferralsTable = this.buildTokenreferralsTable(response);
        this.setState({ tokenreferralsTable: tokenreferralsTable })
    }

    marketingPartners = async (e) => {
        console.log('.... get Marketing Partners .... ');
        const { CRYPTOContract } = this.props.appProps;
        console.log(CRYPTOContract);
        const response = await CRYPTOContract.methods.MarketingPartners(this.state.marketingHash).call();
        console.log(response);
        const marketingPartnersTable = this.buildMarketingPartnersTable(response);
        this.setState({ marketingPartnersTable: marketingPartnersTable })
    }

    buildSocialferralsTable = (data) => {

        console.log('Build soclial refrrals Table ');

        // hash: "0x431b3175"
        // maxParticipators: "100"
        // tokenAmountForEach: "1000"

        return (
            <div>
                <hr />
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Hash
                        <span className="badge badge-primary badge-pill">{data.hash}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Max Participators
                        <span className="badge badge-primary badge-pill">{data.maxParticipators}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Token AmountForEach
                        <span className="badge badge-primary badge-pill">{data.tokenAmountForEach} KTY </span>
                    </li>
                </ul>
            </div>
        )

    }


    buildTokenreferralsTable = (data) => {
        
        // addr: "0x0000000000000000000000000000000000000000"
        // hash: "0x00000000"
        // totalReferrals: "0"
        // totalTokensEarned: "0"

        return (
            <div>
                <hr />
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Addr
                        <span className="badge badge-primary badge-pill">
                            {data.addr}
                        </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Hash
                        <span className="badge badge-primary badge-pill">{data.hash}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        TotalReferrals
                        <span className="badge badge-primary badge-pill">{data.totalReferrals}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Total TokensEarned
                        <span className="badge badge-primary badge-pill">{data.totalTokensEarned} KTY </span>
                    </li>
                </ul>
            </div>
        )

    }

    buildMarketingPartnersTable = (data) => {

        const { ethereumLastPrice } = this.props.appProps;

        return (

            <div>
                <hr />
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Addr
                        <span className="badge badge-primary badge-pill">
                            {data.addr}
                        </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Hash
                        <span className="badge badge-primary badge-pill">{data.hash}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Percentage
                        <span className="badge badge-primary badge-pill">{data.percentage}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Total Contribution
                        <span className="badge badge-primary badge-pill">{data.totalContribution/ (10**18) }</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Total Referrals
                        <span className="badge badge-primary badge-pill">{data.totalReferrals}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        EthEarned
                        <span className="badge badge-primary badge-pill">{data.EthEarned/ (10**18) } Eth / { data.EthEarned/(10**18) * ethereumLastPrice} USD </span>
                    </li>
                </ul>
            </div>
        )

    }

    getPersonalHash = async () => {
        const { CRYPTOContract } = this.props.appProps;
        const personalHash = 
            await CRYPTOContract.methods.calculatPersonalHash().call(
                    { from: this.state.ethereumAddress });
        this.setState({ personalHash })
        
    }

    getPersonalHashByAddress = async (e) => {
        e.preventDefault();
        const { CRYPTOContract } = this.props.appProps;
        console.log('Adderss : ', this.state.personaladdress)
        const personalHashByAddress = 
           await CRYPTOContract.methods.calculatPersonalHashByAddress(this.state.personaladdress).call();
        console.log('Hash : ', personalHashByAddress);
        this.setState({personalHashByAddress});
    }

    referralSignUp = (e) => {
        e.preventDefault();
        console.log('refferal Sign Up !!! ');
        // this.setState({ referallSignUpTx : "0x89339040234823904" });
        // return;

        const { CRYPTOContract } = this.props.appProps;

        CRYPTOContract.methods.referralSignup()
            .send({
                from: this.state.ethereumAddress
            })
            .on('transactionHash', (hash) => {
                console.log('thash:  ', hash)
                NotificationManager.info(`Transaction Submited: hash : ${hash}`);
                this.setState({ referallSignUpTx: hash });
                this.setState({ tx: hash });
                this.setState({ BidConfirmModalOpen: true });
                this.setState({ transactionConfirmations: 0 });

                this.getPersonalHash();

            })
            .on('receipt', (receipt) => {
                console.log('recipt :  ', receipt);
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                if (this.state.transactionConfirmations === 0) {
                    console.log('confirmationNumber', confirmationNumber, receipt);
                    NotificationManager.success('Transaction Confirmed', 'Success');
                }
                this.setState({ transactionConfirmations: 1 });
            })
            .on('error', (error) => {
                console.log('error: ', error);
                NotificationManager.error('Error');
                this.setState({ transactionConfirmations: 0 });
            });
    }


    async componentDidMount() {

        console.log('Admin Page mount', this.props);

        let web3 = window.web3;
        this.setState({ web3: web3 });
        if (window.ethereum) {
            try {
                await window.ethereum.enable();
                this.setState({ ethereumAddress: window.ethereum.selectedAddress });

            } catch (error) {
                console.log('Error', error);
            }
        }
    }


    getTop20 = async () => {
        const { CRYPTOContract } = this.props.appProps;
        const top20Addr = await CRYPTOContract.methods.getTop20Addr().call();
        const top20Reffered = await CRYPTOContract.methods.getTop20Reffered().call();

        console.log('getTop20Addr :', top20Addr);
        console.log('top20Reffered : ', top20Reffered);

        const tableData = [];
        top20Addr.forEach( (item, i) => {
            tableData.push( { "hash" : item, "reffered" : top20Reffered[i] } );
        })
        console.log('------');
        console.log(tableData);

        this.buildTop20Table(tableData);
    }


    buildTop20Table = (data) => {
        let _table = (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">RefCode</th>
                    <th scope="col">Bidders referred</th>
                </tr>
                </thead>
                <tbody>
                        {data.map( (item , i) => {
                            return (
                                <tr key={'tr_'+i+1}>
                                    <th scope="row">{i+1}</th>
                                    <td>{item.hash}</td>
                                    <td>{item.reffered}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        );
        this.setState({ top20Table : _table });
    }

    render() {

        const confirmSocialTrasactionLink = "https://etherscan.io/tx/" + this.state.confirmSocialTx;
        const referralSignUpTrasactionLink = "https://etherscan.io/tx/" + this.state.referallSignUpTx;
        const referralLink = "https://crypto-bliz.crypto-bliz.io/?ref=" + this.state.personalHash;
        const referralLinkByAddress = "https://crypto-bliz.crypto-bliz.io/?ref=" + this.state.personalHashByAddress;

        return (
            <div>

                <NotificationContainer />
                
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <h1> Marketing Admin </h1>
                            <p>Account : {this.state.ethereumAddress} </p>
                        </div>
                    </div>

                    {/* { Get My refferal Link  } */}
                    <div className="row" id="section4">
                        <br/>
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <button onClick={this.referralSignUp}>
                                            KTY Token Referral SignUp
                                        </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <br/>
                            { this.state.personalHash && 
                                <span className="etherscantext">Referral Link: &nbsp; 
                                    <a href={referralLink}>{referralLink}</a>
                                </span>
                            }
                            <br/>
                            <br/>
                            {this.state.referallSignUpTx &&
                                <span className="etherscantext"> 
                                    <a href={referralSignUpTrasactionLink}> 
                                        See Transaction On Etherscan ...  
                                    </a>
                                </span>
                            }
                        </div>
                    </div>

                    {/* {' Get personal hash By address '} */}

                    <div className="row" id="section4">
                        <div className="col-md-6">
                            <input
                                name="personaladdress"
                                onChange={this.inputChanged}
                                className="form-control form-control-lg"
                                type="text"
                                placeholder="Address" />
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <button onClick={this.getPersonalHashByAddress}>
                                            Get Referral Link
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <br/>
                            { this.state.personalHashByAddress && 
                                <h3>Referral Link : <a href={referralLinkByAddress}>
                                    {referralLinkByAddress}</a></h3>
                            }

                        </div>
                    </div>

                    {/* {'Token referral'} */}
                    <div className="row" id="section4">
                        <div className="col-md-6">
                            <input
                                name="tokenReferralsHash"
                                value={this.state.ethereumAddress}
                                onChange={this.inputChanged}
                                className="form-control form-control-lg"
                                type="text"
                                placeholder="hash" />
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <button onClick={this.tokenReferrals}>
                                            Check Token Referrals
                                        </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            {this.state.tokenreferralsTable}
                        </div>
                    </div>
                    
                    {/* {Marketing Partners} */}
                    <div className="row" id="section4">
                            <div className="col-md-6">
                                <input 
                                    name="marketingHash"
                                    onChange={this.inputChanged}
                                    className="form-control form-control-lg" 
                                    type="text" 
                                    placeholder="hash" />
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <button  onClick={this.marketingPartners}>
                                            Marketing Partners
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12"> 
                                    { this.state.marketingPartnersTable }
                            </div>
                        </div>


                    {/* {'get top 20'} */}
                    <div className="row" id="section4">
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <button onClick={this.getTop20}>
                                            Get Top 20 refferers 
                                        </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            { this.state.top20Table }
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
export default Admin;

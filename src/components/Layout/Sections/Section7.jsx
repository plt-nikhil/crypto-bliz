import React, { Component } from "react";

class Section7 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            site1 : "https://blog.superdao.io/general-updates-multiple-short-term-rewards-for-supporters-ec6b7493cc6f",
            site2 : "https://blog.superdao.io/crypto-bliz-why-it-will-be-huge-the-ethereum-cryptokitties-real-time-blockbuster-dapp-game-28d3ae0de26d"
        };
        this.goToWebsite = this.goToWebsite.bind(this);
    }

    //-- Dont like this 
    goToWebsite = () => {        
        window.location.href = this.state.site1;
    }

    goToWebsite1 = () => {
        window.location.href = this.state.site2;
    }

    render() {
        return (
            <div>
                <section id="section7">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col about">
                                <div className="offset-md-2 col-md-8 about">
                                <img src="/img/superdao-icon.png" alt="" />
                                <h2>About <span>SuperDAO</span></h2>
                                <p>
                                    SuperDAO produces viable DApps by collaboration of innovators, individuals and communities to achieve common goals through decentralized 
                                    governance as Superneum token holders. Dapps produced provide the highest value to end users, consequently providing high yield, 
                                    perpetual rewards ("Profits) to Superneum SUP token holders.   
                                    <br />
                                    <br />
                                    Backers of crypto-bliz will be awarded SuperDAO tokens as BONUS. SuperDAO token (Superneum) holders earn more tokens and Eth from multiple Dapp initiatives. 
                                    SuperDAO tokens will increase in demand based on the the ability to earn multiple scarce tradable utility token and ETH rewards from all Dapp initiatives.                                    

                                </p>
                                <p>
                                </p>
                                <button onClick={this.goToWebsite} className="btn-g">LEARN MORE</button>
                                </div>
                            </div>
                            <div className="col dapps">
                            <h2>SuperDAO <span>Dapps</span></h2>
                            <div className="row">
                                <div className="col-md-6 text-center">
                                    <img src="img/cat-diamond-violet.png" alt="" />
                                    <h3>crypto-bliz</h3>
                                    <p>crypto-bliz is an Ethereum-Cryptokitties Real-Time Blockbuster Dapp Game that utilizes customized fighting kittie characters derived from the Cryptokitties platform. Backers share in token and ETH rewards generated from the game. ETA NOVEMBER 2018</p>
                                </div>
                                <div className="col-md-6 text-center">
                                    <img src="img/fight-battles.png" alt="" />
                                    <h3>FightBattles</h3>
                                    <p>FightBattles is a real-time fighting game for multiple non-fungible dapp collectible platforms. FightBattles unifies most fungible games on the ethereum platform. Backers share in token and ETH rewards generated from the game. ETA NOVEMBER/DECEMBER 2018</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 text-center">
                                    <img src="img/pokereum-logo.png" alt="" />
                                    <h3>Pokereum:</h3>
                                    <p>
                                        Pokereum: An ethereum-based peer-to-peer decentralized poker dApp [demo] is soon to be deployed live to the ethereum blockchain. 
                                        Backers share in token and ETH rewards generated from the game. ETA NOVEMBER/DECEMBER 2019 
                                    </p>
                                </div>
                                <div className="col-md-6 text-center">
                                    <img src="img/vector-8.png" alt="" />
                                    <h3>Swarmtime</h3>
                                    <p>
                                    Swarmtime is a gamified video sharing platform incorporating twitter-like feeds and blogging built on the ethereum and bit-torrent network. Backers share in token and ETH rewards generated from the game. ETA FEBRUARY 2019
                                    </p>
                                </div>
                            </div>
                            <button onClick={this.goToWebsite1} className="btn-g">LEARN MORE</button>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default Section7;

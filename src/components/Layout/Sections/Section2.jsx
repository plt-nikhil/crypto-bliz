import React, { Component } from "react";
import VideoPlayer from "../../VideoPlayer/VideoPlayer";

class Section2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.goToWebsite = this.goToWebsite.bind(this);   
    }


    goToWebsite = () => {        
        window.location.href = "https://www.crypto-bliz.io/";
    }

    render() {
        let playerActive = this.state;
        return (
            <div>
                <section id="section2">
                    <div className="container-fluid intro-bg">
                        <div className="row intro">
                            <div className="offset-md-1 col-sm-4">
                                <div className="intro-img">
                                    <img src="img/kat_violet_v1.png" alt="" />
                                </div>
                                <div className="intro-text">
                                    <h2>What is crypto-bliz?</h2>
                                    <p>
                                    crypto-bliz is an Ethereum-Cryptokitties Real-Time Blockbuster Dapp Game. It is a crowd-driven, real-time fighting Dapp game. crypto-bliz Tokens and ETH are awarded to winners of each fight session that utilizes customized fighting kittie characters derived from the Cryptokitties platform.
crypto-bliz Crypto CRYPTO
                                    </p>
                                    <button onClick={this.goToWebsite} href="http://crypto-bliz.io" target="_blank" className="btn-g">WEBSITE</button>
                                    <br />
                                    <a href="https://www.crypto-bliz.io/#/fightpaper" className="btn-n-g">FIGHT PAPER</a>
                                </div>
                            </div>
                            <div className="offset-md-1 col-sm-6">
                                <div className="video">
                                    <div className="video-top">
                                        <img src="img/top_angle.png" alt="" /> 
                                    </div>
                                    <div className="video-placeholder"> 
                                        <VideoPlayer />
                                    </div>
                                    <div className="video-bottom">
                                        <img src="img/bottom_angle.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </section>
            </div>
        )
    }
}
export default Section2;

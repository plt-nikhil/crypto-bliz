import React, { Component } from "react";
import { cowntDownTimer } from  "../../../helper/Timer";

class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            //... this.props,
            days : "0",
            hours : "00",
            minutes : "00",
            seconds : "00",
            timerInterval : null,
            networkLaunchDay : null,
            startBlock : 0
        };
    }

    async componentDidMount() {

        try {
                const { networkLaunchDay, startBlock } = this.props.appProps;
                await this.setState({ startBlock }); 
                this.updateTimerData(networkLaunchDay);
                    this.setState({ timerInterval : setInterval(() => {
                            this.updateTimerData(networkLaunchDay);
                    }, 1000 * 60  )
                })

            }catch(error) {
                console.error(error);
        }
    
    }

    updateTimerData(networkLaunchDay) {
        let { days, hours, minutes } = cowntDownTimer(networkLaunchDay);
        this.setState({ days: days });
        this.setState({ hours: hours });
        this.setState({ minutes: minutes });
    }

    componentWillUnmount() {
        clearInterval(this.state.timerInterval);
    }

     
    render() {

        let { days, hours, minutes, startBlock } = this.state;
    
        if(startBlock === 0 ) {

            return (
                <header id="main-header">
                    <div className="container">
                        <div className="container-fluid header">
                            <div className="row align-items-center">

                                <div className="col-sm-12 title">
                                    <h2>
                                        <span className="name">crypto-bliz</span> Network Launch 45 Days After CRYPTO
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wavy-bg">
                        <img src="img/wavy-background.png" alt="" />
                    </div>
                </header>
            )

        }else{

            return (
                <header id="main-header">
                    <div className="container">
                        <div className="container-fluid header">
                            <div className="row align-items-center">

                                <div className="col-sm-12 col-md-7 col-xs-12 title">
                                    <h2>
                                        <span className="name">crypto-bliz</span> Network Launch
                                    </h2>
                                </div>

                                <div className="col-sm-12 col-md-5 col-xs-12">
                                    <div className="row timer">
                                        <div className="col days">
                                            <p>{days}</p>
                                            <span className="lead">days</span>
                                        </div>
                                        <div className="col hours">
                                            <p>{hours}</p>
                                            <span className="lead">hrs</span>
                                        </div>
                                        <div className="col minutes">
                                            <p>{minutes}</p>
                                            <span className="lead">mins</span>
                                        </div>
                                    </div>
                                    <div className="row note">
                                        <p>Adjust according to Crypto ending duration</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wavy-bg">
                        <img src="img/wavy-background.png" alt="" />
                    </div>
                </header>
            )

        }

       
    }
}
export default Header;

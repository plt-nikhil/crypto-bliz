import React, { Component } from "react";
import Modal from "react-responsive-modal";


class BidConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            ... this.props
        };
    }

    componentDidMount = () => {

    }

    componentWillUnmount() {

    }


    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    
// <div className="row align-items-center">
//     <div className="col-sm-12 title">
//         <button className="discorbutton" onClick={this.GoToDiscord}>
//             Join us on discord while you wait
//         </button>

//         {/* <h2 className="discorbutton"> 
//             <a href="https://discord.gg/rgQ5F3R">Join us on discord while you wait </a> 
//         </h2> */}
//     </div>
// </div>


    render() {
        const { open } = this.state;
        const { tx } = this.props;
        const txUri = "https://etherscan.io/tx/" + tx;
        return (
            <div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <header id="main-header">
                        <div className="container">
                            <div className="container-fluid header">
                                <div className="row align-items-center">
                                    <div className="col-md-12">
                                        <div className="row note">
                                            <h1>
                                                <a href={txUri}>Transaction sent ...</a>      
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="col-md-12 title">
                                        <button className="discorbutton" onClick={this.GoToDiscord}>
                                            Join us on discord while you wait
                                        </button>

                                        {/* <h2>

                                            <span className="name">
                                                <a href="https://discordapp.com/invite/rgQ5F3R">
                                                    Join us on dicord while you wait to claim tokens
                                                    </a>
                                            </span>
                                        </h2> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </Modal>
            </div>
        );
    }
}

export default BidConfirmModal;
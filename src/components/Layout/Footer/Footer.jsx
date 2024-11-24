import React, { Component } from "react";

class Footer extends Component {
    render() {
        return (
            <footer id="main-footer">
                <div className="container">
                    <h6 className="social-icons-title my-3">Follow crypto-bliz
                    &nbsp;
                        <span>on social media</span>
                    </h6>
                    <ul className="social-icons-list">
                        <li className="">
                            <a href="https://www.facebook.com/crypto-bliz" target="_blank">
                                <img alt="" src="img/social-facebook.png" />
                            </a>
                        </li>
                        <li className="">
                            <a href="https://twitter.com/crypto-blizHQ" target="_blank">
                                <img alt="" src="img/social-twitter.png" />
                            </a>
                        </li>
                        <li className="">
                            <a href="https://www.reddit.com/r/crypto-bliz" target="_blanck" >
                                <img alt="" src="img/social-1.png" />
                            </a>
                        </li>
                        <li className="">
                            <a href="https://discord.gg/rgQ5F3R" target="_blank">
                                <img className="discordicon" src="img/discord_text.svg" />
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        )
    }
}
export default Footer;

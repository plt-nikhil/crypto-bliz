import React, { Component } from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerActive: false
        };
        this.playVideo = this.playVideo.bind(this);
    }

    playVideo = (evt) => {
        console.log('Play Video .... ');
        this.setState({ playerActive: true });
    }

    _onReady(event) {
        event.target.playVideo();
    }

    render() {
        const opts = {
            width: '610',
            height: '517',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };
        let { playerActive } = this.state;
        return (
            <div>
                {!playerActive &&
                    <img onClick={() => this.playVideo()} src="img/video_placeholder.png" alt="" />
                }
                {playerActive &&
                    <div>
                        <YouTube  
                            videoId="ROKRxNZdmVs?rel=0&amp;showinfo=0"
                            opts={opts}
                            onReady={this._onReady}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default VideoPlayer;

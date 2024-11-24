import React, { Component } from "react";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";

const Styles = {
    Style1 : {
        marginTop : "200px",
        marginButton: "200px"
    },
    Style2 : {
        maxWidth : "650px"
    }
}


class TestContainer extends Component {
    render() {
        return (
            <div className="TestContainer" style={Styles.Style1}>
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-md-12">
                            <h1> Test container </h1>
                        </div>

                          <div className="col-md-12">
                                    <div className="video-placeholder"> 
                                            <VideoPlayer />
                                    </div>
                            </div>
                        <div className="col-md-12">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default TestContainer;

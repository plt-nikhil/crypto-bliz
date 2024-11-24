// External libraries
import React from "react";
import "./Loading.css";

class Loading extends React.Component {
    render() {
        return (
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-6 mx-auto">
                        <div className="card h-100 border-primary justify-content-center">
                            <div>
                                <h2 className="text-center">
                                    Loading ...
                                </h2>

                                <div className="d-flex align-items-center flex-column justify-content-center h-1">
                                    <img alt=""
                                        src="https://cdn-images-1.medium.com/max/1600/1*F49hjsMPbXCgNcZwkoXasg.gif"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loading;
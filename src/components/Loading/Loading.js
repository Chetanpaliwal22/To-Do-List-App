import React, { Component } from "react";

class Loading extends Component {

    render() {
        return (
            <div className="col-12 todo-list" >
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading data from firebase . . .</p>
            </div>
        )
    }
}

export default Loading;
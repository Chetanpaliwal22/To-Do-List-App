import React, { Component } from "react";
import { Modal } from 'react-bootstrap';

class Leaderboard extends Component {

    render() {
        const { showLeaderboardPopup, toggleLeaderboardPopup, userScore } = this.props;

        return (
            <Modal show={showLeaderboardPopup} onHide={() => toggleLeaderboardPopup()} >
                <Modal.Header closeButton>
                    <Modal.Title>Leaderboard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <h5>Great you have scored - {this.props.data.length * 3} To-Doist points.</h5>
                        <h9>In the next release, you will be able to see the leadership board.</h9>
                    </div>
                </Modal.Body>
            </Modal >
        );
    }
}

export default Leaderboard;

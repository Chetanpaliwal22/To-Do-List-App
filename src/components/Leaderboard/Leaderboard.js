import React, { Component } from "react";
import { Modal } from 'react-bootstrap';

class Leaderboard extends Component {

    render() {
        const { showLeaderboardPopup, toggleLeaderboardPopup } = this.props;

        return (
            <Modal show={showLeaderboardPopup} onHide={() => toggleLeaderboardPopup()} >
                <Modal.Header closeButton>
                    <Modal.Title>Leaderboard</Modal.Title>
                </Modal.Header>
            </Modal>
        );
    }
}

export default Leaderboard;
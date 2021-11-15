import React, { Component } from "react";
import { Modal } from 'react-bootstrap';

class Leaderboard extends Component {

    render() {
        const { showLeaderboardPopup, toggleLeaderboardPopup } = this.props;
        const score = this.props.data.length * 3;

        return (
            <Modal show={showLeaderboardPopup} onHide={() => toggleLeaderboardPopup()} >
                <Modal.Header closeButton>
                    <Modal.Title>Leaderboard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        {score > 0 ? <h5> Great you have scored - {score} To-Do List points.</h5> : <h5> Your current score is 0. You can earn To-Do List points by completing tasks.</h5>}
                        <p>In the next release, you will be able to see the leadership board.</p>
                    </div>
                </Modal.Body>
            </Modal >
        );
    }
}

export default Leaderboard;

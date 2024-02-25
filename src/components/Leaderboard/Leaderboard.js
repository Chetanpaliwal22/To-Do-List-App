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
                        {score > 0 ? <h5> 🎉 Congratulations! 🎉 You’ve earned {score} To-Do List points! That’s fantastic! 🌟</h5> : <h5> Your current To-Do List score is 0. ☑️ Earn points by checking off completed tasks! </h5>}
                        <p>Stay tuned! The next release brings the leaderboard, providing insights into your performance and ranking.</p>
                    </div>
                </Modal.Body>
            </Modal >
        );
    }
}

export default Leaderboard;

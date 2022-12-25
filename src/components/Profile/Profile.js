import React, { Component } from "react";
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

class Profile extends Component {

    render() {
        const { showProfilePopup, toggleProfilePopup } = this.props;
        const userInfo = this.props.userInfo;
        return (
            <Modal show={showProfilePopup} onHide={() => toggleProfilePopup()} >
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label className="label">Name -</Form.Label>
                            <Form.Label> {userInfo.userName} </Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="label">Email -</Form.Label>
                            <Form.Label> {userInfo.userEmail} </Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal >
        );
    }
}

export default Profile;
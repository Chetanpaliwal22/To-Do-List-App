import React from "react";
import { Button, Modal } from 'react-bootstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import './Signin.css';

class Sigin extends React.Component {

    render() {

        const { showLoginPopup, toggleLoginPopup } = this.props;

        return (
            <Modal show={showLoginPopup} onHide={() => toggleLoginPopup(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup className="formgroup">
                        <Label for="email" className="label">Email:</Label>
                        <Input type="email" name="email" id="email" placeholder="Please enter your email." />
                    </FormGroup>
                    <FormGroup className="formgroup">
                        <Label for="password" className="label">Password:</Label>
                        <Input type="password" name="password" id="password" placeholder="Please enter your password." />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={() => toggleLoginPopup(false)}>Submit</Button>
                    <Button variant="outline-secondary">Continue as Guest</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Sigin;
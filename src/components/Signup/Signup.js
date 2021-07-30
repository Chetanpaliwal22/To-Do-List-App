import React, { Component } from "react";
import { FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

class Signup extends Component {



    render() {
        const { showSignupPopup, toggleSignupPopup } = this.props;

        return (
            <Modal show={showSignupPopup} onHide={() => toggleSignupPopup()}>
                <Modal.Header closeButton>
                    <Modal.Title>Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Label for="email" className="label">Email:</Label>
                        <Input type="email" name="email" id="email" placeholder="Please enter your email." />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className="label">Password:</Label>
                        <Input type="password" name="password" id="password" placeholder="Please enter your password." />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className="label">Confirm Password:</Label>
                        <Input type="password" name="password" id="password" placeholder="Please enter your password." />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success">Sign-up</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Signup;
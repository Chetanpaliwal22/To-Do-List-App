import React from "react";
import { Button, Modal } from 'react-bootstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import firebase from "firebase";
import 'react-toastify/dist/ReactToastify.css';
import './Signin.css';

class Sigin extends React.Component {

    handleSign = (event) => {
        console.log(this.props.releaseVersion)
        if (this.props.releaseVersion !== '1.0') {
            firebase.auth().signInWithEmailAndPassword(
                this.email.value, this.password.value
            ).then(user => {
                console.log('Login successful', user)
            }).catch(err => {
                console.log(err)
            })
        }
        else {
            this.shareToast("Sorry! Login with Email/Pwd is not enabled for this release.")
        }
    }

    shareToast = (message) => toast(message);

    render() {

        const { showLoginPopup, toggleLoginPopup } = this.props;
        toast.configure();

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
                    <p className="link">
                        Having issues with sign in <Link onClick={() => this.shareToast('Only Google Authentication is available for this release!')}>Info?</Link>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={this.handleSign.bind(this)}>Submit</Button>
                    <Button variant="outline-primary" onClick={() => this.shareToast('Work in progress. Sorry!')} >Continue with Google</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Sigin;
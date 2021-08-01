import React from "react";
import { Button, Modal } from 'react-bootstrap';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import firebase from "firebase";
import { maxLength, minLength, validEmail } from '../../utils/Validation';
import 'react-toastify/dist/ReactToastify.css';
import './Signin.css';

class Sigin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailValid: true,
            passwordValid: true
        };
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    appTokenKey = "appToken";

    handleSign = (event) => {
        if (this.props.releaseVersion !== '1.0') {
            firebase.auth().signInWithEmailAndPassword(
                this.state.email.value, this.password.value
            ).then(user => {
                //Login successful
            }).catch(err => {
                //Error
            })
        }
        else {
            this.shareToast("Sorry! Login with Email/Pwd is not available for this release.");
        }
    }

    handleGoogleLogin() {
        this.loginWithGoogle().then(function (result) {
            //Login successful
        }).catch(function (error) {
            alert(error);
            localStorage.removeItem("firebaseAuthInProgress");
        });

        localStorage.setItem("firebaseAuthInProgress", "1");
        this.props.toggleSigninPopup();
    }

    shareToast = (message) => toast(message);

    loginWithGoogle() {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(googleProvider);
    }

    onEmailchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            emailValid: validEmail(event.target.value)
        });
    }

    onPasswordchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            passwordValid: minLength(event.target.value, 4) && maxLength(event.target.value, 10)
        });
    }

    render() {

        const { showSigninPopup, toggleSigninPopup } = this.props;
        toast.configure();

        return (
            <Modal show={showSigninPopup} onHide={() => toggleSigninPopup()}>
                <Modal.Header closeButton>
                    <Modal.Title>Signin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Label for="email" className="label">Email:</Label>
                        <Input invalid={!this.state.emailValid} type="email" name="email" id="email" placeholder="Enter your email here..." value={this.state.email} onChange={this.onEmailchange} />
                        <FormFeedback>Not a valid Email address</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className="label">Password:</Label>
                        <Input invalid={!this.state.passwordValid} type="password" name="password" id="password" placeholder="Enter your password here..." value={this.state.password} onChange={this.onPasswordchange} />
                        <FormFeedback>This password is not valid.</FormFeedback>
                    </FormGroup>
                    <p className="link">
                        Having issues with sign in <Link onClick={() => this.shareToast('Only Google Authentication is available for this release!')}>Info?</Link>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={this.handleSign.bind(this)}>Sign-in</Button>
                    <Button variant="outline-primary" onClick={this.handleGoogleLogin.bind(this)} >Continue with Google</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Sigin;
import React from "react";
import { Button, Modal } from 'react-bootstrap';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import firebase from "firebase";
import { required, validEmail } from '../../utils/Validation';
import { db } from '../../firebase';
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
        this.authSuccess = this.authSuccess.bind(this);
        this.handleSignin = this.handleSignin.bind(this);
    }

    appTokenKey = "appToken";

    handleSignin = () => {

        this.validateForm();

        const isFormValid = this.state.emailValid && this.state.passwordValid;
        if (!isFormValid) {
            return;
        }

        firebase.auth().signInWithEmailAndPassword(
            this.state.email, this.state.password
        ).then(user => {
            this.authSuccess();
        }).catch(err => {
            localStorage.removeItem("firebaseAuthInProgress");
            if (err.code === "auth/wrong-password") {
                this.shareToast("Password is invalid, Try again!");
                this.setState({
                    passwordValid: false
                });
            }
        });
        localStorage.setItem("firebaseAuthInProgress", "1");

    }

    validateForm = () => {
        this.setState({
            emailValid: validEmail(this.state.email),
            passwordValid: required(this.state.password)
        });
    }

    authSuccess = async () => {

        let user = await db.collection('User').where("userEmail", "==", this.state.email).get();
        user.docs.map(doc => {
            let userData = doc.data();
            const userInfo = {
                userName: userData.userName,
                userEmail: userData.email,
                userId: userData.userId
            }
            localStorage.removeItem("firebaseAuthInProgress");
            localStorage.setItem(this.appTokenKey, userData.userId);
            this.props.updateUserInfo(userInfo);
            this.props.updateContent();
            this.props.toggleSigninPopup();
        })

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
            passwordValid: required(event.target.value)
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
                        <FormFeedback>This password is not correct.</FormFeedback>
                    </FormGroup>
                    <p className="link">
                        Having issues with sign in <Link onClick={() => this.shareToast('Only Google Authentication is available for this release!')}>Info?</Link>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={this.handleSignin.bind(this)}>Sign-in</Button>
                    <Button variant="outline-primary" onClick={this.handleGoogleLogin.bind(this)} >Continue with Google</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Sigin;
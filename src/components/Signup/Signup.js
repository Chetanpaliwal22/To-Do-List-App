import React, { Component } from "react";
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Button, Modal } from 'react-bootstrap';
import firebase from "firebase";
import { toast } from 'react-toastify';
import { maxLength, minLength, validEmail, isSamePassword } from '../../utils/Validation';
import { db } from '../../firebase';

class Signup extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
            nameValid: true,
            emailValid: true,
            passwordValid: true,
            confirmPasswordValid: true
        };
        this.onNamechange = this.onNamechange.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.authSuccess = this.authSuccess.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    shareToast = (message) => toast(message);

    onNamechange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            nameValid: minLength(event.target.value, 3) && maxLength(event.target.value, 12)
        });
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
            passwordValid: minLength(event.target.value, 6) && maxLength(event.target.value, 10)
        });
    }

    onConfirmPasswordchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            confirmPasswordValid: isSamePassword(this.state.password, event.target.value)
        });
    }

    registerUser = () => {
        this.validateForm();
        const isFormValid = this.state.nameValid && this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid;
        if (!isFormValid) {
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.authSuccess())
            .catch(() => { this.shareToast('User registration failed!') });
        this.props.toggleLoadingMode();
        this.props.toggleSignupPopup();
    }

    authSuccess = () => {
        const userInfo = {
            userName: this.state.name,
            userEmail: this.state.email,
            userId: Date.now(),
            userScore: 0,
            creationDate: Date.now(),
            lastActiveDate: Date.now()
        }

        db.collection('User').doc(userInfo.userId.toString()).set(userInfo).then(() => {
            this.props.toggleLoadingMode();
            this.props.updateUserInfo(userInfo);
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    validateForm = () => {
        this.setState({
            nameValid: (minLength(this.state.name, 3) && maxLength(this.state.name, 12)),
            emailValid: validEmail(this.state.email),
            passwordValid: (minLength(this.state.password, 6) && maxLength(this.state.password, 10)),
            confirmPasswordValid: isSamePassword(this.state.password, this.state.confirmpassword)
        });
    }

    render() {
        const { showSignupPopup, toggleSignupPopup } = this.props;
        toast.configure();

        return (
            <Modal show={showSignupPopup} onHide={() => toggleSignupPopup()}>
                <Modal.Header closeButton>
                    <Modal.Title>Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Label for="name">Name:</Label>
                        <Input invalid={!this.state.nameValid} type="name" name="name" id="name" placeholder="Enter your name here..." value={this.state.name} onChange={this.onNamechange} />
                        <FormFeedback>Name of at least 3 & at most 12 character is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email" className="label">Email:</Label>
                        <Input invalid={!this.state.emailValid} type="email" name="email" id="email" placeholder="Enter your email here..." value={this.state.email} onChange={this.onEmailchange} />
                        <FormFeedback>Not a valid Email address</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className="label">Password:</Label>
                        <Input invalid={!this.state.passwordValid} type="password" name="password" id="password" placeholder="Enter your password here..." value={this.state.password} onChange={this.onPasswordchange} />
                        <FormFeedback>Password of at least 6 & at most 10 character is Required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmpassword" className="label">Confirm Password:</Label>
                        <Input invalid={!this.state.confirmPasswordValid} type="password" name="confirmpassword" id="confirmpassword" placeholder="Confirm your password..." value={this.state.confirmpassword} onChange={this.onConfirmPasswordchange} />
                        <FormFeedback>Password doesn't match</FormFeedback>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={this.registerUser}>Sign-up</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Signup;
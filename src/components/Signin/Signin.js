import React from "react";
import { Button, Modal } from 'react-bootstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import firebase from "firebase";
import { Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Signin.css';

class Sigin extends React.Component {


    firebaseAuthKey = "firebaseAuthInProgress";
    appTokenKey = "appToken";

    handleSign = (event) => {
        if (this.props.releaseVersion !== '1.0') {
            firebase.auth().signInWithEmailAndPassword(
                this.email.value, this.password.value
            ).then(user => {
                console.log('Login successful');
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            this.shareToast("Sorry! Login with Email/Pwd is not available for this release.");
        }
    }

    handleGoogleLogin() {
        var user = {};
        this.loginWithGoogle().then(function (result) {
            var token = result.credential.accessToken;
            user = result.user;
        }).catch(function (error) {
            alert(error);
            localStorage.removeItem(this.firebaseAuthKey);
        });
        this.props.toggleLoginPopup(false)
        this.props.updateUser(user);
        localStorage.setItem(this.firebaseAuthKey, "1");
    }

    componentWillMount() {

        if (localStorage.getItem(this.appTokenKey)) {
            return <Redirect to='/To-Do-List-App/home' />
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                localStorage.removeItem(this.firebaseAuthKey);
                localStorage.setItem(this.appTokenKey, user.uid);
                return <Redirect to='/To-Do-List-App/home' />
            }
        });
    }

    shareToast = (message) => toast(message);

    loginWithGoogle() {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(googleProvider);
    }

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
                    <Button variant="outline-primary" onClick={this.handleGoogleLogin.bind(this)} >Continue with Google</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Sigin;
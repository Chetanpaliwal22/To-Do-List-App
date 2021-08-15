import React from 'react';
import {
    Navbar, NavbarBrand, Nav, Collapse, NavItem
} from 'reactstrap';
import { NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

class Header extends React.Component {

    render() {
        const { toggleCompletedTaskMode, toggleSigninPopup, toggleSignupPopup, handleLogOut, toggleLeaderboardPopup } = this.props;

        return (

            <div>
                <Navbar dark expand="md header">
                    <div className="container">
                        <NavbarBrand className="mr-auto">TO-Do List</NavbarBrand>
                        <Collapse navbar>
                            <Nav navbar className="headeritem">
                                <NavItem>
                                    <NavLink className="nav-link" to='/To-Do-List-App/home' onClick={() => toggleCompletedTaskMode(false)}><span className="fa fa-home fa-sm"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/To-Do-List-App/completed-task' onClick={() => toggleCompletedTaskMode(true)}><span className="fa fa-list fa-sm"></span> Completed-Tasks</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                {this.props.userInfo && this.props.userInfo.userName !== '' ?
                                    <NavDropdown title={<span className="text-white">{this.props.userInfo.userName}</span>}>
                                        <NavDropdown.Item>About To-Do List</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => toggleLeaderboardPopup()}>Leaderboard</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleLogOut()}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                    : <Nav navbar>
                                        <NavItem>
                                            <NavLink className="nav-link fa fa-sign-in fa-sm" to='' onClick={() => toggleSigninPopup()}> Sign-in</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link fa fa-list-alt  fa-sm" to='' onClick={() => toggleSignupPopup()}> Sign-up</NavLink>
                                        </NavItem>
                                    </Nav>}
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    };

}

export default Header;
import React from 'react';
import {
    Navbar, NavbarBrand, Nav, Collapse, NavItem, Button
} from 'reactstrap';
import { NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

class Header extends React.Component {

    render() {
        const { toggleCompletedTaskMode, toggleLoginPopup, handleLogOut } = this.props;

        return (

            <div>
                <Navbar dark expand="md header">
                    <div className="container">
                        <NavbarBrand className="mr-auto">TO-Do List</NavbarBrand>
                        <Collapse navbar>
                            <Nav navbar className="headeritem">
                                <NavItem>
                                    <NavLink className="nav-link" to='/To-Do-List-App/home' onClick={() => toggleCompletedTaskMode(false)}><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/To-Do-List-App/completed-task' onClick={() => toggleCompletedTaskMode(true)}><span className="fa fa-list fa-lg"></span> Completed-Tasks</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                {this.props.userInfo.userName !== '' ?
                                    <NavDropdown title={<span className="text-white">{this.props.userInfo.userName}</span>}>
                                        <NavDropdown.Item onClick={() => handleLogOut()}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                    : <NavItem>
                                        <Button outline onClick={() => toggleLoginPopup(true)} >
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                        </Button>
                                    </NavItem>}
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    };

}

export default Header;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar, NavbarBrand, Nav, Collapse, NavItem, Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
class Header extends React.Component {

    render() {
        const { toggleShowTaskFormMode, toggleLoginPopup } = this.props;

        return (

            <div>
                <Navbar dark expand="md header">
                    <div className="container">
                        <NavbarBrand className="mr-auto">TO-Do List</NavbarBrand>
                        <Collapse navbar>
                            <Nav navbar className="headeritem">
                                <NavItem>
                                    <NavLink className="nav-link" to='/home' onClick={() => toggleShowTaskFormMode(false)}><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/completed-task' onClick={() => toggleShowTaskFormMode(true)}><span className="fa fa-info fa-lg"></span>Completed-Tasks</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={() => toggleLoginPopup(true)} >
                                        <span className="fa fa-sign-in fa-lg"></span> Login
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    };

}

export default Header;
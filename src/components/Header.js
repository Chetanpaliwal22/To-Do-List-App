import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar, NavbarBrand, Nav, Collapse, NavItem, Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
class Header extends React.Component {

    render() {
        const { toggleTaskMode } = this.props;

        return (

            <div>
                <Navbar dark expand="md header">
                    <div className="container">
                        <NavbarBrand className="mr-auto">TO-Do List</NavbarBrand>
                        <Collapse navbar>
                            <Nav navbar className="headeritem">
                                <NavItem>
                                    <NavLink className="nav-link" to='/' onClick={() => toggleTaskMode(false)}><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/completed-task' onClick={() => toggleTaskMode(true)}><span className="fa fa-info fa-lg"></span>Completed-Tasks</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline href='/sign-in'>
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
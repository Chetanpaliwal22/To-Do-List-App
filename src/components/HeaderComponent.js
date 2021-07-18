import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar, NavbarBrand, Nav, NavLink, Collapse, NavItem, Button,
} from 'reactstrap';

class Header extends React.Component {

    render() {
        const { toggleTaskMode } = this.props;

        return (

            <div>
                <Navbar dark expand="md header">
                    <div className="container">
                        <NavbarBrand className="mr-auto" onClick={() => toggleTaskMode(false)}>TO-Do List</NavbarBrand>
                        <Collapse navbar>
                            <Nav navbar className="headeritem">
                                <NavItem>
                                    <NavLink className="nav-link" onClick={() => toggleTaskMode(true)}><span className="fa fa-home fa-lg"></span>Completed Task</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline>
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
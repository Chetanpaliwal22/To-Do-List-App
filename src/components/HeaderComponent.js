import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar, NavbarBrand, Nav, NavLink, NavbarToggler, Collapse, NavItem, Button,
} from 'reactstrap';

class Header extends React.Component {

    render() {
        return (

            <div>
                <Navbar dark expand="md header">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">TO-Do List</NavbarBrand>
                        <Collapse navbar>
                            <Nav navbar className="headeritem">
                            <NavItem>
                                    <NavLink className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span> Completed</NavLink>
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
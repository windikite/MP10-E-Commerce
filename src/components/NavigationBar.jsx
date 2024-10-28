import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Container, Navbar, Nav, Image, Badge } from "react-bootstrap";

function NavigationBar(){
    

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" className="text-info align-items-center"><Image src='/logo.bmp' style={{maxHeight: "20px"}} />Silph Co</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/customers" activeclassname="active">
                        Customers
                    </Nav.Link>

                    <Nav.Link as={NavLink} to="/products" activeclassname="active">
                        Products
                    </Nav.Link>

                    <Nav.Link as={NavLink} to="/cart" activeclassname="active">
                        Cart
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar
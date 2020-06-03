import React, {Component} from 'react';
import './Header.css';
import { Button, Navbar, NavDropdown, Nav, Form, FormControl, DropdownButton } from 'react-bootstrap';
import SignOutButton from './SignOut';

const Header = ({ authUser, onSignIn, onSignUp }) => (
            <div className="wrapper" >
            <div className='yellowTop'>
        <Navbar bg="light" className="color-nav">
            <Navbar.Brand style={{ fontSize:"40px", fontWeight:"bold", color:"white"}} href="/">&#128095; NormWear</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                     <Nav.Link  style={{color:"white"}} href="/about">About</Nav.Link> 
                     <Nav.Link  style={{color:"white"}} href="/faq">FAQ</Nav.Link> 
                </Nav>
            </Navbar.Collapse>
            {authUser ?  (
            <div>
      <SignOutButton style={{marginTop: '5vh'}}/>
            </div>  
  ) :  ( 
   <div>
      <Button variant="warning" style={{marginRight: "1vw"}} onClick={onSignIn}>Sign In</Button>
   
 
      <Button variant="warning" onClick={onSignUp}>Sign Up</Button>
    </div>
    )}
        </Navbar>
            </div>
            </div>
        );

export default Header;
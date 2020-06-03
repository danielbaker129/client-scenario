import React from 'react';
import {Button} from 'react-bootstrap';
import { withFirebase } from './Firebase';
 
const SignOutButton = ({ firebase }) => (
  // <button type="button" onClick={firebase.doSignOut}>
  //   Sign Out
  // </button>
  <Button variant="warning" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);
 
export default withFirebase(SignOutButton);
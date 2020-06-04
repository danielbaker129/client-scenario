import React from 'react';
import {Button} from 'react-bootstrap';
import { withFirebase } from './Firebase';
 
const SignOutButton = ({ firebase }) => {
  const[getSomething, setSomething] = React.useState(true);

    const alertButton = ()=>{
        if(getSomething){
          alert("Come back soon! =)")
        }
        firebase.doSignOut();
    }
  return(
  // <button type="button" onClick={firebase.doSignOut}>
  //   Sign Out
  // </button>
  <Button variant="warning" onClick={alertButton}>
    Sign Out
  </Button>
);
}
 
export default withFirebase(SignOutButton);
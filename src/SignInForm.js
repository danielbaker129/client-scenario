import React from 'react'
import {withFirebase} from './Firebase'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import './SignUpForm.css'
import { Button, Navbar, NavDropdown, Nav, Form, FormControl, DropdownButton } from 'react-bootstrap';

const SignInDialog = (props) => {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <Dialog onClose={handleClose} fullWidth='true' aria-labelledby="simple-dialog-title" open={true}>
      <DialogTitle style={{textAlign: 'center'}} id="simple-dialog-title">Welcome back!</DialogTitle>
      <SignIn/>
    </Dialog>
  );
}

SignInDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


class SignInForm extends React.Component {
    constructor(props) {
      super(props);
   
      this.state = {
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: null,
      };
    }
   
    onSubmit = event => {
      const { email, password } = this.state;
   
      this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({
            username: '',
            email: '',
            error: null,
          });
        })
        .catch(error => {
          this.setState({ error });
        });
   
      event.preventDefault();
    };
   
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
   
    render() {
      const { email, password, error } = this.state;
   
      const isInvalid = email === '';
   
      return (
        <form style={{display: "block", marginLeft: "auto", marginRight: "auto"}} onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="text"
            placeholder="Username"
          />
          <Button className="signUpButton" disabled={isInvalid} type="submit" variant="warning">Sign In</Button>
   
          {error && <p>{error.message}</p>}
        </form>
      );
    }
  }
   
  const SignIn = withFirebase(SignInForm);
   export {SignIn};
  export default SignInDialog;
import React from 'react'
import {withFirebase} from './Firebase'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button, Navbar, NavDropdown, Nav, Form, FormControl, DropdownButton } from 'react-bootstrap';
import './SignUpForm.css'

  const SignUpDialog = (props) => {
  const handleClose = () => {
    props.onClose();
  };

  

  return (
    <Dialog onClose={handleClose} fullWidth='true' aria-labelledby="simple-dialog-title" open={true}>
      <DialogTitle style={{textAlign: 'center', fontWeight:"bold"}} id="simple-dialog-title">Sign Up for NormWear!</DialogTitle>
      <SignUp/>
    </Dialog>
  );
}

SignUpDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

class SignUpForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        username: '',
        email: '',
        referralCode: '',
        error: null,
      };
    }
   
    onSubmit = event => {
        const { username, email, referralCode } = this.state;
        // alert("here");
        this.props.firebase
          .doCreateUserWithEmailAndPassword(email, username)
          .then(authUser => {
            return this.props.firebase
            .user(authUser.user.uid)
            .set({
              username,
              email,
              points: 0,
              twitter: true,
              facebook: true,
              isSent: 'No Rewards',
            });
            //set state of code so have to send it as props, set when you sign in or register
            
          })
          .catch(error => {
            this.setState({ error });
          });

          if(referralCode.length > 0){
            // alert("here");
            let fix = true;
            //referal code: Dj7KCon9uoSR1hFjFQqpDO98o9v2    
            const data = this.props.firebase.user(referralCode);
            data.on('value', (snapshot)=>{
              let user = snapshot.val();
              if(fix){
                fix = false;
                this.props.firebase.user(referralCode)
              .set({
                points : user.points + 1,
                email: user.email,
                username: user.username,
                twitter: user.twitter,
                facebook: user.facebook,
                isSent: user.isSent,
              });
              }
            });
          }
     
        event.preventDefault();
    }
   
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
   
    render() {
        const {
            username,
            email,
            referralCode,
            error,
          } = this.state;

          const isInvalid =
          email === '' ||
          username === '';
      return (
        <form style={{display: "block", marginLeft: "auto", marginRight: "auto"}} onSubmit={this.onSubmit}>
        {/* <label>Username</label><br/> */}
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Username"
          minlength="6"
        />
        {/* <br/> */}
        {/* <label>Email</label><br/> */}
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        {/* <br/> */}
        {/* <label>Referral Code</label><br/> */}
        <input
          name="referralCode"
          value={referralCode}
          onChange={this.onChange}
          type="text"
          placeholder="Referral Code (if used)"
        />
          <Button className="signUpButton" disabled={isInvalid} type="submit" variant="warning">Sign Up</Button>
        {error && <p>{error.message}</p>}
      </form>
      );
    }
  }

const SignUp = withFirebase(SignUpForm);
   
export default SignUpDialog;
export {SignUp};
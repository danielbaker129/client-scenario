import React from 'react'
import { withFirebase } from './Firebase'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import './SignUpForm.css';
import { Button, Navbar, NavDropdown, Nav, Form, FormControl, DropdownButton } from 'react-bootstrap';

const AddressDialog = (props) => {
  const handleClose = () => {
    props.onClose();
  };
  console.log("auth", props.authUser)
  return (
    <Dialog onClose={handleClose} fullWidth='true' aria-labelledby="simple-dialog-title" open={true}>
      <DialogTitle style={{ textAlign: 'center' }} id="simple-dialog-title">Thanks! Your reward should arrive soon.</DialogTitle>
      <h7 style={{ marginRight: '2vw', marginLeft: '2vw', marginBottom: '2vh' }}>Once you click submit, your address will be saved in our database. You can always come back to edit it.</h7>
      <AddressInput
        authUser={props.authUser}
        address={props.address}
        onClose={props.onClose}
        code={props.code}
      />
    </Dialog>
  );
}

AddressDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


class AddressForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null,
    };
  }

  changeAddress = () => {
    console.log("here");
    console.log('authUser', this.props.authUser);
    console.log('code', this.props.code);
    let fix = true;
    const data = this.props.firebase.user(this.props.authUser.uid);
    data.on('value', (snapshot) => {
      let user = snapshot.val();
      if (fix) {
        fix = false;
        this.props.firebase.user(this.props.authUser.uid)
          .set({
            points: user.points,
            email: user.email,
            username: user.username,
            twitter: user.twitter,
            facebook: user.facebook,
            isSent: user.isSent,
            isAdmin: user.isAdmin,
            address: this.state.address,
          });
      }
    });
  }

  onSubmit = event => {
    //this.props.changeAddress(this.state.address);
  }


  onChange = event => {
    // console.log("onChange")
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = this.state.address === '';

    return (
      <form style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>
        <input
          name="address"
          value={this.state.address}
          onChange={this.onChange}
          // onChange={this.props.changeAddress}
          type="text"
          placeholder="Address"
          style={{ width: '30vw' }}
        />
        <Button className="signUpButton" disabled={isInvalid} type="button" variant="warning" onClick={this.changeAddress}>Submit</Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const AddressInput = withFirebase(AddressForm);
export { AddressInput };
export default AddressDialog;
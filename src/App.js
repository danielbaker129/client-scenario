import React, { Component } from 'react';
import './App.css';
import About from './About.js';
import FAQ from './FAQ.js';
import Header from './Header.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login.js';
import Home from './Home'
import { Container } from 'react-bootstrap'
import SignUpDialog from './SignUpForm'
import SignInDialog from './SignInForm'
import { withFirebase } from './Firebase';
import PrivateRoute from './ProtectedRoute'
import Dashboard from './Dashboard.js';
import AddressDialog from './AddressForm.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authUser: null,
      isSignUp: false,
      isSignIn: false,
      email: "",
      points: 0,
      code: "",
      username: "",
      allUsers: [],
      isAdmin: false,
      address: '',
      showAddressForm: false,
      fixing: false,
    }
  }

  setData = (authUser) => {
    this.setState({ authUser })
    const all = this.props.firebase.users();
    all.on('value', (snapshot) => {
      let users = snapshot.val();
      let temp = [];
      for (let item in users) {
        temp.push({ username: users[item].username, email: users[item].email, points: users[item].points, code: item, isSent: users[item].isSent, });
      }

      this.setState({
        allUsers: temp,
      });
    });
    const data = this.props.firebase.user(this.state.authUser.uid);
    data.on('value', (snapshot) => {
      let user = snapshot.val();
      this.setState({
        points: user.points,
        code: this.state.authUser.uid,
        username: user.username,
        isAdmin: user.isAdmin,
        address: user.address,
        fixing: true,
      });
    })
  }

  incrementTwitter = () => {
    let fix = true;
    const data = this.props.firebase.user(this.state.authUser.uid);
    data.on('value', (snapshot) => {
      let user = snapshot.val();
      if (fix && user.twitter) {
        fix = false;
        this.props.firebase.user(this.state.authUser.uid)
          .set({
            points: user.points + 1,
            email: user.email,
            username: user.username,
            twitter: false,
            facebook: user.facebook,
            isSent: user.isSent,
            isAdmin: user.isAdmin,
            address: user.address,
          });
      }
    });
  }

  incrementFacebook = () => {
    let fix = true;
    const data = this.props.firebase.user(this.state.authUser.uid);
    data.on('value', (snapshot) => {
      let user = snapshot.val();
      if (fix && user.facebook) {
        fix = false;
        this.props.firebase.user(this.state.authUser.uid)
          .set({
            points: user.points + 1,
            email: user.email,
            username: user.username,
            twitter: user.twitter,
            facebook: false,
            isSent: user.isSent,
            isAdmin: user.isAdmin,
            address: user.address,
          });
      }
    });
  }

  // changeAddress=(newAddress)=>{
  //   alert("got here");
  //   let fix = true;
  //   const data = this.props.firebase.user(this.state.authUser.uid);

  //   data.on('value', (snapshot) => {
  //     let user = snapshot.val();
  //     if (fix) {
  //       fix = false;
  //       this.props.firebase.user(this.state.authUser.uid)
  //         .set({
  //           points: user.points,
  //           email: user.email,
  //           username: user.username,s
  //           twitter: user.twitter,
  //           facebook: user.facebook,
  //           isSent: user.isSent,
  //           isAdmin: user.isAdmin,
  //           address: newAddress,
  //         });
  //     }
  //   });
  //   this.setState({
  //     address: newAddress
  //   })
  // }

  changeIsSent = (event, uid) => {
    let newIsSent = 'No';
    if (event === true) {
      newIsSent = 'Yes';
    }
    let fix = true;
    if (event != null) {
      const data = this.props.firebase.user(uid);
      data.on('value', (snapshot) => {
        let user = snapshot.val();
        if (fix) {
          fix = false;
          this.props.firebase.user(uid)
            .set({
              points: user.points,
              email: user.email,
              username: user.username,
              twitter: user.twitter,
              facebook: user.facebook,
              isSent: newIsSent,
              isAdmin: user.isAdmin,
              address: user.address,
            });
        }
      });
    }
    // console.log('event', event);

  }
  // setState
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setData(authUser)
          : this.setState({ authUser: null });
      },
    );

  }

  componentWillUnmount() {
    this.listener();
  }

  onSignUp = () => {
    this.setState({
      isSignUp: true
    });
  }

  onSignIn = () => {
    this.setState({
      isSignIn: true
    });
  }

  handleAddress = () => {
    this.setState({
      showAddressForm: true,
    })
  }

  onClose = () => {
    this.setState({
      isSignIn: false,
      isSignUp: false,
      showAddressForm: false
    });
    // console.log("auth user", this.state.authUser);
  }

  render() {
    return (
      <Router>
        <div className="edges" style={{ minHeight: "100vh" }}>
          <Header authUser={this.state.authUser} username={this.state.username} onSignUp={this.onSignUp} onSignIn={this.onSignIn} isAdmin={this.state.isAdmin} />
          {this.state.isSignUp ? <SignUpDialog onClose={this.onClose} /> : null}
          {this.state.isSignIn ? <SignInDialog onClose={this.onClose} /> : null}
          {(this.state.showAddressForm && (this.state.fixing)) ? <AddressDialog
            // changeAddress={this.changeAddress}
            authUser={this.state.authUser}
            address={this.state.address}
            onClose={this.onClose}
            code={this.state.code} />
            : null}
          <Container fluid className="text-light" style={{ minHeight: "100vh", width: "80vw" }}>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/FAQ" component={FAQ} />
              <Route path='/dashboard' component={() => <Dashboard allUsers={this.state.allUsers} changeIsSent={this.changeIsSent} isAdmin={this.state.isAdmin} />} />
              <Route path="/" component={() => <Home address={this.state.address} changeAddress={this.changeAddress} code={this.state.code} points={this.state.points} authUser={this.state.authUser} incrementFacebook={this.incrementFacebook} incrementTwitter={this.incrementTwitter} isAdmin={this.state.isAdmin} handleAddress={this.handleAddress} />} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
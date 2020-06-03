import React, {Component} from 'react';
import './App.css';
import About from './About.js';
import FAQ from './FAQ.js';
import Header from './Header.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Login.js';
import Home from './Home'
import {Container} from 'react-bootstrap'
import SignUpDialog from './SignUpForm'
import SignInDialog from './SignInForm'
import { withFirebase } from './Firebase';
import PrivateRoute from './ProtectedRoute'

class App extends Component {
  constructor() {
    super();
    this.state = {
      authUser: null,
      isSignUp: false,
      isSignIn: false,
      email: "",
      points: 10,
      code: "",
    }
  }

  setData =(authUser)=>{
    this.setState({ authUser })
    const data = this.props.firebase.user(this.state.authUser.uid);
    data.on('value', (snapshot)=>{
      let user = snapshot.val();
      console.log("user data", user);
      this.setState({
        points: user.points,
        code: this.state.authUser.uid
      });
    })
  }

  incrementTwitter= () =>{
    let oldEmail = "";
    let oldUsername = "";
    let oldPoints= 0;
    let fix = true;
    let oldTwitter;
    let oldFacebook;
    const data = this.props.firebase.user(this.state.authUser.uid);
    data.on('value', (snapshot)=>{
    let user = snapshot.val();
             
    if(fix && user.twitter){
      oldPoints = user.points + 1;
      oldEmail = user.email;
      oldUsername = user.username;
      fix = false;
      oldFacebook = user.facebook;
      this.props.firebase.user(this.state.authUser.uid)
      .set({
        points : oldPoints,
        email: oldEmail,
        username: oldUsername,
        twitter: false,
        facebook: oldFacebook,
      });
      }
              

      });
  }

  incrementFacebook= () =>{
    let oldEmail = "";
    let oldUsername = "";
    let oldPoints= 0;
    let fix = true;
    let oldTwitter;
    let oldFacebook;
    const data = this.props.firebase.user(this.state.authUser.uid);
    data.on('value', (snapshot)=>{
    let user = snapshot.val();
              
    if(fix && user.facebook){
      oldPoints = user.points + 1;
      oldEmail = user.email;
      oldUsername = user.username;
      oldTwitter = user.twitter;
      fix = false;
      
      this.props.firebase.user(this.state.authUser.uid)
      .set({
        points : oldPoints,
        email: oldEmail,
        username: oldUsername,
        twitter: oldTwitter,
        facebook: false,
      });
      }
              

      });
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ?  this.setData(authUser)
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

  onClose = () => {
    this.setState({
      isSignIn: false,
      isSignUp: false,
    });
    console.log("auth user", this.state.authUser);
  }

  render() {
    return (
    <Router>
      <div className="edges" style={{minHeight: "100vh"}}>
      <Header authUser={this.state.authUser} onSignUp={this.onSignUp} onSignIn={this.onSignIn}/>
      {this.state.isSignUp ?   <SignUpDialog onClose={this.onClose}/> : null}
        {this.state.isSignIn ?  <SignInDialog onClose={this.onClose}/> : null} 
      <Container fluid className="text-light" style={{minHeight: "100vh", width: "80vw"}}>
      <Switch>
        <Route path="/about" component={About}/>
        <Route path="/FAQ" component={FAQ}/>
        <Route path="/" component={() => <Home code={this.state.code} points={this.state.points} authUser={this.state.authUser} incrementFacebook={this.incrementFacebook} incrementTwitter={this.incrementTwitter}/>}/>
      </Switch>
      </Container>
      </div>
    </Router>
    );
  }
}

export default withFirebase(App);
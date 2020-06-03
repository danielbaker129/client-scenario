// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import app from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';

require('dotenv').config();
// TODO: Replace the following with your app's Firebase project configuration

class Firebase {

  constructor() {
    var config = {
      apiKey: process.env.GATSBY_REACT_APP_API_KEY,
      authDomain: process.env.GATSBY_REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.GATSBY_REACT_APP_DATABASE_URL,
      projectId: process.env.GATSBY_REACT_APP_PROJECT_ID,
      storageBucket: process.env.GATSBY_REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.GATSBY_REACT_APP_SENDER_ID,
      appId: process.env.GATSBY_REACT_APP_ID
    };
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  admins = () => this.db.ref('users/admins');

};

export default Firebase;
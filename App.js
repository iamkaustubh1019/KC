import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import {Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import AuthNavigate from './src/Navigators/AuthNavigate';
import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp';
import Otp from './src/pages/Otp';
import Main from './src/Main';

class App extends Component {

  state = { loggedIn: false}

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedIn: true});
      }

      else {
        this.setState({loggedIn: false});
      }
    });
  }

    componentWillUnmount() {
      this.authSubscription();
    }
    onLogOut() {
        firebase.auth().signOut();
    }
    renderContent() {
      const { loggedIn } = this.state;
      if(loggedIn == true) {
        return <Main />
      }

      else {
        return <AuthNavigate />;
      }
    }

  render() {
    return(
        <View style={{flex: 1}}>
          {this.renderContent()}
        </View>
      );
  }
}

export default App;

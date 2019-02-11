import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,
        StatusBar, Keyboard, ActivityIndicator} from 'react-native';
import Logo from '../Components/Logo';
import Form from '../Components/Form';
import firebase from 'react-native-firebase';
import { SignUpScreen, OtpScreen } from '../Components/ScreenNames';
import Otp from './Otp';

class Login extends Component {

  static navigationOptions = {
    header: null,
  };

  state = { phoneNumber: '+91',error: '', loading: false, confirmResult: null,
               isEditable: true, isDisabled: false};
  onSendOtp() {
    const {phoneNumber} = this.state;
    Keyboard.dismiss();

    this.setState({
       error: '',
       loading: true,
       isDisabled: true,
       isEditable: false
     });

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult =>
        this.setState({
          confirmResult,
          phoneNumber: '+91',
          loading: false,
          isDisabled: false,
          isEditable: true,
          error: ''
        }))
      .catch(this.onSendFail.bind(this));
  }

  onSendFail() {
    this.setState({
      error: 'Authentication failed',
      isDisabled: false,
      loading: false,
      isEditable: true
    })
  }

  confirmCode(isValid,code) {
    const {confirmResult} = this.state;

    if(confirmResult && code.length) {
      confirmResult.confirm(code)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFail.bind(this));
    }
  }

  onLoginSuccess() {
    this.setState({
      confirmCode: '',
      confirmResult: null
    })
  }

  onLoginFail() {

  }

  renderContent() {
    const { confirmResult } = this.state;
    if(confirmResult == null) {

      const { navigate } = this.props.navigation;
      return(
        <View style={styles.container}>

        <StatusBar
          backgroundColor="#212121"
          barStyle="light-content"
          />

          <Logo />
          <Form type="Login"
            value={this.state.phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
            onPress={this.onSendOtp.bind(this)}
            editable={this.state.isEditable}
            disabled={this.state.isDisabled}
            placeholder="Enter phone no."/>

          <View style={styles.signUpTextCont}>
            <Text style={styles.signUpText}>Dont have an account yet?</Text>

            <TouchableOpacity
              onPress={() =>navigate('SignUpScreen')}>
              <Text style={styles.signUpButton}> Signup</Text>
            </TouchableOpacity>

          </View>

          {this.state.loading && <View style={styles.loading}
                              pointerEvents={"none"}>
          <ActivityIndicator size="large" />
          </View>

          }

        </View>
      );
    }

    else {
      return <Otp
                value={this.state.codeInput}
                onFulfill={(isValid,code)=>this.confirmCode(isValid,code)}
                />;
    }
  }


  render() {
    return(
      <View style={{flexGrow: 1}}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#263238',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  signUpTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },

  signUpText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16
  },

  signUpButton: {
    color: '#d50000',
    fontSize: 16,
    fontWeight: '500'
  },

  loading: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  opacity: 0.5,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF88'
}
});

export default Login;

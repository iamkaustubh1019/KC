import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,
        StatusBar} from 'react-native';
import Logo from '../Components/Logo';
import Form from '../Components/Form';
import {LoginScreen} from '../Components/ScreenNames';

export default class SignUp extends Component<> {

  static navigationOptions = {
    header: null,
  };

  render() {

    const { navigate } = this.props.navigation;

    return(
      <View style={styles.container}>

      <StatusBar
        backgroundColor="#212121"
        barStyle="light-content"
      />

        <Logo />
        <Form type="SignUp"
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          onPress={this.props.onPress}
          placeholder="Enter phone no." />

        <View style={styles.signUpTextCont}>

          <Text style={styles.signUpText}>Already have an account?</Text>

          <TouchableOpacity
            onPress={() =>navigate('LoginScreen')}>
            <Text style={styles.signUpButton}> Signin</Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#263238',
    flex: 1,
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
  }
});

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,
        StatusBar} from 'react-native';
import Form from '../Components/Form';
import Logo from '../Components/Logo';


class Otp extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return(

      <View style={styles.containerStyle}>
        <StatusBar
          backgroundColor="#212121"
          barStyle="light-content"
          />

          <Logo />
          <Form type="Confirm Code"
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            onPress={this.props.onPress}
            placeholder="Enter the OTP here"
            />
        </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#263238',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}
export default Otp;

import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  Text,
  View,Alert,Image
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import CodePin from 'react-native-pin-code';

const {height, width} = Dimensions.get('window');

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      displayCodePin: true,
      success: '',
      code:''
    };
  }
  _onFinishCheckingCode2(isValid,code)
  {
    if(!isValid) {
      Alert.alert('Confimation Code', 'Code not match!',[{text : 'OK'}],{
        canceleable: false,
      })
    }
    else {
      this.setState ({code })
      Alert.alert('Confirmation Code ', 'Code Successful!',[{text :'OK'}],{
    canceleable : false,})
    }
  }
  onSuccess = () => {
    this.setState({
      displayCodePin: false,
      success: 'A success message :)'
    });
  };

  render() {
    return (
      <View style={styles.container}>
      <Image source={require('./page/KC.png')}
        style={{width: 200, height: 150,paddingLeft:5}} />
        <Text style = {styles.success}>
        Enter Pin Code
        </Text>
        <KeyboardAvoidingView
          behavior={'position'}
          keyboardVerticalOffset={-30}
          contentContainerStyle={styles.avoidingView}
        >


          <CodeInput
          ref = "codeInputRef2"
          keyboardType = "numeric"
          codeLength = {6}
          className = "border-circle"
          compareWithCode = "123456"
          autoFocus = {false}
          codeInputStyle = {{fontweight: '800'}}
          onFulfill = {(isValid,code)=>
          this._onFinishCheckingCode2(isValid,code)}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  blur: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: width,
    height: height
  },
  avoidingView: {
    borderRadius: 10,
    height: 200,
    marginTop: 50,
    width: width - 30
  },
  containerCodePin: {
    borderRadius: 10
  },
  success: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center'
  }
});

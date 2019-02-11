import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,
        TouchableOpacity} from 'react-native';

export default class Form extends Component<> {
  render() {
    return(
      <View style={styles.container}>
          <View style={styles.inputContainer}>
          <Text style={styles.text}>+91</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={this.props.placeholder}
            placeholderTextColor="#ffffff"
            value={this.props.value}
            disabled={this.props.disabled}
            editable={this.props.editable}
            onChangeText={this.props.onChangeText}>
          </TextInput>
          </View>

         <TouchableOpacity style={styles.button}
            onPress={this.props.onPress}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
         </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 1
  },

  inputContainer: {
    flexDirection: 'row',
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25
  },

  text: {
    fontSize:16,
    paddingLeft: 100,
    paddingTop: 13,
    flex: 1,
    color: '#4CAF50'
  },

  inputBox: {
    //width: 150,
    //backgroundColor: 'rgba(255, 255, 255, 0.3)',
    //borderRadius: 25,
    //paddingHorizontal: 16,
    flex: 2,
    fontSize: 16,
    color: '#ffffff',
    paddingRight: 10,
    paddingLeft: -150

  },

  button: {
    backgroundColor: '#212121',
    width: 300,
    borderRadius: 25,
    //marginVertical: 40,
    paddingVertical: 14
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
});

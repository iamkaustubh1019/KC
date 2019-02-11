import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image } from 'react-native';

export default class Logo extends Component<> {
  render() {
    return(
      <View style={styles.container}>

        <Image
          style={{width:200, height: 113}}
          source={require('../Images/logo.png')}
        />
        <Text style={styles.logoText}>Your Grocery Delievery App</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  logoText: {
    fontSize: 18,
    color: '#ffffff',
    marginVertical: 15
  }
});

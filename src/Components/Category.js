import React, {Component} from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import { Col, Card, CardItem, Body, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class Category extends Component {
  render() {
    return(
      <Col>
        <TouchableOpacity activeOpacity={1}
            onPress={()=> Actions.products({products: this.props.products})}>
          <Card>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: this.props.image}} />
            </View>
            <CardItem bordered style={styles.textCard}>
              <Text style={{fontSize: 12}}>{this.props.title}</Text>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </Col>
    );
  }
}

const styles={

  image: {
    height: 100,
    resizeMode: 'cover',
    flex:1
  },

  imageContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 1
  },

  textCard: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 15
  }
}

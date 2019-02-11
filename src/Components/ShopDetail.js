import React, {Component} from 'react';
import { Image, Dimensions, TouchableOpacity, View } from 'react-native';
import {Container, Left, Right, Body, Card, CardItem, Text, Content
            ,Thumbnail, Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class ShopDetail extends Component {
  render() {
    return(
      <TouchableOpacity style={styles.button}
                onPress={()=>Actions.categories({
                  category: this.props.category,
                  brands: this.props.brands,
                  products: this.props.products
                })} activeOpacity={1}>
        <Card>

          <CardItem bordered style={{backgroundColor: '#EEEEEE'}}>
            <Left>
              <Thumbnail source={require('../Images/shopIcon.png')} />
              <Body>
                <Text style={{fontSize: 15}}>{this.props.name}</Text>
                <Text style={{fontSize: 15}}>{this.props.address}</Text>
              </Body>
            </Left>
          </CardItem>

          <View style={styles.imageContainer}>

              <Image
                source={{uri: this.props.image}}
                style={styles.image}
              />

          </View>

        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = {
  image: {
    height: 200,
    flex: 1,
    width: null,
    resizeMode: 'cover'
  },

  imageContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 1
  },

  button: {
    paddingLeft: 10,
    paddingRight: 10
  }
}

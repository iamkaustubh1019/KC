import React, {Component} from 'react';
import {View, FlatList, Image, TouchableOpacity} from 'react-native';
import {Text, Left, Right, CardItem} from 'native-base';
import {Actions} from 'react-native-router-flux';

import ProductDetail from '../pages/ProductDetail';

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
  }

  componentWillMount() {
    this.setState({
      dataSource: this.props.products,
    });
  }

  renderPrice(statePrice, stateDiscount) {

    var discount = parseInt(stateDiscount, 10);
    var price = parseInt(statePrice, 10);

    if(discount==0) {
      return(
        <View style={styles.noDiscountContainer}>
          <Text style={styles.priceText}>MRP : Rs </Text>
          <Text style={styles.priceText}>{statePrice}</Text>
        </View>
      );
    }

    else {

      var newPrice = price-(price*discount/100);
      var newStatePrice = newPrice.toString();
      return(
        <View style={{flex: 1,paddingTop: 8}}>

          <View style={styles.discountTextContainer}>
            <Text style={styles.cutPrice}>MRP : Rs </Text>
            <Text style={styles.cutPrice}>{statePrice}</Text>
          </View>

          <View style={styles.newPriceContainer}>
            <Text style={styles.priceText}>MRP : Rs </Text>
            <Text style={styles.priceText}>{newStatePrice}</Text>
          </View>

        </View>
      );
    }
  }

  renderAdd(stateDiscount) {
    var discount = parseInt(stateDiscount, 10);

    if(discount!=0) {
      return(
        <View style={styles.discountCircle}>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.circleText}>{stateDiscount}</Text>
            <Text style={styles.circleText}>%</Text>
          </View>

          <View>
            <Text style={styles.circleText}>OFF</Text>
          </View>

        </View>
      );
    }
  }

  renderItem = ({item}) => {
    return(
      <TouchableOpacity activeOpacity={1}
            onPress={()=> Actions.productDetail({item})}>
        <View style={styles.itemContainer}>

          <Image style={styles.image} source={{uri: item.image}} />

          <View style={styles.textContainer}>
            <View>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productQuantity}>{item.Quantity}</Text>
            </View>

            {this.renderPrice(item.price, item.discount)}

          </View>

          <View style={{paddingRight: 3, paddingTop: 3}}>
            {this.renderAdd(item.discount)}
          </View>

          </View>
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <View style={styles.listContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          //keyExtractor={(item, index) => index}
        />
      </View>
    );
}

}

const styles = {

  image: {
    width: 100,
    height: 100
  },

  listContainer: {
    //paddingLeft: 12,
    //paddingRight: 12,
    //paddingBottom: 5,
    marginTop: 5

  },

  productName: {
    fontSize: 16,
    fontWeight: '100',
    fontFamily: 'normal'
  },

  productQuantity: {
    fontSize: 12,
    color: '#757575'
  },

  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
    //paddingBottom: 5
  },

  textContainer: {
    flex: 1,
    paddingLeft: 10
  },

  noDiscountContainer: {
    flex:1,
    paddingTop:8,
    flexDirection: 'row'
  },

  priceText: {
    fontWeight: '800',
    color: '#64DD17'
  },

  cutPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through'
  },

  discountTextContainer: {
    //flex:1,
    flexDirection: 'row'
  },

  newPriceContainer: {
    flexDirection: 'row',
    //marginTop: 0
  },

  discountCircle: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: '#FF8A65',
    alignItems: 'center',
    justifyContent: 'center'
  },

  circleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800'
  }
}

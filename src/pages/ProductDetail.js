import React, {Component} from 'react';
import {View, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import {Container, Left, Right, Button, Icon, Content, Text, Card, CardItem, Toast} from 'native-base';
import Navbar from '../Components/Navbar';
import {Actions} from 'react-native-router-flux';

export default class ProductDetail extends Component {

constructor(props) {
  super(props);

  this.state = {
    product: [],
    noOfItem: 1
  }
}

componentWillMount() {
  this.setState({
    product: this.props.item,
  });
}

increaseAmount() {

  this.setState({
    noOfItem: this.state.noOfItem+1,
  });
}

decreaseAmount() {
  var amount = this.state.noOfItem;

  if(amount>1) {
    amount = amount-1;

    this.setState({
      noOfItem: amount,
    });
  }
}

renderAmount() {
  return(
    <View style={styles.productAmount}>
      <Text style={{fontSize: 16}}>No. of Items: </Text>

      <View style={styles.selectAmount}>

        <TouchableOpacity onPress={()=> this.decreaseAmount()}>
          <Icon name= "arrow-back" style={{fontSize: 20, color: 'red'}}/>
        </TouchableOpacity>

        <Text style={styles.amountText}>{this.state.noOfItem}</Text>

        <TouchableOpacity onPress={()=> this.increaseAmount()}>
          <Icon name="arrow-forward" style={{fontSize: 20, color: 'red'}} />
        </TouchableOpacity>

      </View>
    </View>
  );
}

renderPrice(statePrice,stateDiscount) {
  var price = parseInt(statePrice, 10);
  var discount = parseInt(stateDiscount, 10);

  if(discount==0) {
    return(
      <View style={{paddingTop: 8}}>

        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#757575', alignSelf: 'flex-end'}}>MRP : </Text>
          <Text style={styles.priceText}>Rs </Text>
          <Text style={styles.priceText}>{statePrice}</Text>
        </View>

        <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <Text style={{fontSize: 14, color: '#757575'}}>(Inclusive of all taxes)</Text>
        </View>

      </View>
    );
  }

  else {
    var newPrice = price-(price*discount/100);
    var newStatePrice = newPrice.toString();

    return(
      <View style={{paddingTop: 8}}>

        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#757575', alignSelf: 'flex-end'}}>MRP : </Text>
          <Text style={styles.cutPrice}>Rs </Text>
          <Text style={styles.cutPrice}>{statePrice}</Text>
          <Text style={styles.priceText}> Rs </Text>
          <Text style={styles.priceText}>{newStatePrice}</Text>
        </View>

        <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <Text style={{fontSize: 14, color: '#757575'}}>(Inclusive of all taxes)</Text>
        </View>

      </View>
    );
  }

}

renderDetail() {
  let product = this.state.product;

  return(
    <View style={styles.container}>
      <View style={styles.productContainer}>

        <Text style={{fontSize: 18}}>{product.title}</Text>
        <Text style={styles.productQuantity}>{product.Quantity}</Text>

        {this.renderPrice(product.price,product.discount)}
        {this.renderAmount()}
        <View  style={{flex: 1, marginTop: 10}}>
          <Image source={{uri: product.image}} style={styles.image} />

          <View style={styles.descriptionContainer}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>About: </Text>
            <Text style={{flex: 1, fontSize: 14, alignSelf: 'flex-end'}}>{product.Description}</Text>
          </View>

        </View>
      </View>

    </View>
  );
}

showToast() {
  Toast.show({
    text: "Product is added to your Cart!",
    type: "success",
    duration: 1500,
    position: "bottom",
    textStyle: {textAlign: 'center'},
  })
}

addToCart() {
  this.showToast();

  var product = this.state.product;
  product.noOfItem = this.state.noOfItem;
  AsyncStorage.getItem("CART", (err, res) => {
      if(!res) AsyncStorage.setItem("CART",JSON.stringify([product]));
      else {
        var items = JSON.parse(res);
        items.push(product);
        AsyncStorage.setItem("CART",JSON.stringify(items));
      }
    });
}

render() {

  var left = (
    <Left style={{flex: 1}}>
      <Button transparent>
        <Icon name= 'menu' />
      </Button>
    </Left>
  );

  var right = (
    <Right style={{flex: 1}}>
      <Button transparent onPress={()=>Actions.cart()}>
        <Icon name= 'cart' />
      </Button>
    </Right>
  );

  return(
    <Container>
      <Navbar left={left} right={right} title={this.state.product.title} />
      <Content style={{flex: 1}}>
        {this.renderDetail()}
        <TouchableOpacity
          onPress={()=>this.addToCart()}
          style={styles.button}
          >
          <Text style={{color: 'white'}}>Add To Cart</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}
}

const styles = {

container: {
  flexDirection: 'row',
  backgroundColor: '#FFFFFF'
},

productImage: {
  resizeMode: 'cover',
  flex: 1,
  height: 150
},

productContainer: {
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 5,
  paddingBottom : 10,
  flex: 1
},

productQuantity: {
  fontSize: 12,
  color: '#757575'
},

priceContainer: {
  flexDirection: 'row',
  marginTop: 8
},

priceText: {
  fontWeight: '600',
  fontSize: 20,
  color: '#64DD17',
},

productAmount: {
  flexDirection: 'row',
  marginTop: 8
},

selectAmount: {
  marginLeft: 8,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
},

amountText: {
  paddingLeft: 18,
  paddingRight: 18
},

cutPrice: {
  textDecorationLine: 'line-through',
  color: '#757575',
  alignSelf: 'flex-end'
},

image: {
  height: 200,
  resizeMode: 'cover',
  width: '100%',
  flex: 1
},
descriptionContainer: {
  paddingTop: 4,
  flexDirection: 'row',
  flex: 1,
},

button: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 10,
  marginRight: 10,
  backgroundColor: 'green',
  height: 40,
}
}

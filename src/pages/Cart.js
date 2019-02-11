import React, {Component} from 'react';
import {View, Text, AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import {Container, Content, Left, Icon, Button, Right} from 'native-base';
import Navbar from '../Components/Navbar';
import CartList from '../Components/CartList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Cart extends Component {
  constructor(props) {
      super(props);
      this.state = {
        cartItems: [],
        totalAmount: 0
      };
  }

  componentWillMount() {
    AsyncStorage.getItem("CART", (err, res) => {
      if (!res) this.setState({cartItems: []});
      else this.setState({cartItems: JSON.parse(res)});
    });

    //this.setState({totalAmount: this.state.cartItems.length});

  }

  removeAll() {
    this.setState({cartItems: [], totalAmount: 0})
    AsyncStorage.setItem("CART",JSON.stringify([]));
  }

  showAlert() {
    if(this.state.cartItems.length>0) {
      Alert.alert(
        'Empty Cart!',
        'Do you want to remove all items?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Remove All',
            onPress: ()=>this.removeAll(),
          }
        ],
      );
    } else {
      Alert.alert(
        'Shop More!',
        'Your Cart is already empty',
        [
          {
            text: 'Ok',
          }
        ]
      )
    }
  }

  calculateAmount() {
    var total = 0;
    var items = this.state.cartItems;

    for(var i=0;i<items.length;i++) {
      total = total + (items[i].price)*(items[i].noOfItem);
    }

    this.state.totalAmount = total;
  }

  renderView() {
    {this.calculateAmount()}
    if(this.state.cartItems.length<=0) {
      return(
        <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
          <Text>Your Cart is Empty!</Text>
          <Text>Shop More</Text>
        </View>
      );
    }
    else {
      return(
        <View style={{flex:1}}>
          <View style={{flex: 12}}>
            <CartList products={this.state.cartItems} />
          </View>
          <View style={styles.footer}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex:1}}>
                <Text style={{fontSize: 18, fontWeight: '600', paddingLeft: 10, color: '#FFFFFF'}}>Total Amount: </Text>
              </View>
              <View style={{flex:1, justifyContent: 'flex-end', flexDirection: 'row', paddingRight: 10}}>
                <Text style={styles.priceText}>Rs </Text>
                <Text style={styles.priceText}>{this.state.totalAmount}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.checkOutBtn}>
              <Text style={{color: 'white',fontSize:18}}>CheckOut</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
        <Button transparent onPress={()=>this.showAlert()}>
          <MaterialCommunityIcons name='delete-empty' size={25} color="#FFFFFF" />

        </Button>
      </Right>
    );

    return(
      <Container>
        <Navbar left={left}right={right} title="My Cart" />
        <View style={{flex:1, backgroundColor: '#BDBDBD'}}>
          {this.renderView()}
        </View>
      </Container>
    );
  }
}

const styles = {
  footer: {
    height: 50,
    flex:2,
    paddingTop: 10,
    backgroundColor: '#37474F'
  },

  checkOutBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#0288D1',
    height: 35,
    marginTop: 10,
    borderRadius: 22,
    marginBottom: 8
  },

  priceText: {
    color: '#558B2F',
    fontWeight: '700',
    //paddingRight: 10,
    fontSize: 18
  },

}

import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
import {Container, Content, Button, Left, Right,Icon, Card, CardItem, Header,
            Input, Item, Text, Grid, Col} from 'native-base';

import Navbar from '../Components/Navbar';
import Product from '../Components/Product';
import {Actions} from 'react-native-router-flux';

export default class Products extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentWillMount() {
    p = this.props.products;

    this.setState({products: p});
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
      <Container style={{backgroundColor: '#BDBDBD'}}>

        <Navbar left={left} right={right} title= "Products" />
        {this.renderSearchBar()}
        <Content>
          {this.renderProducts()}
        </Content>

      </Container>
    );
  }

  renderSearchBar() {
    return(
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name= 'search' style={styles.icon}/>
          <TextInput style={styles.input}
                placeholder="Search Products"
          />
        </View>
      </View>
    );
  }

  renderProducts() {
    return <Product products={this.state.products} />;
  }
}

const styles = {

  searchContainer: {
    backgroundColor: '#8BC34A',
    //height: 28,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 8
  },

  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center'

  },

  input: {
    flex: 1,
    //fontSize: 14,
    height: 35,
    paddingLeft:10
  },

  icon: {
    color: '#9E9E9E',
    fontSize: 20,
    paddingLeft: 5,
    paddingBottom: 7
  }
}

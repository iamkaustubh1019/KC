//This file contains all the activities from initial to the last page.
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Home from './pages/Home';
import Categories from './pages/Categories';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

export default class Main extends Component {

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };

  render() {
    return(
      <Root>
        <Router>
          <Scene key="root">
            <Scene initial key="home" component={Home} hideNavBar />
            <Scene key="categories" component={Categories} hideNavBar />
            <Scene key="products" component={Products} hideNavBar />
            <Scene key="productDetail" component={ProductDetail} hideNavBar />
            <Scene key="cart" component={Cart} hideNavBar />
          </Scene>
        </Router>
      </Root>
    );
  }
}

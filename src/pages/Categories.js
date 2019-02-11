import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
import {Container, Content, Button, Left, Right,Icon, Card, CardItem, Header,
            Input, Item, Text, Grid, Col} from 'native-base';
import Navbar from '../Components/Navbar';
import Category from '../Components/Category';
import Product from '../Components/Product';
import {Actions} from 'react-native-router-flux';

export default class Categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      brands: [],
      products: [],
      searchProduct: ''
    };
  }

  componentWillMount() {

    cat=this.props.category;
    b=this.props.brands;
    p=this.props.products;

    this.setState({
      categories: cat,
      brands: b,
      products: p
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
      <Container style={{backgroundColor: '#BDBDBD'}}>

        <Navbar left={left} right={right} title="Categories" />
        {this.renderSearchBar()}
        <Content>
          {this.renderCategories()}
          {this.renderBrands()}
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

  renderCategories() {
    let categories = [];
    let stateItems = this.state.categories;
    return(
      <View style={{paddingLeft: 10,paddingRight:10}}>
        <Card>
          <CardItem bordered style={styles.headerCard} header>
            <Text style={{color: '#000000'}}>Shop By Category</Text>
          </CardItem>
          {this.renderCards(categories,stateItems)}
        </Card>
      </View>
    );
  }

  renderBrands() {
    let brands = [];
    let stateItems = this.state.brands;
    return(
      <View style={{paddingLeft: 10,paddingRight: 10}}>
        <Card>
          <CardItem bordered style={styles.headerCard} header>
            <Text style={{color: '#000000'}}>Shop By Brand</Text>
          </CardItem>
          {this.renderCards(brands,stateItems)}
        </Card>
      </View>
    );
  }

  renderProducts() {
    return <Product products={this.state.products} />;
  }

  renderCards(categories,stateItems) {
    for(var i=0;i<stateItems.length;i=i+2) {
      if(stateItems[i+1]) {
        categories.push(
          <Grid key={i}>
            <Category key={stateItems[i].key} title={stateItems[i].title} image={stateItems[i].image}
                      products={this.state.products} />
            <Category key={stateItems[i+1].key} title={stateItems[i+1].title} image={stateItems[i+1].image}
                      products={this.state.products} />
          </Grid>
        );
      }

      else {
        categories.push(
          <Grid key={i}>
            <Category key={stateItems[i].key} title={stateItems[i].title} image={stateItems[i].image}
                      products={this.state.products} />
            <Col key={i+1} />
          </Grid>
        );
      }
    }
    return categories;
  }

}

const styles = {

  headerCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    height: 40
  },

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

import React, {Component} from 'react';
import { Container, Content, View, Button, Left, Right,Icon, Card, CardItem, cardBody } from 'native-base';
import Navbar from '../Components/Navbar';
import ShopDetail from '../Components/ShopDetail';
import Data from '../Data';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shops: []
    }
  }

  componentWillMount() {
    this.setState({
      shops: Data.shops,
    })
  }

  render() {
    var left = (
      <Left style={{flex: 1}}>
        <Button transparent>
          <Icon name= 'menu' />
        </Button>
      </Left>
    );


    return(
      <Container style={{backgroundColor: '#BDBDBD'}}>
        <Navbar left={left} title="Stores Near you" />
        <Content>
          {this.renderShops()}
        </Content>
      </Container>
    );
  }

  renderShops() {
    let s=[];
    let shops=this.state.shops;
    for(var i=0;i<shops.length;i++) {
      s.push(
        <ShopDetail key={shops[i].key} image={shops[i].image} name={shops[i].name} contactInfo={shops[i].contactInfo}
                    Status={shops[i].status} id={shops[i].id} tags={shops[i].tags} address={shops[i].address}
                    category={shops[i].category} brands={shops[i].brands} products={shops[i].products}/>
      );
    }
    return s;
  }
}

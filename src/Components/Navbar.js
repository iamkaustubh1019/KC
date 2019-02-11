import React, {Component} from 'react';
import {Header, Body, Title, Left, Right, Icon} from 'native-base';

export default class NavBar extends Component {
  render() {
    return(
      <Header
        style={{backgroundColor: '#8BC34A',height: 45}}
        backgroundColor={'#8BC34A'}
        androidStatusBarColor={'#33691E'}
      >
      {this.props.left ? this.props.left : <Left style={{flex: 1}} />}

      <Body style={styles.body}>
        <Title style={styles.title}>{this.props.title}</Title>
      </Body>

      {this.props.right ? this.props.right : <Right style={{flex: 1}} />}
      </Header>
    );
  }
}

const styles = {
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    color: '#FFFFFF',
  }
}

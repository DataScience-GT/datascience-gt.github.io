import React from "react";
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaFileExcel } from "react-icons/fa";
//import CardDeck from 'react-bootstrap/CardDeck';
//import portrait from '../assets/portrait.png';
import { Linking } from 'react-native';
import { Text } from 'react-native';

var divPadding = {
  padding: "4em 0 4em 0",
}

var divPaddingInner = {
  padding: "0 0 2em 0",
}

var noBorder = {
  border: "none",
}


var lightBlue = {
  backgroundColor: "#F1F9FF",
}

var container = {
  //display: flex,
}
export default class Resources extends React.Component {
  render() {
    return(
      <div style={divPadding}>
      <Container style={container}>
      <h3>Resources</h3>
      <Text style={{color: 'blue'}}
          onPress={() => Linking.openURL('https://dsgt-bootcamp-site.herokuapp.com/')}>
        <br />DSGT Bootcamp Website<br />
      </Text>
      <a href="https://www.udemy.com/course/dsgt-bootcamp/learn/lecture/27690524?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com#overview">
        <img src={require('../assets/udemy.png')} width="80px" height="60px" padding="500px"/>
        <br /><br />
      </a>
      <a href="https://scikit-learn.org/stable/auto_examples/index.html">
        <img src={require('../assets/scikitlearn.png')} width="80px" height="60px" padding="50px"/>
        <br /><br />
      </a>
      <a href="https://www.kaggle.com/">
        <img src={require('../assets/kaggle.png')} width="80px" height="60px" padding="50px"/>
        <br /><br />
      </a>
      <a href="https://www.3blue1brown.com/">
        <img src={require('../assets/3b1b.jpg')} width="80px" height="60px" padding="50px"/>
        <br /><br />
      </a>
      </Container>
      </div>
    );
  }
}

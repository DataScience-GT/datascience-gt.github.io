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
        <br />DSGT Bootcamp Course Website<br />
      </Text>
      <Text style={{color: 'blue'}} 
          onPress={() => Linking.openURL('https://www.udemy.com/course/dsgt-bootcamp/learn/lecture/27690524?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com#overview')}>
        <br />DSGT Bootcamp Udemy Course<br />
      </Text>
      <Text style={{color: 'blue'}} 
          onPress={() => Linking.openURL('https://scikit-learn.org/stable/auto_examples/index.html')}>
        <br />Scikit-learn Examples<br />
      </Text>
      <Text style={{color: 'blue'}} 
          onPress={() => Linking.openURL('https://www.kaggle.com/')}>
        <br />Kaggle<br />
      </Text>
      <Text style={{color: 'blue'}} 
          onPress={() => Linking.openURL('https://www.3blue1brown.com/')}>
        <br />3 Blue 1 Brown<br />
      </Text>
      </Container>
      </div>
    );
  }
}

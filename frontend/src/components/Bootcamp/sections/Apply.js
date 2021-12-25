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
export default class Apply extends React.Component {
  render() {
    return(
      <div style={divPadding}>
      <Container style={container}>
      <h3>Apply Now!</h3>
      <Text style={{color: 'blue'}} 
          onPress={() => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSfUjVWyEhOu0ZJL9qiqa7H2mn_clHM9GRMJO7b77fsaI3XJpw/closedform')}>
        <br />Bootcamp Application<br />
      </Text>
      </Container>
      </div>
    );
  }
}
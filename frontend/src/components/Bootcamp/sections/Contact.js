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
export default class Contact extends React.Component {
  render() {
    return(
      <div style={divPadding}>
      <Container style={container}>
      <h3>Contact Us</h3>
      <Text style={{color: 'blue'}}
          onPress={() => Linking.openURL('https://discord.gg/B3DbxxA8')}>
        <br />Google<br />
      </Text>
      <Text style={{color: 'blue'}}
          onPress={() => Linking.openURL('datasciencegt.slack.com')}>
        <br />Email<br />
      </Text>
      <Text style={{color: 'blue'}}
          onPress={() => Linking.openURL('hello@datasciencegt.org')}>
        <br />Slack<br />
      </Text>
      </Container>
      </div>
    );
  }
}

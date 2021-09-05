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


var divPadding2 = {
  padding: "0 4em 0 4em",
  // width: '100%',
  // height: auto,
  width: 200, 
  // height : auto
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
      <Container style={container} style={divPadding}>
      <h3>Contact Us</h3>
      <Container className="d-flex">
      <a href="https://discord.gg/B3DbxxA8">
        <img src={require('../assets/Discord-Logo.png')} style={divPadding2} resizeMode='contain'/>
        <br /><br />
      </a>
      <a href="https://datasciencegt.slack.com/">
        <img src={require('../assets/Slack.png')} style={divPadding2} resizeMode='contain'/>
        <br /><br />
      </a>
      <a href="hello@datasciencegt.org">
        <img src={require('../assets/Gmail-logo.jpg')} style={divPadding2} resizeMode='contain'/>
        <br /><br />
      </a>
      </Container>
      {/* <Text style={{color: 'blue'}}
          onPress={() => Linking.openURL('https://discord.gg/B3DbxxA8')}>
        <br />Google<br />
      </Text> */}
      {/* <Text style={{color: 'blue'}}
          onPress={() => Linking.openURL('datasciencegt.slack.com')}>
        <br />Email<br />
      </Text>
      <Text style={{color: 'blue'}}
          onPress={() => Linking.openURL('hello@datasciencegt.org')}>
        <br />Slack<br />
      </Text> */}
      </Container>
      </div>
    );
  }
}

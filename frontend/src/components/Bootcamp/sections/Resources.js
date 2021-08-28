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


var divPadding2 = {
  padding: "0 4em 0 4em",
  // width: '100%',
  // height: auto,
  width: 250, 
  // height : 300
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
      <Container style={container} style={divPadding}>
      <h3>Resources</h3>
      <Container  className="d-flex">
      <Text style={{color: 'blue'}}
          onPress={() => Linking.openURL('https://dsgt-bootcamp-site.herokuapp.com/')}>
        <br />DSGT Bootcamp Website<br />
      </Text>
      <a href="https://www.udemy.com/course/dsgt-bootcamp/learn/lecture/27690524?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com#overview" style={divPadding2}  resizeMode='contain'>
        <img src={require('../assets/udemy.png')}/>
        <br /><br />
      </a>
      <a href="https://scikit-learn.org/stable/auto_examples/index.html" style={divPadding2} resizeMode='contain'>
        <img src={require('../assets/scikitlearn.png')}/>
        <br /><br />
      </a>
      <a href="https://www.kaggle.com/" style={divPadding2} resizeMode='contain'>
        <img src={require('../assets/kaggle.png')}/>
        <br /><br />
      </a>
      <a href="https://www.3blue1brown.com/" style={divPadding2} resizeMode='contain'>
        <img src={require('../assets/3b1b.jpg')}/>
        <br /><br />
      </a>
      </Container>
      </Container>
      </div>
    );
  }
}

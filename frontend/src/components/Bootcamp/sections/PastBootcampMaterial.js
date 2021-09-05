import React from "react";
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaDiceFive, FaFileExcel } from "react-icons/fa";
//import CardDeck from 'react-bootstrap/CardDeck';
//import portrait from '../assets/portrait.png';
import Milestone3 from '../assets/DSGT Bootcamp_ Milestone 3 Description.pdf';
import DataWarriorsWork from '../assets/Data Warriors_Write_Up.pdf';
import Workshop4Drill from '../assets/Workshop 4 Drill.png';
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
  flexWrap: 'wrap',
  flexDirection: 'row',
  // height: 30,
  // paddingTop: 5,

  //display: flex,
}

// var element = {
//   flexWrap: 'wrap',
//   flexDirection: 'row',
//   height: 30,
//   paddingTop: 5,

//   //display: flex,
// }

export default class PastBootcampMaterial extends React.Component {
  render() {
    return(
      <div style={divPadding}>
      <h3>Past Bootcamp Material</h3>
      <Container className="d-flex justify-content-center">
        <div>
          <iframe src= {Milestone3} width="350" height="500"></iframe>
          <Text style={{color: 'green'}}>Milestone 3 Instructions Document</Text>
        </div>
        <div>
          <img src= {Workshop4Drill} width="350" height="508"></img>
          <Text style={{color: 'green'}}>Workshop 4 Colab Notebook</Text>
        </div>
        <div>
          <iframe src= {DataWarriorsWork} width="350" height="500"></iframe>
          <Text  style={{color: 'green'}}>Milestone 2 Deliverable</Text>
        </div>
      </Container>
      </div>
    );
  }
}

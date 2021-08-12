import React from "react";
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaDiceFive, FaFileExcel } from "react-icons/fa";
//import CardDeck from 'react-bootstrap/CardDeck';
//import portrait from '../assets/portrait.png';
import Milestone3 from '../assets/DSGT Bootcamp_ Milestone 3 Description.pdf';
import DataWarriorsWork from '../assets/Data Warriors_Write_Up.pdf';
import Workshop4Drill from '../assets/Workshop 4 Drill.png';


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
      <h3 padding="4em 0 4em 0">Past Bootcamp Material</h3>
      <Container className="d-flex justify-content-start  justify-content-between">
        <iframe src= {Milestone3} width="400" height="500"></iframe>
        <img src= {Workshop4Drill} width="400" height="500"></img>
        <iframe src= {DataWarriorsWork} width="400" height="500"></iframe>
      </Container>
      </div>
    );
  }
}

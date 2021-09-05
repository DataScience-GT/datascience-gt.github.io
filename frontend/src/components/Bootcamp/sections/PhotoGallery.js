import React from "react";
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaFileExcel } from "react-icons/fa";
//import CardDeck from 'react-bootstrap/CardDeck';
//import portrait from '../assets/portrait.png';

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
export default class PhotoGallery extends React.Component {
  render() {
    return(
      <div style={divPadding}>
      <Container style={container}>
      <h3>Photo Gallery</h3>
      </Container>
      </div>
    );
  }
}

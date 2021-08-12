import React from "react";
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaFileExcel } from "react-icons/fa";
//import CardDeck from 'react-bootstrap/CardDeck';
//import portrait from '../assets/portrait.png';
import Schedule from '../assets/Bootcamp Spring 2021 Calendar.pdf';

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
export default class Introduction extends React.Component {
  render() {
    return(
      <div style={divPadding}>
      <Container style={container}>
      <h3>Welcome to Bootcamp</h3>
      <p>DSGT Bootcamp is an immersive 12-week experience where you’ll
        learn today's most marketable data science skills and work in teams to answer 
        significant questions by analyzing data. Our mentors will host weekly 
        workshops, guide you through your project, and provide feedback on your work as you iterate
        through milestones and prepare for a world of data-related opportunities. 
      </p>
      <p style={{color: 'purple'}}>Sample Schedule: </p>
      <iframe src={Schedule} width="500" height="600"></iframe>
      </Container>
      </div>
    );
  }
}

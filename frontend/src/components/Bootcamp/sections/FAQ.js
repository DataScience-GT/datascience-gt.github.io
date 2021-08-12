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
export default class FAQ extends React.Component {
  render() {
    return(
      <div style={divPadding}>
      <Container style={container}>
      <h3>FAQ</h3>
      <p>
      <br />Q: How often are workshops held?<br /> 
      <br />A: Workshops are held every other week during the bootcamp, and our bootcamp activity alternates each week between workshops and milestones for your team project.<br /> 
        
      <br />Q: Do I need prior data science experience to apply? <br /> 
      <br />A: Nope! Our bootcamp program starts from the basics and progressively accelerates so that you develop a solid data science foundation for any future projects or roles you pursue, and our Content Team leaders are here to closely guide you along the way.<br /> 

      <br />Q: What projects are available to work on? <br /> 
      <br />A: We provide suggestions and insights into potential project topics for your team project, but really, the sky is the limit! Prior teams have pursued every domain from healthcare to geospatial mapping to Disneyland ratings, and any area you choose to pursue with your team, we're super excited to see the work you do and support you along the way!<br /> 

      <br />Q: How are project teams decided? <br /> 
      <br />A: Members have the option to form their own teams of 4-5 students, and we ensure that every member is put on a project team if they choose not to self-form.<br /> 

      <br />Q: How much are the dues?<br /> 
      <br />A: No dues! Just be ready to learn a lot and make meaningful, long-lastings relationships with peers and mentors who share your interest in data science!<br /> 
        
      </p>
      </Container>
      </div>
    );
  }
}

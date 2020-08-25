import React from "react";
import { Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import portrait from '../assets/portrait.png';

let divPadding = {
  padding: "4em 0 4em 0",
}

let divPaddingInner = {
  padding: "2em 0 2em 0",
}

let blue = {
  color: "#0063B9",
}

export default class TeamMembers extends React.Component {
  render() {
    return(
      <div>
      <BoardMembers />
      <Volunteers />
      </div>
    );
  }
}

class BoardMembers extends React.Component {
  render() {
    return (
      <div style={divPadding}>
      <Container>
      <Row className="justify-content-md-center" style={blue}><h1>Meet the Board</h1> </Row>
      <div style={divPaddingInner}>

      <CardGroup className="text-center">
      <Card >
        <Card.Body>
        <Card.Title><h3>Our Team</h3></Card.Title>
        <Card.Text>
        Lorem ipsum dolor
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
      <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      </CardGroup>
      <CardGroup className="text-center">
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      </CardGroup>
      </div>
      </Container>
      </div>
    );
  }
}

class Volunteers extends React.Component {
  render() {
    return (
      <div style={divPadding}>
      <Container>
      <Row className="justify-content-md-center" style={blue}><h1>Meet the Volunteers</h1> </Row>
      <div style={divPaddingInner}>

      <CardGroup className="text-center">
      <Card >
        <Card.Body>
        <Card.Title><h3>Our Volunteers</h3></Card.Title>
        <Card.Text>
        Lorem ipsum dolor
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
      <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      </CardGroup>
      <CardGroup className="text-center">
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      </CardGroup>
      <CardGroup className="text-center">
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img src={portrait}/>
        <Card.Body>
        <Card.Title>Name Surname</Card.Title>
        <Card.Text>
          Position
        </Card.Text>
        </Card.Body>
      </Card>
      </CardGroup>
      </div>
      </Container>
      </div>
    );
  }
}

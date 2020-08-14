import React from 'react';
import {Container, Button} from 'react-bootstrap';
import background from './background.jpg';
///////////////////////
// STYLES
///////////////////////
let backgroundImg = {
  backgroundImage: `url(${background})`,
  // height: "100%",
  height: "80vh",
  backgroundSize: 'cover',
  color: "white",
}

let backgroundTint = {
  height: "inherit",
  // background: 'rgba(0,99,185,0.75)',
  background: 'linear-gradient(to bottom, rgba(0,22,41,1), rgba(0,22,41,0.7), rgba(0,99,185,0.7), rgba(0,99,185,0.7))',

}

let textStyle = {
  padding: "8vw",
  paddingTop: "25vh",
  alignItems: "center",
  textAlign: "center",
  opacity: "1",
}

///////////////////////
// CLASSES
///////////////////////

export default class Landing extends React.Component {
  render() {
    return (
      <div style={backgroundImg}>
        <div style={backgroundTint}>
            <Container style={textStyle}>
                <h1>MAKE DATA SCIENCE ACCESSIBLE TO ALL</h1>
                <p>Nunc eu massa auctor sem bibendum fringilla in quis leo. Curabitur tempus nunc sed leo finibus, sit amet venenatis justo luctus. Nunc tincidunt fringilla vulputate. Morbi semper vestibulum odio, ac convallis lectus efficitur nec. Maecenas congue tortor ut dignissim ornare. Integer nec feugiat dui, ut feugiat risus. Maecenas ac erat nec urna eleifend fringilla sed eu sem.</p>
                <Button variant="outline-light">Get Involved</Button>
            </Container>
        </div>
      </div>

    );
  }
}
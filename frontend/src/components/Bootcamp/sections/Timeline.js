import React from 'react';

import { Image, Row } from 'react-bootstrap';

import timeline from './timeline.png';

let blue = {
  color: "#0063B9",
}


export default class Home extends React.Component {
    render() {
        return (
          <div>
          <Row className="justify-content-md-center"><h1 style={blue}>Our Work</h1> </Row>
          <Image src={timeline} fluid/>
          </div>
        );
      }
    }

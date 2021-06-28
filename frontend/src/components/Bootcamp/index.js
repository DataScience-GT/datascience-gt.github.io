import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Events from './sections/Introduction';
import Footer from '../Footer';

import Timeline from './sections/Timeline';
import Introduction from './sections/Introduction';

let divPadding = {
  padding: "4em 0 8em 0",
}

let rightAlign = {
  float: "right",
}


export default class Bootcamp extends React.Component {
  render() {
    return (
      <div style={divPadding}>
      <Introduction />
      </div>
    );
  }
}

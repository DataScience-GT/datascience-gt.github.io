import React from "react";
import { Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

/// make a global stylesheet for this div and divpadding
let divPadding = {
  padding: "4em 0 4em 0",
}

let divPaddingInner = {
  padding: "0 0 2em 0",
}

let noBorder = {
  border: "none",
}

let blue = {
  color: "#0063B9",
}

export default class Opportunity extends React.Component {
  render() {
    return(
      <div style={divPadding}>
      <Container>
      <Row className="justify-content-md-center" style={blue}><h1>The Opportunity</h1> </Row>
      <div style={divPaddingInner}>
      <CardDeck>
        <Card style={noBorder}>
          <Card.Body>
          <Card.Title className="text-center" style={blue}><h3>Data Science Today</h3></Card.Title>
          <Card.Text>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed a consequat nibh,
          aliquam molestie tortor. Nunc ante lectus,
          gravida at est ullamcorper, congue
          feugiat nunc. Vestibulum ante ipsum primis
          in faucibus orci luctus et ultrices
          posuere cubilia Curae; Duis ut libero
          posuere justo consequat rutrum. Nam
          accumsan sagittis urna eu placerat.
          Praesent id dapibus metus. Nunc luctus
          pulvinar nisi, id ultrices odio placerat a.
          Morbi massa lectus, interdum non sodales
          et, interdum a magna. Nulla lobortis dolor
          sed posuere ultrices. Orci varius
          natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus.
          Etiam at mauris nunc. Sed pharetra enim id
          lectus scelerisque placerat. Sed
          sagittis varius enim eu molestie.
          </Card.Text>
          </Card.Body> {/*Data Science Today*/}
        </Card>
        <Card style={noBorder}>
          <Card.Body>
          <Card.Title className="text-center" style={blue}><h3>Our Niche</h3></Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed a consequat nibh,
            aliquam molestie tortor. Nunc ante lectus,
            gravida at est ullamcorper, congue
            feugiat nunc. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices
            posuere cubilia Curae; Duis ut libero
            posuere justo consequat rutrum. Nam
            accumsan sagittis urna eu placerat.
            Praesent id dapibus metus. Nunc luctus
            pulvinar nisi, id ultrices odio placerat a.
            Morbi massa lectus, interdum non sodales
            et, interdum a magna. Nulla lobortis dolor
            sed posuere ultrices. Orci varius
            natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus.
            Etiam at mauris nunc. Sed pharetra enim id
            lectus scelerisque placerat. Sed
            sagittis varius enim eu molestie.
          </Card.Text>
          </Card.Body> {/*Our Niche*/} {/*Our Niche*/}
        </Card>
        <Card style={noBorder}>
          <Card.Body>
          <Card.Title className="text-center" style={blue}><h3>Reach</h3></Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed a consequat nibh,
            aliquam molestie tortor. Nunc ante lectus,
            gravida at est ullamcorper, congue
            feugiat nunc. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices
            posuere cubilia Curae; Duis ut libero
            posuere justo consequat rutrum. Nam
            accumsan sagittis urna eu placerat.
            Praesent id dapibus metus. Nunc luctus
            pulvinar nisi, id ultrices odio placerat a.
            Morbi massa lectus, interdum non sodales
            et, interdum a magna. Nulla lobortis dolor
            sed posuere ultrices. Orci varius
            natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus.
            Etiam at mauris nunc. Sed pharetra enim id
            lectus scelerisque placerat. Sed
            sagittis varius enim eu molestie.
          </Card.Text>
          </Card.Body> {/*Reach*/}
        </Card>
      </CardDeck>
      </div>
      <Card />
      <Card style={noBorder}> {/*this is the quote card*/}
        <blockquote className="blockquote mb-0 card-body">
          <h1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
            erat a ante.
          </h1>
          <footer className="blockquote-footer">
            <small className="text-muted">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </small>
          </footer>
        </blockquote>
      </Card>
      </Container>
      </div>
    );
  }
}

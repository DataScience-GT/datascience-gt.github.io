import React from "react";
import { Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import background from './background.jpg';

let backgroundImg = {
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  color: "white",
}
let divPadding = {
  padding: "4em 0 4em 0",
  color: "white",
  background: 'linear-gradient(to top, rgba(0,22,41,0.95), rgba(0,22,41,0.9), rgba(0,99,185,0.85), rgba(0,99,185,0.8))',
  height: "inherit",

}

let divPaddingInner = {
  padding: "0 0 2em 0",
}

let blue = {
  backgroundColor: "inherit",
  border: "none",
}


export default class Future extends React.Component {
  render() {
    return(
      <div style={backgroundImg}>
      <div style={divPadding}>
      <Container>
      <Row className="justify-content-md-center"><h1>The Future</h1> </Row>
      <div style={divPaddingInner}>
      <CardDeck>
        <Card style={blue}>
          <Card.Body>
          <Card.Title className="text-center"><h3>Data Science Today</h3></Card.Title>
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
          </Card.Body>
        </Card>
        <Card style={blue}>
          <Card.Body>
          <Card.Title className="text-center"><h3>Target Goals</h3></Card.Title>
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
          </Card.Body>
        </Card>
        <Card style={blue}>
          <Card.Body>
          <Card.Title className="text-center"><h3>Reach</h3></Card.Title>
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
          </Card.Body>
        </Card>
      </CardDeck>
      </div>
        </Container>
        </div>
      </div>
    );
  }
}

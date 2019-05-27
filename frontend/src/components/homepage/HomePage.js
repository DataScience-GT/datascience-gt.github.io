import React from 'react';
import {Container} from 'react-bootstrap'; 

export default class HomePage extends React.Component {

    render() {

        return (
            <Container> 
                <section id="about"> 
                {/* Insert about information here */}
                </section>
               
                <section id="projects"> 
                {/* Insert project overviews here */}
                </section>

                <section id="events"> 
                {/* Insert events rendering/calendar here */}
                </section>

                <section id="team"> 
                {/* Include a meet-our-team of exec here */}
                </section>

                <section id="start"> 
                {/* Include public getting-started resources here */}
                </section>

                <section id="contact"> 
                {/* Include contact information here */}
                </section>

            </Container>
        );
    }
}
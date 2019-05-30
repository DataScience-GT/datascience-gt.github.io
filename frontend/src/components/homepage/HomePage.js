import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'; 
import * as DUES from "../../constants/app_constants";
import * as ROUTES from "../../constants/routes";  
export default class HomePage extends React.Component {

    render() {

        return (
            <Container> 
                <section id="about"> 
                <Container> 
                    <Row>
                        <Col lg={12} className="text-center">
                            <h2 className="section-heading text-uppercase">About</h2>
                            <h3 className="section-subheading text-muted">Georgia Tech's largest community of student data scientists</h3>
                        </Col>
                    </Row>
                    <Row> 
                        <Col sm={12}>
                            <h3 className="text-center"> The Big Ideas </h3>
                        </Col>
                    </Row>
                    <Row> 
                        <Col sm={12} md={5}>
                            <h4 className="text-uppercase">Provide</h4>
                        </Col>
                        <Col sm={12} md={7}>
                        <p>
                        Data science has the potential to improve our communities, so we run projects with that sole purpose. Our
                        projects are chosen because of their potential impact, both on our campus and the global community at large. 
                        We don't want our members to be hindered by lack of money, so our featured projects receive funding for 
                        resources that are crucial to their success. <br/>

                        We recognize a good idea can come from anywhere, so we encourage our members to pursue their own projects. 
                        Member-initiated projects receive the support of the club, and if they satisfy our community-oriented criteria, 
                        may receive funding. 
                        </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={5} className="order-sm-last order-md-first">
                            <h4 className="text-uppercase">Inform</h4>
                        </Col>
                        <Col sm={12} md={7} className="order-sm-last order-md-first">
                        <p>
                        Data science is a hard field to get into, and can be intimidating for those who are unfamiliar with it. 
                        To make the learning process easier for our members, we host weekly workshops that let them interactively get 
                        familiar with data science. We also host monthly public workshops that help those who are interested learn more 
                        about the field and get their feet wet with basic data science skills. 
                        </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={5}>
                            <h4 className="text-uppercase">Grow</h4>
                        </Col>
                        <Col sm={12} md={7}>
                        <p>
                            We want our members to be well-prepared for their future. After all, we are nothing without them! 
                            Our special events include corporate information sessions, game nights, and networking events that 
                            allow our members to devleop themselves professionally. We are also planning on hosting a data-science-oriented 
                            hackathon in Spring 2019. 
                        </p>
                        </Col>
                    </Row>
                </Container>
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

                <section id="join"> 
                    <Container> 
                        <Row> 
                            <Col className="text-center">
                                <h2 className="section-heading text-uppercase"> Join </h2>   
                                <a href={ROUTES.SIGNUP} className="btn btn-primary">Sign up Now</a>
                            </Col> 
                        </Row>
                        <Row> 
                            <Col sm={6}>
                                <h3>Joining with Venmo</h3> 
                                <ol> 
                                    <li> Venmo ${DUES.DUES_SEMESTER} for a semester membership, 
                                    or ${DUES.DUES_YEAR} for a year membership, to @datascience-gt </li>
                                    <li> Take a screenshot of your payment </li>
                                    <li> Click the signup button, fill out the form, select "Venmo", and attach your screenshot</li>
                                    <li> Hit "Submit", and you're all done! We'll verify your payment and send you an invite 
                                        to the slack within a few days. Welcome to the team! 
                                    </li>
                                </ol>
                            </Col>
                            <Col sm={6}>

                                <h3> Joining with Cash </h3> 
                                Don't have a Venmo? Refuse to use online payments to stick it to our corporate overlords? 
                                No problem. 
                                <ol>
                                    <li> Pay in cash to any member of the DSGT Team </li>
                                    <li> Get their name when you pay them! </li>
                                    <li> Go to the signup form, fill it out, select "Cash" and put in the amount you paid along with 
                                        the name of the person you gave cash to. 
                                        It's ${DUES.DUES_SEMESTER} for a semester, or ${DUES.DUES_YEAR} for a year. 
                                    </li>
                                    <li> Hit submit and you're done! It might take us a few days to verify your payment, but 
                                        once we do we'll send you a invite to our Slack channel and hook you up with the getting 
                                        started material. Glad to have you on the team! 
                                    </li>
                                </ol>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section id="contact"> 
                {/* Include contact information here */}
                </section>

            </Container>
        );
    }
}
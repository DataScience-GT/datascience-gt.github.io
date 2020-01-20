import React from 'react';
import {Container, Row, Col, Table, Button} from 'react-bootstrap'; 
import * as CONSTANTS from "../../config/config";
// import * as ROUTES from "../../config/routes";  
// import ProjectCore from "./Project"
import ContactCore from "./Contact" 

import './HomePage.css';

/**
 * This is the homepage of the website.
 * Split up into React Fragments to provide modularity.
 */

class Section extends React.Component {
    render() {
        return (
            <section id={this.props.id}>
                <Container> 
                    <Row> 
                        <Col className="text-center">
                            <h2 className="section-heading text-uppercase">{this.props.heading}</h2>
                            {this.props.subheading ? <h3 className="section-subheading text-muted">{this.props.subheading}</h3> : ""} 
                        </Col>
                    </Row>
                    {this.props.children}
                </Container>
            </section>
        )
    }
}

const Hero = () => {

    return(
    <section id="page-top">
        <div className="jumbotron">
            <Row>
                {/* <Col sm={12} className="text-center">
                    <div className="intro-text">
                        <div className="intro-heading text-uppercase">Data Science @ Georgia Tech</div>
                        <div className="intro-subtext text-uppercase">Data Science with a Focus on the Community</div>
                    </div>
                </Col> */}
            </Row>
            <Row>
                <Col sm="12" className="text-center">
                    {/* <a href={CONSTANTS.SUBSCRIBE} id="welcomebutton" className="btn btn-large btn-outline-dark link-override link-button" role="button">Subscribe to our mailling list</a> <br/> */}
                </Col>
            </Row>
            {/* <Row>
                <Col sm="12" className="text-center">
                    <Button className="c1-signup-button" href="https://c1games.com/gatech" variant="info" size="lg">Sign up to participate!</Button>
                </Col>
            </Row> */}
        </div>
    </section>
)}

const About = () => { return (
    <Section id="about" heading="About Us" subheading="Georgia Tech's largest community of student data scientists">
        <Row> 
            <Col sm={12}><h3 className="text-center"> The Big Ideas </h3></Col>
        </Row>
        <Row> 
            <Col sm={12} md={5}><h4 className="text-uppercase">Provide</h4></Col>
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
            <Col sm={12} md={5} className="order-sm-last order-md-first"><h4 className="text-uppercase">Inform</h4></Col>
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
            <Col sm={12} md={5}><h4 className="text-uppercase">Grow</h4></Col>
            <Col sm={12} md={7}>
            <p>
                We want our members to be well-prepared for their future. After all, we are nothing without them! 
                Our special events include corporate information sessions, game nights, and networking events that 
                allow our members to devleop themselves professionally. We are also planning on hosting a data-science-oriented 
                hackathon in Spring 2019. 
            </p>
            </Col>
        </Row>
    </Section>
)}

const Join = () => {return (
    <Section id="join" heading="Join" subheading="Sign Up Now!">
        {/* <Row>
            <Col className="text-center">
            <a href={ROUTES.SIGNUP} className="btn btn-primary">Sign up Now</a>
            </Col>

        </Row> */}
        <Row> 
        <Col sm={6}>
            <h3>Joining with Venmo</h3> 
            <ol> 
                <li> Venmo ${CONSTANTS.DUES_SEMESTER} for a semester membership, 
                or ${CONSTANTS.DUES_YEAR} for a year membership, to @datascience-gt </li>
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
                        It's ${CONSTANTS.DUES_SEMESTER} for a semester, or ${CONSTANTS.DUES_YEAR} for a year. 
                    </li>
                    <li> Hit submit and you're done! It might take us a few days to verify your payment, but 
                        once we do we'll send you a invite to our Slack channel and hook you up with the getting 
                        started material. Glad to have you on the team! 
                    </li>
                </ol>
            </Col>
        </Row>
    </Section>
)}

// let Projects = () => {
//     return (
//         <Section id="projects" heading="Projects" subheading="See what we're working on">
//             <ProjectCore/>
//         </Section>
//     )
// }

const Contact = () => { return (
    <Section id="contact" heading="Contact Us" subheading="Stay in Touch">
        {ContactCore()}
    </Section>
)}


// const Events = () => {
//     return (
//         <Section id="events" heading="Upcoming Events">
//             <div className="responsiveCal">
//                 <iframe title="calendar" width="100%" height='600px' id="calframe" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=kha5imvol6hbevvblb7sr48vjs%40group.calendar.google.com&amp;color=%23711616&amp;ctz=America%2FNew_York" scrolling="no" frameBorder='0'></iframe>
//             </div>
//         </Section>
//     )
// }

const MeetingContent = (props) => {
    return (
        <div className="parent-meetingdesc">
            <Button href={props.slidesURL} variant="warning" type="button" size="sm">Slides</Button>
            <Button href={props.notebookURL} className="notebook-button" type="button" size="sm">Notebook</Button>
            <Button href={props.materialsURL} variant="primary" type="button" size="sm">Materials</Button>
        </div>
    )
}

const Meetings = () => {
    return (
        <Section id="meetings" heading="Meetings">
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Workshop</th>
                    <th>Content</th>
                    {/* <th>Slides</th>
                    <th>Materials</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>9/9/2019</td>
                        <td>
                        Introduction to Data Science (Track 1)
                        {/* <MeetingContent 
                            name="Introduction to Data Science (Track 1)"
                            slidesURL="https://drive.google.com/open?id=1KGVdH3CHyo99EA3kIVZPT5FTXyuVa-SvNNJCO5rAF8s"
                            materialsURL="https://drive.google.com/open?id=1cKG75Q1vbvUrDLhORfqq4coSqRlvuvGo"
                        /> */}
                        </td>
                        <td>
                        <MeetingContent 
                            slidesURL="https://drive.google.com/open?id=1KGVdH3CHyo99EA3kIVZPT5FTXyuVa-SvNNJCO5rAF8s"
                            materialsURL="https://drive.google.com/open?id=1cKG75Q1vbvUrDLhORfqq4coSqRlvuvGo"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>9/16/2019</td>
                        <td>Programming for Data Science (Track 1)</td>
                        <td>
                        <MeetingContent 
                            slidesURL="https://drive.google.com/open?id=1tpm72vMscR8FvMCahixmWs5588cG9nCFxjBqVyvflnw"
                            notebookURL="https://nbviewer.jupyter.org/github/DataScience-GT/Workshops/blob/master/Fall%202019/Track-1/Programming%20for%20Data%20Science/Programming%20for%20Data%20Science.ipynb"
                            materialsURL="https://drive.google.com/open?id=18sybnYBrxJj_B7Tng_-WLQKEwQanTwJz"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>9/23/2019</td>
                        <td>Mathematical Principles for Data Science (Track 1)</td>
                        <td>
                        <MeetingContent 
                            slidesURL="https://drive.google.com/open?id=1iOWIJtb0kE2xg5lgsq5c404DkqZo_5ScJhlVJqKiWhw"
                            notebookURL="https://nbviewer.jupyter.org/github/DataScience-GT/Workshops/blob/master/Fall%202019/Track-1/Mathematical%20Fundamentals%20for%20Data%20Science/Math%20Principles.ipynb"
                            materialsURL="https://drive.google.com/open?id=1xVAenbk4UPnq4pN2j6z7ML5HeiADjAUp"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>9/30/2019</td>
                        <td>Survey of Algorithms for Data Science (Track 1)</td>
                        <td>
                        <MeetingContent 
                            slidesURL="https://drive.google.com/open?id=1QQ1p0lNYJ5Q1miOpGcm9D9EPmYRruX08d59nSFvarlY"
                            notebookURL="https://nbviewer.jupyter.org/github/DataScience-GT/Workshops/blob/master/Fall%202019/Track-1/Survey%20of%20Algorithms%20for%20Data%20Science/Survey%20of%20Algorithms.ipynb"
                            materialsURL="https://drive.google.com/open?id=1tfQyfYRJ9sAz3utXVlrOu3-azFy9v0hV"
                        />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Section>
    )
}

// const Team = () => {
//     return (
//         <Section id="team" heading="Meet our Team">

//         </Section>
//     )
// }

// const Resources = () => {return (
//     <Section id="resources" heading="Getting Started Resources">
//         <Row>
//             <Col sm={12} md={6}>
//                 <h3 className="section-subheading text-muted">Public Content</h3>
//                 <p>
//                     We have some of our getting started content publicly available, no membership required. 
//                     Below, you can find a drive link to our first few workshops, so you can try it out 
//                     and see what type of things we teach. 
//                 </p>
//                 <a href="https://drive.google.com/open?id=1CPCUEXDQA5nriNLfnElGKFWGeVWgPgvM">Drive Link</a>
//             </Col>
//             <Col sm={12} md={6}>
//                 <h3 className="section-subheading text-muted">Our Custom Curriculum</h3>
//                 <p>
//                     Our workshop people have worked hard to design a custom curriculum, that gets 
//                     the basics of data science across in the span of a semester. This pulls from 
//                     some of the top data science programs in the country! You can give it a look  
//                     <a href="https://drive.google.com/open?id=1PPMCEZUK4J0apsABmGaw1LFK7vXh3mFzJcSR1YRmlxE"> here.</a>
//                 </p>
//             </Col>
//         </Row>
//     </Section>
// )}

 

export default class HomePage extends React.Component {

    render() {

        return (                

            <React.Fragment>
                <Hero />
                <Container> 

                <About />

                {/* <Projects /> */}

                {/* <Events /> */}

                {/* <Team /> */}
                <Meetings />
                <Join/>

                {/* <Resources /> */}

                <Contact/>
      

                </Container>
            </React.Fragment>
            
        );
    }
}
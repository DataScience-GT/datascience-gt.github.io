import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'; 
import * as CONSTANTS from "../../constants/app_constants";
import * as ROUTES from "../../constants/routes";  
import ProjectCore from "./Project"
import ContactCore from "./Contact" 

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
                <Col sm={12} className="text-center">
                    <div className="intro-text">
                        <div className="intro-heading text-uppercase">Data Science @ Georgia Tech</div>
                        <div className="intro-subtext text-uppercase">Data Science with a Focus on the Community</div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <a href={CONSTANTS.SUBSCRIBE} id="welcomebutton" className="btn btn-large btn-outline-dark link-override link-button" role="button">Subscribe to our mailling list</a> <br/>

                </Col>
            </Row>
        </div>
    </section>
)}

const About = () => { return (
    <Section id="about" heading="About Us" subheading="Georgia Tech's largest community of student data scientists">
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
    </Section>
)}

const Join = () => {return (
    <Section id="join" heading="Join" subheading="Sign Up Now!">
        <Row>
            <Col className="text-center">
            <a href={ROUTES.SIGNUP} className="btn btn-primary">Sign up Now</a>
            </Col>

        </Row>
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

let Projects = () => {
    return (
        <Section id="projects" heading="Projects" subheading="See what we're working on">
            <ProjectCore/>
        </Section>
    )
}

const Contact = () => { return (
    <Section id="contact" heading="Contact Us" subheading="Stay in Touch">
        {ContactCore()}
    </Section>
)}


const Events = () => {
    return (
        <Section id="events" heading="Upcoming Events">
            <div className="responsiveCal">
                <iframe title="calendar" width="100%" height='600px' id="calframe" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=kha5imvol6hbevvblb7sr48vjs%40group.calendar.google.com&amp;color=%23711616&amp;ctz=America%2FNew_York" scrolling="no" frameborder='0'></iframe>
            </div>
        </Section>
    )
}

const Team = () => {
    return (
        <Section id="team" heading="Meet our Team">

        </Section>
    )
}

const Resources = () => {return (
    <Section id="resources" heading="Getting Started Resources">
        <Row>
            <Col sm={12} md={6}>
                <h3 className="section-subheading text-muted">Public Content</h3>
                <p>
                    We have some of our getting started content publicly available, no membership required. 
                    Below, you can find a drive link to our first few workshops, so you can try it out 
                    and see what type of things we teach. 
                </p>
                <a href="https://drive.google.com/open?id=1CPCUEXDQA5nriNLfnElGKFWGeVWgPgvM">Drive Link</a>
            </Col>
            <Col sm={12} md={6}>
                <h3 className="section-subheading text-muted">Our Custom Curriculum</h3>
                <p>
                    Our workshop people have worked hard to design a custom curriculum, that gets 
                    the basics of data science across in the span of a semester. This pulls from 
                    some of the top data science programs in the country! You can give it a look  
                    <a href="https://drive.google.com/open?id=1PPMCEZUK4J0apsABmGaw1LFK7vXh3mFzJcSR1YRmlxE"> here.</a>
                </p>
            </Col>
        </Row>
    </Section>
)}

 

export default class HomePage extends React.Component {

    render() {

        return (                

            <React.Fragment>
                <Hero />
                <Container> 

                <About />

                {/* <Projects /> */}

                <Events />

                {/* <Team /> */}
                <Join/>

                <Resources />

                <Contact/>
      

            </Container>
            </React.Fragment>
            
        );
    }
}
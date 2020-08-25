import React from "react";
import Footer from '../Footer';
import TeamMembers from './sections/TeamMembers';


export default class About extends React.Component {
  render() {
    return(
      <div>

        <TeamMembers />
        <Footer />
      </div>
    );
  }
}

import React from 'react'; 
import WorkshopCard from './Workshop Card';

/**
 * @author Vidhur Kumar
 */
export default class SemesterWorkshopList extends React.Component {

    render() {

        return (
            <div>
                <h1>Semester Workshop List!</h1>
                <WorkshopCard workshopName="Reinforcement Learning" />
            </div>
            
        )
    }
}
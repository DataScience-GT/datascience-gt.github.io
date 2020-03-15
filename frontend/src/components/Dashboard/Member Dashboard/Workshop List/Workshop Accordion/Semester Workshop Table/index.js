import React from 'react'; 
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

/**
 * @author Vidhur Kumar
 */
export default class SemesterWorkshopTable extends React.Component {
    render() {
        const workshopList = this.props.workshops.map((workshop) =>
            <tr>
                <td>{workshop.date}</td>
                <td>{workshop.name}</td>
                <td>{workshop.authors}</td>
                <td><Button href={workshop.slidesURL} variant="warning" type="button" size="sm">Slides</Button></td>
                <td><Button href={workshop.notebookURL} className="notebook-button" type="button" size="sm">Notebook</Button></td>
                <td><Button href={workshop.materialsURL} variant="primary" type="button" size="sm">Materials</Button></td>
            </tr>
        );
        return (
            <div>
                <h1>Semester Workshop List!</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Workshop</th>
                            <th>Author(s)</th>
                            <th>Slides</th>
                            <th>Notebook</th>
                            <th>Materials</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workshopList}
                    </tbody>
                </Table>
            </div>
            
        )
    }
}
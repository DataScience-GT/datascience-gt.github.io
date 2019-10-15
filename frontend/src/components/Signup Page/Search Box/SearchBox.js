import React from 'react';
import { Form } from 'react-bootstrap';

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialItems: [],
            items: []
        }
    }
        
    filterList = (event) => {
        let items = this.state.initialItems;
        items = items.filter((item) => {
            return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: items});
    }

    componentWillMount = () => {
        this.setState({
            initialItems: this.props.content,
            items: this.props.content
        })
    }


    render() {
      return (
            <div>
                <Form.Control onChange={this.handleInputChange} name="major" type="text" placeholder="Major" />
                <div>
                    {
                        this.state.items.map(function(item) {
                            return <div key={item}>{item}</div>
                        })
                    }
                </div>
            </div>
      );
        // let data = [
        //     {
        //         key: 'Business Administration',
        //         value: 'Business Administration',
        //     },
        //     {
        //         key: 'Computational Media',
        //         value: 'Computational Media',
        //     },
        //     {
        //         key: 'Computer Science',
        //         value: 'Computer Science',
        //     },
        //     {
        //         key: 'Architecture',
        //         value: 'Architecture',
        //     },
        //     {
        //         key: 'Industrial Design',
        //         value: 'Industrial Design',
        //     },
        //     {
        //         key: 'Music Technology',
        //         value: 'Music Technology',
        //     },
        //     {
        //         key: 'Aerospace Engineering',
        //         value: 'Aerospace Engineering',
        //     },
        //     {
        //         key: 'Biomedical Engineering',
        //         value: 'Biomedical Engineering',
        //     },
        //     {
        //         key: 'Chemical and Biomolecular Engineering',
        //         value: 'Chemical and Biomolecular Engineering',
        //     },
        //     {
        //         key: 'Civil Engineering',
        //         value: 'Civil Engineering',
        //     },
        //     {
        //         key: 'Computer Engineering',
        //         value: 'Computer Engineering',
        //     },
        //     {
        //         key: 'Electrical Engineering',
        //         value: 'Electrical Engineering',
        //     },
        //     {
        //         key: 'Environmental Engineering',
        //         value: 'Environmental Engineering',
        //     },
        //     {
        //         key: 'Industrial Engineering',
        //         value: 'Industrial Engineering',
        //     },
        //     {
        //         key: 'Materials Science and Engineering',
        //         value: 'Materials Science and Engineering',
        //     },
        //     {
        //         key: 'Mechanical Engineering',
        //         value: 'Mechanical Engineering',
        //     },
        //     {
        //         key: 'Nuclear and Radiological Engineering',
        //         value: 'Nuclear and Radiological Engineering',
        //     },
        //     {
        //         key: 'Applied Language and Intercultural Studies',
        //         value: 'Applied Language and Intercultural Studies',
        //     },
        //     {
        //         key: 'Computational Media & Digital Media',
        //         value: 'Computational Media & Digital Media',
        //     },
        //     {
        //         key: 'Economics',
        //         value: 'Economics',
        //     },
        //     {
        //         key: 'Economics and International Affairs',
        //         value: 'Economics and International Affairs',
        //     },
        //     {
        //         key: 'Global Economics and Modern Languages',
        //         value: 'Global Economics and Modern Languages',
        //     },
        //     {
        //         key: 'History, Technology, and Society',
        //         value: 'History, Technology, and Society',
        //     },
        //     {
        //         key: 'International Affairs',
        //         value: 'International Affairs',
        //     },
        //     {
        //         key: 'International Affairs and Modern Languages',
        //         value: 'International Affairs and Modern Languages',
        //     },
        //     {
        //         key: 'Literature, Media, and Communication & Digital Media',
        //         value: 'Literature, Media, and Communication & Digital Media',
        //     },
        //     {
        //         key: 'Literature, Media, and Communication',
        //         value: 'Literature, Media, and Communication',
        //     },
        //     {
        //         key: 'Public Policy',
        //         value: 'Public Policy',
        //     },
        //     {
        //         key: 'Applied Physics',
        //         value: 'Applied Physics',
        //     },
        //     {
        //         key: 'Biochemistry',
        //         value: 'Biochemistry',
        //     },
        //     {
        //         key: 'Biology',
        //         value: 'Biology',
        //     },
        //     {
        //         key: 'Chemistry',
        //         value: 'Chemistry',
        //     },
        //     {
        //         key: 'Earth and Atmospheric Sciences',
        //         value: 'Earth and Atmospheric Sciences',
        //     },
        //     {
        //         key: 'Mathematics',
        //         value: 'Mathematics',
        //     },
        //     {
        //         key: 'Neuroscience',
        //         value: 'Neuroscience',
        //     },
        //     {
        //         key: 'Physics',
        //         value: 'Physics',
        //     },
        //     {
        //         key: 'Psychology',
        //         value: 'Psychology',
        //     },
        // ]
    }
}

export default SearchBox;
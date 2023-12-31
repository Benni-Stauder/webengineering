import React, {Component} from 'react';
import {FormControl, FormGroup} from 'react-bootstrap';

class App extends Component {
    handleChange(evt) {
        this.props.onSearch(evt.target.value);
    }

    render() {
        return (
            <FormGroup>
                <FormControl
                    type="text"
                    placeholder="Search Wikipedia"
                    onChange={this.handleChange.bind(this)}
                />
            </FormGroup>
        );
    }
}

export default App;

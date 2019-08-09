import React from 'react';
import { connect } from 'react-redux';
import AuthService from './auth/AuthService';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
//import 'rc-time-picker/assets/index.css';
//import TimePickerPanel from 'rc-time-picker/lib/Panel';

class AddTodo extends React.Component {

    constructor(props) {
      super(props);

      let today = new Date().toISOString().split('T')[0];

      this.state = {
        value: 'Please write an essay about your favorite DOM element.',
        date: today
      };

      this.handleDescrptChange = this.handleDescrptChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDescrptChange(event) {
      this.setState({value: event.target.value});
    }
    handleDateChange(event) {
      this.setState({date: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      alert('An essay was submitted: ' + this.state.value + this.state.date);
    }

    render() {
        const { ticker } = this.props.match.params

        return (
            <div className="col-md-6 col-md-offset-3">
              <Form>
               <FormGroup>
                  <Label for="exampleEmail">{ticker}</Label>
                  <textarea 
                  name="date"
                  cols="80" 
                  rows="1"
                  value={this.state.date}
                  onChange={this.handleDateChange}>
                  </textarea>
                  <textarea 
                  name="descrpt" 
                  cols="80" 
                  rows="5"
                  value={this.state.value}
                  onChange={this.handleDescrptChange}>
                  </textarea>
                  <FormFeedback>You will not be able to see this</FormFeedback>
                  <Button onClick={this.handleSubmit}>Submit</Button>
                </FormGroup>
              </Form>
            </div>
        );
    }
}

export default AddTodo
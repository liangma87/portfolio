import React from 'react';
import { ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { 
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Button
} from 'reactstrap';

const Item = ({ ticker, text}) => (
  <div className="d-flex">
    <Button 
      color ="info"
      outline
      className='mr-1 mb-1'
      disabled
    > 
      {ticker}
    </Button>
    <div className='ml-1'>
      {text}
    </div>
  </div>
)

    /*fetch("http://0.0.0.0:3040/api/v1/todos/2", {
      method: 'PATCH', // or 'PUT'
      body: JSON.stringify({todo: { completion_date: "2019-12-19"}}), // data can be `string` or {object}!
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));*/
    // This also needs to modify the redux-state to reflect the completion date change.
    // Need some onclick function on DropdownItem


class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  onDropdownItemClick = (id, week) => {

    var mydate = new Date(this.props.completion_date)
    mydate.setDate(mydate.getDate() + (7 * week))
    var date_string = mydate.toISOString().split('T')[0]
    var url = 'http://0.0.0.0:3040/api/v1/todos/' + id
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({todo: { completion_date: date_string}}),
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => {
      // update redux state upon sucessful database update
      this.props.onDateClick(id, week)
      console.log('Success:', JSON.stringify(response))
    })
    .catch(error => console.error('Error:', error));
  }

  onActionClick = (action) => {
    // Placeholder
    if(action == 0) {
      //this.props.history.replace('/');
    } else {
      //this.props.history.replace('/');
    }
  }

  render() {

    return (
      <ListGroupItem
        className="d-flex justify-content-between"
        style ={{wordBreak: 'break-all', minWidth: '50%'}}
      >
        <Item ticker={this.props.stock.ticker} text={this.props.text} />
        <UncontrolledDropdown>
          <DropdownToggle caret>
            {this.props.completion_date}  
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.onDropdownItemClick(this.props.id, 1)}>Push out 1 week</DropdownItem>
            <DropdownItem onClick={() => this.onDropdownItemClick(this.props.id, 2)}>Push out 2 week</DropdownItem>
            <DropdownItem onClick={() => this.onDropdownItemClick(this.props.id, 4)}>Push out 1 month</DropdownItem>
            <DropdownItem onClick={() => this.onActionClick(0)}>
                    <Link 
                      to= {"/addtodo/" + this.props.stock.ticker}
                    >
                      Add
                    </Link>
            </DropdownItem>
            <DropdownItem onClick={() => this.onActionClick(2)}>Done</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </ListGroupItem>
    );
  }

}
/*const Todo = ({ id, onDateClick, completed, text, completion_date, stock }) => (
 
)*/

export default Todo

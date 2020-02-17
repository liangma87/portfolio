import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { 
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
      // ***** needs ui updates to show the updated date as well
      //this.props.onPushOutClick(id, week)
      //console.log('Success:', JSON.stringify(response))
    })
    .catch(error => console.error('Error:', error));
  }

  onActionClick = (action) => {
    // Placeholder
    if(action === 0) {
      //this.props.history.replace('/');
    } else {
      //this.props.history.replace('/');
    }
  }

  render() {

    return (
      <div>
      <ListGroupItem
        className="d-flex justify-content-between"
        style ={{wordBreak: 'break-all', minWidth: '50%'}}
      >
        <Item ticker={this.props.stock.symbol} text={this.props.notes} />
        <UncontrolledDropdown>
          <DropdownToggle caret>
            {this.props.completion_date}  
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.props.onEditClick(this.props.stock, this.props.id, this.props.notes, this.props.completion_date)}> Edit </DropdownItem>
            <DropdownItem onClick={() => this.onActionClick(2)}>Done</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </ListGroupItem>
      </div>
    );
  }

}

export default Todo

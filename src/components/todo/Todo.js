import React, { useState } from 'react';
import { ListGroupItem } from 'reactstrap';
import { 
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';

import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup
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

const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} charCode="Y">Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

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
            <DropdownItem onClick={() => this.onDropdownItemClick(this.props.id, 1)}>Push out 1 week</DropdownItem>
            <DropdownItem onClick={() => this.onDropdownItemClick(this.props.id, 2)}>Push out 2 week</DropdownItem>
            <DropdownItem onClick={() => this.onDropdownItemClick(this.props.id, 4)}>Push out 1 month</DropdownItem>
            <DropdownItem onClick={() => this.props.onEditClick()}> Edit </DropdownItem>
            <DropdownItem onClick={() => this.onActionClick(2)}>Done</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </ListGroupItem>
      </div>
    );
  }

}

export default Todo

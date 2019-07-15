import React from 'react';
import { ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types'
import { 
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const Todo = ({ id, onClick, completed, text }) => (
    <ListGroupItem
      onClick={onClick}
      className="d-flex justify-content-between"
      style ={{wordBreak: 'break-all', minWidth: '50%'}}
    >
      {text} 
      <UncontrolledDropdown>
        <DropdownToggle caret>
          04/29/2019  
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Push out 1 week</DropdownItem>
          <DropdownItem>Push out 1 month</DropdownItem>
          <DropdownItem>Done</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>     
    </ListGroupItem>   
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
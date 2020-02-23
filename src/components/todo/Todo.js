import React from 'react';
import {
  ListGroupItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';

const Item = ({ticker, text}) => (
  <div className="d-flex">
    <Button 
      color ="info"
      outline
      className='mr-1 mb-1'
      disabled
    > 
      {ticker}
    </Button>
    <div className='ml-1'>{text}</div>
  </div>
)

const Todo = (props) => {
  const {
    stock,
    id,
    notes,
    date,
    onEditClick,
    onDoneClick
  } = props;

  return (
    <div>
      <ListGroupItem
        className="d-flex justify-content-between"
        style ={{wordBreak: 'break-all', minWidth: '50%'}}
      >
        <Item ticker={stock.symbol} text={notes}/>
        <UncontrolledDropdown>
          <DropdownToggle caret>{date} </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => onEditClick(stock, id, notes, date)}>
              Edit
            </DropdownItem>
            <DropdownItem onClick={() => onDoneClick(id)}>
              Done
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </ListGroupItem>
    </div>
  )
}


export default Todo

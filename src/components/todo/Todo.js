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

// TODO: Todo seems can be a stateless component

class Todo extends React.Component {
  constructor(props) {
    super(props);
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
            <DropdownItem onClick={() => this.props.onDoneClick(this.props.id)}>Done</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </ListGroupItem>
      </div>
    );
  }

}

export default Todo

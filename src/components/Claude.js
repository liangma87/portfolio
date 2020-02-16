import React, { useState } from 'react';
import { ListGroup } from 'reactstrap';
import Todo from './todo/Todo'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// Claude represents TODO list

const ModalExample = (props) => {
  const {
    buttonLabel,
    modal,
    toggle,
    className
  } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
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

class Claude extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      modal: false
    };
  }

  componentDidMount() {

    fetch("http://0.0.0.0:3040/api/v1/todos")
    .then((res) => res.json())
    .then((res) => {
      this.setState({todos: res})
      console.log(this.state.todos);
    })
    .catch((err) => alert(err));
  }

  onEditClick = () => {
    this.setState({modal: !this.state.modal})
  }

  render() {
    const todos = this.state.todos
    
    if(todos.length <= 0) {
      return (<div>Loading...</div>)
    }

    var selected;
    selected = todos.filter(todo => 
      this.props.stocks.length > 1 | this.props.stocks[0].id === todo.company_id);

    console.log(selected)


    return (
      <div>
      <ListGroup>
      {selected.map((todo) => {
        return (
          <Todo
          key = {todo.id}
          {...todo}
          stock = {this.props.stocks.find(stock => stock.id === todo.company_id)}
          onEditClick = {this.onEditClick}
          />
        )
      })}
      </ListGroup>
      <ModalExample
        buttonLabel ="Edit"
        modal  = {this.state.modal}
        toggle = {this.onEditClick}
        className  ="modal-lg"
        />
      </div>
      );
  }
}

export default Claude
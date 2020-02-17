import React from 'react';
import { ListGroup } from 'reactstrap';
import Todo from './todo/Todo'
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// Claude represents TODO list

const EditModal = (props) => {
  const {
    buttonLabel,
    modal,
    onToggleClick,
    className,
    title,
    notes,
    date,
    handleNotesChange,
    handleDateChange
  } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={onToggleClick} className={className} >
        <ModalHeader toggle={onToggleClick}>{title}</ModalHeader>
        <ModalBody>
          <Input 
            type="textarea" 
            value={notes}
            rows={5}
            onChange={handleNotesChange}
          />
          <Input
            type="date"
            name="date"
            id="exampleDate"
            value={date}
            onChange={handleDateChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onToggleClick}>Submit</Button>{' '}
          <Button color="secondary" onClick={onToggleClick}>Cancel</Button>
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
      modal: false,
      m_symbol: "Seiros",
      m_todo_id: -1,
      m_todo_notes: "Seiros",
      m_todo_compl_date: "02-17-2020"  

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

  onEditClick = (stock, todo_id, todo_notes, todo_completion_date) => {
    this.setState({modal: !this.state.modal})
    if(this.state.modal) {
      return;
    }
    console.log(todo_completion_date)
    this.setState({m_symbol: stock.symbol});
    this.setState({m_todo_id: todo_id});
    this.setState({m_todo_notes: todo_notes});
    this.setState({m_todo_compl_date: todo_completion_date});
  }
  
  handleDescrptChange = (event) => {
    this.setState({m_todo_notes: event.target.value});
  }
  
  handleDateChange = (event) => {
    console.log(event.target.value)
    this.setState({m_todo_compl_date: event.target.value});
  }

  render() {
    const todos = this.state.todos
    
    if(todos.length <= 0) {
      return (<div>Loading...</div>)
    }

    var selected;
    selected = todos.filter(todo => 
      this.props.stocks.length > 1 | this.props.stocks[0].id === todo.company_id);

    //console.log(selected)


    return (
      <div>
      <ListGroup>
      {selected.map((todo) => {
        return (
          <Todo
          key={todo.id}
          {...todo}
          stock={this.props.stocks.find(stock => stock.id === todo.company_id)}
          onEditClick={this.onEditClick}
          />
        )
      })}
      </ListGroup>
      <EditModal
        buttonLabel="Edit"
        modal={this.state.modal}
        onToggleClick={this.onEditClick}
        className="modal-lg"
        title={this.state.m_symbol}
        notes={this.state.m_todo_notes}
        date={this.state.m_todo_compl_date}
        handleNotesChange={this.handleDescrptChange}
        handleDateChange={this.handleDateChange}
        />
      </div>
      );
  }
}

export default Claude
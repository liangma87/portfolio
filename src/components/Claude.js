import React from 'react';
import Todo from './todo/Todo'
import { 
  Button,
  Input,
  ListGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// Claude is a service that renders todo list
const EditTodoMod = (props) => {
  const {
    isOpen,
    className,
    title,
    notes,
    date,
    onToggleClick,
    handleNotesChange,
    handleDateChange,
    handleSumbit
  } = props;

  return (
    <div>
      <Modal isOpen={isOpen} toggle={onToggleClick} className={className} >
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
          <Button color="primary" onClick={handleSumbit}>Submit</Button>{' '}
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
      isModOpen: false,
      modTodoSym: "Seiros",
      modTodoID: -1,
      modTodoNotes: "Seiros",
      modTodoDate: "02-17-2020"
    };
  }

  componentDidMount() {

    fetch("http://0.0.0.0:3040/api/todos")
    .then((res) => res.json())
    .then((res) => {
      this.setState({todos: res})
    })
    .catch((err) => alert(err));
  }

  // Call backs
  onEditTodoModNotesChange = (event) => {
    this.setState({modTodoNotes: event.target.value});
  }
  
  onEditTodoModDateChange = (event) => {
    this.setState({modTodoDate: event.target.value});
  }

  onEditTodoModSubmitClick = (event) => {
    event.preventDefault();

    this.setState({modal: !this.state.modal})

    var url = 'http://0.0.0.0:3040/api/todos/' + this.state.m_todo_id
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({todo: { completion_date: this.state.m_todo_compl_date,
                                    notes: this.state.m_todo_notes}}),
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => {
      res.json()
    })
    .then(response => {
      var todos = this.state.todos
      var new_todos = todos.map((todo) => {
        if(todo.id === this.state.m_todo_id) {
            todo.completion_date = this.state.m_todo_compl_date
            todo.notes = this.state.m_todo_notes
        }
        return todo    
      })
      this.setState({todos: new_todos})
    })
    .catch(error => console.error('Error:', error));

  }

  onModEditClick = (stock, todo_id, todo_notes, todo_completion_date) => {
    this.setState({isModalOpen: !this.state.isModalOpen})
    if(this.state.isModalOpen) {
      return;
    }
    this.setState({modTodoSym: stock.symbol});
    this.setState({modTodoID: todo_id});
    this.setState({modTodoNotes: todo_notes});
    this.setState({modTodoDate: todo_completion_date});
  }

  onModDoneClick = (todo_id) => {
    var url = 'http://0.0.0.0:3040/api/todos/' + todo_id
    fetch(url, {
      method: 'DELETE',
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => {
      var todos = this.state.todos
      var new_todos = todos.filter(todo => todo.id != todo_id)
      this.setState({todos: new_todos})
    })
    .catch(error => console.error('Error:', error));
  }

  render() {
    const stocks = this.props.stocks
    var todos = this.state.todos

    if(todos.length <= 0 | stocks.length <= 0) {
      return (<div>Loading...</div>)
    }
    if(stocks.length == 1) {
      todos = todos.filter(todo => stocks[0].id === todo.company_id)
    }

    return (
      <div>
        <ListGroup>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              stock={stocks.find(stock => stock.id === todo.company_id)}
              id={todo.id}
              notes={todo.notes}
              date={todo.completion_date}
              onEditClick={this.onModEditClick}
              onDoneClick={this.onModDoneClick}
            />))}
        </ListGroup>
        <EditTodoMod
          isOpen={this.state.isModOpen}
          className="modal-lg"
          title={this.state.modTodoSym}
          notes={this.state.modTodoNotes}
          date={this.state.modTodoDate}
          onToggleClick={this.onEditClick}
          handleNotesChange={this.onEditTodoModNotesChange}
          handleDateChange={this.onEditTodoModDateChange}
          handleSumbit={this.onEditTodoModSubmitClick}
        />
      </div>
    )
  }
}

export default Claude
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
import { getStockApiUrl } from "../helpers/utils.js";

// Claude is a service that renders todo list
const EditTodoMod = (props) => {
  const {
    isOpen,
    className,
    title,
    notes,
    date,
    onToggleClick,
    onNotesChange,
    onDateChange,
    onSumbitClick
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
            onChange={onNotesChange}
          />
          <Input
            type="date"
            name="date"
            id="exampleDate"
            value={date}
            onChange={onDateChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSumbitClick}>Submit</Button>{' '}
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
    var url = getStockApiUrl("todos")
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
      this.setState({todos: res})
    })
    .catch((err) => alert(err));
  }

  // Call backs
  onModNotesChange = (event) => {
    this.setState({modTodoNotes: event.target.value});
  }
  
  onModDateChange = (event) => {
    this.setState({modTodoDate: event.target.value});
  }

  onModSubmitClick = (event) => {
    event.preventDefault();

    this.setState({isModOpen: !this.state.isModOpen})

    var url = getStockApiUrl("todos")+ this.state.modTodoID
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({todo: { completion_date: this.state.modTodoDate,
                                    notes: this.state.modTodoNotes}}),
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
        if(todo.id === this.state.modTodoID) {
            todo.completion_date = this.state.modTodoDate
            todo.notes = this.state.modTodoNotes
        }
        return todo    
      })
      this.setState({todos: new_todos})
    })
    .catch(error => console.error('Error:', error));

  }

  onModEditClick = (stock, todo_id, todo_notes, todo_completion_date) => {
    this.setState({isModOpen: !this.state.isModOpen})
    if(this.state.isModOpen) {
      return;
    }
    this.setState({modTodoSym: stock.symbol});
    this.setState({modTodoID: todo_id});
    this.setState({modTodoNotes: todo_notes});
    this.setState({modTodoDate: todo_completion_date});
  }

  onModDoneClick = (todo_id) => {
    var url = getStockApiUrl("todos") + todo_id
    fetch(url, {
      method: 'DELETE',
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => {
      var todos = this.state.todos
      var new_todos = todos.filter(todo => todo.id !== todo_id)
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
    if(stocks.length === 1) {
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
          onToggleClick={this.onModEditClick}
          onNotesChange={this.onModNotesChange}
          onDateChange={this.onModDateChange}
          onSumbitClick={this.onModSubmitClick}
        />
      </div>
    )
  }
}

export default Claude
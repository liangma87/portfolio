import React from 'react';
import { ListGroup } from 'reactstrap';
import Todo from './todo/Todo'
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// Claude represents TODO list

const EditModal = (props) => {
  const {
    modal,
    onToggleClick,
    className,
    title,
    notes,
    date,
    handleNotesChange,
    handleDateChange,
    handleSumbit
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
    // Maybe has a list of who can change the following states
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

    fetch("http://0.0.0.0:3040/api/todos")
    .then((res) => res.json())
    .then((res) => {
      this.setState({todos: res})
      //console.log(this.state.todos);
    })
    .catch((err) => alert(err));
  }

  onEditClick = (stock, todo_id, todo_notes, todo_completion_date) => {
    this.setState({modal: !this.state.modal})
    if(this.state.modal) {
      return;
    }
    //console.log(todo_completion_date)
    this.setState({m_symbol: stock.symbol});
    this.setState({m_todo_id: todo_id});
    this.setState({m_todo_notes: todo_notes});
    this.setState({m_todo_compl_date: todo_completion_date});
  }
  
  handleDescrptChange = (event) => {
    this.setState({m_todo_notes: event.target.value});
  }
  
  handleDateChange = (event) => {
    this.setState({m_todo_compl_date: event.target.value});
  }

  onModalSubmitClick = (event) => {
    event.preventDefault();

    this.setState({modal: !this.state.modal})
    //console.log("onModalSubmitClick")
    //console.log(this.state.m_todo_compl_date)
    //console.log(this.state.m_todo_notes)

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
      // update redux state upon sucessful database update
      // ***** needs ui updates to show the updated date as well
      //this.props.onPushOutClick(id, week)
      //console.log('Success:', JSON.stringify(response))
    })
    .catch(error => console.error('Error:', error));

  }

  onDoneClick = (id) => {
    console.log("onDoneClick called")
    console.log(id)

    var url = 'http://0.0.0.0:3040/api/todos/' + id
    fetch(url, {
      method: 'DELETE',
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => {
      res.json()
    })
    .then(response => {
      var todos = this.state.todos
      var new_todos = todos.filter(todo => todo.id != id)
      this.setState({todos: new_todos})
      // update redux state upon sucessful database update
      // ***** needs ui updates to show the updated date as well
      //this.props.onPushOutClick(id, week)
      //console.log('Success:', JSON.stringify(response))
    })
    .catch(error => console.error('Error:', error));
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
          onDoneClick={this.onDoneClick}
          />
        )
      })}
      </ListGroup>
      <EditModal
        modal={this.state.modal}
        onToggleClick={this.onEditClick}
        className="modal-lg"
        title={this.state.m_symbol}
        notes={this.state.m_todo_notes}
        date={this.state.m_todo_compl_date}
        handleNotesChange={this.handleDescrptChange}
        handleDateChange={this.handleDateChange}
        handleSumbit={this.onModalSubmitClick}
        />
      </div>
      );
  }
}

export default Claude
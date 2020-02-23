import React from 'react'
import { 
  Badge,
  Button,
} from 'reactstrap';
import Claude from './Claude'
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// AIs for next 3 months
// 1, complete research-todo cards features
// 2, complete research-diary cards features
// 3, complete auth feature to secure the application

// Byleth is the container for the following houses
// (1) Claude reprents research-todos
// (2) Edelgard represnts research-diaries
// (3) Dimitri represents research-charts

// Byleth holds the stock symbol data, the todos/diaries state are hold by 
// Claude/Edelgard

const AddTodoModal = (props) => {
  const {
    modal,
    className,
    onToggleClick,
    handleStockChange,
    handleNotesChange,
    handleDateChange,
    handleSumbit
  } = props;

  var today = new Date().toISOString().split('T')[0]

  return (
    <div>
      <Modal isOpen={modal} toggle={onToggleClick} className={className} >
        <ModalHeader toggle={onToggleClick}>{"Add Todo"}</ModalHeader>
        <ModalBody>
          <Input 
            type="textarea" 
            placeholder={"Enter stock symbol here"}
            rows={1}
            onChange={handleStockChange}
          />
          <Input 
            type="textarea" 
            placeholder={"Enter todo notes here"}
            rows={5}
            onChange={handleNotesChange}
          />
          <Input
            type="date"
            name="date"
            id="exampleDate"
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


class Byleth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      stocks: [],
      modal: false,
      m_symbol: "Seiros",
      m_todo_notes: "Seiros",
      m_todo_compl_date: "02-02-2020" 
    };
  }

  onAddTodoClick = () => {
    this.setState({modal: !this.state.modal})
  }


  handleStockChange = (event) => {
    this.setState({m_symbol: event.target.value});
  }

  handleNotesChange = (event) => {
    this.setState({m_todo_notes: event.target.value});
  }
  
  handleDateChange = (event) => {
    this.setState({m_todo_compl_date: event.target.value});
  }

  onModalSubmitClick = (event) => {
    event.preventDefault();
    this.setState({modal: !this.state.modal})

    var url = 'http://0.0.0.0:3040/api/todos/' + this.state.m_symbol
    fetch(url, {
      method: 'POST',
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
      // This is just hack to work around the UI issue
      // The todos are not updated due to todos are not props
      // This problem will go away once we use redux to mannage state
      this.fetchAllTodos()
    })
    .catch(error => console.error('Error:', error));

  }

  fetchAllTodos = () => {

    fetch("http://0.0.0.0:3040/api/companies")
    .then((res) => res.json())
    .then((res) => {
      this.setState({stocks: res})
    })
    .catch((err) => alert(err));
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  onStockFilterClick = (stock_id) => {
    this.setState({ selected: stock_id, stocks: this.state.stocks})
  }

  render() {
    const stocks = this.state.stocks
    
    if(stocks.length <= 0) {
      return (<div>Loading...</div>)
    }

    var stk_btns = stocks.map(stock => {
      return (
        <Button 
          color ="info"
          outline
          className='mr-1 mb-1'
          onClick={() => this.onStockFilterClick(stock.id)}
          active={this.state.selected === stock.id}
        >
          {stock.symbol} <Badge color="secondary">{stock.todos_cnt}</Badge>
        </Button>);
    });

    var selected;
    selected = stocks.filter(stock => 
      this.state.selected === stock.id || this.state.selected === -1);

    //Console.log(selected)
    return (
      <div>
        <div className="d-flex justify-content-between mb-3">
          <div>
            {stk_btns}
            <Button 
              color ="info"
              outline
              className='mr-1 mb-1'
              onClick={() => this.onStockFilterClick(-1)}
              active={this.state.selected === -1}
            >
              All
            </Button>
            <Button 
              color ="success"
              outline
              className='mr-1 mb-1'
              onClick={() => this.onAddTodoClick()}
            >
              Add
            </Button>
          </div>
        </div>
        <Claude 
          stocks={selected}
        />
        <AddTodoModal 
          modal={this.state.modal}
          onToggleClick={this.onAddTodoClick}
          handleStockChange={this.handleStockChange}
          handleNotesChange={this.handleNotesChange}
          handleDateChange={this.handleDateChange}
          handleSumbit={this.onModalSubmitClick}
        />
      </div>
    );
  }
}

export default Byleth
import React from 'react'
import { 
  Badge,
  Button,
} from 'reactstrap';
import Claude from './Claude'
import Edelgard from './Edelgard'
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
    isOpen,
    className,
    onToggleClick,
    onSymbolChange,
    onNotesChange,
    onDateChange,
    onSumbitClick
  } = props;

  return (
    <div>
      <Modal isOpen={isOpen} toggle={onToggleClick} className={className} >
        <ModalHeader toggle={onToggleClick}>{"Add Todo"}</ModalHeader>
        <ModalBody>
          <Input 
            type="textarea" 
            placeholder={"Enter stock symbol here"}
            rows={1}
            onChange={onSymbolChange}
          />
          <Input 
            type="textarea" 
            placeholder={"Enter todo notes here"}
            rows={5}
            onChange={onNotesChange}
          />
          <Input
            type="date"
            name="date"
            id="exampleDate"
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


class Byleth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      stocks: [],
      isModOpen: false,
      modSymbol: "Seiros",
      modNotes: "Seiros",
      modDate: "02-02-2020" 
    };
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  fetchAllTodos = () => {
    fetch("http://0.0.0.0:3040/api/companies")
    .then((res) => res.json())
    .then((res) => {
      this.setState({stocks: res})
    })
    .catch((err) => alert(err));
  }

  onStockFilterClick = (stock_id) => {
    this.setState({ selected: stock_id, stocks: this.state.stocks})
  }

  onAddTodoClick = () => {
    this.setState({isModOpen: !this.state.isModOpen})
  }

  onSymbolChange = (event) => {
    this.setState({modSymbol: event.target.value});
  }

  onNotesChange = (event) => {
    this.setState({modNotes: event.target.value});
  }
  
  onDateChange = (event) => {
    this.setState({modDate: event.target.value});
  }

  onModSubmitClick = (event) => {
    event.preventDefault();
    this.setState({isModOpen: !this.state.isModOpen})

    var url = 'http://0.0.0.0:3040/api/todos/' + this.state.modSymbol
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({todo: { completion_date: this.state.modDate,
                                    notes: this.state.modNotes}}),
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => {
      res.json()
    })
    .then(response => {
      this.fetchAllTodos()
    })
    .catch(error => console.error('Error:', error));

  }

  render() {
    const stocks = this.state.stocks
    
    if(stocks.length <= 0) {
      return (<div>Loading...</div>)
    }

    var stk_btns = stocks.map(stock => 
      <Button 
        color ="info"
        outline
        className='mr-1 mb-1'
        onClick={() => this.onStockFilterClick(stock.id)}
        active={this.state.selected === stock.id}
      >
        {stock.symbol} <Badge color="secondary">{stock.todos_cnt}</Badge>
      </Button>
    )

    var selected;
    selected = stocks.filter(stock => 
      this.state.selected === stock.id || this.state.selected === -1);

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
        {/*<Claude 
          stocks={selected}
        />*/}
        <Edelgard />
        <AddTodoModal 
          isOpen={this.state.isModOpen}
          onToggleClick={this.onAddTodoClick}
          onSymbolChange={this.onSymbolChange}
          onNotesChange={this.onNotesChange}
          onDateChange={this.onDateChange}
          onSumbitClick={this.onModSubmitClick}
        />
      </div>
    );
  }
}

export default Byleth
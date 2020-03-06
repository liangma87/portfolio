import React from 'react'
import Claude from './Claude'
import Edelgard from './Edelgard'
import {
  Button,
  Input, 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { getStockApiUrl } from "../helpers/utils.js";

// AIs for next 3 months
// 1, complete research-todos cards features
// 2, complete research-thoughts cards features
// 3, complete auth feature to secure the application

// Byleth is the container for the following houses
// (1) Claude reprents research-todos
// (2) Edelgard represnts research-thoughts
// (3) Dimitri represents research-charts

// Byleth holds the stock symbol data, the todos/thoughts state are hold by 
// Claude/Edelgard

const AddModal = (props) => {
  const {
    isOpen,
    title,
    className,
    onToggleClick,
    onSymbolChange,
    onNotesChange,
    onDateChange,
    onTitleChange,
    onSumbitClick
  } = props;

  var today = new Date().toISOString().split('T')[0]
  var dateInput = <div>{today}</div>
  var titleInput = null
  if(title==="Todos"){
    dateInput = <Input
              type="date"
              name="date"
              id="exampleDate"
              onChange={onDateChange}
              />
  }
  if(title==="Thoughts"){
    titleInput = <Input 
                type="textarea" 
                placeholder={"Title"}
                rows={1}
                onChange={onTitleChange}
                />
  }

  return (
    <div>
      <Modal isOpen={isOpen} toggle={onToggleClick} className={className} >
        <ModalHeader toggle={onToggleClick}>{title}</ModalHeader>
        <ModalBody>
          <Input 
            type="textarea" 
            placeholder={"Stock Symbol"}
            rows={1}
            onChange={onSymbolChange}
          />
          {titleInput}
          <Input 
            type="textarea" 
            placeholder={"Notes"}
            rows={5}
            onChange={onNotesChange}
          />
          {dateInput}
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
      choice: null,
      stocks: [],
      isModOpen: false,
      modSymbol: "Seiros",
      modNotes: "Seiros",
      modDate: "02-02-2020",
      modTitle: "Seiros"
    };
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  fetchAllTodos = () => {
    var url = getStockApiUrl("companies")
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
      this.setState({choice: res[0],stocks: res})
    })
    .catch((err) => alert(err));
  }

  onStockFilterClick = (stock) => {
    this.setState({ choice: stock})
  }

  onAddModClick = () => {
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

  onTitleChange = (event) => {
    this.setState({modTitle: event.target.value});
  }

  onModSubmitClick = (event) => {
    event.preventDefault();
    this.setState({isModOpen: !this.state.isModOpen})

    var url = getStockApiUrl("todos") + this.state.modSymbol
    var content = {todo: { date: this.state.modDate,
                                    notes: this.state.modNotes}}
    if(this.props.navItem==="Thoughts") {
      url = getStockApiUrl("thoughts") + this.state.modSymbol
      content = {thought: {notes: this.state.modNotes, title: this.state.modTitle}}
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(content),
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
        onClick={() => this.onStockFilterClick(stock)}
        active={this.state.choice && this.state.choice.id === stock.id}
      >
        {stock.symbol}
      </Button>
    )

    var selected;
    selected = stocks.filter(stock => 
       this.state.choice === null || this.state.choice.id === stock.id);

    var service;
    if(this.props.navItem==="Todos") {
      service = <Claude stocks={selected}/>
    } else if(this.props.navItem==="Thoughts") {
      service = <Edelgard stock={this.state.choice}/>
    }

    return (
      <div>
        <div className="d-flex justify-content-between mb-3">
          <div>
            {stk_btns}
            <Button 
              color ="info"
              outline
              className='mr-1 mb-1'
              onClick={() => this.onStockFilterClick(null)}
              active={this.state.choice === null}
              disabled={this.props.navItem==="Thoughts"}
            >
              All
            </Button>
            <Button 
              color ="success"
              outline
              className='mr-1 mb-1'
              onClick={() => this.onAddModClick()}
            >
              Add
            </Button>
          </div>
        </div>
        {service}
        <AddModal 
          isOpen={this.state.isModOpen}
          title={this.props.navItem}
          onToggleClick={this.onAddModClick}
          onSymbolChange={this.onSymbolChange}
          onNotesChange={this.onNotesChange}
          onDateChange={this.onDateChange}
          onTitleChange={this.onTitleChange}
          onSumbitClick={this.onModSubmitClick}
        />
      </div>
    );
  }
}

export default Byleth
import React from 'react'
import { 
  Badge,
  Button,
} from 'reactstrap';
import Claude from './Claude'
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

class Byleth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      stocks: []
    };
  }

  componentDidMount() {

    fetch("http://0.0.0.0:3040/api/v1/companies")
    .then((res) => res.json())
    .then((res) => {
      this.setState({stocks: res})
      console.log(this.state.stocks);
    })
    .catch((err) => alert(err));
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
          {stock.symbol} <Badge color="secondary">{stock.todos}</Badge>
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
              All <Badge color="secondary">{this.state.totoal_todos}</Badge>
            </Button>
          </div>
        </div>
        <Claude 
          stocks = {selected}
        />
      </div>
    );
  }
}

export default Byleth
import React from 'react';
import CandleStickChart from "./CandleStickChart";
import { getData } from "../helpers/utils.js";

class ChartComponent extends React.Component {
  componentDidMount() {
    const { symbol } = this.props;
    getData(symbol).then(data => {
      this.setState({ data })
    })
  }
  render() {

    if (this.state == null) {
      return <div>Loading...</div>
    }
    return (
      <CandleStickChart type={"hybrid"} data={this.state.data} />
      /*<CandleStickChart type={"hybrid"} data={this.state.data} />*/
    )
  }
}

export default ChartComponent;
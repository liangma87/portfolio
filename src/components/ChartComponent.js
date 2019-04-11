import React from 'react';
import CandleStickChart from "./CandleStickChart";
import { getData } from "../helpers/utils.js";

class ChartComponent extends React.Component {
  componentDidMount() {
    getData().then(data => {
      this.setState({ data })
    })
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>
    }
    return (
      /*<CandleStickChart type={"hybrid"} data={this.state.data} width={1024} />*/
      <CandleStickChart type={"hybrid"} data={this.state.data} />
    )
  }
}

export default ChartComponent;
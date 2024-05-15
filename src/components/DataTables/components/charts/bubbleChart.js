import React, { Component } from "react";
import Chart from "react-apexcharts";

class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {}
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions
    });
  }

  render() {
    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="bubble"
        width="100%"
        height="100%"
      />
    );
  }
}

export default BubbleChart;

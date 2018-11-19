import React, { Component } from 'react';
//import BarChart from './charts/BarChart';
//import ScatterPlot from './charts/ScatterPlot';
//import LineChart from './charts/LineChart';
import Header from "./Header";
import data from './datasets/CoffeesPerDay.csv';
import data2 from './datasets/CoffeeWake.csv';
import './App.css';

class App extends Component {

  state = {
    data: data,
    width: 500,
    height: 300,
    id: "barchart"
  }

  state2 = {
    data: data2,
    width: 500,
    height: 300,
    id: "scatterplot"
  }

  //saved working code for showing graphs
  // <div className="App">
  //   <BarChart data={this.state.data} width={this.state.width} height={this.state.height} id={this.state.id} />
  //   <ScatterPlot data={this.state2.data} width={this.state2.width} height={this.state2.height} id={this.state2.id} />
  //   <LineChart width={this.state2.width} height={this.state2.height} id="linechart" />
  // </div>


  render() {
    return (
      <Header/>
    );
  }
}

export default App;

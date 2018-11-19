import React, { Component } from 'react';
// 1 //barchart
import bardata from './datasets/CoffeesPerDay.csv';
import BarChart from './charts/BarChart';
// 2 //line chart
import LineChart from './charts/LineChart';
// 4 //scatter chart
import ScatterPlot from './charts/ScatterPlot';
import scatterdata from './datasets/CoffeeWake.csv';
// 9 // force directed
import ForceDirect from './charts/ForceDirect';
import forcedata from './datasets/test.json';
// 10 //chord diagram
import ChordDiagram from './charts/ChordDiagram';
import './App.css';

class Chartview extends Component {  

  state = {
    width: 500,
    height: 300,
}

  switchChart(param){
    switch(param) {
      case 1:
        return <BarChart data={bardata}/>;
      case 2:
        return <LineChart/>;
      case 4:
        return <ScatterPlot data={scatterdata}/>;
      case 9:
        return <ForceDirect data={forcedata}/>;
      case 10:
        return <ChordDiagram/>;
      default:
        return 'default';
    }
  }
  
    render() {
      return (
        <div>
          <div className="flexRow">
            <h2 className="chartTitle">{this.props.chart.charttype}</h2>
          </div>
          <div className="flexRow">
            <div id='chart'>{this.switchChart(this.props.chart.id)}</div>
            <div className="summary">
              <h5 className="sumtitle">Summary</h5>
              <p className="subtitle">{this.props.chart.summary}</p>
            </div>
          </div>
          
          <div className="flexRow">
            <div className="markschannels">
              <h5 className="title">Marks:</h5> 
                <p className="subtitle">{this.props.chart.marks}</p>
              <h5 className="title">Channels:</h5>
               <p className="subtitle">{this.props.chart.channels}</p>
            </div>
            <div>
              <h5 className="title">Analysis:</h5>
                <p className="subtitle">{this.props.chart.analysis}</p>
            </div>
          </div>

          <div className="flexRow column">
            <h5 className="title">References:</h5>
            {
              this.props.chart.sources.map(function(source){
                //console.log(source);
                return <a key={source} href={source}>{source}</a>;
              })
            }
          </div>
          
        </div>
      );
    }
  }
  
  export default Chartview;
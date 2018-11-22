import React, { Component } from 'react';
// 1 //barchart
import bardata from './datasets/CoffeesPerDay.csv';
import BarChart from './charts/BarChart';
// 2 //line chart
import LineChart from './charts/LineChart';
import linedata from './datasets/area.csv';
// 3 //area chart
import AreaChart from './charts/AreaChart';
// 4 //scatter chart
import ScatterPlot from './charts/ScatterPlot';
import scatterdata from './datasets/CoffeeWake.csv';
// 5 //pie chart
import PieChart from './charts/PieChart';
// 6 //donut chart
import DonutChart from './charts/DonutChart';
// 7 //donut chart
import StackedBarChart from './charts/StackedBarChart';
// 8 //stackedarea chart
import StackedAreaChart from './charts/StackedAreaChart';
// 9 //force directed
import ForceDirect from './charts/ForceDirect';
import forcedata from './datasets/test.json';
// 10 //chord diagram
import ChordDiagram from './charts/ChordDiagram';
// 11 //chord diagram
import Cluster from './charts/Cluster';
// 12 //packed circles
import PackedCircles from './charts/PackedCircles';
import packdata from './datasets/packedcircles.json';
// 13 //partition
import Partition from './charts/Partition';
// 14 //tree
import Tree from './charts/Tree';
// 15 //treemap
import TreeMap from './charts/TreeMap';
// 17 //cloropleth
import Cloropleth from './charts/Chloropleth';
import clorodata from './datasets/us-states.json';
/////////////////
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
        return <LineChart data={linedata}/>;
      case 3:
        return <AreaChart data={linedata}/>;
      case 4:
        return <ScatterPlot data={scatterdata}/>;
      case 5:
        return <PieChart/>;
      case 6:
        return <DonutChart/>;
      case 7:
        return <StackedBarChart/>;
      case 8:
        return <StackedAreaChart data={linedata}/>;
      case 9:
        return <ForceDirect data={forcedata}/>;
      case 10:
        return <ChordDiagram/>;
      case 11:
        return <Cluster/>;
      case 12:
        return <PackedCircles data={packdata}/>;
      case 13:
        return <Partition/>;
      case 14:
        return <Tree/>;
      case 15:
        return <TreeMap/>;
      case 17:
        return <Cloropleth data={clorodata}/>;
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
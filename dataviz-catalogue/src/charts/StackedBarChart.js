import React, { Component } from 'react';
import * as d3 from "d3";

class StackedBarChart extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawStackedBarChart();
    }

    drawStackedBarChart() {

        let dataset = [
            {date: new Date(2018, 6), grocery: 413.00, airfare: 0, gas: 324.00 }, 
            {date: new Date(2018, 7), grocery: 413.00, airfare: 0, gas: 72.00 }, 
            {date: new Date(2018, 8), grocery: 113.00, airfare: 2200.00, gas: 40.00 }, 
            {date: new Date(2018, 9), grocery: 221.00, airfare: 1600.00, gas: 63.00 } ]; 
      
        // create d3 layout function to convert dataset into stacked values
        let stack = d3.stack()
                            .keys(['airfare', 'grocery', 'gas']); 
        let stackedData = stack(dataset);
      
        console.table(stackedData);
      
        // settings for our pie chart 
        const w = window.innerWidth - window.innerWidth*.5 - 100;
        const h = window.innerWidth - window.innerWidth*.65 - 100;
      
        // create our SVG element
        let svg = d3
          .select("#chart")
          .append('svg')
          .attr("width", w)
          .attr("height", h);
      
        // create a scale for y-axis
        let yScale = d3
          .scaleLinear()
          .domain([0, d3.max(dataset, d => d.grocery + d.airfare + d.gas)])
          .range([h - 40, 20]);
      
        let extent = d3.extent(dataset, d => d.date);
        let endDate = new Date(extent[1].getFullYear(), extent[1].getMonth() + 1);
      
        let xScale = d3.scaleTime()
          .domain([extent[0], endDate])
          .range([60, w - 20]);
      
      
        // use a color scale for the bar colors
        // ordinal scales created given an array of output range values
        // usually used by giving input indices into array 
        let cScale = d3.scaleOrdinal()
          .domain(d3.range(4))
          .range(["#00AEEF", "#F15A29", "#8DC63F", "#DA1C5C"]);
      
        let groups = 
          svg.selectAll('g')
              .data(stackedData)
              .enter()
              .append('g')
                .style('fill', (d, i) => cScale(i));
      
        let barlen = (w - 40) / dataset.length - 20;
      
        groups.selectAll('rect')
          .data(d => d)
          .enter()
          .append('rect')
            .attr('x', d => xScale(d.data.date))
            .attr('y', d => yScale(d[1]))
            .attr('width', barlen)
            .attr('height', d => yScale(d[0]) - yScale(d[1]))
      
        // AXES
      
        // create our x-axis and customize look with .ticks() and
        // .tickFormat()
        let xAxis = d3
          .axisBottom(xScale)
          .ticks(dataset.length + 1)
          .tickFormat(d3.timeFormat("%b")) ;
        let xAxisGroup = svg
          .append("g")
          .attr("transform", `translate(0, ${h - 40})`)
          .call(xAxis);
      
        let yAxis = d3.axisLeft(yScale);
        let yAxisGroup = svg
          .append("g")
          .attr("transform", `translate(60, 0)`)
          .call(yAxis);
      
        // LEGEND - built using Susie Lu's d3.svg.legend package
        // let legendScale = d3.scaleOrdinal()
        //                     .domain(['Airfare', 'Grocery', 'Gas'])
        //                     .range(d3.schemeCategory10);
      
        // svg.append("g")
        //   .attr("class", "legendOrdinal")
        //   .attr("transform", "translate(80,20)");
      
        // see https://github.com/d3/d3-shape#symbols for information about d3 symbol shapes
        // var legendOrdinal = d3.legendColor()
        //   .shape("path", d3.symbol().type(d3.symbolSquare).size(60)())
        //   .shapePadding(10)
        //   .scale(legendScale);
      
        // svg.select(".legendOrdinal")
        //   .call(legendOrdinal);
      
        // AXES LABELS
      
        svg.append('text')
          .classed('axis-label', true)
          .attr('transform', 'rotate(-90)')
          .attr('x', -h/2)
          .attr('y', 20)
          .attr('text-anchor', 'middle')
          .text('Total dollar spend')
          
        svg.append('text')
          .classed('axis-label', true)
          .attr('x', w/2)
          .attr('y', h - 5)
          .attr('text-anchor', 'middle')
          .text('2018')

    }

    render(){
        return <div id="stackedbarchart"></div>
    }

}

export default StackedBarChart;
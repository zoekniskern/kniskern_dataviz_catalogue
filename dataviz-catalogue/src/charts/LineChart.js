import React, { Component } from 'react';
import * as d3 from "d3";

class LineChart extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawLineChart();
    }

    drawLineChart() {

        let dataset = []

        for(let i = 0; i < 3; i++) {
        let lineData = []
        for(let j = 0; j < 3; j++) {
            let datum = {
            sleep: 2 + Math.random() * 10,
            date: new Date(2018, j)
            };
            lineData.push(datum);
        }
        let datum = {
            name: `Person ${i}`, 
            lineData: lineData
        };
        dataset.push(datum);
        }
            
        // let's use console.log with the dataset so that we can inspect
        // the values in the Javascript Console
        //console.table(dataset);

        const w = window.innerWidth - window.innerWidth*.5 - 100;
        const h = window.innerWidth - window.innerWidth*.65 - 100;

        // now create an svg element
        let svg = d3.select('#chart')
                    .append('svg')
                    .attr('width', w)   // setup width and height of svg to start
                    .attr('height', h); 

        let xScale = d3
            .scaleTime()
            .domain(d3.extent(dataset[0].lineData, d => d.date))    /// FIXME
            .range([30, w - 20]);

        let yScale = d3
            .scaleLinear()
            .domain([0, 12])
            .range([h - 20, 20]);

        // create our x-axis and customize look with .ticks() and
        // .tickFormat()
        let xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat("%m/%y"));

        let xAxisGroup = svg.append("g")
            .attr("transform", `translate(0, ${h - 20})`)
            .call(xAxis);

        let yAxis = d3.axisLeft(yScale);
        let yAxisGroup = svg.append("g")
              .attr("transform", `translate(30, 0)`)
              .call(yAxis);
          
        var colors = d3.scaleOrdinal()
              .domain(["moss", "dreary", "aqua"])
              .range(["#DA1C5C", "#F15A29" , "#00AEEF"]);
        
        /* LINE CHART CODE */

        // draw the lines using SVG path elements
        // You should use one .selectAll(), .data(), .enter() sequence
        // here to generate all of your lines

        let line = d3.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.sleep); });

        svg.selectAll('.line')
            .data(dataset)
            .enter()
            .append('path')
                .attr('class', 'line')
                .attr("stroke", (d,i) => colors(i) )
                .attr('d', d => line(d.lineData));      
        
    }

    render(){
        return <div id='#linechart'></div>
    }

}

export default LineChart;
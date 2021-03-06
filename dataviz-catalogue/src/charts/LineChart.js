import React, { Component } from 'react';
import * as d3 from "d3";

class LineChart extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawLineChart();
    }

    drawLineChart() {

        let parseDate = d3.timeParse("%Y-%m-%d");
        let key = d => d.date;

        let dataset = this.props.data;

        d3.csv(this.props.data, (d) => {
        return {
            date: parseDate(d.date),
            sleep: parseFloat(d.hours_of_sleep)
            }
        }).then((dataset) => {

            console.log(dataset);
        // sort by date ascending
            dataset.sort((a, b) => a.date - b.date);
    

            const w = window.innerWidth - window.innerWidth*.5 - 100;
            const h = window.innerWidth - window.innerWidth*.65 - 100;

            // now create an svg element
            let svg = d3.select('#chart')
                        .append('svg')
                        .attr('width', w)   // setup width and height of svg to start
                        .attr('height', h); 

            let xScale = d3
                .scaleTime()
                .domain([d3.min(dataset, d => d.date), parseDate("2018-10-02")])
                .range([30, w - 20]);

            let yScale = d3
                .scaleLinear()
                .domain([0, 12])
                .range([h - 20, 20]);

            // create our x-axis and customize look with .ticks() and
            // .tickFormat()
            let xAxis = d3.axisBottom(xScale)
                .ticks(dataset.length + 1)
                .tickFormat(d3.timeFormat("%a"));

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
                .x(d => xScale(d.date))
                .y(d => yScale(d.sleep));

            // draw the line using a path
            svg.append('path')
                .datum(dataset)
                .attr('class', 'linechart')
                .attr('d', line);
                    
            // draw circles at the points to emphasize 
            svg.selectAll('.dot')
                .data(dataset, key)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(d.date))
                .attr("cy", d => yScale(d.sleep))
                .attr('r', 5)
                .style("fill", '#F15A29');
        })
    }

    render(){
        return <div id='#linechart'></div>
    }

}

export default LineChart;
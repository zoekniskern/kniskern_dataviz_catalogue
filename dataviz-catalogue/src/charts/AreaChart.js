import React, { Component } from 'react';
import * as d3 from "d3";

class AreaChart extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawBarChart();
    }

    drawBarChart() {

        let parseDate = d3.timeParse("%Y-%m-%d");
        let key = d => d.date;

        let dataset = this.props.data;

        d3.csv(this.props.data, (d) => {
        return {
            date: parseDate(d.date),
            sleep: parseFloat(d.hours_of_sleep)
            }
        }).then((dataset) => {

            //console.log(dataset);
            // sort by date ascending
            dataset.sort((a, b) => a.date - b.date);
    

            const w = window.innerWidth - window.innerWidth*.5 - 100;
            const h = window.innerWidth - window.innerWidth*.65 - 100;

            // now create an svg element
            let svg = d3.select('#chart')
                        .append('svg')
                        .attr('width', w)   // setup width and height of svg to start
                        .attr('height', h); 

            // create a scale for x-axis: use time for the date data variable
            // set the end to be the day after the last date, which is hard
            // coded here, so that the far right end of the scale is going to
            // allow the last day within the data set to show within the range
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
            let xAxis = d3
                .axisBottom(xScale)
                .ticks(dataset.length + 1)
                .tickFormat(d3.timeFormat("%a"));
            let xAxisGroup = svg
                .append("g")
                .attr("transform", `translate(0, ${h - 20})`)
                .call(xAxis);

            let yAxis = d3.axisLeft(yScale);
            let yAxisGroup = svg
                .append("g")
                .attr("transform", `translate(30, 0)`)
                .call(yAxis);

            /* LINE CHART CODE */
            // build a D3 line generator 
            let area = d3.area()
                .x(d => xScale(d.date))
                .y0(d => yScale(d.sleep))
                .y1(yScale.range()[0]);

            // draw the line using a path
            svg.append('path')
                .datum(dataset)
                .attr('class', 'area')
                .attr('d', area);
        })
    }

    render(){
        return <div id="areachart"></div>
    }

}

export default AreaChart;
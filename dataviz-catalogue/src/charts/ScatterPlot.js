import React, { Component } from 'react';
import * as d3 from "d3";

class ScatterPlot extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawScatterChart();
    }

    drawScatterChart() {

        // console.log("original data");
        // console.table(this.props.data);

        //parse data
        d3.csv(this.props.data, (row) => {
            return {
                coffees: parseFloat(row.coffees),
                wake_time: parseFloat(row.wake_time),
            }
        }).then((dataset) => {
            
            // let's use console.log with the dataset so that we can inspect
            // the values in the Javascript Console
            //console.table(dataset);

            const w = window.innerWidth - window.innerWidth*.5 - 100;
            const h = window.innerWidth - window.innerWidth*.65 - 100;

            // let's get the min and max values for both coffees and wake_time
            let coffeeMin = d3.min(dataset, (d) => d.coffees);
            let coffeeMax = d3.max(dataset, (d) => d.coffees);
            let wakeMin = d3.min(dataset, (d) => d.wake_time);
            let wakeMax = d3.max(dataset, (d) => d.wake_time);

            let xScale = d3.scaleLinear()
                  .domain([coffeeMin + 1.5, coffeeMax + .1])
                  .rangeRound([20, w - 20]);

            let yScale = d3.scaleLinear()
                        .domain([wakeMin, wakeMax])
                        .rangeRound([h - 20, 20]);
                        
            let rScale = d3.scaleSqrt()
                        .domain([0, coffeeMax])
                        .range([0,5]);

            // now create an svg element
            let svg = d3.select('#chart')
                        .append('svg')
                        .attr('width', w)   // setup width and height of svg to start
                        .attr('height', h); 
            
            svg.selectAll('circle')
                .data(dataset)
                .enter()
                .append('circle')
                .attr('cx', (d) => xScale(d.coffees))
                .attr('cy', (d) => yScale(d.wake_time))
                .attr('fill', '#F15A29')
                .attr('r', (d) => rScale(d.coffees));
            
            
            svg.selectAll('text')
                .data(dataset)
                .enter()
                .append('text')
                .attr('text-anchor', 'middle')
                .attr('font-size', 10)
                .attr('x', (d) => xScale(d.coffees))
                .attr('y', (d) => yScale(d.wake_time) - 8)
                .text((d) => `(${d.coffees},${d.wake_time})`);       

            // AXES

            let xAxis = d3.axisBottom()
                            .ticks(4)
                            .scale(xScale);

            svg.append('g')
                .attr('class','axis')
                .attr('transform', `translate(10,${h - 20})`)
                .call(xAxis);


            let yAxis = d3.axisLeft()
                            .scale(yScale);

            svg.append('g')
                .attr('class','axis')
                .attr('transform', `translate(30,0)`)
                .call(yAxis);
            })
        
    }

    render(){
        return <div id="scatterplot"></div>
    }

}

export default ScatterPlot;
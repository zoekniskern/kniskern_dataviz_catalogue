import React, { Component } from 'react';
import * as d3 from "d3";

class BarChart extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawBarChart();
    }

    drawBarChart() {

        let parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S');

        //parse data
        d3.csv(this.props.data, (row) => {
            return {
            coffees: parseInt(row.coffees), 
            date_time: parseTime(row.date_time)
            }
        }).then((dataset) => {
            
            // let's use console.log with the dataset so that we can inspect
            // the values in the Javascript Console
            //console.table(dataset);

            const w = window.innerWidth - window.innerWidth*.5 - 100;
            const h = window.innerWidth - window.innerWidth*.65 - 100;

            // let's get the min and max values for both coffees and wake_time
            //let coffeeMin = d3.min(dataset, (d) => d.coffees);
            let coffeeMax = d3.max(dataset, (d) => d.coffees);
            let dateMin = d3.min(dataset, (d) => d.date_time);
            let dateMax = d3.max(dataset, (d) => d.date_time);

            // xscale
            let xScale = d3.scaleTime()
                            .domain([dateMin, dateMax])  
                            .range([20, w - 10])
                            //.rangeRound([20, w - 20])

            // let's flip the y-values for output here
            let yScale = d3.scaleLinear()
                            .domain([0, coffeeMax])  
                            .range([h - 20, 20]);
                            //.rangeRound([h - 20, 20]);

            // now create an svg element
            let svg = d3.select('#chart')
                        .append('svg')
                        .attr('width', w)   // setup width and height of svg to start
                        .attr('height', h); 
                    
            let barWidth = Math.floor((w - 40) / dataset.length) - 4;

            svg.selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect')
                .attr('x', (d) => xScale(d.date_time))        
                .attr('y', (d) => yScale(d.coffees))  
                .attr('width', barWidth)
                .attr('height', (d) => (h - 20) - yScale(d.coffees))
                .attr('fill', '#F15A29')
                .attr('transform', `translate(10,0)`);

            svg.selectAll('text')
                .data(dataset)
                .enter()
                .append('text')
                .attr('text-anchor', 'middle')
                .attr('font-size', '12px')
                .attr('x', (d) => xScale(d.date_time) + (barWidth / 2))
                .attr('y', (d) => yScale(d.coffees) - 6)  
                .text((d) => `${d.coffees}`)
                .attr('transform', `translate(10,0)`);

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
        return <div id="barchart"></div>
    }

}

export default BarChart;
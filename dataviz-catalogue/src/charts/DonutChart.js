import React, { Component } from 'react';
import * as d3 from "d3";

class PieChart extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawPieChart();
    }

    drawPieChart() {

        // dataset for this pie chart
        let dataset = [
        {name: "Salsa", value: 12 }, 
        {name: "Bachata", value: 10}, 
        {name: "Kizomba", value: 5}, 
        {name: "Zouk", value: 2}
        ]; 

        // d3.pie will sort our values, but it does so in a way that 
        // makes the color scale mapping hard to predict, so it's easier
        // to sort ourselves
        dataset.sort((a,b) => b.value - a.value);

        // settings for our pie chart 
        const w = window.innerWidth - window.innerWidth*.5 - window.innerWidth*.25;
        const h = w;
        let innerRadius = h/2 - 20 - 50;       
        let outerRadius = h/2 - 20;

        // create our SVG element
        let svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

        // create D3 pie layout that converts 
        // dataset into one appropriate for pie charts 
        let pie = d3.pie()
                    .value(d => d.value);       

        // create D3 arc generator we will use for pie layout 
        let arc = d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);


        // use a color scale for the bar colors
        // ordinal scales created given an array of output range values
        // usually used by giving input indices into array 
        let cScale = d3.scaleOrdinal()
            .domain(d3.range(4))
            .range(["#00AEEF", "#F15A29", "#8DC63F", "#DA1C5C"]);
        
            console.table(pie(dataset));
        // let pieDataset = pie(dataset);

        let arcs = 
        svg.selectAll('g.arc')
            .data(pie(dataset))
            //.data(pieDataset)
            .enter()
            .append('g')
                .attr('class', 'arc')
                //this moves it to draw from the correct location
                .attr('transform', `translate(${w/2}, ${h/2})`);

        // append an SVG path to each g element for the pie wedge
        // uses the arc generator we configured earlier 
        arcs.append('path')
        .attr('fill', (d,i) => cScale(i))
        .attr('d', arc)
        .append('title')
            .text(d => d.data.name);

        // now append text elements to each 'g' pie wedge
        arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .text(d => d.value);

        // LEGEND - built using Susie Lu's d3.svg.legend package
        let pieData = pie(dataset);
        let legendScale = d3.scaleOrdinal()
                            .domain(pieData.map(d => d.data.name))
                            .range(d3.schemeCategory10);

        svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(320,20)");

        // see https://github.com/d3/d3-shape#symbols for information about d3 symbol shapes
        // var legendOrdinal = d3.legendColor()
        // .shape("path", d3.symbol().type(d3.symbolSquare).size(60)())
        // .shapePadding(10)
        // .scale(legendScale);

        // svg.select(".legendOrdinal")
        // .call(legendOrdinal);
    }

    render(){
        return <div id="barchart"></div>
    }

}

export default PieChart;
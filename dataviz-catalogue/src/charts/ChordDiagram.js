import React, { Component } from 'react';
import * as d3 from "d3";

class ChordDiagram extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawChordDiagram();
    }

    drawChordDiagram() {

        const w = window.innerWidth - window.innerWidth*.5 - window.innerWidth*.25;
        const h = w;

        function groupTicks(d, step) {
            const k = (d.endAngle - d.startAngle) / d.value;
            return d3.range(0, d.value, step).map(value => {
              return {value: value, angle: value * k + d.startAngle};
            });
        };

        let outerRadius = Math.min(w, h) * 0.5 - 30;
        let innerRadius = outerRadius - 20;

        let formatValue = d3.formatPrefix(",.0", 1e3);

        let chord = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending);

        let arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        let ribbon = d3.ribbon()
            .radius(innerRadius);

        let color = d3.scaleOrdinal()
            .domain(d3.range(4))
            .range(["#00AEEF", "#F15A29", "#8DC63F", "#DA1C5C"]);

        

        //https://beta.observablehq.com/@mbostock/d3-chord-diagram
        let dataset = [
            [1200,  3000, 8000, 1500],
            [ 3000, 12050, 4000, 8390],
            [ 5680, 14678, 8090, 5720],
            [ 3721,   990,  780, 6987]
          ]

        const chords = chord(dataset);

        // now create an svg element
        let svg = d3.select('#chart')
                    .append('svg')
                    .attr("viewBox", [-w / 2, -h / 2, w, h])
                    .attr('width', w)   // setup width and height of svg to start
                    .attr('height', h)
                    .attr("font-size", ".5em");    
        
        const group = svg.append("g")
            .selectAll("g")
            .data(chords.groups)
            .enter().append("g");

        group.append("path")
            .attr("fill", d => color(d.index))
            .attr("stroke", d => d3.rgb(color(d.index)).darker())
            .attr("d", arc);

        const groupTick = group.append("g")
            .selectAll("g")
            .data(d => groupTicks(d, 1e3))
            .enter().append("g")
            .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius},0)`);

        groupTick.append("line")
            .attr("stroke", "#000")
            .attr("x2", 6);

        groupTick.filter(d => d.value % 5e3 === 0)
            .append("text")
              .attr("x", 8)
              .attr("dy", ".35em")
              .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
              .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
              .text(d => formatValue(d.value));
        
          svg.append("g")
              .attr("fill-opacity", 0.67)
            .selectAll("path")
            .data(chords)
            .enter().append("path")
              .attr("d", ribbon)
              .attr("fill", d => color(d.target.index))
              .attr("stroke", d => d3.rgb(color(d.target.index)).darker());
    }

    render(){
        return <div id="chorddiagram"></div>
    }

}

export default ChordDiagram;
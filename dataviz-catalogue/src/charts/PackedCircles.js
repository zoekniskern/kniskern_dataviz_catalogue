import React, { Component } from 'react';
import * as d3 from "d3";

class PackedCircles extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawPackedCircles();
    }

    drawPackedCircles() {

        let dataset = this.props.data;
        let root = d3.hierarchy(dataset)
               .sum(d => d.value || 0);
    
        let color = d3.scaleOrdinal()
            .domain(d3.range(4))
            .range(["#00AEEF", "#F15A29", "#8DC63F", "#DA1C5C"]);

        const w = window.innerWidth - window.innerWidth*.5 - 100;
        const h = window.innerWidth - window.innerWidth*.65 - 100;

        // now create an svg element
        let svg = d3.select('#chart')
            .append('svg')
            .attr('width', w)   // setup width and height of svg to start
            .attr('height', h);

        let partition = d3.pack()
            .size([w,h])
            .padding(1);

        // The partition layout will analyze in-place and update our hierarchy data to
        // add x and y locations for the top-left and bottom-right points
        partition(root);
        console.log(root);

        svg.selectAll('circle')
            .data(root.descendants())
            .enter()
            .append('circle')
            .style('fill', d => color(d.depth))
            .attr('cx', d => d.x )
            .attr('cy', d => d.y )
            .attr('r', d => d.r );

        svg.selectAll('text')
            .data(root.descendants())
            .enter()
            .filter(d => d.depth == 2)
            .append('text')
            .classed('node-label', true)
            .style('font-size', '8pt')
            .style('text-anchor', 'middle')
            .attr('x', d => d.x )
            .attr('y', d => d.y + 4)
            .text(d => d.data.name);
            
    }

    render(){
        return <div id="packedcircles"></div>
    }

}

export default PackedCircles;
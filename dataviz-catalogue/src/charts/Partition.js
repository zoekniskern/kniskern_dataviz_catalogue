import React, { Component } from 'react';
import * as d3 from "d3";

class Partition extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawPartition();
    }

    drawPartition() {

        let dataset = {
            "name": "Root/Parent (has no parents)",
            "children": [
              { "name": "Child/Parent", 
                "children": [ 
                  { "name": "Child/Leaf" },
                  { "name": "Child/Leaf" }
              
              ]},
              { "name": "Child/Leaf" }
            ]
          };
        // for layouts that require numeric data variables, we *must* call .sum() or .count() 
        // to markup the hierarchy nodes with value properties (.value).
        // we can optionally use .sort().  

        let root = d3.hierarchy(dataset)
        .count();

        //console.log(root)

        const w = window.innerWidth - window.innerWidth*.5 - 100;
        const h = window.innerWidth - window.innerWidth*.65 - 100;

        // now create an svg element
        let svg = d3.select('#chart')
            .append('svg')
            .attr('width', w)   // setup width and height of svg to start
            .attr('height', h);

        let partition = d3.partition()
            .size([w,h])
            .padding(1)
            .round(true);


        // The partition layout will analyze in-place and update our hierarchy data to
        // add x and y locations for the top-left and bottom-right points
        partition(root);
        //console.log(root)


        svg.selectAll('rect')
        .data(root.descendants())
        .enter()
        .append('rect')
        .classed('partition-area', true)
        .attr('x', d => d.x0 )
        .attr('y', d => d.y0 )
        .attr('width', d => (d.x1 - d.x0) )
        .attr('height', d => (d.y1 - d.y0))
        .attr('fill', "#00AEEF");

        svg.selectAll('text')
        .data(root.descendants())
        .enter()
        .append('text')
        .classed('node-label', true)
        .style('font-weight', d => d.children ? 'bold' : 'normal')
        .attr('x', d => d.x0 + 10)
        .attr('y', d => d.y0 + 25)
        .text(d => d.data.name);
    }

    render(){
        return <div id="partition"></div>
    }

}

export default Partition;
import React, { Component } from 'react';
import * as d3 from "d3";

class Cluster extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawCluster();
    }

    drawCluster() {

        let dataset = {
            "name": "Root/Parent",
            "children": [
              { "name": "Child/Parent", 
                "children": [ 
                  { "name": "Child/Leaf"
                  }
              
              ]},
              { "name": "Child/Leaf" }
            ]
          };
        // for layouts that require numeric data variables, we *must* call .sum() or .count() 
        // to markup the hierarchy nodes with value properties (.value).
        // we can optionally use .sort().  

        let root = d3.hierarchy(dataset)

        //console.log(root)

        const w = window.innerWidth - window.innerWidth*.5 - 100;
        const h = window.innerWidth - window.innerWidth*.65 - 100;

        // now create an svg element
        let svg = d3.select('#chart')
            .append('svg')
            .attr('width', w)   // setup width and height of svg to start
            .attr('height', h);

        let treelayout = d3.cluster().size([w - 40,h - 50]);
        treelayout(root);

        // Our data now has a lot of information as well as utility functions for grabbing
        // analyzed data. We are going to use the list of links() to draw our lines, 
        // and the list of all descendants() to draw each item.

        svg.selectAll('lines')
        .data(root.links())
        .enter()
        .append('line')
        .classed('link', true)
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y + 20)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y + 20);

        svg.selectAll('circle')
        .data(root.descendants())
        .enter()
        .append('circle')
        .classed('node', true)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y + 20)
        .attr('r', 10);

        svg.selectAll('text')
        .data(root.descendants())
        .enter()
        .append('text')
        .classed('node-label', true)
        .classed('', true)
        .attr('x', d => d.x + 15)
        .attr('y', d => d.y + 25)
        .text(d => d.data.name);
        
    }

    render(){
        return <div id="cluster"></div>
    }

}

export default Cluster;
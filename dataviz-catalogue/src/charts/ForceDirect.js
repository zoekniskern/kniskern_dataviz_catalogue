import React, { Component } from 'react';
import * as d3 from "d3";

class ForceDirect extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawForceDirect();
    }


    

    drawForceDirect() {

        // EVENT HANDLING FUNCTIONS
        // (these come straight from "Interactive Data Visualization for the Web", Ch 13, "Draggable Nodes")
        function onDragStart(d) {
            if(!d3.event.active) {
            force.alphaTarget(0.3).restart();
            }
            // use fx and fy as fixed x and y values; when set, overrides computed x/y
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function onDrag(d) {
            // set fx and fy to event x/y 
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        
        function onDragEnd(d) {
            if(!d3.event.active) {
            force.alphaTarget(1).restart();
            }
            // clear fx and fy so that computed x/y is used once again
            d.fx = null;
            d.fy = null;
        }

        let dataset = {
            nodes: [
              {name: 'Lara Jean'},   // 0
              {name: 'Peter'},      // 1
              {name: 'Margot'},           // 2
              {name: 'Kitty'},            // 3
              {name: 'Christine'},           // 4
              {name: 'Gen'},         // 5
              {name: 'Josh'},    // 6
              {name: 'Emily'},    // 7
              {name: 'Greg'}    // 8
            ], 
            edges: [
              { source: 0, target: 1},
              { source: 0, target: 2},
              { source: 0, target: 3},
              { source: 0, target: 4},
              { source: 0, target: 5},
              { source: 0, target: 6},
              { source: 1, target: 5},
              { source: 2, target: 3},
              { source: 2, target: 6},
              { source: 3, target: 6},
              { source: 4, target: 5},
              { source: 5, target: 7},
              { source: 1, target: 8},
            ] 
          } 

        const w = window.innerWidth - window.innerWidth*.5 - window.innerWidth*.25;
        const h = w;
            
        // now create an svg element
        let svg = d3.select('#chart')
                    .append('svg')
                    .attr('width', w)   // setup width and height of svg to start
                    .attr('height', h)
                    .attr("font-size", ".5em");
                        
        // create D3 force layout that converts 
        // dataset into a simulation for force-directed graphs 
        // The simulation will have it's own derived dataset internally.
        let linkTargetLength = 100;
        let force = d3.forceSimulation(dataset.nodes)
                        .force('charge', d3.forceManyBody())
                        .force('link', d3.forceLink(dataset.edges)
                                        .distance(linkTargetLength))
                        .force('center', d3.forceCenter()
                                        .x(w/2)
                                        .y(h/2));

        // CREATE THE VISUAL
        // We first create the base items for the edges (the connection lines)
        // and nodes (circles) and configure for static properties. 

        let edges = svg.selectAll('line')
                        .data(dataset.edges)
                        .enter()
                        .append('line')
                        .classed('edge', true);

        let nodes = svg.selectAll('circle')
                        .data(dataset.nodes)
                        .enter()
                        .append('circle')
                        .attr('r', 15)
                        .style('fill', (d,i) => (i < 2) ? '#DA1C5C' : '#F15A29')
                        .call(d3.drag()
                                .on('start', onDragStart)
                                .on('drag', onDrag)
                                .on('end', onDragEnd));
                        
        // append title elements for all nodes, giving us tooltips
        nodes.append('title')
            .classed('forcelabel', true)
            .text(function(d) { return d.name; });

        // Next we deal with dynamic properties using the forceSimulation. 
        // We do this by setting what happens when the forceSimulation 'ticks'
        // when running. 

        force.on('tick', () => {
            // update edge line's starting and ending x/y using the 
            // joined data that D3 derived from our dataset
            edges
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

            // update node center x/y's using the 
            // joined data that D3 derived from our dataset
            nodes 
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

        })

    }

    render(){
        return <div id="forcedirect"></div>
    }

}

export default ForceDirect;
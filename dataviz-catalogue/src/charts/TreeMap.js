import React, { Component } from 'react';
import * as d3 from "d3";

class TreeMap extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawTreeMap();
    }

    drawTreeMap() {

        let dataset = {
            "t": "0",
            "children": [
              {
                "t": "00",
                "value": 2
              },
              {
                "t": "01",
                "children": [
                  {
                    "t": "010",
                    "value": 1
                  },
                  {
                    "t": "011",
                    "value": 1
                  },
                  {
                    "t": "012",
                    "value": 1
                  },
                  {
                    "t": "013",
                    "value": 1
                  }
                ]
              },
              {
                "t": "02",
                "children": [
                  {
                    "t": "020",
                    "value": 2
                  },
                  {
                    "t": "021",
                    "value": 1
                  },
                  {
                    "t": "022",
                    "value": 1
                  },
                  {
                    "t": "023",
                    "value": 1
                  },
                  {
                    "t": "024",
                    "value": 1
                  },
                  {
                    "t": "025",
                    "value": 2
                  }
                ]
              },
              {
                "t": "03",
                "children": [
                  {
                    "t": "030",
                    "value": 2
                  },
                  {
                    "t": "031",
                    "value": 2
                  },
                  {
                    "t": "032",
                    "value": 2
                  },
                  {
                    "t": "033",
                    "value": 2
                  }
                ]
              },
              {
                "t": "04",
                "value": 5
              }
            ]
          }
        // for layouts that require numeric data variables, we *must* call .sum() or .count() 
        // to markup the hierarchy nodes with value properties (.value).
        // we can optionally use .sort().  

        let root = d3.hierarchy(dataset).sum(d => d.size)
        //console.log(root)

        const w = window.innerWidth - window.innerWidth*.5 - 100;
        const h = window.innerWidth - window.innerWidth*.65 - 100;

        // now create an svg element
        let svg = d3.select('#chart')
            .append('svg')
            .attr('width', w)   // setup width and height of svg to start
            .attr('height', h);

        var treeMap = d3.treemap().size([w - 20, h - 40]);
        treeMap(root);

        let margin = 20;

        //var nodes = treeMap.nodes(root);
        svg.selectAll('.node')
            .data(root.links())
            .enter()
           .append('div')
           .style('position', 'absolute')
           .style('left', function(d){return d.x + margin * d.depth})
           .style('top', function(d){return d.y + margin * d.depth})
           .style('width', function(d) { return d.dx - 2 * margin * d.depth } )
           .style('height', function(d) { return d.dy - 2 * margin * d.depth } )
           .style('background-color', "#DA1C5C")
           .style('border', '1px solid black')
           .text(function(d) { return d.t; });
    }

    render(){
        return <div id="treemap"></div>
    }

}

export default TreeMap;
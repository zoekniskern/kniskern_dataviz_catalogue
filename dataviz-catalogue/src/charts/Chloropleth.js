import React, { Component } from 'react';
import * as d3 from "d3";

class Cloropleth extends Component {

    //display chart after BarChart has been mounted to the DOM
    componentDidMount() {
        this.drawCloropleth();
    }

    drawCloropleth() {

        d3.json(this.props.data).then((dataset) => {
            let randMin = 10, randMax = 10000;
            function rand(min, max) {
                return Math.round(min + Math.random() * (max - min));
            }
          
            //console.log(json);
          
            // Make a second array with the state names and with rand data
            // We're using this as mock data. In a real scenario, you would 
            // probably load this data from elsewhere (e.g., CSV)
            let states = dataset.features.map(d => { 
              return {
                state: d.properties.name, 
                value: rand(randMin, randMax)
              }
            });
          
            let stateValues = new Map(states.map(d => [d.state, d.value]));
            //console.log(stateValues);
            
            const w = window.innerWidth - window.innerWidth*.5 - 100;
            const h = window.innerWidth - window.innerWidth*.65 - 100;

            // now create an svg element
            let svg = d3.select('#chart')
            .append('svg')
            .attr('width', w)   // setup width and height of svg to start
            .attr('height', h);

            let projection = d3.geoAlbersUsa()
								   .translate([w/2, h/2]) ;

            // 3. Define a path generator using the projection
            let path = d3.geoPath()
                        .projection(projection);
                                        
            // 4. Create a color scale to use for the fill
            let color = d3.scaleQuantize()
                        .range(["#00AEEF", "#F15A29", "#8DC63F", "#DA1C5C"]);

            //Set input domain for color scale
            let sValues = Array.from(stateValues.values()); // grab values from Map object and put into an array
            color.domain(d3.extent(sValues));

            // 5. Draw the map using SVG path elements, styling with fill values
            // from our color scale

            //Bind data and create one path per GeoJSON feature
            svg.selectAll("path")
                .data(dataset.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", d => {
                    //Get data value
                    let value = stateValues.get(d.properties.name);
                    
                    if (value) {
                    //If value exists…
                    return color(value);
                    } else {
                    //If value is undefined…
                    return "#ccc";
                    }
                });
        })
    }

    render(){
        return <div id="cloropleth"></div>
    }

}

export default Cloropleth;
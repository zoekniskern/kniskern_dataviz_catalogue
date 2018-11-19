import React, { Component } from 'react';
import './App.css';

class About extends Component {  
  
    render() {
      return (
        <div>
            <div className="">
              <div className="about">
                <div className="flexRow column">
                  <h3 className="title chartTitle">The D.V.C. (Data Visualization Catalogue):</h3>
                  <p className="subtitle">because there are <i>a lot</i> of ways to reach your audience</p>
                </div>
                <div className="flexRow">
                  <div>
                    <h5 className="title chartTitle">Why Data Viz?</h5>
                      <p className="subtitle why">In an increasingly digitally connected world, data is consumed at a frenetic rate. The ability to convey a large amount of data, and how that data relates to itself or other datasets is invaluable. The time of Microsoft Office charts is ending and an era of professionally crafted data visualization is beginning.</p>
                  </div>
                  <div>
                    <h5 className="title chartTitle">Why Catalogues?</h5>
                      <p className="subtitle why">There are a much larger amount of charts than most people are aware of. Some of the lesser known charts, even some that can be very effective in conveying huge datasets and their relationships, are often unused in favor of more wellknown chart formats. This catalogue seeks to serve both visualizers and consumers of data, so that a common ground can be reached between the two rather than a gap of data elitism.</p>
                  </div>
                  <div>
                    <h5 className="title chartTitle">What's d3?</h5>
                      <p className="subtitle">D3 is a Javascript library aimed to make it easier to create digital and interactive data visualizations. Leveraging HTML, SVG and CSS, this library can handle large datasets and complicated visuals effectively.</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      );
    }
  }
  
  export default About;
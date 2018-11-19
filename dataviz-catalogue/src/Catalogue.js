import React, { Component } from 'react';
import './App.css';
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import Chartview from "./Chartview";
import allcharts from "./allcharts.json";

class Catalogue extends Component {  
  
    render() {

      return (
        <HashRouter>
        <div className="flexRow">
            <div className="nav">
                <ul>
                    {
                    allcharts.map(function(chart){
                        let path = "/catalogue/" + chart.charttype.replace(/\s+/g, '');
                        //console.log("path to: " + path);
                        return <NavLink key={chart.id} to={path}><li className="navItem">{chart.id} - {chart.charttype}</li></NavLink>;
                    })
                    }
                </ul>
            </div>
            <div className="chartinfo">
                {
                allcharts.map(function(chart){
                    let path = "/catalogue/" + chart.charttype.replace(/\s+/g, '');
                    //console.log(chart);
                    //console.log(path);
                    //return <Route key={chart.id} path={path} component={Chartview}/>
                    return <Route key={chart.id} path={path} render={({props}) => <Chartview chart={chart} {...props} isAuthed={true} />}
/>;
                })
                }
            </div>
        </div>
        </HashRouter>
      );
    }
  }
  
  export default Catalogue;
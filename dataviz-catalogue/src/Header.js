import React, { Component } from 'react';
import './App.css';
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import About from "./About";
  import Catalogue from "./Catalogue";

class Header extends Component {  
  
    render() {
      return (
        <HashRouter>
            <div>
                <div className="flexRow header">
                    <NavLink to="/"><img id="logo" src="/assets/logo.png" alt="data viz catalogue logo"></img></NavLink>
                    {/* <h3>Data Visualization Catalogue</h3> */}
                    <ul>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/catalogue">Catalogue</NavLink></li>
                    </ul>
                </div>
            <div className="content">
                <Route exact path="/" component={About}/>
                <Route path="/about" component={About}/>
                <Route path="/catalogue" component={Catalogue}/>
            </div>
            </div>
        </HashRouter>
      );
    }
  }
  
  export default Header;
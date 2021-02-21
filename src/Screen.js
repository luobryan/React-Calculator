import logo from './logo.svg';
import React, { Component } from 'react'; 
import './App.css';


class Screen extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){ 
      return (
      <div className="screen">
        Expression: {this.props.expression}
        <br/>
        Result: {this.props.result} 
      </div>
    );
  }
}

export default Screen;

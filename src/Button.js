import logo from './logo.svg';
import React, { Component } from 'react'; 
import './App.css';


class Button extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      val:props.val
    }
  }
  render(){ 
      return (
      <div className="button" onClick={()=>{this.props.updateExpression(this.state.val)}}>
        {this.state.val}
      </div>
    );
  }
}

export default Button;

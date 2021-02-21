import logo from './logo.svg';
import React, { Component } from 'react'; 
import './App.css';
import Button from './Button.js'; 
import Screen from './Screen.js';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expression:'',
      result:''
    };
    this.updateExpression = this.updateExpression.bind(this); //bc accesses the state 
  }

  isDigit(c){
    return c=='0'||c=='1'||c=='2'||c=='3'||c=='4'||c=='5'||c=='6'||c=='7'||c=='8'||c=='9'||c=='.';
  }
  apply(v1,v2,op){
    if(op=='+'){
        return parseFloat(v1)+parseFloat(v2)
    }
    if(op=='-'){
        return parseFloat(v1)-parseFloat(v2)
    }
    if(op=='*'){
        return parseFloat(v1)*parseFloat(v2)
    }
    if(op=='/'){
        return parseFloat(v1)/parseFloat(v2)
    }
    if(op=='^'){
        return parseFloat(v1)**parseFloat(v2)
    }

  }
  greater_or_equal_pre(c,d){
    //returns true if c is greater or equal precedence than d
    var c_val = -1;
    var d_val = -1; 

    if(c == '^'){
      c_val = 3; 
    }
    if (c=='*' || c=='/'){
      c_val = 2; 
    }
    if (c=='+'||c=='-'){
      c_val = 1; 
    }


    if(d == '^'){
      d_val = 3; 
    }
    if (d=='*' || d=='/'){
      d_val = 2; 
    }
    if (d=='+'||d=='-'){
      d_val = 1; 
    }
    return c_val >= d_val;
  }
  infix_to_posfix(infix){

    let stack = []
    let postfix = ''
    for(var i = 0; i < infix.length; i++){
       if(this.isDigit(infix.charAt(i))||(infix.charAt(i)=='-'&&(i==0||!this.isDigit(infix.charAt(i-1))))){
         let temp = i; 
         
         do{
           temp++; 
         }while(temp<infix.length && (this.isDigit(infix.charAt(temp))||infix.charAt(temp)=='.'))
        //use a do while loop in case this.isDigit is a negative symbol, we at least want
        //to iterate temp by 1
         postfix += infix.substring(i,temp)+' ';
         i = temp;
         i = i - 1;
       }
       else if(infix.charAt(i)=='('){
          stack.push('(');
       }
       else if(infix.charAt(i)==')'){
          let op = stack.pop();
          while (op!='('){
            postfix+=op+' ';
            op = stack.pop(); 
          }
       }
       else if(stack.length==0){
         stack.push(infix.charAt(i));
       }
       else{
          let curr_op = infix.charAt(i); 
          while (stack.length!=0){
              let op = stack.pop();
              if(op!='('&&this.greater_or_equal_pre(op,curr_op)){

                postfix+=op+' ';
              }
              else{
                stack.push(op); //it might be '(' so put it back on, so when we hit the corresponding ')', it can be detected as a stopping point
                //it might also be a lower precedence operator, which needs to be addressed later
                //5+5*2
                //5 5 2 * +
                // + *
                break;
              }
          }
          stack.push(curr_op); 
       }
    }
    while (stack.length!=0){
        postfix+=stack.pop()+' '; 
    }
    
    return postfix;
  }

  evaluateExpression(){
    let posfix =  this.infix_to_posfix(this.state.expression);
    let stack = []
    for(var i = 0; i < posfix.length; i++){
      if(this.isDigit(posfix.charAt(i))||(posfix.charAt(i)=='-'&&(i==0||!this.isDigit(posfix.charAt(i-1))))){
        let temp = i; 
       
        do{
          temp++; 
        } while(temp<posfix.length && (this.isDigit(posfix.charAt(temp))||posfix.charAt(temp)=='.'))
        //use a do while loop in case this.isDigit is a negative symbol, we at least want
        //to iterate temp by 1

        stack.push(posfix.substring(i,temp));
        i = temp; 
        i = i - 1; 
      }
      else if(posfix.charAt(i)!=' '&&posfix.charAt(i)!='!'&&posfix.charAt(i)!='q'){
        let v2 = stack.pop();
        let v1 = stack.pop();
        let val = this.apply(v1,v2,posfix.charAt(i)); 
        stack.push(val); 
      }
      else if(posfix.charAt(i)!=' '&&(posfix.charAt(i)=='!'||posfix.charAt(i)=='q')){
        let v2 = stack.pop();
        let val = this.apply(-1,v2,posfix.charAt(i)); 
        stack.push(val); 
      }
    }
    return stack.pop();
  }
  updateExpression(append){
    if(append=='GO'){
      let evaluated_exp = this.evaluateExpression(); 
      this.setState({
        expression: '',
        result: evaluated_exp
      });
    }
    else if(append=='clear'){
      this.setState({
        expression: '',
        result: ''
      });
    }
    else{
      this.setState({
        expression: this.state.expression+append
      });
    }
  }
  render(){ 
      return (
      <div className="calculator">
          <table className="non_numerals">
          <tr>
            <th><Button val="(" updateExpression={this.updateExpression}/></th>
            <th><Button val=")" updateExpression={this.updateExpression}/></th>
            <th><Button val="clear" updateExpression={this.updateExpression}/></th>
          </tr>
          <tr>
            <th><Button val="+" updateExpression={this.updateExpression}/></th>
            <th><Button val="-" updateExpression={this.updateExpression}/></th>
            <th><Button val="*" updateExpression={this.updateExpression}/></th>

          </tr>
          <tr>
            <th><Button val="/" updateExpression={this.updateExpression}/></th>
            <th><Button val="." updateExpression={this.updateExpression}/></th>
            <th><Button val="^" updateExpression={this.updateExpression}/></th>
            <th><Button val="GO" updateExpression={this.updateExpression}/></th>

          </tr>
        </table>
          <table className="numerals">
          <tr>
            <th><Button val="1" updateExpression={this.updateExpression}/></th>
            <th><Button val="2" updateExpression={this.updateExpression}/></th>
            <th><Button val="3" updateExpression={this.updateExpression}/></th>
          </tr>
          <tr>
            <th><Button val="4" updateExpression={this.updateExpression}/></th>
            <th><Button val="5" updateExpression={this.updateExpression}/></th>
            <th><Button val="6" updateExpression={this.updateExpression}/></th>
          </tr>
          <tr>
            <th><Button val="7" updateExpression={this.updateExpression}/></th>
            <th><Button val="8" updateExpression={this.updateExpression}/></th>
            <th><Button val="9" updateExpression={this.updateExpression}/></th>
          </tr>
          <tr>
            <th></th>
            <th><Button val="0" updateExpression={this.updateExpression}/></th>
            <th></th>
          </tr>
        </table>

        <br/>
        <Screen expression={this.state.expression} result={this.state.result}/>

      </div>
    );
  }
}

export default App;

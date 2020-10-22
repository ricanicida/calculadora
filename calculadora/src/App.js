import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function Display(props) {
  return (
    <div className="display">
      {props.value}
    </div>
  );
}

function Button1(props) {
  return (
    <button className="numero" onClick={props.aoClicar}>{props.text}</button>
  );
}

function Button2(props) {
  return (
    <button className="sinal" onClick={props.aoClicar}>{props.text}</button>
  );
}

function Button3(props) {
  return (
    <button className="igual" onClick={props.aoClicar}>{props.text}</button>
  );
}

function Button4(props) {
  return (
    <button className="AC" onClick={props.aoClicar}>{props.text}</button>
  );
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;
  if(isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
  }
  if(decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousOperand: "",
      currentOperand: "",
      lista: [1, 2, 3, 4]
    };
    this.addNumber = this.addNumber.bind(this);
    console.log(
      getDisplayNumber('1231213')
    );
  }

  addNumber(number) {
    if (number === "."){ 
      if (this.state.currentOperand === ''){ 
        this.setState(state => ({
        currentOperand : '0.'
      }));
    } else if(this.state.currentOperand.includes('.')){ 
    } else{ 
      this.setState(state => ({
        currentOperand : this.state.currentOperand + number
      }));
    }} else{
      this.setState(state => {
        return {        
          currentOperand: state.currentOperand + number,
        };
      });}
  }

  deleteNumber() {
    this.setState(state => {
      return {        
        currentOperand: "",
      };
    });
  }

  sinal(sinal) {
    if(this.state.currentOperand === ""){ 
    } else{
    this.setState(state => {
      return {        
        previousOperand: state.currentOperand + sinal,
        currentOperand: "",
      };
    });}
  }

  operation() {
    const current = this.state.currentOperand;
    this.setState(state => {
      return {        
        currentOperand: eval(this.state.previousOperand + this.state.currentOperand),
        previousOperand: this.state.previousOperand + current,
      };
    });
  }

  


  render() {
    return (
      <div className="App">
        <div className="container">
          <Display value={this.state.previousOperand} />
          <Display value={this.state.currentOperand} />
          <div className="linha1">
            <Button1 text="7" aoClicar={() => this.addNumber("7")} />
            <Button1 text="8" aoClicar={() => this.addNumber("8")} />
            <Button1 text="9" aoClicar={() => this.addNumber("9")} />
            <Button2 text="+" aoClicar={() => this.sinal("+")} />
          </div>
          <div className="linha2">
            <Button1 text="4" aoClicar={() => this.addNumber("4")} />
            <Button1 text="5" aoClicar={() => this.addNumber("5")} />
            <Button1 text="6" aoClicar={() => this.addNumber("6")} />
            <Button2 text="-" aoClicar={() => this.sinal("-")} />
          </div>
          <div className="linha3">
            <Button1 text="1" aoClicar={() => this.addNumber("1")} />
            <Button1 text="2" aoClicar={() => this.addNumber("2")} />
            <Button1 text="3" aoClicar={() => this.addNumber("3")} />
            <Button2 text="x" aoClicar={() => this.sinal("*")} />
          </div>
          <div className="linha4">
            <Button1 text="0" aoClicar={() => this.addNumber("0")} />
            <Button1 text="." aoClicar={() => this.addNumber(".")} />
            <Button4 text="AC" aoClicar={() => this.deleteNumber()} />
            <Button2 text="÷" aoClicar={() => this.sinal("/")} />
          </div>
          <div className="linha5">
            <Button3 text="=" aoClicar={() => this.operation()} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

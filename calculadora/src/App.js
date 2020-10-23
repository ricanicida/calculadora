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

function Memoria(props) {
  return (
    <div className="display_memoria">
      {props.value}
    </div>
  );
}

function Button0(props) {
  return (
    <button className="botao_memoria" onClick={props.aoClicar}>{props.text}</button>
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
      memory1: "",
      memory2: "",
      memory3: "",
      memory4: "",
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
      this.setState(state => ({
          currentOperand: this.state.currentOperand + number,
      }));}
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

  memoria(botao) {
    if (botao === "MC"){ 
      this.setState(state => ({
        memory1: "",
        memory2: "",
        memory3: "",
        memory4: "",
      }));
    } else if (botao === "MR"){
        if (this.state.memory1 != ""){
          this.setState(state => ({
          currentOperand: this.state.memory1,
          }));
        }
    } else if (botao === "M+"){
      if (this.state.memory1 != ""){
        this.setState(state => ({
          currentOperand: eval(this.state.currentOperand + "+" + this.state.memory1),
        }));
      } else {
        this.setState(state => ({
          memory1: this.state.currentOperand,
        }));
      }
    } else if (botao === "MS"){
      this.setState(state => ({
        memory4: this.state.memory3,
        memory3: this.state.memory2,
        memory2: this.state.memory1,
        memory1: this.state.currentOperand,
      }));
    } else if (botao === "MC1"){
      this.setState(state => ({
        memory1: "",
        memory1: this.state.memory2,
        memory2: this.state.memory3,
        memory3: this.state.memory4,
        memory4: "",
      }));
    } else if (botao === "MR1" && this.state.memory1 != ""){
      this.setState(state => ({
        currentOperand: this.state.memory1,
      }));
    } else if (botao === "MC2"){
      this.setState(state => ({
        memory2: "",
        memory2: this.state.memory3,
        memory3: this.state.memory4,
        memory4: "",
      }));
    } else if (botao === "MR2" && this.state.memory2 != ""){
      this.setState(state => ({
        currentOperand: this.state.memory2,
      }));
    } else if (botao === "MC3"){
      this.setState(state => ({
        memory3: "",
        memory3: this.state.memory4,
        memory4: "",
      }));
    } else if (botao === "MR3" && this.state.memory3 != ""){
      this.setState(state => ({
        currentOperand: this.state.memory3,
      }));
    } else if (botao === "MC4"){
      this.setState(state => ({
        memory4: "",
      }));
    } else if (botao === "MR4" && this.state.memory4 != ""){
      this.setState(state => ({
        currentOperand: this.state.memory4,
      }));
    }
  }


  render() {
    return (
      <div className="App">
        <div className="container">
          <Display value={this.state.previousOperand} />
          <Display value={this.state.currentOperand} />
          <div className="linha0">
            <Button0 text="MC" aoClicar={() => this.memoria("MC")} />
            <Button0 text="MR" aoClicar={() => this.memoria("MR")} />
            <Button0 text="M+" aoClicar={() => this.memoria("M+")} />
            <Button0 text="MS" aoClicar={() => this.memoria("MS")} />
          </div>
          <div className="linha1">
            <Button1 text="7" aoClicar={() => this.addNumber("7")} />
            <Button1 text="8" aoClicar={() => this.addNumber("8")} />
            <Button1 text="9" aoClicar={() => this.addNumber("9")} />
            <Button2 text="+" aoClicar={() => this.sinal("+")} />
          </div>
          <div className="linha1">
            <Button1 text="4" aoClicar={() => this.addNumber("4")} />
            <Button1 text="5" aoClicar={() => this.addNumber("5")} />
            <Button1 text="6" aoClicar={() => this.addNumber("6")} />
            <Button2 text="-" aoClicar={() => this.sinal("-")} />
          </div>
          <div className="linha1">
            <Button1 text="1" aoClicar={() => this.addNumber("1")} />
            <Button1 text="2" aoClicar={() => this.addNumber("2")} />
            <Button1 text="3" aoClicar={() => this.addNumber("3")} />
            <Button2 text="x" aoClicar={() => this.sinal("*")} />
          </div>
          <div className="linha1">
            <Button1 text="0" aoClicar={() => this.addNumber("0")} />
            <Button1 text="." aoClicar={() => this.addNumber(".")} />
            <Button4 text="AC" aoClicar={() => this.deleteNumber()} />
            <Button2 text="÷" aoClicar={() => this.sinal("/")} />
          </div>
          <div className="linha1">
            <Button3 text="=" aoClicar={() => this.operation()} />
          </div>
          <div className="linha2">
            <Memoria value={this.state.memory1} />
            <Button0 text="MC" aoClicar={() => this.memoria("MC1")} />
            <Button0 text="MR" aoClicar={() => this.memoria("MR1")} />
          </div>
          <div className="linha2">
            <Memoria value={this.state.memory2} />
            <Button0 text="MC" aoClicar={() => this.memoria("MC2")} />
            <Button0 text="MR" aoClicar={() => this.memoria("MR2")} />
          </div>
          <div className="linha2">
            <Memoria value={this.state.memory3} />
            <Button0 text="MC" aoClicar={() => this.memoria("MC3")} />
            <Button0 text="MR" aoClicar={() => this.memoria("MR3")} />
          </div>
          <div className="linha2">
            <Memoria value={this.state.memory4} />
            <Button0 text="MC" aoClicar={() => this.memoria("MC4")} />
            <Button0 text="MR" aoClicar={() => this.memoria("MR4")} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

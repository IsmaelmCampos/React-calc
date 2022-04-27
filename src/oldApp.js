import logo from "./logo.svg";
import React, { useState, Component, useEffect } from "react";
import "./App.css";
import { CalculatorInput, CalculatorWrapper } from "./App.styled";
import { keyframes } from "styled-components";

function App() {
  const [display, setDisplay] = useState("");
  const [valueArr, setValueArr] = useState([]);
  const [isResult, setIsResult] = useState();
  const numberKeys = {
    105: "9",
    104: "8",
    103: "7",
    102: "6",
    101: "5",
    100: "4",
    99: "3",
    98: "2",
    97: "1",
    96: "0",
    111: "/",
    106: "*",
    109: "-",
    107: "+",
  };

  const possibleKeys = [
    105, 104, 103, 102, 101, 100, 99, 98, 97, 96, 45, 111, 106, 109, 107,
  ];
  // let keyPress;

  const handleKeyDown = (event) => {
    possibleKeys.includes(event.keyCode)
      ? updateNumber(Object.values(numberKeys[event.keyCode]).join(""))
      : event.keyCode === 13
      ? result()
      : console.log("wrong key");
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const updateNumber = (e) => {
    const ops = ["+", "-", "/", "*"];
    const currentValue = e.target?.getAttribute("data-value") || e;

    //TODO:
    //1. si pulsas más de una vez una operacion, solo muestra un caracter
    //2. mostrar el display tras empezar una operacion nueva tras darle a AC por ejemplo
    //3. input teclas
    //math.eval(values)

    isResult
      ? ops.includes(currentValue)
        ? valueArr.push(currentValue)
        : setValueArr([currentValue])
      : valueArr.push(currentValue);
    updateDisplay();
    setIsResult();
    console.log(valueArr, "valuearr");
  };

  const updateDisplay = () => {
    setDisplay(valueArr.join(""));
  };

  const calculator = (fn) => {
    return new Function("return " + fn)();
  };

  const result = () => {
    const values = calculator(valueArr.join(""));

    setDisplay(calculator(valueArr.join("")));
    console.log(values, "result");
    //quiero que: si existe un 'value', lo introduzca en el nuevo array vacio, para seguir multiplicando con el resultado anterior
    values ? setValueArr([values]) : console.log("no funca");

    setIsResult(values);

    console.log(display, "display");
  };

  const renderButton = (calculatorLines, calculatorKey, i) => (
    <button data-value={calculatorKey} onClick={updateNumber}>
      {calculatorKey}
    </button>
  );

  const ac = () => {
    // setValue("");
    setValueArr([]);
    setDisplay("");
  };

  const firstLine = ["7", "8", "9", "*"];
  const secondLine = ["4", "5", "6", "/"];
  const thirdLine = ["1", "2", "3", "-"];
  const fourthLine = ["0", ".", "", "+"];
  const fifthLine = ["", "", "", "="];
  const calculatorKeys = [
    firstLine,
    secondLine,
    thirdLine,
    fourthLine,
    fifthLine,
  ];

  return (
    <>
      <button onClick={ac}> AC </button>
      <CalculatorInput value={display} />
      <CalculatorWrapper>
        {calculatorKeys.map((calculatorLines, i) =>
          calculatorKeys.length - 1 === i ? (
            <button onClick={result} data-value={calculatorLines[3]}>
              =
            </button>
          ) : (
            calculatorLines.map((calculatorKey, i) =>
              calculatorKey ? (
                renderButton(calculatorLines, calculatorKey, i)
              ) : (
                <div />
              )
            )
          )
        )}
      </CalculatorWrapper>
    </>
  );
}

export default App;

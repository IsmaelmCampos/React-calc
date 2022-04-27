import logo from "./logo.svg";
import React, { useState, Component, useEffect } from "react";
import "./App.css";
import { CalculatorInput, CalculatorWrapper } from "./App.styled";
import { keyframes } from "styled-components";

function App() {
  const [values, setValues] = useState(0);

  let pressedButton = "";

  const renderButton = (calculatorLines, calculatorKey, i) => (
    <button data-value={calculatorKey} onClick={handleOnclick}>
      {calculatorKey}
    </button>
  );
  const firstLine = ["7", "8", "9", "*"];
  const secondLine = ["4", "5", "6", "/"];
  const thirdLine = ["1", "2", "3", "+"];
  const fourthLine = ["0", ".", "=", "-"];
  const fifthLine = ["", "", "", "", ""];
  const calculatorKeys = [
    firstLine,
    secondLine,
    thirdLine,
    fourthLine,
    fifthLine,
  ];

  const ac = () => {
    setValues(0);
  };

  const remove = () => {
    const arrayValue = Array.from(values);
    arrayValue.pop();

    setValues(arrayValue.join(""));
  };

  const handleOnclick = (e) => {
    const ops = ["+", "*", "/", ".", "="];

    pressedButton = e.target?.getAttribute("data-value") || e;
    console.log(typeof pressedButton);

    ops.includes(values[values.length - 1]) && pressedButton === "."
      ? console.log("nope")
      : values === 0 && pressedButton === "-"
      ? setValues("-")
      : values === "--" &&
        values[values.length - 1] === "-" &&
        pressedButton === "-"
      ? console.log("cant stack")
      : values.length > 2 &&
        values[values.length - 1] === "-" &&
        pressedButton === "-"
      ? console.log("cant stack")
      : values[values.length - 1] === "-" &&
        ops.includes(values[values.length - 2]) &&
        ops.includes(pressedButton)
      ? setValues(values.slice(0, -2) + pressedButton)
      : values === 0 && pressedButton === "."
      ? setValues("0.")
      : pressedButton === "." && values.match(/[\d.]+$/)[0].includes(".")
      ? console.log("you cant add more dots")
      : values[values.length - 1] === "-" && pressedButton === "+"
      ? setValues(values.slice(0, -1) + pressedButton)
      : values[values.length - 1] === "-" && ops.includes(pressedButton)
      ? console.log("cant stack operators")
      : values === 0 && pressedButton === "."
      ? setValues(values.toString() + ".")
      : values === 0 && pressedButton === "0"
      ? console.log("cant stack zeros")
      : values === 0
      ? ops.includes(pressedButton)
        ? setValues(0)
        : setValues(pressedButton)
      : values === 0 && ops.includes(pressedButton)
      ? setValues("")
      : ops.includes(values[values.length - 1]) && ops.includes(pressedButton)
      ? setValues(values.slice(0, -1) + pressedButton)
      : setValues((values) =>
          pressedButton === "=" &&
          ops.includes(values[values.length - 1]) === false
            ? eval(values)
            : values + pressedButton.toString()
        );
  };

  return (
    <>
      <div className="test">
        <div className="clean-and-remove">
          <button className="ac" onClick={ac}>
            AC
          </button>
          <CalculatorInput value={values} />
          <button className="remove" onClick={remove}>
            🔙
          </button>
        </div>
        <CalculatorWrapper>
          {calculatorKeys.map((calculatorLines, i) =>
            calculatorLines.map((calculatorKey, i) =>
              calculatorKey ? (
                renderButton(calculatorLines, calculatorKey, i)
              ) : (
                <div />
              )
            )
          )}
        </CalculatorWrapper>
      </div>
    </>
  );
}

export default App;

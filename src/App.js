import logo from "./logo.svg";
import React, { useState, Component, useEffect } from "react";
import "./App.css";
import { CalculatorInput, CalculatorWrapper } from "./App.styled";
import { keyframes } from "styled-components";

function App() {
  const [values, setValues] = useState("");

  let pressedButton = "";

  const renderButton = (calculatorKey) => (
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
    setValues("");
  };

  const remove = () => {
    const arrayValue = Array.from(values);
    arrayValue.pop();

    setValues(arrayValue.join(""));
  };

  const handleOnclick = (e) => {
    const ops = ["+", "-", "*", "/", ".", "="];

    pressedButton = e.target?.getAttribute("data-value") || e;
    console.log(typeof pressedButton);
    values === "" && ops.includes(pressedButton)
      ? console.log("cannot start with op.")
      : ops.includes(values[values.length - 1]) && ops.includes(pressedButton)
      ? console.log("error, two operators")
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

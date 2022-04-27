import React, { useState, Component, useEffect } from "react";
import "./App.css";
import { CalculatorInput, CalculatorWrapper } from "./App.styled";

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
    const valstr = values.toString();
    const arrayValue = Array.from(valstr);
    arrayValue.pop();

    setValues(arrayValue.join(""));
  };

  const handleOnclick = (e) => {
    const ops = ["+", "-", "*", "/", ".", "="];
    const decimal = [".", ","];
    pressedButton = e.target?.getAttribute("data-value");
    console.log(e.target.id);

    console.log(typeof pressedButton);

    pressedButton === "."
      ? values.toString().match(/[\d.]+$/)
      : console.log("no way you can add more dots");

    ops.includes(values[values.length - 1]) && pressedButton === "."
      ? console.log("nope")
      : values === 0 && pressedButton === "."
      ? setValues("0.")
      : ops.includes(values[values.length - 1]) && ops.includes(pressedButton)
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

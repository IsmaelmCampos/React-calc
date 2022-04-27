import logo from "./logo.svg";
import React, { useState, Component, useEffect } from "react";
import "./App.css";
import { CalculatorInput, CalculatorWrapper } from "./App.styled";
import { keyframes } from "styled-components";

function App() {
  const [values, setValues] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [results, setResults] = useState([""]);
  let prevkey = "";
  let pressedKey = "";
  let pressedButton = "";

  const renderButton = (calculatorLines, calculatorKey, i) => (
    <button data-value={calculatorKey} onClick={handleOnclick}>
      {calculatorKey}
    </button>
  );
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

  const ac = () => {
    setValues("");
  };

  const result = () => {};

  const updateNumber = () => {
    console.log("update numb");
  };

  //problema principal:
  //no puedo acceder a "values" desde handleKeyPress, pero si desde handleOnclick
  //podria ser culpa de los diferentes event?
  //nota al quitar la linea 58-60 si accede a values. raro no?

  //y no puedo acceder a 'prevkey' desde handleonclick pero si desde handlekeypress. locura

  const handleKeyPress = (e) => {
    // const ops = ["+", "-", "*", "/"];
    //   prevkey = pressedKey;
    //   pressedKey = e.key;
    //   console.log(values, "values- handleKeyPress");
    //   console.log(prevkey, "prevkey- handleKeyPress");
    //   ops.includes(prevkey) && ops.includes(pressedKey)
    //     ? console.log("error, two operators")
    //     : setValues((values) =>
    //         pressedKey === "Enter" ? eval(values) : values + pressedKey.toString()
    //       );
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
      13: "=",
    };

    const possibleKeys = [
      105, 104, 103, 102, 101, 100, 99, 98, 97, 96, 45, 111, 106, 109, 107, 13,
    ];

    e.key === "Backspace" ? remove() : console.log("failed to remove");

    possibleKeys.includes(e.keyCode)
      ? handleOnclick((e = numberKeys[e.keyCode]))
      : console.log("incorrect input");
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

    ops.includes(values[values.length - 1]) && ops.includes(pressedButton)
      ? console.log("error, two operators")
      : setValues((values) =>
          pressedButton === "=" &&
          ops.includes(values[values.length - 1]) === false
            ? eval(values)
            : values + pressedButton.toString()
        );
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <button onClick={ac}> AC </button>
      <button onClick={remove}> 🔙 </button>
      <CalculatorInput value={values} />
      <CalculatorWrapper>
        {calculatorKeys.map((calculatorLines, i) =>
          calculatorKeys.length - 1 === i ? (
            <button onClick={handleOnclick} data-value={calculatorLines[3]}>
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

//   values === 0 && pressedButton === '-' ? setValues('-')
// : values === "--" && values[values.length - 1] === '-'  && pressedButton === '-' ? console.log('cant stack') :
// values.length > 2 && values[values.length - 1] === '-' && pressedButton === '-' ? console.log('cant stack') :
// values[values.length - 1] === '-' && ops.includes(values[values.length - 2]) && ops.includes(pressedButton) ? setValues(values.slice(0, -2) + pressedButton) :
// values === 0 && pressedButton === '.' ? setValues('0.') :
// pressedButton === '.' && values.match(/[\d.]+$/)[0].includes('.') ? console.log('you cant add more dots') :
// values[values.length - 1] === '-' && pressedButton === '+' ? setValues(values.slice(0, -1) + pressedButton) :
// values[values.length - 1] === '-' && ops.includes(pressedButton) ? console.log('cant stack operators') :
// values === 0 && pressedButton === '.' ? setValues(values.toString() + ".") :
// values === 0 && pressedButton === "0" ? console.log('cant stack zeros') :
//       values === 0
//   ? ops.includes(pressedButton)
//     ? setValues(0)
//     : setValues(pressedButton)
//   : values === 0 && ops.includes(pressedButton)
//       ? setValues('')
//       : ops.includes(values[values.length - 1]) && ops.includes(pressedButton)
//       ? setValues(values.slice(0, -1) + pressedButton)
//       : setValues((values) =>
//           pressedButton === "=" &&
//           ops.includes(values[values.length - 1]) === false
//             ? eval(values)
//             : values + pressedButton.toString()
//                   )

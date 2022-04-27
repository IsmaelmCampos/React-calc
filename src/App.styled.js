import styled from "styled-components";

export const CalculatorWrapper = styled("div")`
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: 50px 50px 50px 50px;

  justify-content: center;
`;

export const CalculatorInput = styled("input")`
  display: grid;
  justify-content: right;
`;

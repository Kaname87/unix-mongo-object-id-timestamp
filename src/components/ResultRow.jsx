import React from "react";

export const ResultRow = ({
  label,
  result,
  placeholder = "Input is emtpy or invalid"
}) => (
  <li>
    <strong>{label + ": "}</strong>
    <span>{result ? result : placeholder}</span>
  </li>
);

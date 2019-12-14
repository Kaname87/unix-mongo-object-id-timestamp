import React from "react";

export const ResultRow = ({
  label,
  className,
  result,
  placeholder = "Input is emtpy or invalid"
}) => (
  <p>
    <strong>{label + ": "}</strong>
    <span className={className}>{result ? result : placeholder}</span>
  </p>
);

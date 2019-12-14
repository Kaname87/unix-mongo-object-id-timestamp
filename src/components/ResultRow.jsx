import React from "react";

export const ResultRow = ({ label, result }) => (
  <li>
    <strong>{label + ": "}</strong>
    <span>{result}</span>
  </li>
);

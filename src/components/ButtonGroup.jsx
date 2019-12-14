import React from "react";

export const ButtonGroup = ({ handleSubmit, handleReset }) => (
  <div id="buttonGroup">
    <p>
      <button
        onClick={handleSubmit}
        id="submit"
        type="submit"
        className="btn btn-primary"
      >
        Convert
      </button>
      <button
        onClick={handleReset}
        id="reset"
        type="reset"
        className="btn btn-warning"
      >
        Reset
      </button>
    </p>
  </div>
);

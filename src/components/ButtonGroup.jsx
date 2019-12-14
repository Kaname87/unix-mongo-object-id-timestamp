import React from "react";

export const ButtonGroup = ({ handleSubmit, handleReset }) => (
  <div className="field is-grouped">
    <div className="control">
      <button
        onClick={handleSubmit}
        id="submit"
        type="submit"
        className="button is-primary"
      >
        Convert
      </button>
    </div>
    <div className="control">
      <button
        onClick={handleReset}
        id="reset"
        type="reset"
        className="button is-light"
      >
        Reset
      </button>
    </div>
  </div>
);

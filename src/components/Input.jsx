import React, { useState, Fragment } from "react";

const VALUE_TYPES = {
  UNIX_TIME: "unixtime",
  DATE: "date",
  OBJECT_ID: "objectid"
};

const InputText = ({ inputValue, selectedType, handleInputChange }) => {
  function setSelected(type) {
    return type === selectedType ? "selected" : "";
  }

  function setPlaceholder(type) {
    switch (type) {
      case VALUE_TYPES.UNIX_TIME:
        return "e.g. 1576301638";
      case VALUE_TYPES.DATE:
        return "e.g. 2019/12/24 05:33:00";
      case VALUE_TYPES.OBJECT_ID:
        return "e.g. 5defcb7a0000000000000000";
      default:
        return null;
    }
  }

  return (
    <Fragment>
      <input
        name="inputValue"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={setPlaceholder(selectedType)}
      />
      <select
        name="selectedType"
        value={selectedType}
        onChange={handleInputChange}
      >
        <option
          selected={setSelected(VALUE_TYPES.UNIX_TIME)}
          value={VALUE_TYPES.UNIX_TIME}
        >
          Unix Time
        </option>
        <option
          selected={setSelected(VALUE_TYPES.DATE)}
          value={VALUE_TYPES.DATE}
        >
          Date in any format
        </option>
        <option
          selected={setSelected(VALUE_TYPES.OBJECT_ID)}
          value={VALUE_TYPES.OBJECT_ID}
        >
          Mongo Object Id
        </option>
      </select>
    </Fragment>
  );
};

export default InputText;

import React, { Fragment } from "react";

const VALUE_TYPES = {
  UNIX_TIME: "unixtime",
  DATE: "date",
  OBJECT_ID: "objectid"
};

const InputText = ({ inputValue, selectedType, handleInputChange }) => {
  function setPlaceholder(type) {
    switch (type) {
      case VALUE_TYPES.UNIX_TIME:
        return "1576301638";
      case VALUE_TYPES.DATE:
        return "2019/12/24 05:33:00";
      case VALUE_TYPES.OBJECT_ID:
        return "5defcb7a0000000000000000";
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
        <option value={VALUE_TYPES.UNIX_TIME}>Unix Time</option>
        <option value={VALUE_TYPES.DATE}>Date in any format</option>
        <option value={VALUE_TYPES.OBJECT_ID}>Mongo Object Id</option>
      </select>
    </Fragment>
  );
};

export default InputText;

import React, { useState, useEffect } from "react";

import moment from "moment";
import {
  getDate,
  getUnixTimestamp,
  cleanDate,
  cleanDateUtc,
  //   timezoneName
  getTimezoneName
} from "./timeUtils";
import { ResultGroup } from "./components/ResultGroup";
import { ResultRow } from "./components/ResultRow";
import { ButtonGroup } from "./components/ButtonGroup";
import { InputGroup } from "./components/InputGroup";
import InputText from "./components/Input";

// import ErrorBoundary from './components/ErrorBoundfary'

import {
  objectIdFromDate,
  dateFromObjectId,
  timestampFromObjectId,
  formatMongoObjectId
} from "./mongoObjectIdUtil";

function TimeConverterApp() {
  const VALUE_TYPES = {
    UNIX_TIME: "unixtime",
    DATE: "date",
    OBJECT_ID: "objectid"
  };
  const initState = {
    inputValue: "",
    selectedType: VALUE_TYPES.UNIX_TIME,
    localTimeZone: getTimezoneName(),
    result: {
      dateInLocal: "",
      dateInUtc: "",
      unixTimestamp: "",
      objectId: ""
    }
  };

  const [values, setValues] = useState(initState);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getTimestamp = (value, type) => {
    if (!value) {
      return moment().unix();
    }
    switch (type) {
      case VALUE_TYPES.UNIX_TIME:
        return value;
      case VALUE_TYPES.DATE:
        return getUnixTimestamp(value);
      case VALUE_TYPES.OBJECT_ID:
        return timestampFromObjectId(value);
      default:
        return null;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { inputValue, selectedType } = values;
    const unixTimestamp = getTimestamp(inputValue, selectedType);
    const result = {
      unixTimestamp,
      dateInLocal: cleanDate(unixTimestamp),
      dateInUtc: cleanDateUtc(unixTimestamp)
    };
    setValues({ ...values, result });
  };

  const handleReset = e => {
    e.preventDefault();
    setValues(initState);
  };

  const {
    inputValue,
    selectedType,
    localTimeZone,
    result: { dateInLocal, dateInUtc, unixTimestamp }
  } = values;
  return (
    <div>
      <form id="convertDateForm" className="form-inline">
        <InputText
          inputValue={inputValue}
          selectedType={selectedType}
          handleInputChange={handleInputChange}
        />
        <ButtonGroup handleSubmit={handleSubmit} handleReset={handleReset} />
      </form>

      <ResultRow
        label={localTimeZone}
        className="cleanDate"
        result={dateInLocal}
        placeholder="Date will display here"
      />
      <ResultRow
        label={"UTC"}
        className="cleanDate"
        result={dateInUtc}
        placeholder="Date will display here"
      />
      <ResultRow
        label={"Unix"}
        className="cleanDate"
        result={unixTimestamp}
        placeholder="Date will display here"
      />
    </div>
  );
}

export default TimeConverterApp;

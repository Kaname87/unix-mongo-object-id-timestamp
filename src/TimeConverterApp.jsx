import React, { useState } from "react";

import moment from "moment";
import {
  getDate,
  getUnixTimestamp,
  cleanDate,
  cleanDateUtc,
  getTimezoneName
} from "./timeUtils";

import { ResultRow } from "./components/ResultRow";
import { ButtonGroup } from "./components/ButtonGroup";
import InputText from "./components/Input";

import {
  getObjectIdFromDate,
  getTimestampFromObjectId,
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
    isInvalidInput: false,
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

  const isValidDate = dateOrTime => new Date(dateOrTime).getTime() > 0;

  const getTimestamp = (value, type) => {
    if (!value) {
      return moment().unix();
    }

    switch (type) {
      case VALUE_TYPES.UNIX_TIME:
        return isValidDate(value) ? value : false;
      case VALUE_TYPES.DATE:
        return isValidDate(value) ? getUnixTimestamp(value) : false;
      case VALUE_TYPES.OBJECT_ID:
        const convertedTime = getTimestampFromObjectId(value);
        return convertedTime > 0 ? convertedTime : false;
      default:
        return false;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();

    const { inputValue, selectedType } = values;
    const unixTimestamp = getTimestamp(inputValue, selectedType);

    // Has input and no coverted timestamp is false, then error
    const isInvalidInput = inputValue && unixTimestamp === false;

    const result = {
      unixTimestamp,
      dateInLocal: unixTimestamp ? cleanDate(unixTimestamp) : "",
      dateInUtc: unixTimestamp ? cleanDateUtc(unixTimestamp) : "",
      objectId: unixTimestamp ? getObjectIdFromDate(getDate(unixTimestamp)) : ""
    };
    setValues({ ...values, result, isInvalidInput });
  };

  const handleReset = e => {
    e.preventDefault();
    setValues(initState);
  };

  const {
    inputValue,
    selectedType,
    localTimeZone,
    isInvalidInput,
    result: { dateInLocal, dateInUtc, unixTimestamp, objectId }
  } = values;
  return (
    <div className="section">
      <h1 className="subtitle">Time Converter</h1>
      <form className="content">
        <InputText
          isInvalidInput={isInvalidInput}
          inputValue={inputValue}
          selectedType={selectedType}
          handleInputChange={handleInputChange}
        />
        <ButtonGroup handleSubmit={handleSubmit} handleReset={handleReset} />
      </form>

      <div className="content is-small">
        <ResultRow label={localTimeZone} result={dateInLocal} />
        <ResultRow label={"UTC"} result={dateInUtc} />
        <ResultRow label={"Unix"} result={unixTimestamp} />
        <ResultRow
          label={"Mongo"}
          result={objectId ? formatMongoObjectId(objectId) : ""}
        />
      </div>
    </div>
  );
}

export default TimeConverterApp;

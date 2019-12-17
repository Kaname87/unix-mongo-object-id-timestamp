import React, { useState } from "react";

import moment from "moment";
import {
  getDate,
  getUnixTimestamp,
  cleanDate,
  cleanDateUtc,
  getTimezoneName,
  isValidDate,
  isValidTimestamp
} from "./timeUtils";

import { ResultRow } from "./components/ResultRow";
import { ButtonGroup } from "./components/ButtonGroup";
import InputText from "./components/Input";
import Emoji from "./components/Emoji";

import {
  getObjectIdFromDate,
  getUnixTimestampFromObjectId,
  formatMongoObjectId
} from "./mongoObjectIdUtil";

const sectionStyle = {
  maxWidth: "500px" // For a demo site
};

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

  const getTimestamp = (value, type) => {
    if (!value) {
      return moment().unix();
    }

    switch (type) {
      case VALUE_TYPES.UNIX_TIME:
        return !isNaN(value) && isValidTimestamp(value) ? value : false;
      case VALUE_TYPES.DATE:
        return isValidDate(value) ? getUnixTimestamp(value) : false;
      case VALUE_TYPES.OBJECT_ID:
        const convertedTime = getUnixTimestampFromObjectId(value);
        return isValidDate(convertedTime) ? convertedTime : false;
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
      unixTimestamp: isInvalidInput ? "" : unixTimestamp,
      dateInLocal: isInvalidInput ? "" : cleanDate(unixTimestamp),
      dateInUtc: isInvalidInput ? "" : cleanDateUtc(unixTimestamp),
      objectId: isInvalidInput
        ? ""
        : getObjectIdFromDate(getDate(unixTimestamp))
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
    <div className="section" style={sectionStyle}>
      <h1 className="subtitle">
        <Emoji symbol="🕒" /> Date Time Converter <Emoji symbol="🔄" />
      </h1>
      <form className="content">
        <InputText
          isInvalidInput={isInvalidInput}
          inputValue={inputValue}
          selectedType={selectedType}
          handleInputChange={handleInputChange}
        />
        <ButtonGroup handleSubmit={handleSubmit} handleReset={handleReset} />
      </form>
      <div className="content">
        <ResultRow label={localTimeZone} result={dateInLocal} />
        <ResultRow label={"UTC"} result={dateInUtc} />
        <ResultRow label={"Unix"} result={unixTimestamp} />
        <ResultRow label={"ObjectId"} result={objectId} />
        <ResultRow
          label={"Mongo"}
          result={objectId ? formatMongoObjectId(objectId) : ""}
        />
      </div>
    </div>
  );
}

export default TimeConverterApp;

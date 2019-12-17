import React, { useState } from "react";

import {
  getDate,
  cleanDate,
  cleanDateUtc,
  getTimezoneName,
  getUnixTime
} from "./timeUtils";

import { ResultRow } from "./components/ResultRow";
import { ButtonGroup } from "./components/ButtonGroup";
import InputText from "./components/Input";
import Emoji from "./components/Emoji";

import { VALUE_TYPES } from "./constants";
import { getObjectIdFromDate, formatMongoObjectId } from "./mongoObjectIdUtil";

const sectionStyle = {
  maxWidth: "500px" // For a demo site
};

const initState = {
  inputValue: "",
  selectedType: VALUE_TYPES.UNIX_TIME,
  localTimeZone: getTimezoneName(),
  isInvalidInput: false,
  result: {
    dateInLocal: "",
    dateInUtc: "",
    unixTime: "",
    objectId: ""
  }
};

function TimeConverterApp() {
  const [values, setValues] = useState(initState);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { inputValue, selectedType } = values;
    const unixTime = getUnixTime(inputValue, selectedType);
    // Has input and no coverted timestamp is false, then error
    const isInvalidInput = inputValue && unixTime === false;

    const result = {
      unixTime: isInvalidInput ? "" : unixTime,
      dateInLocal: isInvalidInput ? "" : cleanDate(unixTime),
      dateInUtc: isInvalidInput ? "" : cleanDateUtc(unixTime),
      objectId: isInvalidInput ? "" : getObjectIdFromDate(getDate(unixTime))
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
    result: { dateInLocal, dateInUtc, unixTime, objectId }
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
        <ResultRow label={"Unix"} result={unixTime} />
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

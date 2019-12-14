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
// import { ResultArea } from "./components/ResultArea";
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
        return isValidDate(value) ? value : null;
      case VALUE_TYPES.DATE:
        return isValidDate(value) ? getUnixTimestamp(value) : null;
      case VALUE_TYPES.OBJECT_ID:
        const convertedTime = getTimestampFromObjectId(value);
        return convertedTime > 0 ? convertedTime : null;
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
      dateInLocal: unixTimestamp ? cleanDate(unixTimestamp) : "",
      dateInUtc: unixTimestamp ? cleanDateUtc(unixTimestamp) : "",
      objectId: unixTimestamp ? getObjectIdFromDate(getDate(unixTimestamp)) : ""
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
    result: { dateInLocal, dateInUtc, unixTimestamp, objectId }
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
      />
      <ResultRow label={"UTC"} className="cleanDate" result={dateInUtc} />
      <ResultRow label={"Unix"} className="cleanDate" result={unixTimestamp} />
      <ResultRow
        label={"Mongo Obect Id"}
        className="cleanDate"
        result={objectId ? formatMongoObjectId(objectId) : ""}
      />
    </div>
  );
}

export default TimeConverterApp;

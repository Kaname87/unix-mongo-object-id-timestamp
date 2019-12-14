import React, { useState, useEffect } from "react";

import moment from "moment";
import {
  getDate,
  getUnixTimestamp,
  cleanDate,
  cleanDateUtc,
  timezoneName
} from "./timeUtils";
import { ResultGroup } from "./components/ResultGroup";
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
// export const getInitialState = (currentTime) => ({
//   unixTimestampInput: '',
//   humanDateInputValue: '',
//   inputObjectId: '',
//   dateInYourTimeZone: '',
//   dateInUtc: '',
//   unixTimeStamp: '',
//   mongoObjectId: '',
//   humanObejctId: '',
//   currentTime,
// })

// const setStateInStorage = (state) => {
//   window.localStorage.setItem('state', JSON.stringify(state))
// };

// const getStateFromStorage = () => {
//   return JSON.parse(window.localStorage.getItem('state'));
// }

function TimeConverterApp() {
  const VALUE_TYPES = {
    UNIX_TIME: "unixtime",
    DATE: "date",
    OBJECT_ID: "objectid"
  };
  const [values, setValues] = useState({
    inputValue: "",
    selectedType: VALUE_TYPES.UNIX_TIME
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form id="convertDateForm" className="form-inline">
      <InputText
        inputValue={values.inputValue}
        selectedType={values.selectedType}
        handleInputChange={handleInputChange}
      />
    </form>
  );
}

export default TimeConverterApp;

import React, {useState, useEffect} from 'react';

import moment from 'moment';
import { getDate, getUnixTimestamp, cleanDate, cleanDateUtc, timezoneName } from './timeUtils'
import { ResultGroup } from './components/ResultGroup'
import { ButtonGroup } from './components/ButtonGroup'
import { InputGroup } from './components/InputGroup'
import InputText from './components/Input'
// import ErrorBoundary from './components/ErrorBoundfary'

import { objectIdFromDate, dateFromObjectId, timestampFromObjectId, formatMongoObjectId } from './mongoObjectIdUtil'
export const getInitialState = (currentTime) => ({
  unixTimestampInput: '',
  humanDateInputValue: '',
  inputObjectId: '',
  dateInYourTimeZone: '',
  dateInUtc: '',
  unixTimeStamp: '',
  mongoObjectId: '',
  humanObejctId: '',
  currentTime,
})

const setStateInStorage = (state) => {
  window.localStorage.setItem('state', JSON.stringify(state))
};

const getStateFromStorage = () => {
  return JSON.parse(window.localStorage.getItem('state'));
}

function TimeStampConverter() {
  const prevState = getStateFromStorage()
  const [timeStampState, setTimeStampState] = useState(prevState ? prevState : getInitialState(moment().unix()));

  const handleUnixInputDate = ({ target: { value = '' } }) => {
    // console.log('sasa')
    setTimeStampState({
      unixTimestampInput: value.slice(0, 10),
      humanDateInputValue: '',
      mongoObjectId: ''
    })
  }

  const handleHumanInputDate = ({ target: { value = '' } }) => {
    // console.log('v', value)
    setTimeStampState({
      humanDateInputValue: value,
      unixTimestampInput: '',
      mongoObjectId: '',
    })
  }

  const handleInputObjectId = ({ target: { value = '' } }) => {
    setTimeStampState({
      humanObejctId: value,
      humanDateInputValue: '',
      unixTimestampInput: ''
    })
  }

  const resetForm = () => {
    const initialState = getInitialState(moment().unix())
    setTimeStampState(initialState);
    setStateInStorage(initialState)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    // console.log(timeStampState)
    // humanDateInputValue
    const { unixTimestampInput, humanDateInputValue, humanObejctId } = timeStampState
    const allInputsEmpty = unixTimestampInput === '' && humanDateInputValue === '' && humanObejctId === ''

    const unixTimestampInputValue = allInputsEmpty ? moment().unix() : unixTimestampInput
    // console.log(humanDateInputValue)
    const parsedDate = Date.parse(humanDateInputValue)

    if (!parsedDate) {
      // console.log('1l')
      setTimeStampState({ humanDateInputValue: '' })
    }
    let unixTimeStamp = null
    if (humanDateInputValue) {
      console.log(1)
      unixTimeStamp = humanDateInputValue
    } else if (unixTimestampInputValue) {
      console.log(2)
      unixTimeStamp = unixTimestampInputValue
    } else {
      console.log(3)
      unixTimeStamp = timestampFromObjectId(humanObejctId)
    }

    const dateInYourTimeZone = cleanDate(unixTimeStamp)
    const dateInUtc = cleanDateUtc(unixTimeStamp)

    const mongoObjectId = objectIdFromDate(getDate(unixTimeStamp))

    const newState = {
      ...timeStampState,
      dateInYourTimeZone,
      dateInUtc,
      unixTimeStamp,
      mongoObjectId,
    }
    console.log(newState)
    console.log(getDate(newState.unixTimeStamp))
    console.log()
    setTimeStampState(newState)
    setStateInStorage(newState)
  }


  const {
    humanDateInputValue,
    unixTimestampInput,
    dateInYourTimeZone,
    dateInUtc,
    unixTimeStamp,
    currentTime,
    mongoObjectId,
    humanObejctId,
  } = timeStampState
  console.log('timeStampState', timeStampState)
  return (
      <div className="container">
        <h1 className="lead">Timestamp Converter</h1>
        <form id="convertDateForm" className="form-inline">
          <InputText />
          <ButtonGroup submitFn={onSubmit} resetFn={resetForm} />
        </form>
        <ResultGroup
          timezoneName={timezoneName}
          dateInYourTimeZone={dateInYourTimeZone}
          dateInUtc={dateInUtc}
          unixTimeStamp={unixTimeStamp}
          mongoObjectId={mongoObjectId}
        />
      </div>

  );
}

export default TimeStampConverter
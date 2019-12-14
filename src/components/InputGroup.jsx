import React from "react";

export const InputGroup = ({
  unixTimestampOnChange,
  unixTimestampVal,
  currentTime,
  humanDateOnChange,
  humanDateVal,
  objectIdOnChange,
  humanObejctId
}) => (
  <div>
    <div id="unixTimeInput" className="form-group">
      <h6 className="sub-title">
        Press "Convert" for the current time to be converted
      </h6>
      <input
        onChange={unixTimestampOnChange}
        value={unixTimestampVal}
        className="form-control"
        name="number"
        id="unixTimestampInput"
        type="number"
        placeholder={`Unix Timestamp eg: ${currentTime}`}
        min="-999999999999"
        max="999999999999"
      />
    </div>

    <h5>or enter a date in any format</h5>
    <div className="form-group" id="humanReadableDate">
      <input
        onChange={humanDateOnChange}
        value={humanDateVal}
        className="form-control"
        name="fulldate"
        type="text/number"
        id="fulldate"
        placeholder="eg: 01/01/1970 12:30 pm"
      />
    </div>
    <h5>or Object ID</h5>
    <div className="form-group" id="humanReadableDate">
      <input
        onChange={objectIdOnChange}
        value={humanObejctId}
        className="form-control"
        name="obejctId"
        // type="text/number"
        id="obejctId"
        placeholder="5defcb7a0000000000000000"
      />
    </div>
  </div>
);

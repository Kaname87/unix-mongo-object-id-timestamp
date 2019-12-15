import React, { useRef, useState, useEffect, Fragment } from "react";

const copiedMessageStyle = {
  marginTop: "-1.5em"
};
const disabledInputStyle = {
  backgroundColor: "#f5f5f5",
  borderColor: "#f5f5f5",
  boxShadow: "none",
  color: "#7a7a7a"
};

const copiedMessage = () => (
  <p style={copiedMessageStyle} className="help is-success">
    Copied!
  </p>
);

export const ResultRow = ({ label, result }) => {
  const [isCopied, setIsCopied] = useState(false);
  const textAreaRef = useRef(null);

  // Reset isCopied from true to false after interval
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isCopied) {
        setIsCopied(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isCopied]);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    setIsCopied(true);
  }

  return (
    <Fragment>
      <div className="field has-addons">
        <p className="has-text-weight-light">{label + ": "}</p>
        <div className="control is-expanded">
          <input
            style={disabledInputStyle}
            className="input is-small"
            readOnly
            ref={textAreaRef}
            value={result}
          ></input>
        </div>
        <div className="control">
          {document.queryCommandSupported("copy") && (
            <div>
              <button
                className="button is-small bd-copy"
                onClick={copyToClipboard}
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
      {isCopied && copiedMessage()}
    </Fragment>
  );
};

import useInput from "../hooks/use-input";
import React, { useState } from "react";

const BasicForm = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAmount,
    isValid: enteredAmountIsValid,
    hasError: amountInputHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: resetAmountInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPurpose,
    isValid: enteredPurposeIsValid,
    hasError: purposeInputHasError,
    valueChangeHandler: purposeChangeHandler,
    inputBlurHandler: purposeBlurHandler,
    reset: resetPurposeInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredNameIsValid && enteredAmountIsValid && enteredPurposeIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    resetNameInput();
    resetAmountInput();
    resetPurposeInput();
    resetDateInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const amountInputClasses = amountInputHasError
    ? "form-control invalid"
    : "form-control";

  const purposeInputClasses = purposeInputHasError
    ? "form-control invalid"
    : "form-control";

  const dateInputClasses = dateInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={amountInputClasses}>
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          id="Amount"
          onChange={amountChangeHandler}
          onBlur={amountBlurHandler}
          value={enteredAmount}
        />
        {amountInputHasError && (
          <p className="error-text">Please enter a valid amount.</p>
        )}
      </div>
      <div className={purposeInputClasses}>
        <label htmlFor="amount">Purpose</label>
        <input
          type="text"
          id="Purpose"
          onChange={purposeChangeHandler}
          onBlur={purposeBlurHandler}
          value={enteredPurpose}
        />
        {purposeInputHasError && (
          <p className="error-text">Please enter a valid purpose.</p>
        )}
      </div>
      <div className={dateInputClasses}>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="Date"
          onChange={dateChangeHandler}
          onBlur={dateBlurHandler}
          value={enteredDate.toISOString().slice(0, 10)}
        />
        {purposeInputHasError && (
          <p className="error-text">Please enter a valid date.</p>
        )}
      </div>
      <div>
      <button
          type="button"
          onClick={() => {
            props.setNewClaimTrigger(false);
          }}
        >
          Cancel
        </button>
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
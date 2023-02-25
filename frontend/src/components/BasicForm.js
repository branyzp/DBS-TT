import useInput from "../hooks/use-input";
import React, { useState } from "react";

const isNotEmpty = (value) => value.trim() !== "";

const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);
  const {
    value: amountValue,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: resetAmount,
  } = useInput(isNotEmpty);
  const {
    value: purposeValue,
    isValid: purposeIsValid,
    hasError: purposeHasError,
    valueChangeHandler: purposeChangeHandler,
    inputBlurHandler: purposeBlurHandler,
    reset: resetPurpose,
  } = useInput(isNotEmpty);

  const {
    value: dateValue,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDate,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    amountIsValid &&
    purposeIsValid &&
    dateIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(firstNameValue, lastNameValue, amountValue);

    resetFirstName();
    resetLastName();
    resetAmount();
    resetPurpose();
    resetDate();
  };

  const firstNameClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const amountClasses = amountHasError
    ? "form-control invalid"
    : "form-control";
  const purposeClasses = purposeHasError
    ? "form-control invalid"
    : "form-control";

  const dateClasses = dateHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="FirstName"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">Please enter a first name.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="LastName"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Please enter a last name.</p>
          )}
        </div>
      </div>
      <div className={amountClasses}>
        <label htmlFor="name">Amount</label>
        <input
          type="text"
          id="Amount"
          value={amountValue}
          onChange={amountChangeHandler}
          onBlur={amountBlurHandler}
        />
        {amountHasError && (
          <p className="error-text">Please enter a valid amount.</p>
        )}
      </div>
      <div className={purposeClasses}>
        <label htmlFor="name">Purpose</label>
        <input
          type="text"
          id="Purpose"
          value={purposeValue}
          onChange={purposeChangeHandler}
          onBlur={purposeBlurHandler}
        />
        {purposeHasError && (
          <p className="error-text">Please enter a valid purpose.</p>
        )}
      </div>
      <div className={dateClasses}>
        <label htmlFor="date">Purpose</label>
        <input
          type="date"
          id="Date"
          value={dateValue}
          onChange={dateChangeHandler}
          onBlur={dateBlurHandler}
        />
        {purposeHasError && (
          <p className="error-text">Please enter a valid date.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

import useInput from "../hooks/use-input";
import React, { useState } from "react";
import Dropdown from "./DropDown";

const isNotEmpty = (value) => value.trim() !== "";

const BasicFormEdit = (props) => {
    // let [firstNameValue, setFirstNameValue] = useState("");
  const {
    value: firstNameValue = "hello",
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty,props.userInEdit.FirstName);
  // console.log(props.userInEdit.FirstName)
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty, props.userInEdit.LastName);
  const {
    value: amountValue,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: resetAmount,
  } = useInput(isNotEmpty,props.userInEdit.Amount&&props.userInEdit.Amount.toString());
  const {
    value: purposeValue,
    isValid: purposeIsValid,
    hasError: purposeHasError,
    valueChangeHandler: purposeChangeHandler,
    inputBlurHandler: purposeBlurHandler,
    reset: resetPurpose,
  } = useInput(isNotEmpty,props.userInEdit.Purpose);

  const {
    value: dateValue,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDate,
  } = useInput(isNotEmpty);

  const {hasError: policyHasError, reset: resetPolicy } = useInput(isNotEmpty);

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
    resetPolicy();
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

  const policyClasses = policyHasError
    ? "form-control invalid"
    : "form-control";

  const dateClasses = dateHasError ? "form-control invalid" : "form-control";

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
        <label htmlFor="date">Date</label>
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
      <div className={policyClasses}>
        <label htmlFor="policy">Choose a policy</label>
        <Dropdown
          formLabel="Choose a policy"
          options={options}
          value={selectedOption}
          onChange={handleDropdownChange}
        />
      </div>
      <button
          type="button"
          onClick={() => {
            props.setNewClaimTrigger(false);
          }}
        >
          Cancel
        </button>
        <button onClick={()=>{
          props.setClaimsLst(oldLst => oldLst.filter((claim)=>{
            if(claim.ClaimID !== props.userInEdit.ClaimID){
              return claim;
            }
          }))
          props.setNewClaimTrigger(false);
        }}>Delete</button>
      <div className="form-actions">
        <button disabled={!formIsValid} onClick={()=>{
          // claimsLst={claimsLst} setClaimsLst= {setClaimsLst}
          let newClaimsLst = props.claimsLst.map((claim)=>{
            if(claim.ClaimID === props.userInEdit.ClaimID){
              claim.FirstName = firstNameValue;
              claim.LastName = lastNameValue;
              claim.Amount = parseFloat(amountValue);
              claim.Purpose = purposeValue;
            }
            return claim
          })
          console.log(newClaimsLst, "fghjifdygh")
          props.setClaimsLst(newClaimsLst);
          props.setNewClaimTrigger(false);
        }}>Submit</button>
      </div>
    </form>
  );
};

export default BasicFormEdit;

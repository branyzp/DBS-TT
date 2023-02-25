import React, { useState } from 'react'

function BasicFormNew() {
    let [fname, setFName] = useState("");
  return (
    <div>
      <form>
        <label for="fname">First name:</label>
        <input type="text" id="fname" name="fname"></input>
        <label for="lname">Last name:</label>
        <input type="text" id="lname" name="lname"></input>
        <label for="amount">Amount:</label>
        <input type="text" id="amount" name="amount"></input>
        <label for="purpose">Purpose:</label>
        <input type="text" id="purpose" name="purpose"></input>
      </form>
    </div>
  )
}

export default BasicFormNew

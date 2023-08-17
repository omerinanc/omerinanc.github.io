import React from "react";

const Form = ({ setInputText }) => {
  //   const inputTextHandler = (e) => {
  //     setInputText(e.target.value);
  //   };
  return (
    <div className="div-main">
      <form>
        <div>
          <p>
            Username
            <input name="username" className="input-entry" />
          </p>
        </div>
        <div>
          <p>
            Password
            <input name="password" className="input-entry" />
          </p>
        </div>
        <div className="div-checkbox">
          <input type="checkbox" />
          <p>Remember me</p>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Form;

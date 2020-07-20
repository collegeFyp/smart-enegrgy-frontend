import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  let inputClasses = ["form-control", classes.Input];

  if (!props.valid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          type={props.elementConfig.type}
          value={props.value}
          id={props.id}
          name={props.id}
          className={inputClasses.join(" ")}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          type={props.elementConfig.type}
          value={props.value}
          id={props.id}
          className={"form-control " + classes.InputElement}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className="form-group">
      {props.elementConfig.type === "hidden" ? null : (
        <label htmlFor={props.id} className="Label">
          {props.elementConfig.label}
        </label>
      )}
      {inputElement}
    </div>
  );
};

export default input;

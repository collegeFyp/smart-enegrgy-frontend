import React, { Component } from "react";
import Input from "../../../component/UI/Input/Input";
import Button from "../../../component/UI/Button/Button";
import { connect } from "react-redux";
import * as actions from "../../../store/action/index";
import Spinner from "../../../component/UI/Spinner/Spinner";
import classes from "./LoginForm.module.css";
import checkValidity from "../../../Validation/Validation";
class LoginForm extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
          label: "Email",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          isEmail: true,
        },
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
          label: "Password",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 4,
        },
      },
    },
    valid: false,
  };

  inputChangeHandler = (event, controlName) => {
    const updatedControl = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    let valid = false;
    for (let i in updatedControl) {
      if (!updatedControl[i].valid) {
        valid = false;
        break;
      } else valid = true;
    }

    this.setState({
      controls: updatedControl,
      valid: valid,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  render() {
    let formElement = [];
    for (let i in this.state.controls) {
      formElement.push({
        id: i,
        config: this.state.controls[i],
      });
    }
    let from = formElement.map((element) => (
      <Input
        key={element.id}
        id={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        valid={element.config.valid}
        touched={element.config.touched}
        shouldValidate={element.config.validation}
        changed={(event) => {
          this.inputChangeHandler(event, element.id);
        }}
      />
    ));

    let button = <Button> Submit</Button>;
    if (!this.state.valid) {
      button = <Button disabled>Submit</Button>;
    }
    if (this.props.loading) {
      console.log("loading");
    }

    return (
      <div className="card">
        <div className="card-header info-color-white-text text-center py-4">
          Sign In
        </div>
        <div className="card-body px-lg-5 pt-0">
          <form style={{ color: "#757575" }} onSubmit={this.submitHandler}>
            {from}
            {this.props.loading ? (
              <div className={classes.Spinner}>
                {" "}
                <Spinner />{" "}
              </div>
            ) : (
              button
            )}
          </form>
        </div>
      </div>
    );
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps, MapDispatchToProps)(LoginForm);

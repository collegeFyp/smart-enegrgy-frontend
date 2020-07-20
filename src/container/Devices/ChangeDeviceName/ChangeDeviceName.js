import React, { Component } from "react";
import Input from "../../../component/UI/Input/Input";
import checkValidity from "../../../Validation/Validation";
import Spinner from "../../../component/UI/Spinner/Spinner";
import Button from "../../../component/UI/Button/Button";
import * as actions from "../../../store/action/index";
import { connect } from "react-redux";

class ChangeDeviceName extends Component {
  state = {
    controls: {
      id: {
        elementType: "input",
        elementConfig: {
          type: "hidden",
          placeholder: "Device Id",
          label: "Device id",
        },
        value: this.props.device ? this.props.device._id : "",
        touched: false,
        valid: true,
      },
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Device Name",
          label: "Device Name",
        },
        value: "", //,
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
    },
    valid: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.device !== this.props.device && this.props.device) {
      const newControls = { ...this.state.controls };
      newControls.name.value = this.props.device ? this.props.device.name : "";
      newControls.id.value = this.props.device ? this.props.device._id : "";

      this.setState({
        controls: newControls,
      });
    }
  }
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
    if (this.props.edit) {
      console.log(this.state.controls.id.value + "---------------");

      this.props.onEditDevice(
        this.props.token,
        this.state.controls.id.value,
        this.state.controls.name.value
      );
    } else {
      this.props.onAddDevice(
        this.props.token,
        this.state.controls.name.value,
        this.props.roomId,
        this.props.userId
      );
    }
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

    let button = <Button> {this.props.edit ? "Change" : "Add Device"}</Button>;
    if (!this.state.valid) {
      button = (
        <Button disabled>{this.props.edit ? "Change" : "Add Device"}</Button>
      );
    }

    return (
      <div className="card">
        <div className="card-header info-color-white-text text-center py-4">
          {this.props.edit ? "Change" : "Add Device"}
        </div>
        <div className="card-body px-lg-5 pt-0">
          <form style={{ color: "#757575" }} onSubmit={this.submitHandler}>
            {from}
            {this.props.loading ? (
              <div>
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
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.device.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onEditDevice: (token, id, name) =>
      dispatch(actions.editDevice(token, id, name)),
    onAddDevice: (token, deviceName, roomId, userId) =>
      dispatch(actions.addDevice(token, deviceName, roomId, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDeviceName);

import React, { Component } from "react";
import Input from "../../../component/UI/Input/Input";
import checkValidity from "../../../Validation/Validation";
import Button from "../../../component/UI/Button/Button";
import * as actions from "../../../store/action/index";
import { connect } from "react-redux";

class AddUser extends Component {
  state = {
    controls: {
      _id: {
        elementType: "input",
        elementConfig: {
          type: "hidden",
          placeholder: "id",
          label: "id",
        },
        value: this.props.user ? this.props.user._id : "",
        touched: false,
        valid: true,
      },

      firstName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "First Name",
          label: "First Name",
        },
        value: this.props.user ? this.props.user.firstName : "",
        touched: false,
        valid: true,
      },
      lastName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Last Name",
          label: "Last Name",
        },
        value: this.props.user ? this.props.user.lastName : "", //,
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },

      Email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
          label: "Email",
        },
        value: this.props.user ? this.props.user.email : "", //,
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },

      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
          label: "Password",
        },
        value: "", //,
        valid: false,
        touched: false,
        validation: {
          required: true,
          password: true,
        },
      },
    },
    valid: false,
  };
  //   componentDidMount() {
  //     const newControls = { ...this.state.controls };
  //     newControls.name.value = this.props.room ? this.props.room.name : "";
  //     this.setState({
  //       controls: newControls,
  //     });
  //   }
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
    console.log(this.state.controls.id.value, this.state.controls.name.value);
    if (this.props.edit)
      this.props.onEditRoom(
        this.props.token,
        this.state.controls.id.value,
        this.state.controls.name.value
      );
    else
      this.props.onAddRoom(
        this.props.token,
        this.props.userId,
        this.state.controls.name.value
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

    let button = <Button> {this.props.edit ? "Change" : "Add Room"}</Button>;
    if (!this.state.valid) {
      button = (
        <Button disabled>{this.props.edit ? "Change" : "Add Add Room"}</Button>
      );
    }
    if (this.props.loading) {
      button = (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      );
      console.log("loading");
    }

    return (
      <div className="card">
        <div className="card-header info-color-white-text text-center py-4">
          {this.props.edit ? "Change" : "Add Room"}
        </div>
        <div className="card-body px-lg-5 pt-0">
          <form style={{ color: "#757575" }} onSubmit={this.submitHandler}>
            {from}
            {button}
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.rooms.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddRoom: (token, userId, name) =>
      dispatch(actions.addRoom(token, userId, name)),
    onEditRoom: (token, roomName, roomId) =>
      dispatch(actions.editRoom(token, roomName, roomId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

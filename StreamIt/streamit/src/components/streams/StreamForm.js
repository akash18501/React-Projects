import React from "react";
import { Field, reduxForm } from "redux-form";

//capitalisation on Field is different because it is essentially a react componenmt
//and reduxForm acts just like connect function which is used to get the states
//from the store in our component
class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <div className="text-danger font-weight-bold">{error}</div>;
    }
  }

  renderInput = ({ input, label, meta }) => {
    // console.log("input: ", input);
    // console.log("meta: ", meta);
    return (
      // <input
      //   onChange={formProps.input.onChange}
      //   value={formProps.input.value}
      // />
      //other way of doing by correctly passing all the props
      //what it does is take all the attributes of the formProps.input
      <div className="form-group col-sm-6">
        <label>{label}</label>
        <input {...input} className="form-control" autoComplete="off" />
        {this.renderError(meta)}
      </div>
      //or
      // we can destructure input while accepting the props
    );
  };

  onSubmit = (formValues) => {
    // console.log("form values", formValues);
    this.props.onSubmit(formValues);
  };

  render() {
    // console.log(this.props);
    return (
      //handle submit is method provided by redux form which gets called
      //whenever the form gets submitted and we are passing in it our onSubmit
      //as an argument which will be called by the handlesubmit
      //handle submit by itself takes the event argument and call preventdefault by itself
      //so our onSubmit function will not be receiving any event parameter and we don't have to call the prevent default
      //instead we will receive the input values of each formfield of our form
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button type="submit" className="btn btn-primary px-5 ml-3">
          Submit
        </button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    //user did not entered a title
    errors.title = "Title cannot be empty";
  }
  if (!formValues.description) {
    errors.description = "Description cannot be empty";
  }
  return errors;
};

export default reduxForm({
  form: "StreamForm",
  validate: validate,
})(StreamForm);

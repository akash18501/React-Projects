import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    // console.log("form values", formValues);
    this.props.createStream(formValues);
  };

  render() {
    // console.log(this.props);
    return (
      <div className="">
        <h3
          style={{
            paddingLeft: "14px",
          }}
        >
          Create A New Stream
        </h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, {
  createStream: createStream,
})(StreamCreate);

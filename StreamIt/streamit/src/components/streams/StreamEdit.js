import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <h3
          style={{
            paddingLeft: "14px",
          }}
        >
          Edit Stream
        </h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={{
            title: this.props.stream.title,
            description: this.props.stream.description,
          }}
          // initialValues={this.props.stream}
          //we can also use pick function of lodash here
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.stream[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, {
  fetchStream: fetchStream,
  editStream: editStream,
})(StreamEdit);

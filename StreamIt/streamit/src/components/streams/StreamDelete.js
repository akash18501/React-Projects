import React from "react";
import Modal from "../Modal";
import history from "../../History";
import { fetchStream, deleteStream } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    return (
      <React.Fragment>
        <Link
          to="/"
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </Link>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          type="button"
          className="btn btn-danger"
        >
          Yes Delete
        </button>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return `Are you sure you want to delete this stream`;
    }
    return `Are you sure you want to delete the Stream "${this.props.stream.title}"`;
  }

  render() {
    return (
      <Modal
        actions={this.renderActions()}
        title="Delete Stream"
        content={this.renderContent()}
        onDismiss={() => history.push("/")}
      />
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
  deleteStream: deleteStream,
})(StreamDelete);

import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import "./css/StreamList.css";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div>
          <Link
            to={`/streams/edit/${stream.id}`}
            className="edit_button btn btn-primary  mr-2"
          >
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="delete_button btn  btn-danger "
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <li key={stream.id} className="list_item">
          <div className="left">
            <IconButton>
              <OndemandVideoIcon fontSize="large"></OndemandVideoIcon>
            </IconButton>
          </div>
          <div className="middle">
            <h4 className="m-0">{stream.title}</h4>
            <p className="m-0">{stream.description}</p>
          </div>
          <div className="right">{this.renderAdmin(stream)}</div>
        </li>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn === true) {
      return (
        <Link to="/streams/new" className="btn btn-success">
          Creat New Stream
        </Link>
      );
    }
  }

  render() {
    return (
      <div className="container mb-5">
        <div className="show_create_button">
          <h2 className="stream_list_header">Available Streams</h2>
          {this.renderCreate()}
        </div>

        <ul className="list-unstyled streamlist">{this.renderList()}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.stream),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  fetchStreams: fetchStreams,
})(StreamList);

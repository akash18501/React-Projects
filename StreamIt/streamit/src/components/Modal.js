import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      onClick={props.onDismiss}
      style={{
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
      }}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{props.content}</p>
          </div>
          <div className="modal-footer">{props.actions}</div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;

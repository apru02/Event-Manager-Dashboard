import React, { useRef} from "react";

const ExitModal = (props) => {
  const close_btn = useRef(null);
 

  const handleDeleteEvent = () => {
    props.handleDeleteEvent();
    close_btn.current.click();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        style={{ display: "none" }}
        ref={props.exitbtn}
      >
        Launch static backdrop modal
      </button>

   
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={
                props.darkTheme === "DarkTheme"
                  ? { backgroundColor: "#363636" }
                  : {}
              }
            >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Are you sure you want to delete this event?
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                
                ></button>
              </div>
              <div className="modal-body">
                Click Delete Event to delete the Event
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
          
                  ref={close_btn}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleDeleteEvent}
                  style={{ backgroundColor: "#ff0000" }}
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        </div>

    </>
  );
};

export default ExitModal;

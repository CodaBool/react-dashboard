import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { getCookieByName } from "./CookieHandler";
import RefreshSlider from "./RefreshSlider";
import HoursAgoSlider from "./HoursAgoSlider";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import * as actions from "../store/actions/action";
import { resizeAuto, resizeToFit } from "./APIGrid";

function SettingsModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="align-items-center">
            <RefreshSlider />
          </Row>
          <hr></hr>
          <Row className="align-items-center">
            <HoursAgoSlider />
          </Row>
          <hr></hr>
          <Row className="format-buttons">
            <Button className="resize" onClick={resizeAuto}>
              Fit To Headers
            </Button>
            <Button className="resize" onClick={resizeToFit}>
              Fit To Screen
            </Button>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Settings({ changeInterval }) {
  useEffect(() => {
    // retrieve saved cookie interval value
    const cookie = getCookieByName("interval");
    if ((cookie !== "") & (cookie !== null) & (cookie !== undefined)) {
      changeInterval(cookie);
    }
  }, []);
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        variant="primary btn-dark settings-button"
        onClick={() => setModalShow(true)}
      >
        Settings
      </Button>

      <SettingsModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        changeInterval={changeInterval}
        className="settings-modal"
      />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  // redux
  return {
    changeInterval: (interval) => dispatch(actions.changeInterval(interval)),
  };
};

export default connect(null, mapDispatchToProps)(Settings);

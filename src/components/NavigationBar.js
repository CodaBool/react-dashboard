import React from "react";
import { Navbar, Col } from "react-bootstrap";
import TableSelector from "./TableSelector";
import Settings from "./Settings";
import LoadingIcon from "./LoadingIcon";
import SavingIcon from "./SavingIcon";
import TimeLeft from "./TimeLeft";
import TableName from "./TableName";
import { connect } from 'react-redux'

function NavigationBar({ rowCount }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Col md={3}>
        <TableName />
      </Col>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Col md='auto'>
          <TableSelector />
        </Col>
        <Col md='auto'>
          <Settings />
        </Col>
        <Col md='auto'>
          <div style={{ display: "flex" }}>
            <TimeLeft />
          </div>
        </Col>
        <Col>
          <LoadingIcon />
          <SavingIcon />
        </Col>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = state => {
  return {
      rowCount: state.reducer.rowCount,
  }
}

export default connect(mapStateToProps)(NavigationBar)
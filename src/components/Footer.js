import React from "react";
import { Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import "../styles/global.css";

function Footer({ rowCount }) {
  return (
    <Navbar className="footer">
      {rowCount === 1 ? (
        <span className="text-light mr-1" aria-live="polite">
          {rowCount} Result
        </span>
      ) : (
        <span className="text-light" aria-live="polite">
          {rowCount} Results
        </span>
      )}
      <h5 style={{color: "white", margin: "0 auto 0 auto"}}>Not representative of the final product</h5>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    rowCount: state.reducer.rowCount,
  };
};

export default connect(mapStateToProps)(Footer);

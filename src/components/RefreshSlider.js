/* Slider to pick the interval for which to fetch data after
 * The time selected is displayed in TimeLeft.js
 */

import React from "react"
import { connect } from "react-redux"
import * as actions from "../store/actions/action"
import { setCookieByValue } from "./CookieHandler"
import ReactBootstrapSlider from "react-bootstrap-slider"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-slider/dist/css/bootstrap-slider.css"

function RefreshSlider({ changeInterval, interval, changeSaving }) {

  // store cookie and set new interval
  const changeValue = (e) => {
    changeSaving(true)
    setCookieByValue(e.target.value, "interval")
    changeInterval(Number(e.target.value))
  }

  return (
    <>
      {/* Title */}
      <span className="refreshText">Auto Refresh: </span>
      <br />

      {/* Slider */}
      <ReactBootstrapSlider
        value={interval}
        max={60}
        min={0}
        ticks={[0, 5, 15, 30, 60]}
        slideStop={changeValue}
        ticks_snap_bounds={15}
      />
    </>
  );
}

const mapStateToProps = (state) => { // redux
  return {
    interval: state.reducer.interval,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInterval: (interval) => dispatch(actions.changeInterval(interval)),
    changeSaving: (saving) => dispatch(actions.changeSaving(saving)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefreshSlider)
/* Bootstrap Slider for selecting time filter on data from the
 * response call in APIGrid. Sets a cookie to save the client settings
 */

import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import * as actions from "../store/actions/action"
import { getCookieByName, setCookieByValue } from "./CookieHandler"
import ReactBootstrapSlider from "react-bootstrap-slider"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-slider/dist/css/bootstrap-slider.css"

function HoursAgoSlider(props) {
  const { hoursAgo, changeHoursAgo } = props // redux state props

  useEffect(() => { // retrieve saved cookie hoursAgo value 
    const cookie = getCookieByName("hoursAgo")
    if ((cookie !== "") & (cookie !== null) & (cookie !== undefined)) {
      changeHoursAgo(cookie)
    }
  }, [])

  const changeValue = (e) => { // set cookie and update redux state
    setCookieByValue(e.target.value, "hoursAgo")
    changeHoursAgo(Number(e.target.value))
  }

  return (
    <>
      {/* Title */}
      <span className="hoursText">Show Data from <span className="hoursAgo">{hoursAgo}</span> Hours Ago: </span>
      <br />

      {/* Slider */}
      <ReactBootstrapSlider
        value={hoursAgo}
        max={120}
        min={1}
        slideStop={changeValue}
        ticks={[1, 12, 24, 48, 72, 120]}
        ticks_snap_bounds={24}
      />
    </>
  )
}

const mapStateToProps = (state) => { // redux
  return {
    hoursAgo: state.reducer.hoursAgo, 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeHoursAgo: (hoursAgo) => dispatch(actions.changeHoursAgo(hoursAgo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HoursAgoSlider)

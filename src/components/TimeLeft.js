/* Displays time left until new data is loaded into grid
 */

import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import * as actions from "../store/actions/action"
import LoadingButton from "./LoadingButton"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-slider/dist/css/bootstrap-slider.css"

var timer, printTime = null

function RefreshSlider({ interval, changeLoading }) {
  const [secondsLeft, setSecondsLeft] = useState(interval)

  useEffect(() => { // check if manual. If not then start a new timer
    if (interval > 0) {
      startTimer()
    }
  }, [interval])

  function startTimer() {
    clearInterval(timer)
    setSecondsLeft(interval * 60) // convert to seconds
    timer = setInterval(countDown, 1000) // update secondsLeft every second
  }

  function countDown() {
    setSecondsLeft((prevTime) => { // decrement secondsLeft by 1
      printTime = genPrintTime(prevTime - 1)
      return prevTime - 1
    })
  }

  useEffect(() => { // check if timer is done, then trigger refresh
    if (secondsLeft <= 0) {
      changeLoading(true)
      startTimer()

      // TODO: make it unecessary to do a reload of the page
      window.location.reload(false) // reloads page without redownloading content
    }
  }, [secondsLeft])

  function genPrintTime(input) {
    var minutes = Math.floor(input / 60)
    var seconds = input - minutes * 60
    var ret = ""
    ret += "" + minutes + ":" + (seconds < 10 ? "0" : "")
    ret += "" + seconds
    return ret
  }

  return ( // uses LoadingButton for manual pressing to refresh the grid data
    <>
      {interval > 0 ? <span className="timetext">{printTime}</span> : <LoadingButton />}
    </>
  )
}

const mapStateToProps = (state) => { // redux
  return {
    interval: state.reducer.interval,
    loading: state.reducer.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInterval: (interval) => dispatch(actions.changeInterval(interval)),
    changeLoading: (loading) => dispatch(actions.changeLoading(loading)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefreshSlider);

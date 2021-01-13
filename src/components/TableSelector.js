/* Buttons in the navbar to select the table to display
 * Grouped into clones/upgrade (ref. parent) and advance/advise/recruit (ref. sub)
 * Uses useRef to manipulate button styling 
 */

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import * as actions from '../store/actions/action'
import { setCookieByValue, getCookieByName } from './CookieHandler'
import { ButtonGroup } from 'react-bootstrap'

var activeChild, activeParent = null // temporary storage of which table button is active

function TableSelector({ table, changeTable, changeSaving }) {

  // local states to set the style as dark or light to show which is active
  const [cloneActive, setCloneActive] = useState('btn-dark')
  const [upgradeActive, setUpgradeActive] = useState('btn-light')
  const [advanceActive, setAdvanceActive] = useState('btn-dark')
  const [adviseActive, setAdviseActive] = useState('btn-light')
  const [recruitActive, setRecruitActive] = useState('btn-light')

  // initialize references which will be attached to each button
  const clone = useRef(null)
  const upgrade = useRef(null)
  const advance = useRef(null)
  const advise = useRef(null)
  const recruit = useRef(null)

  function removeActive(ref) {
    if (ref === clone || ref === upgrade) { // remove active class from parent row
      setCloneActive('btn-light')
      setUpgradeActive('btn-light')
    } else { // remove active class from sub row
      setAdvanceActive('btn-light')
      setAdviseActive('btn-light')
      setRecruitActive('btn-light')
    }
  }
  
  function handleClick(e, ref) {
    if (ref.current.classList.contains('btn-light')) { // if not active
      if (e) { // A manual click
        updateTable(e, ref) // 1st pass just change table
      } else { // from useEffect props.table change
        removeActive(ref)
        updateTable(null, ref) // 2nd pass or from cookies make all other changes
      }
    }
  }

  function updateTable(e, ref) {

    activeParent = table.substring(0, 2) // cl (clone) | up (upgrade)
    activeChild = table.substring(3, 14) // advance | advise | recruit

    // change table
    if (e !== null) { // from manual click
    
      // Only change for the current button group. 
      // A click on clone should not change the activeChild group
      switch(ref) { // A click on advance should not change activeParent group
        case clone: changeTable("cl-" + activeChild); break
        case upgrade: changeTable("up-" + activeChild); break
        case advance: changeTable(activeParent + "-advance"); break
        case advise: changeTable(activeParent + "-advise"); break
        case recruit: changeTable(activeParent + "-recruit"); break
        default: console.log("Invalid table selected");
      }
    } else {
      switch(ref) { // adds active class to button
        case clone: 
          setCloneActive("btn-dark")
          setCookieByValue("cl-" + activeChild, "table")
          changeSaving(true)
          break
        case upgrade: 
          setUpgradeActive("btn-dark")
          setCookieByValue("up-" + activeChild, "table")
          changeSaving(true)
          break
        case advance: 
          setAdvanceActive("btn-dark")
          setCookieByValue(activeParent + "-advance", "table") 
          changeSaving(true)
          break
        case advise: 
          setAdviseActive("btn-dark")
          setCookieByValue(activeParent + "-advise", "table") 
          changeSaving(true)
          break
        case recruit: 
          setRecruitActive("btn-dark")
          setCookieByValue(activeParent + "-recruit", "table") 
          changeSaving(true)
          break
        default: console.log("ref error with", ref)
      }
    }
  }

  useEffect(() => {
    console.log("============ Table change to", table, " ============")
    switch(table.substring(0, 2)) {
      case "cl": handleClick(null, clone); break
      case "up": handleClick(null, upgrade); break
      default: break
    }
    switch(table.substring(3, 12)) {
      case "advance": handleClick(null, advance); break
      case "advise": handleClick(null, advise); break
      case "recruit": handleClick(null, recruit); break
      default: break
    }
  }, [table])

  useEffect(() => { // retrieve cookie and changeTable on page load
    const cookie = getCookieByName("table")
    if (cookie !== "" & cookie !== null & cookie !== undefined) {
      changeTable(cookie)
    }

    // TODO: this should be placed in HoursAgoSlider.js but it would not run on page load that way.
    // This is likely fixable by putting in the right dependency in the useEffect array at the end.
    const cookieHoursAgo = getCookieByName("hoursAgo")
    if (cookieHoursAgo === null) {
      setCookieByValue(120, "hoursAgo")
    }
  }, [])

  return (
    <>
      {/* Parent Group */}
      <ButtonGroup>
        <button className={`btn ${cloneActive}`} ref={clone} onClick={(e) => handleClick(e, clone)}>Clone</button>
        <button className={`btn mr-5 ${upgradeActive}`} ref={upgrade} onClick={(e) => handleClick(e, upgrade)}>Upgrade</button>
      </ButtonGroup>

      {/* Child Group */}
      <ButtonGroup>
        <button className={`btn ${advanceActive}`} ref={advance} onClick={(e) => handleClick(e, advance)}>Advance</button>
        <button className={`btn ${adviseActive}`} ref={advise} onClick={(e) => handleClick(e, advise)}>Advise</button>
        <button className={`btn ${recruitActive}`} ref={recruit} onClick={(e) => handleClick(e, recruit)}>Recruit</button>
      </ButtonGroup>
    </>
  )
}

const mapStateToProps = state => { // redux
  return {
    table: state.reducer.table,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeTable: (table) => dispatch(actions.changeTable(table)),
    changeSaving: (saving) => dispatch(actions.changeSaving(saving)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableSelector)
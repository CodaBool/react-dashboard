import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../store/actions/action'

var returnJSXFade = (
  <div className="saveIcon" style={{opacity: "1"}} role="alert"><span role="img" aria-label="Saving">💾 Saving...</span></div>
)
var returnJSX = (
  <div className="saveIcon" style={{opacity: "0"}} role="alert"><span role="img" aria-label="Saving">💾 Saving...</span></div>
)

function SavingIcon({ saving, changeSaving }) {
    if (saving) {
        var interval = setInterval(myTimer, 1500) // time until fadeout, fadein takes 1s
        return returnJSXFade
        function myTimer() {
          changeSaving(false)
          clearInterval(interval)
        }
    }
    return returnJSX
}

const mapStateToProps = state => { // redux
    return {
        saving: state.reducer.saving,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeSaving: (saving) => dispatch(actions.changeSaving(saving)),
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(SavingIcon)
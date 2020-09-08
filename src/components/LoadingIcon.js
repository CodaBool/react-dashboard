import React from 'react';
import { connect } from 'react-redux'

var loadingJSX = null

function LoadingIcon({ loading }) {
  loading ? loadingJSX = ( // if loading is true return jsx of the spinner
      <>
        <div style={{display: "inline-block"}}>
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      </>
    )
  : loadingJSX = null
  return loadingJSX
}

const mapStateToProps = state => { // redux
    return {
        loading: state.reducer.loading,
    }
}
  
export default connect(mapStateToProps)(LoadingIcon)
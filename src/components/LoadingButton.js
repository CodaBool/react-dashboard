/* Loading button used for manually refreshing grid data
 * Uses a refresh SVG icon from @primer/octicons-react 
 * receieves redux loading state as props and has spinning animation if loading=true
 */

import React from 'react';
import { connect } from 'react-redux'
import { SyncIcon } from '@primer/octicons-react'

var loadSpinnerOn, loadSpinnerOff = null

function LoadingButton({ loading }) {
        loadSpinnerOn = ( // used if loading=true has spinning animation
            <>
                <button onClick={() => window.location.reload(true)}className="btn btn-secondary refreshButton" style={{height: "42px"}}>
                    <SyncIcon className="refresh-spinner" size={20} /><p className="ml-2" style={{display: "inline-block"}}>Refresh</p>
                </button>
            </>
        )
        loadSpinnerOff = ( // loading=false no spinning animation
            <>
                <button onClick={() => window.location.reload(true)} className="btn btn-secondary refreshButton" style={{height: "42px"}}>
                    <SyncIcon size={20} /><p className="ml-2" style={{display: "inline-block"}}>Refresh</p>
                </button>
            </>
        )

    // TODO: This might be able to be reworked to have className be a variable and just change that
    // however, on initial testing this produced some errors and was abandonded for this solution of full jsx returns
    if (loading) { // return different jsx depending on loading
        return loadSpinnerOn
    }
    return loadSpinnerOff
}

const mapStateToProps = state => { // redux
    return {
        loading: state.reducer.loading,
    }
}
  
export default connect(mapStateToProps)(LoadingButton)
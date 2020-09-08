const initialState = {
    interval: 5, // minutes until data refresh
    loading: false,
    saving: false,
    table: "cl-advance", // causes issues if not set to a default table
    hoursAgo: 120,
    rowCount: null
}

const changeInterval = ( state, action ) => {
    return ({...state, interval: action.interval})
}

const changeLoading = ( state, action ) => { // loading
    return ({...state, loading: action.loading})
}

const changeSaving = ( state, action ) => { // saving
    return ({...state, saving: action.saving})
}

const changeTable = ( state, action ) => { // current table 
    return ({...state, table: action.table})
}

const changeHoursAgo = ( state, action ) => {
    return ({...state, hoursAgo: action.hoursAgo })
}

const changeRowCount = ( state, action ) => {
    return ({...state, rowCount: action.rowCount })
}

export default function reducer( state = initialState, action ) {
    switch ( action.type ) {
        case "CHANGE_INTERVAL": return changeInterval( state, action )
        case "CHANGE_LOADING": return changeLoading( state, action )
        case "CHANGE_SAVING": return changeSaving( state, action )
        case "CHANGE_TABLE": return changeTable( state, action )
        case "CHANGE_HOURS_AGO": return changeHoursAgo( state, action )
        case "CHANGE_ROW_COUNT": return changeRowCount( state, action )
        default: return state
    }
}

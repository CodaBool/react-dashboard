export const changeInterval = ( interval ) => { // refresh interval in minutes
    return {
        type: "CHANGE_INTERVAL",
        interval: interval
    }
}

export const changeLoading = (loading) => {
    return {
        type: "CHANGE_LOADING",
        loading: loading
    }
}

export const changeSaving = (saving) => {
    return {
        type: "CHANGE_SAVING",
        saving: saving
    }
}

export const changeTable = (table) => {
    return {
        type: "CHANGE_TABLE",
        table: table
    }
}

export const changeRowCount = (rowCount) => {
    return {
        type: "CHANGE_ROW_COUNT",
        rowCount: rowCount
    }
}

export const changeHoursAgo = (hoursAgo) => {
    return {
        type: "CHANGE_HOURS_AGO",
        hoursAgo: hoursAgo
    }
}
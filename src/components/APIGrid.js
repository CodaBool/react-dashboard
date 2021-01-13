/* this component is the heart of the dashboard
 * it populates an ag-grid-react table with API calls to our Express server
 *
 * it uses cookies, local state, and redux states
 */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CustomTooltip from "./CustomTooltip";
import { connect } from "react-redux";
import * as actions from "../store/actions/action";
import { clAdv, clAds, clRec, upAdv, upAds, upRec, columnDefs } from '../data/sample'

const WAIT_INTERVAL = 1000; // how long between
var gridReady = false; // initial state of not ready
var gridColumnApi, gridApi, timer, format = null
var pinWidth = 150

function chooseColumns(table) {
  console.log('runnning setRowData with',table)
  switch (table) {
    case "cl-advance":
      return clAdv;
    case "cl-advise":
      return clAds;
    case "cl-recruit":
      return clRec;
    case "up-advance":
      return upAdv;
    case "up-advise":
      return upAds;
    case "up-recruit":
      return upRec;
    default:
      return clAdv;
  }
}



// resizes the columns to match the headers
export const resizeAuto = () => {
  // only works on columns which are visible
  // to resize all columns, the suppressColumnVirtualisation must be set to true, possible performance hit
  format = 'auto'
  var allColumnIds = [];
  gridColumnApi.getAllColumns().forEach(function (column) {
    allColumnIds.push(column.colId);
  });
  gridColumnApi.autoSizeColumns(allColumnIds, false); // false to consider headers, true to not
};

// resize columns to fit on screen
export const resizeToFit = () => {
  format = 'fit'
  gridApi.sizeColumnsToFit();
};


/* APIGrid component takes in redux states as props
 * saves default column definitions in local */
const APIGrid = (props) => {
  const { changeTable, table, changeLoading, loading, changeSaving, changeRowCount } = props;
  // default column definitions
  // these are applied to every column
  const [defaultColDef] = useState({
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
    suppressMenu: true, // (1/2) comment for hidden filter and cleaner grid header UI
    floatingFilter: true, // (2/2)
    tooltipComponent: "customTooltip",
    setRowData: chooseColumns(table)
  });
  const [frameworkComponents] = useState({ customTooltip: CustomTooltip })

  // when grid first loads
  const onGridReady = (params) => {
    gridApi = params.api;
    gridColumnApi = params.columnApi;
    gridReady = true;
  };
  const refreshData = (params) => {
    gridApi = params.api;
    gridColumnApi = params.columnApi;

    var interval = setInterval(myTimer, 2000);
    function myTimer() {
      changeLoading(false);
      clearInterval(interval);
    }
  };
  const filterChange = () => {
    clearTimeout(timer);
    timer = setTimeout(triggerChange, WAIT_INTERVAL);
  }
  function triggerChange() {
    changeSaving(true);
    changeRowCount(getCountRowsAfterFilter())
  }
  function getCountRowsAfterFilter() {
    var count = 0
    gridApi.forEachNodeAfterFilter(() => count++)
    return count
  }

  useEffect(() => {
    if (gridReady) {
      if (format === 'fit') {
        resizeToFit()
        // reload table
      } else if (format === 'auto') {
        resizeAuto()
      }
    }
  }, [table])

  useEffect(() => {
    if (gridReady) {
      if (loading) {
        refreshCells();
      }
    }
  }, [loading])

  useEffect(() => {
    if (window.innerWidth <= 991) {
      pinWidth = 20
      console.log('small', pinWidth)
    } else {
      console.log('large', pinWidth)
    }
  }, [])

  const refreshCells = () => {
    var params = {
      suppressFlash: false, // skip cell flashing
    };
    gridApi.refreshCells(params);
    var interval = setInterval(myTimer, 2000);
    function myTimer() {
      changeLoading(false);
      clearInterval(interval);
    }
  };

  return (
    <div>
      <div className="example-wrapper">
        <div
          id="myGrid"
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={chooseColumns(table)}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            frameworkComponents={frameworkComponents}
            tooltipShowDelay="500" // short delay before tooltip appears on hover
            onFilterChanged={filterChange}
            suppressColumnVirtualisation={true} // for performance
            onNewColumnsLoaded={refreshData} // force refreshes the entire table when col defs change
          />
        </div>
      </div>

    </div>
  );
}

// connections to redux
const mapStateToProps = (state) => {
  return {
    table: state.reducer.table,
    saving: state.reducer.saving,
    loading: state.reducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTable: (table) => dispatch(actions.changeTable(table)),
    changeLoading: (loading) => dispatch(actions.changeLoading(loading)),
    changeSaving: (saving) => dispatch(actions.changeSaving(saving)),
    changeRowCount: (rowCount) => dispatch(actions.changeRowCount(rowCount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(APIGrid);

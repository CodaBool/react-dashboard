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
import { data as clAdvance } from "../data/clone-advance"
import { data as clAdvise } from "../data/clone-advise"
import { data as clRecruit } from "../data/clone-recruit"
import { data as upAdvance } from "../data/upgrade-advance"
import { data as upAdvise } from "../data/upgrade-advise"
import { data as upRecruit } from "../data/upgrade-recruit"

const WAIT_INTERVAL = 1000; // how long between
var gridReady = false; // initial state of not ready
var gridColumnApi, gridApi, timer, format = null
var pinWidth = 150

function chooseColumns(table) {
  switch (table) {
    case "cl-advance":
      return clAdvance;
    case "cl-advise":
      return clAdvise;
    case "cl-recruit":
      return clRecruit;
    case "up-advance":
      return upAdvance;
    case "up-advise":
      return upAdvise;
    case "up-recruit":
      return upRecruit;
    default:
      return clAdvance;
  }
}

function setColorClass(value) {
  if (value === "Success") {
    return "success";
  } else if (value === "Failure") {
    return "failure";
  } else if (value === "In progress") {
    return "in-progress";
  }
  return "other";
}

var columnDefs = [
  {headerName: "Client", field: "Client", pinned: "left", width: 100},
  {headerName: "Job", field: "Job", pinned: "left", width: 70},
  {headerName: "SmokeTest", field: "SmokeTest",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "PreCore", field: "PreCore",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "BkeField", field: "BkeField",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "BkSrcDB", field: "BkSrcDB",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "BkTrgDb", field: "BkTrgDb",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "BkEnt", field: "BkEnt",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "ResDB", field: "ResDB",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "ImpOrg", field: "ImpOrg",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "ImpEnt", field: "ImpEnt",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "Resek", field: "Resek",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "RD_END", field: "RD_END",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "RD_Start", field: "RD_Start",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "WFE", field: "WFE",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "TS", field: "TS",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "ST", field: "ST",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "XCAS", field: "XCAS",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
  {headerName: "SUP", field: "SUP",
    cellClass: function(params) {
      return setColorClass(params.value)
    }},
]

// specify the data
var rowData = [
  {Client: "US-East", Job: "201", SmokeTest: "Failure", PreCore: "Success", BkeField: "Success", BkSrcDB: "Success", BkTrgDb: "Success", BkEnt: "Success", ResDB: "Success", ImpOrg: "Success",  ImpEnt: "Success", Resek: "Success", RD_END: "Success", RD_Start: "Failure", WFE: "Success", TS: "Success", ST: "Success", XCAS: "Success", SUP: "Success"},
  {Client: "US-West", Job: "201", SmokeTest: "Failure", PreCore: "Success", BkeField: "In progress", BkSrcDB: "Success", BkTrgDb: "Failure", BkEnt: "Failure", ResDB: "Success", ImpOrg: "Success",  ImpEnt: "Success", Resek: "Success", RD_END: "Success", RD_Start: "Success", WFE: "Success", TS: "Success", ST: "Success", XCAS: "Failure", SUP: "Success"},
  {Client: "US-Central", Job: "201", SmokeTest: "Success", PreCore: "Failure", BkeField: "Success", BkSrcDB: "Success", BkTrgDb: "Success", BkEnt: "Success", ResDB: "Success", ImpOrg: "Success",  ImpEnt: "Success", Resek: "Success", RD_END: "Success", RD_Start: "In progress", WFE: "Success", TS: "Success", ST: "Success", XCAS: "Success", SUP: "Success"},
  {Client: "FR", Job: "201", SmokeTest: "Failure", PreCore: "Success", BkeField: "Success", BkSrcDB: "Success", BkTrgDb: "In progress", BkEnt: "Success", ResDB: "Success", ImpOrg: "Success",  ImpEnt: "Success", Resek: "Success", RD_END: "Success", RD_Start: "Success", WFE: "Failure", TS: "Success", ST: "Success", XCAS: "Success", SUP: "Success"},
  {Client: "IT", Job: "201", SmokeTest: "Success", PreCore: "Failure", BkeField: "In progress", BkSrcDB: "Success", BkTrgDb: "Success", BkEnt: "Success", ResDB: "Failure", ImpOrg: "Success",  ImpEnt: "Success", Resek: "Success", RD_END: "Failure", RD_Start: "Success", WFE: "Success", TS: "Success", ST: "Success", XCAS: "Success", SUP: "Success"},
  {Client: "DE", Job: "201", SmokeTest: "In progress", PreCore: "In progress", BkeField: "Success", BkSrcDB: "Failure", BkTrgDb: "Success", BkEnt: "Success", ResDB: "Success", ImpOrg: "Success",  ImpEnt: "Success", Resek: "Failure", RD_END: "Success", RD_Start: "Success", WFE: "Success", TS: "Success", ST: "Success", XCAS: "Failure", SUP: "Success"},
  {Client: "PO", Job: "201", SmokeTest: "Success", PreCore: "Success", BkeField: "Success", BkSrcDB: "Failure", BkTrgDb: "In progress", BkEnt: "Success", ResDB: "Success", ImpOrg: "Success",  ImpEnt: "Success", Resek: "Success", RD_END: "Failure", RD_Start: "Failure", WFE: "Success", TS: "Success", ST: "Success", XCAS: "Success", SUP: "Success"},
  {Client: "UK", Job: "201", SmokeTest: "Success", PreCore: "Success", BkeField: "Success", BkSrcDB: "Success", BkTrgDb: "Success", BkEnt: "Success", ResDB: "Success", ImpOrg: "Success",  ImpEnt: "Success", Resek: "Success", RD_END: "Success", RD_Start: "Success", WFE: "Success", TS: "Success", ST: "Success", XCAS: "Success", SUP: "Success"},
  {Client: "LV", Job: "201", SmokeTest: "Success", PreCore: "Success", BkeField: "Success", BkSrcDB: "In progress", BkTrgDb: "Success", BkEnt: "Success", ResDB: "Success", ImpOrg: "Success",  ImpEnt: "Failure", Resek: "Success", RD_END: "Success", RD_Start: "Success", WFE: "Success", TS: "Failure", ST: "Success", XCAS: "Success", SUP: "Success"},
  {Client: "PT", Job: "201", SmokeTest: "In progress", PreCore: "Failure", BkeField: "Success", BkSrcDB: "Success", BkTrgDb: "Success", BkEnt: "Success", ResDB: "Success", ImpOrg: "Success",  ImpEnt: "Success", Resek: "Success", RD_END: "Success", RD_Start: "Success", WFE: "Failure", TS: "Success", ST: "Success", XCAS: "Failure", SUP: "Success"},
  {Client: "SK", Job: "201", SmokeTest: "Failure", PreCore: "Success", BkeField: "Success", BkSrcDB: "Failure", BkTrgDb: "Success", BkEnt: "In progress", ResDB: "Success", ImpOrg: "Success",  ImpEnt: "Success", Resek: "Success", RD_END: "Failure", RD_Start: "Success", WFE: "Success", TS: "Success", ST: "Success", XCAS: "Success", SUP: "Success"},
  {Client: "RO", Job: "201", SmokeTest: "Success", PreCore: "Success", BkeField: "Success", BkSrcDB: "Success", BkTrgDb: "Success", BkEnt: "Success", ResDB: "Success", ImpOrg: "Success",  ImpEnt: "Success", Resek: "Success", RD_END: "Success", RD_Start: "Failure", WFE: "Success", TS: "Success", ST: "Success", XCAS: "Success", SUP: "Success"}
]

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
            rowData={rowData}
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

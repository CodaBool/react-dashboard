/* A custom Tooltip supported by Ag-Grid
 * the props data is first defined in the Columns.js file
 * there an id and full unabreviated column name is passed
 * 
 * ag-grid examples showed you can get the row data through the api
 * here that data is iterated through with Object.entries to find
 * the json elapsed data within that row and column intersection
 * Finally the full column name and elapsed time is shown in the tooltip jsx
 */

import React from "react";

var elapsed = null;

export default function CustomTooltip(props) {

  var isHeader = props.rowIndex === undefined
  console.log(isHeader)
  if (isHeader) {
    
    props.reactContainer.classList.add("custom-tooltip"); // add class for styling in global.css
    return (
      <div className="custom-tooltip" style={{ backgroundColor: "white"}}>
        <div style={{ overflowWrap: "break-word"}}>
          <p>
            <span>{props.value}</span>
          </p>
        </div>
      </div>
    );
  } else {
    console.log(props.value.column, props.value.id, props.rowIndex)
    const data = props.api.getDisplayedRowAtIndex(props.rowIndex).data;
    props.reactContainer.classList.add("custom-tooltip"); // add class for styling in global.css
  
    elapsed = null;

    console.log(data.tasks)
  
    for (const [key, value] of Object.entries(data.tasks)) { // iterate to find json elapsed data
      if (key === props.value.id) {
        if (value.elapsed.length > 0) {
          elapsed = value.elapsed;
        } else if (value.elapsed === "") {
          elapsed = 'not run';
        } else {
    console.log('ERROR: Tooltip issue with:', value.elapsed, 'for', props.value.id)
          elapsed = 'Error'
        }
      }
    }
    return (
      <div className="custom-tooltip" style={{ backgroundColor: "white"}}>
        <div style={{ overflowWrap: "break-word"}}>
          <p>
            <span>{props.value.column}</span>
          </p>
        </div>
        <div style={{ margin: "5px", overflowWrap: "normal" }}>
          <span>
            {/* show elapsed time, but if null display 'Not run' */}
            {elapsed !== null ? <div>Elapsed: {elapsed}</div> : `Error elapsed null with id: ${props.value.id}`}
          </span>
        </div>
      </div>
    );
  }

  
}

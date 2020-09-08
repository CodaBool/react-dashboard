import React from 'react'
import { connect } from 'react-redux'

function TableName({table}) {
    var nameOfTable = ""
    if (table) { // make the table more human readable
        switch(table) {
          case "cl-advance":  nameOfTable = "Clones: Advance"; break;
          case "cl-advise":  nameOfTable = "Clones: Advise"; break;
          case "cl-recruit":  nameOfTable = "Clones: Recruit"; break;
          case "up-advance":  nameOfTable = "Upgrades: Advance"; break;
          case "up-advise":  nameOfTable = "Upgrades: Advise"; break;
          case "up-recruit":  nameOfTable = "Upgrades: Recruit"; break;
          default: nameOfTable = ""; 
        }
      }
    return <div className="tableName"><h1>{nameOfTable}</h1></div>
}

const mapStateToProps = state => {
    return {
        table: state.reducer.table,
    }
  }

export default connect(mapStateToProps)(TableName)
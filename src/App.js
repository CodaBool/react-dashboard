import React from 'react'
import { connect } from 'react-redux' 
import APIGrid from './components/APIGrid'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import NavBox from './components/NavBox'
import SampleFooter from './components/SampleFooter'

function App() {
  return (
    <>
      <NavigationBar />
      <APIGrid />
      <NavBox />
      <SampleFooter />
    </>
  )
}

const mapStateToProps = state => {
  return {
      table: state.reducer.table,
  }
}

export default connect(mapStateToProps)(App)
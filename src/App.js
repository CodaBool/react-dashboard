import React from 'react'
import { connect } from 'react-redux' 
import APIGrid from './components/APIGrid'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import NavBox from './components/NavBox'

function App() {
  return (
    <>
      <NavigationBar />
      <APIGrid />
      <NavBox />
      <Footer />
    </>
  )
}

const mapStateToProps = state => {
  return {
      table: state.reducer.table,
  }
}

export default connect(mapStateToProps)(App)
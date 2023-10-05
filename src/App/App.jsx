// import { useState } from 'react'
import css from'./App.module.css'
import CheckersBoard from '../components/CheckersBoard/CheckersBoard'
// import EightByEightTable from '../components/EightByEightTable/EightByEightTable'

function App() {


  return (
    <>
      <div className = {css.appContainer}>
        <CheckersBoard/>
        {/* <EightByEightTable/> */}
      </div>
    </>)
}

export default App

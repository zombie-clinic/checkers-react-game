// import { useState } from 'react'
import css from'./App.module.css'
import CheckersBoard from '../components/CheckersBoard/CheckersBoard'
import StartPage from '../components/StartPage/StartPage'

function App() {

  return (
    <>
      <div className = {css.appContainer}>
        {/* <CheckersBoard/> */}
        <StartPage/>
      </div>
    </>)
}

export default App

import React from 'react'
import MiniCard from 'src/components/MiniCard'
import './MainPage.css'
import Header from 'src/components/Header'

const MainPage = () => {

  return (
    <>
      <Header/>
      <div className='cards'>
        <div className="wrapper">
          <MiniCard/>
          <MiniCard/>
          <MiniCard/>
        </div>
      </div>
    </>
  )
}

export default MainPage

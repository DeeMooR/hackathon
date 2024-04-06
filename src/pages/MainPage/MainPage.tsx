import React from 'react'
import MiniCard from 'src/components/MiniCard'
import './MainPage.css'
import Header from 'src/components/Header'

import main from "src/img/main.png"

const MainPage = () => {

  return (
    <>
      <Header/>
      <div className="wrapper">
        <div className="mainSection">
          <div className="mainSection__info">
            <h1><span>Расписание</span> мероприятий в БГУИР</h1>
            <div className="mainSection__text-button">
              <p className='mainSection__text'>Список мероприятий всех типов, от всех факультетов, с гибкой сортировкой и возможностью зарегистрироваться</p>
              <button className='button mainSection__button'>Смотреть ближайшие события</button>
            </div>
          </div>
          <img src={main} className='mainSection__image' alt="bsuir" />
        </div>
        <div className='cards'>
          <MiniCard/>
          {/* <MiniCard/>
          <MiniCard/> */}
        </div>
      </div>
    </>
  )
}

export default MainPage

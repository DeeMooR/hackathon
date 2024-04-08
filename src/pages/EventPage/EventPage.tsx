import React, { FC, useEffect, useState } from 'react'
import './EventPage.css'
import { events, formatDate, isPast } from 'src/helpers'
import Header from 'src/components/Header';
import Newsletter from 'src/components/Newsletter';
import Footer from 'src/components/Footer';
import { BackgroundImage, Container } from 'src/styled'
import IconText from 'src/components/IconText';

import calendar from "src/img/icons/Calender.svg"
import location from "src/img/icons/Location.svg"
import time from "src/img/icons/Time.svg"
import dots from "src/img/icons/Dots.svg"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IEvent } from 'src/interface';

const EventPage:FC<{type: string}> = ({type}) => {
  const { id = 0 } = useParams();
  const {eventsNext, eventsPast} = useSelector((state: any) => state.main);

  const [event, setEvent] = useState<any>(null)
  const [completedMessege, setCompletedMessege] = useState('')
  const [completedClass, setCompletedClass] = useState('')
  const [crumbsMessege, setCrumbsMessege] = useState('Главная /')
  
  useEffect(() => {
    if (eventsNext.length > 0 && eventsPast.length > 0) {
      const updateEvent = [...eventsNext, ...eventsPast].find((item: IEvent) => item.id === +id);
      console.log(eventsNext, updateEvent)
      setEvent(updateEvent);
    }
  }, [eventsNext, eventsPast])

  useEffect(() => {
    if (event) {
      const type = isPast(event.date) ? 'past' : 'next'; 
      if (type === 'past') setCrumbsMessege('Главная / Прошедшие мероприятия');
      else setCrumbsMessege('Главная / Ближайшие мероприятия');

      if (type === 'past') {
        setCompletedMessege('Мероприятие завершилось');
        setCompletedClass('finished');
      } else if (event?.visit === 'Свободный вход') {
        setCompletedMessege('Вход свободный');
        setCompletedClass('free');
      } else {
        setCompletedMessege('Регистрация обязательна');
        setCompletedClass('registration');
      }
    }
  }, [event])

  return (
    <>
    {event && event.id &&
      <>
      <Header/>
      <div className="wrapper">
        <section className="eventPage">
          <p className='crumbs'>{crumbsMessege}</p>
          <div className="eventPage__card">
            <div className="eventPage__image column-left">
              <Container>
                <BackgroundImage image={event?.photo} />
              </Container>
            </div>
            <div className="eventPage__info">
              <div className="eventPage__info-up">
                <div className={`info__completed ${completedClass}`}>{completedMessege}</div>
                <h1>{event.title}</h1>
                <div className="info__options">
                  <IconText icon={calendar} text={formatDate(event.date)} isBlueBox />
                  <IconText icon={location} text={event.location} />
                  <IconText icon={time} text={event.time} />
                  <IconText icon={dots} text={event.type} />
                  <p>{event.faculties.join(', ')}</p>
                </div>
              </div>
              {type === 'next' && event.visit === 'С регистрацией' &&
                <button className='button info__button'>Зарегистрироваться</button>
              }
            </div>
          </div>
          <div className="eventPage__description">
            <h2 className='column-left'>Описание мероприятия</h2>
            <p dangerouslySetInnerHTML={{ __html: event.description }}></p>
          </div>
          {type === 'next' && event.visit === 'С регистрацией' &&
            <div className="eventPage__registration">
              <h2 className='column-left'>Регистрация на мероприятие</h2>
              <div className="registration__fields">
                <input type="text" className='registration__input' placeholder='Группа, ФИО' />
                <button className='second-button registration__btn-add'>Добавить участника</button>
                <button className='button registration__btn-send'>Зарегистрироваться</button>
              </div>
            </div>
          }
          {type === 'past' && event.results &&
            <div className="eventPage__results">
              <h2 className='column-left'>Результаты мероприятия</h2>
              <div className="results__info">
                <p dangerouslySetInnerHTML={{ __html: event.results }}></p>
                {event.archive && <a href={event.archive} target='blank'>Архив с фотографиями</a>}
              </div>
            </div>
          }
        </section>
      </div>
      <Newsletter/>
      <Footer/>
    </>
    }
  </>
  )
}

export default EventPage

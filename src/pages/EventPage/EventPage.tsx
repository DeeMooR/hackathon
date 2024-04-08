import React, { FC, useEffect, useState } from 'react'
import './EventPage.css'
import { events, formatDate, isPast } from 'src/helpers'
import Header from 'src/components/Header';
import Newsletter from 'src/components/Newsletter';
import Footer from 'src/components/Footer';
import { BackgroundImage, Container } from 'src/styled'
import IconText from 'src/components/IconText';

import close from "src/img/icons/Close.svg"
import calendar from "src/img/icons/Calender.svg"
import location from "src/img/icons/Location.svg"
import time from "src/img/icons/Time.svg"
import dots from "src/img/icons/Dots.svg"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IEvent } from 'src/interface';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { sendMembersAPI } from 'src/store/requests';

const EventPage:FC<{type: string}> = ({type}) => {
  const { id = 0 } = useParams();
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const {eventsNext, eventsPast} = useSelector((state: any) => state.main);

  const [event, setEvent] = useState<any>(null)
  const [completedMessege, setCompletedMessege] = useState('')
  const [completedClass, setCompletedClass] = useState('')
  const [crumbsMessege, setCrumbsMessege] = useState('Главная /')
  const [typeDate, setTypeDate] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if (eventsNext.length > 0 && eventsPast.length > 0) {
      const updateEvent = [...eventsNext, ...eventsPast].find((item: IEvent) => item.id === +id);
      console.log(eventsNext, updateEvent)
      setEvent(updateEvent);
    }
  }, [eventsNext, eventsPast])

  useEffect(() => {
    if (event) {
      const updateTypeDate = isPast(event.date) ? 'past' : 'next'; 
      setTypeDate(updateTypeDate);
      console.log(type, event)
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

  const [inputRegister, setInputRegister] = useState<string>('');
  const [members, setMembers] = useState<string[]>([]);
  
  const addMember = () => {
    if (inputRegister !== '') {
      setMembers(prevMembers => [...prevMembers, inputRegister]);
      setInputRegister('');
    }
  }
  const deleteMember = (value: string) => {
    const updateMembers = members.filter((v) => v !== value);
    setMembers(updateMembers);
  }
  const sendMembers = () => {
    const sendMembers = (inputRegister !== '')
    ? [...members, inputRegister]
    : members
    setMembers(sendMembers);
    setInputRegister('');
    console.log(sendMembers);
    dispatch(sendMembersAPI({ members: sendMembers, id: event.id }));
  }

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
                <input type="text" className='registration__input' value={inputRegister} onChange={(e: any) => setInputRegister(e.target.value)} placeholder='Группа, ФИО' />
                {members.map((value, i) => 
                  <div className='registration__member' key={i}>
                    <p>{value}</p>
                    <img src={close} alt="cross" onClick={() => deleteMember(value)} />
                  </div>
                )}
                <button className='second-button registration__btn-add' onClick={addMember}>Добавить участника</button>
                <button className='button registration__btn-send' onClick={sendMembers}>Зарегистрироваться</button>
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

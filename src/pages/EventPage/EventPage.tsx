import React, { FC, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getEvents, useAppDispatch, useAppSelector } from 'src/store';
import { Header, Footer, Newsletter, IconText } from 'src/components';
import { formatDate, isPast } from 'src/helpers'
import { sendMembersAPI } from 'src/store/requests';
import { IEvent } from 'src/interface';
import { crossIcon, calenderIcon, locationIcon, timeIcon, dotsIcon } from 'src/assets';
import { BackgroundImage, Container } from 'src/styled'
import './EventPage.css'

export const EventPage:FC<{type: string}> = ({type}) => {
  const { id = 0 } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { eventsNext, eventsPast } = useAppSelector(getEvents);

  const [event, setEvent] = useState<any>(null)
  const [completedMessege, setCompletedMessege] = useState('')
  const [completedClass, setCompletedClass] = useState('')
  const [crumbsEventsPage, setCrumbsEventsPage] = useState('')
  const [typeDate, setTypeDate] = useState('');

  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollToButton = () => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

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
      if (type === 'past') setCrumbsEventsPage('Прошедшие мероприятия');
      else setCrumbsEventsPage('Ближайшие мероприятия');

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
    // dispatch(sendMembersAPI({ members: sendMembers, id: event.id }));
    const newArray = sendMembers.map(item => ({ fullNameAndGroup: item }));
    dispatch(sendMembersAPI({ members: newArray, id: event.id }));
  }
  
  return (
    <>
    {event && event.id &&
      <>
      <Header/>
      <div className="wrapper">
        <section className="eventPage">
          <p className='crumbs'>
            // !!! Исправить на объект с данными
            <span onClick={() => navigate('/')}>Главная</span> / 
            <span onClick={() => navigate(`/${type}`)}>{crumbsEventsPage}</span>
          </p>
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
                  <IconText icon={calenderIcon} text={formatDate(event.date)} isBlueBox />
                  <IconText icon={locationIcon} text={event.location} />
                  <IconText icon={timeIcon} text={event.time} />
                  <IconText icon={dotsIcon} text={event.type} />
                  <p>{event.faculties.join(', ')}</p>
                </div>
              </div>
              {type === 'next' && event.visit === 'С регистрацией' &&
                <button className='button info__button' onClick={scrollToButton}>Зарегистрироваться</button>
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
                    <img src={crossIcon} alt="cross" onClick={() => deleteMember(value)} />
                  </div>
                )}
                <button className='second-button registration__btn-add' onClick={addMember}>Добавить участника</button>
                <button className='button registration__btn-send' onClick={sendMembers} ref={buttonRef}>Зарегистрироваться</button>
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

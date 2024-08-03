import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getEventAction, getEventItemSelector, getEventSelector, getEvents, useAppDispatch, useAppSelector } from 'src/store';
import { Header, Footer, Newsletter, IconText } from 'src/components';
import { eventExample, formatDate, isPast } from 'src/helpers'
import { sendMembersAPI } from 'src/store/requests';
import { IEvent } from 'src/interface';
import { crossIcon, calenderIcon, locationIcon, timeIcon, dotsIcon } from 'src/assets';
import { BackgroundImage, Container } from 'src/styled'
import './EventPage.css'

export const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const event = eventExample;
  // useAppSelector(getEventItemSelector);
  const { date, description, faculties, location, photo, time, title, type, visit, archive, results, page } = event;

  useEffect(() => {
    if (id) dispatch(getEventAction(+id));
  }, [])
  
  const [completedMessege, setCompletedMessege] = useState('')
  const [completedClass, setCompletedClass] = useState('')
  const [crumbsEventsPage, setCrumbsEventsPage] = useState('')
  const [typeDate, setTypeDate] = useState('');

  useEffect(() => {
    if (event) {
      const updateTypeDate = isPast(event.date) ? 'past' : 'next'; 
      setTypeDate(updateTypeDate);
      console.log(page, event)
      if (page === 'past') setCrumbsEventsPage('Прошедшие мероприятия');
      else setCrumbsEventsPage('Ближайшие мероприятия');

      if (page === 'past') {
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
  
  console.log(id)

  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="eventPage">
          <p className='crumbs'>
            <span onClick={() => navigate('/')}>Главная</span> / 
            <span onClick={() => navigate(`/${page}`)}> {crumbsEventsPage}</span>
          </p>
          <div className="eventPage__card">
            <div className="eventPage__image column-left">
              <Container>
                <BackgroundImage image={photo} />
              </Container>
            </div>
            <div className="eventPage__info">
              <div className="eventPage__info-up">
                <div className={`info__completed ${completedClass}`}>{completedMessege}</div>
                <h1>{title}</h1>
                <div className="info__options">
                  <IconText icon={calenderIcon} text={formatDate(date)} isBlueBox />
                  <IconText icon={locationIcon} text={location} />
                  <IconText icon={timeIcon} text={time} />
                  <IconText icon={dotsIcon} text={type} />
                  <p>{faculties.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="eventPage__description">
            <h2 className='column-left'>Описание мероприятия</h2>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
          {page === 'next' && visit === 'С регистрацией' &&
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
                <button className='button registration__btn-send' onClick={sendMembers}>Зарегистрироваться</button>
              </div>
            </div>
          }
          {page === 'past' && results &&
            <div className="eventPage__results">
              <h2 className='column-left'>Результаты мероприятия</h2>
              <div className="results__info">
                <p dangerouslySetInnerHTML={{ __html: results }}></p>
                {archive && <a href={archive} target='blank'>Архив с фотографиями</a>}
              </div>
            </div>
          }
        </section>
      </div>
      <Newsletter/>
      <Footer/>
    </>
  )
}

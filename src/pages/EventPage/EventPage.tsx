import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { clearEventMessages, getEventAction, getEventItemSelector, getEventSelector, setEventErrorLoading, setMainErrorLoadingEventMessage, useAppDispatch, useAppSelector } from 'src/store';
import { Header, Footer, Newsletter, IconText, Notification, MembersRegistration, Loading } from 'src/components';
import { formatDate } from 'src/helpers'
import { calenderIcon, locationIcon, timeIcon, dotsIcon } from 'src/assets';
import { BackgroundImage, Container } from 'src/styled'
import { EventPageData, eventPlug } from './config';
import './EventPage.css'

export const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, errorMessage, successMessage, isErrorLoading } = useAppSelector(getEventSelector);
  const event = useAppSelector(getEventItemSelector) || eventPlug;
  const { date, description, faculties, location, photo, time, title, type, visit, archive, results, page } = event;
  const { crumbs, visitMessage, visitClass } = EventPageData[page](visit);

  useEffect(() => {
    if (id) dispatch(getEventAction(+id));
  }, [])

  useEffect(() => {
    if (isErrorLoading) {
      navigate('/');
      dispatch(setMainErrorLoadingEventMessage('Ошибка при загрузке мероприятия'));
      dispatch(setEventErrorLoading(false));
    }
  }, [isErrorLoading]);

  const clearMessages = () => {
    dispatch(clearEventMessages());
  }

  return isLoading || isErrorLoading ? (
    <Loading isPage />
  ) : (
    <>
      <Header/>
      <div className="wrapper">
        <section className="eventPage">
          <p className='crumbs'>
            <span onClick={() => navigate('/')}>Главная</span> / 
            <span onClick={() => navigate(`/${page}`)}> {crumbs}</span>
          </p>
          <div className="eventPage__card">
            <div className="eventPage__image column-left">
              <Container>
                <BackgroundImage image={photo} />
              </Container>
            </div>
            <div className="eventPage__info">
              <div className="eventPage__info-up">
                <div className={`info__completed ${visitClass}`}>{visitMessage}</div>
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
          {visitClass === 'registration' &&
            <div className="eventPage__registration">
              <h2 className='column-left'>Регистрация на мероприятие</h2>
              <MembersRegistration />
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
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
      {successMessage && <Notification type='success' message={successMessage} clearMessage={clearMessages} />}
    </>
  )
}

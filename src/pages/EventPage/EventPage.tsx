import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { clearEventErrorMessage, clearEventMember, getEventAction, getEventItemSelector, getEventSelector, setEventMembers, setEventMembersAction, useAppDispatch, useAppSelector } from 'src/store';
import { Header, Footer, Newsletter, IconText, ErrorNotification, Input } from 'src/components';
import { eventExample, formatDate } from 'src/helpers'
import { crossIcon, calenderIcon, locationIcon, timeIcon, dotsIcon } from 'src/assets';
import { IMember } from 'src/interface';
import { eventMemberScheme } from 'src/validation';
import { BackgroundImage, Container } from 'src/styled'
import { EventPageData } from './config';
import './EventPage.css'

export const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { members, errorMessage } = useAppSelector(getEventSelector);
  const event = 
  // useAppSelector(getEventItemSelector) || 
  eventExample;
  const { date, description, faculties, location, photo, time, title, type, visit, archive, results, page } = event;
  const { crumbs, visitMessage, visitClass } = EventPageData[page](visit);

  useEffect(() => {
    if (id) dispatch(getEventAction(+id));
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid, errors },
  } = useForm<IMember>({
    mode: 'onSubmit',
    resolver: yupResolver(eventMemberScheme),
  });
  
  const onSubmit = (data: IMember) => {
    if (isValid) dispatch(setEventMembers(data));
    setValue('member', '');
  }
  const sendMembers = () => {
    if (isValid) dispatch(setEventMembers(getValues()));
    if (id) dispatch(setEventMembersAction(+id));
  }
  const deleteMember = (value: string) => {
    dispatch(clearEventMember(value));
  }
  const clearErrorMessage = () => {
    dispatch(clearEventErrorMessage());
  }

  return (
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
            <form className="eventPage__registration" onSubmit={handleSubmit(onSubmit)}>
              <h2 className='column-left'>Регистрация на мероприятие</h2>
              <div className="registration__fields">
                <Input 
                  id='member' 
                  register={register}
                  type="text" 
                  className='registration__input' 
                  placeholder='Группа, ФИО'
                  error={errors.member?.message}
                />
                {members.map((obj, i) => 
                  <div className='registration__member' key={i}>
                    <p>{obj.member}</p>
                    <img src={crossIcon} alt="cross" onClick={() => deleteMember(obj.member)} />
                  </div>
                )}
                <button type='submit' className='second-button registration__btn-add'>Добавить участника</button>
                <button type='button' className='button registration__btn-send' disabled={!members.length} onClick={sendMembers}>Зарегистрироваться</button>
              </div>
            </form>
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
      {errorMessage && <ErrorNotification message={errorMessage} clearMessage={clearErrorMessage} />}
    </>
  )
}

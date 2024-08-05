import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { clearEventMember, getEventAction, getEventSelector, setEventMembers, useAppDispatch, useAppSelector } from 'src/store';
import { Header, Footer, Newsletter, IconText } from 'src/components';
import { eventExample, formatDate } from 'src/helpers'
import { crossIcon, calenderIcon, locationIcon, timeIcon, dotsIcon } from 'src/assets';
import { IRegistrationForm } from 'src/interface';
import { eventMemberScheme } from 'src/validation';
import { BackgroundImage, Container } from 'src/styled'
import { EventPageData } from './config';
import './EventPage.css'

export const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { members, errorMessage } = useAppSelector(getEventSelector);
  const event = eventExample;
  // useAppSelector(getEventItemSelector);
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
    formState: { isValid },
  } = useForm<IRegistrationForm>({
    mode: 'onSubmit',
    resolver: yupResolver(eventMemberScheme),
  });
  
  const addMember = () => {
    dispatch(setEventMembers(getValues().member));
    setValue('member', '');
  }
  const deleteMember = (value: string) => {
    dispatch(clearEventMember(value));
  }
  const onSubmit = (data: IRegistrationForm) => {
    if (isValid) dispatch(setEventMembers(data.member));
    console.log('Отправить запрос');
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
                <input 
                  {...register('member')}
                  type="text" 
                  className='registration__input' 
                  placeholder='Группа, ФИО' 
                />
                {members.map((value, i) => 
                  <div className='registration__member' key={i}>
                    <p>{value}</p>
                    <img src={crossIcon} alt="cross" onClick={() => deleteMember(value)} />
                  </div>
                )}
                <button type='button' className='second-button registration__btn-add' onClick={addMember} disabled={!isValid}>Добавить участника</button>
                <button type='submit' className='button registration__btn-send'>Зарегистрироваться</button>
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
    </>
  )
}

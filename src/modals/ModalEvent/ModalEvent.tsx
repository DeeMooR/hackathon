import React, { FC, useEffect, useState } from 'react'
import './ModalEvent.css'
import ModalTemplate from '../ModalTemplate'
import { faculties, faculty__user, isPast } from 'src/helpers';
import TextInput from 'src/components/TextInput';
import FilterOptions from 'src/components/FilterOptions';
import RadioOptions from 'src/components/RadioOptions';
import { IAddEvent, IEvent } from 'src/interface';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { addEventAPI, updateEventAPI } from 'src/store/requests';

interface IModalEvent {
  isOpen: boolean,
  action: string,
  event?: IEvent,
  closeModal: () => void,
  clickShowDelete?: (id: number) => void,
}

const ModalEvent:FC<IModalEvent> = ({ isOpen, action, event, closeModal, clickShowDelete }) => {
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const {admin_name } = useSelector((state: any) => state.main);
  const [selected, setSelected] = useState<string[]>([admin_name]);
  const [selectedRadio1, setSelectedRadio1] = useState('');
  const [selectedRadio2, setSelectedRadio2] = useState('');

  const options = [...faculties, 'Все факультеты'];
  const optionsRadio1 = ['Культурное', 'Образовательное', 'Спортивное'];
  const optionsRadio2 = ['Свободный вход', 'С регистрацией'];

  const word_title = (action === 'add') ? 'Добавление' : 'Редактирование';
  const word_button = (action === 'add') ? 'Добавить' : 'Редактировать';

  const onClickRadio1 = (value: string) => {
    setSelectedRadio1(value);
  }
  const onClickRadio2 = (value: string) => {
    setSelectedRadio2(value);
  }
  const onClickOption = (value: string) => {
    if (value === faculty__user) return;
    if (value === 'Все факультеты') {
      if (!selected.includes(value)) setSelected(options);
      else setSelected([faculty__user]);
      return;
    }
    if (selected.length == 6 && !selected.includes(value)) {
      if (!selected.includes('Все факультеты')) setSelected(options);
      return;
    }
    if (selected.length == 8 && selected.includes(value) && value !== 'Все факультеты') {
      const newSelected = selected.filter((item) => item !== value && item !== 'Все факультеты');
      setSelected(newSelected);
      return;
    }
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    setSelected(newSelected);
  }

  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [location, setLocation] = useState('');

  const [results, setResults] = useState('');
  const [archive, setArchive] = useState('');

  useEffect(() => {
    if (event) {
      setSelected(event?.faculties);
      setSelectedRadio1(event?.type);
      setSelectedRadio2(event?.visit);
      setPhoto(event?.photo);
      setTitle(event?.title);
      setDescription(event?.description);
      setTime(event?.time);
      setDate(event?.date);
      setLocation(event?.location);
      setResults(event?.results);
      setArchive(event?.archive);
    }
  }, [event])

  const addEvent = () => {
    const obj: IAddEvent = {
      photo: photo,
      title: title,
      date: date,
      time: time,
      location: location,
      faculties: selected,
      description: description,
      type: selectedRadio1,
      visit: selectedRadio2
    }
    const hasEmpty = Object.values(obj).some(value => value === '');
    if (!hasEmpty) dispatch(addEventAPI(obj));
  }
  const changeEvent = () => {
    if (event) {
      const obj: IEvent = {
        id: event.id,
        photo: photo,
        title: title,
        date: date,
        time: time,
        location: location,
        faculties: selected,
        description: description,
        type: selectedRadio1,
        visit: selectedRadio2,
        results: results,
        archive: archive
      }
      dispatch(updateEventAPI(obj));
    }
  }

  return (
      <ModalTemplate isOpen={isOpen} closeModal={closeModal} positionUp>
        <div className="modalEvent">
          <h2><span>{word_title}</span> мероприятия</h2>
          <TextInput text='Обложка' type='text' value={photo} onChange={(v:string) => setPhoto(v)} placeholder='Вставьте ссылку на изображение'/>
          <TextInput text='Название' type='text' value={title} onChange={(v:string) => setTitle(v)}/>
          <div className="customTextarea">
            <h3>Описание</h3>
            <textarea value={description} onChange={(e: any) => setDescription(e.target.value)}></textarea>
          </div>
          {event?.date && isPast(event?.date) &&
          <>
            <div className="customTextarea">
              <h3>Результаты</h3>
              <textarea value={results} onChange={(e: any) => setResults(e.target.value)}></textarea>
            </div>
            <TextInput text='Архив с фото' type='text' value={archive} onChange={(v:string) => setArchive(v)}/>
          </>
          }
          <TextInput text='Время' type='time' value={time} onChange={(v:string) => setTime(v)}/>
          <TextInput text='Дата' type='date' value={date} onChange={(v:Date) => setDate(v)}/>
          <TextInput text='Место' type='text' value={location} onChange={(v:string) => setLocation(v)}/>
      
          <div className="modalEvent__select-box">
            <h3>Факультеты</h3>
            <FilterOptions options={options} selected={selected} onClickOption={onClickOption}/>
          </div>
          <div className="modalEvent__select-box">
            <h3>Вид мероприятия</h3>
            <RadioOptions name='radio1' options={optionsRadio1} selected={selectedRadio1} onClickOption={onClickRadio1}/>
          </div>
          <div className="modalEvent__select-box">
            <h3>Тип посещения</h3>
            <RadioOptions name='radio2' options={optionsRadio2} selected={selectedRadio2} onClickOption={onClickRadio2}/>
          </div>
          <button className='button' onClick={action === 'add' ? addEvent : changeEvent}>{word_button} мероприятие</button>
        </div>
        {action === 'change' && <p className='modalEvent__delete' onClick={() => clickShowDelete?.(event?.id || -1)}>Удалить мероприятие</p>}
      </ModalTemplate>
  )
}

export default ModalEvent

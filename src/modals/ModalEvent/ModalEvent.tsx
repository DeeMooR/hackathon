import React, { FC, useState } from 'react'
import './ModalEvent.css'
import ModalTemplate from '../ModalTemplate'
import { faculties, faculty__user } from 'src/helpers';
import TextInput from 'src/components/TextInput';
import FilterOptions from 'src/components/FilterOptions';
import RadioOptions from 'src/components/RadioOptions';

interface IModalEvent {
  isOpen: boolean,
  action: string,
  closeModal: () => void,
  clickShowDelete?: () => void,
  addEvent?: () => void,
  changeEvent?: () => void
}

const ModalEvent:FC<IModalEvent> = ({ isOpen, action, closeModal, clickShowDelete, addEvent, changeEvent }) => {
  const [selected, setSelected] = useState<string[]>([faculty__user]);
  const [selectedRadio1, setSelectedRadio1] = useState('Культурное');
  const [selectedRadio2, setSelectedRadio2] = useState('Свободный вход');

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

  return (
    <ModalTemplate isOpen={isOpen} closeModal={closeModal} positionUp>
      <div className="modalEvent">
        <h2><span>{word_title}</span> мероприятия</h2>
        <TextInput text='Обложка' type='text' placeholder='Вставьте ссылку на изображение'/>
        <TextInput text='Название' type='text'/>
        <TextInput text='Описание' type='text'/>
        <TextInput text='Время' type='text' placeholder='__:__'/>
        <TextInput text='Дата' type='text' placeholder='__.__.__'/>
        <TextInput text='Место' type='text'/>
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
      {action === 'change' && <p className='modalEvent__delete' onClick={clickShowDelete}>Удалить мероприятие</p>}
    </ModalTemplate>
  )
}

export default ModalEvent

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { clearModal, getAdminSelector, getModalActionSelector, getModalEventAction, getModalEventSelector, getModalSelector, setModalAction, useAppDispatch, useAppSelector } from 'src/store';
import { TextInput, FilterOptions, RadioOptions, TextTextarea, Loading, Wait } from 'src/components';
import { ModalEventData, ModalEventFuncAction, transformEventToDefaultValues } from './config';
import { allEventsTypes, allEventsVisits, allFaculties, eventPlug } from 'src/helpers';
import { ModalTemplate } from 'src/modals';
import { ICreateEventForm } from 'src/interface';
import './ModalEvent.css'

// при action: 'create' | 'change'
export const ModalEvent = () => {
  const dispatch = useAppDispatch();
  //@ts-ignore
  const action: 'create' | 'change' = useAppSelector(getModalActionSelector);
  const event = useAppSelector(getModalEventSelector);
  const { eventId, isLoading } = useAppSelector(getModalSelector);
  const { adminName } = useAppSelector(getAdminSelector); 
  const { buttonText, wordTitle } = ModalEventData[action];
  const faculty = allFaculties.includes(adminName) ? adminName : null;
  const faculties = [...allFaculties, 'Все факультеты'];

  const [selected, setSelected] = useState<string[]>([adminName]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedVisit, setSelectedVisit] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateEventForm>({
    mode: 'onChange',
    // resolver: yupResolver(createEventScheme),
  });
  
  useEffect(() => {
    if (eventId) dispatch(getModalEventAction(eventId));
  }, [eventId]);

  useEffect(() => {
    if (event) reset(transformEventToDefaultValues(event));
  }, [event]);

  const closeModal = () => {
    dispatch(clearModal());
  }

  const onClickRadio1 = (value: string) => {
    setSelectedType(value);
  }
  const onClickRadio2 = (value: string) => {
    setSelectedVisit(value);
  }
  const onClickOption = (value: string) => {
    if (value === adminName) return;
    if (value === 'Все факультеты') {
      if (!selected.includes(value)) setSelected(faculties);
      else setSelected([adminName]);
      return;
    }
    if (selected.length == 6 && !selected.includes(value)) {
      if (!selected.includes('Все факультеты')) setSelected(faculties);
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

  const clickSend = (data: ICreateEventForm) => {
    const body = {
      ...data,
      faculties: selected,
      type: selectedType,
      visit: selectedVisit
    }
    const page = event?.page || 'next';
    const obj = {body, page, faculty};
    const func = ModalEventFuncAction[action](obj);
    dispatch(func);
  }

  const clickDeleteEvent = () => {
    dispatch(setModalAction('delete'));
  }

  return (
  <>
    {Wait(true) &&
      <ModalTemplate closeModal={closeModal} positionUp>
        <form className="modalEvent" onSubmit={handleSubmit(clickSend)}>
          <h2><span>{wordTitle}</span> мероприятия</h2>
          {isLoading ? <Loading /> : 
          <>
            <TextInput 
              text='Обложка' 
              id='photo'
              register={register}
              type='text' 
              placeholder='Вставьте ссылку на изображение'
              error={errors.photo?.message}
            />
            <TextInput 
              text='Название' 
              id='title'
              register={register}
              type='text' 
              error={errors.title?.message}
            />
            <TextTextarea 
              text='Описание' 
              id='description'
              register={register}
              error={errors.description?.message}
            />
            {event?.page === 'past' &&
            <>
              <TextTextarea 
                text='Результаты' 
                id='results'
                register={register}
                error={errors.results?.message}
              />
              <TextInput 
                text='Архив с фото' 
                id='archive'
                register={register}
                type='text' 
                error={errors.archive?.message}
              />
            </>
            }
            <TextInput 
              text='Время' 
              id='time'
              register={register}
              type='time' 
              error={errors.time?.message}
            />
            <TextInput 
              text='Дата' 
              id='date'
              register={register}
              type='date' 
              error={errors.date?.message}
            />
            <TextInput 
              text='Место' 
              id='location'
              register={register}
              type='text' 
              error={errors.location?.message}
            />
        
            <div className="modalEvent__select-box">
              <h3>Факультеты</h3>
              <FilterOptions options={faculties} selected={selected} onClickOption={() => onClickOption}/>
            </div>
            <div className="modalEvent__select-box">
              <h3>Вид мероприятия</h3>
              <RadioOptions name='type' options={allEventsTypes} selected={selectedType} onClickOption={onClickRadio1}/>
            </div>
            <div className="modalEvent__select-box">
              <h3>Тип посещения</h3>
              <RadioOptions name='visit' options={allEventsVisits} selected={selectedVisit} onClickOption={onClickRadio2}/>
            </div>
            <button className='button'>{buttonText}</button>
            {action === 'change' && <p className='modalEvent__delete' onClick={clickDeleteEvent}>Удалить мероприятие</p>}
          </>
          }
        </form>
      </ModalTemplate>
    }
  </>
  )
}

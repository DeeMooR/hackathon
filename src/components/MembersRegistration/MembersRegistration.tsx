import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setEventErrorMessage, setEventMembersAction, useAppDispatch } from 'src/store';
import { Input } from 'src/components';
import { IMember, IMemberForm } from 'src/interface';
import { eventMemberScheme } from 'src/validation';
import { minusIcon, plusIcon } from 'src/assets';
import { memberAlreadyExist, removeMember } from './config';
import './MembersRegistration.css';

export const MembersRegistration = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [members, setMembers] = useState<IMember[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid, errors,  },
  } = useForm<IMemberForm>({
    mode: 'onSubmit',
    resolver: yupResolver(eventMemberScheme),
    defaultValues: {team: 'empty'}
  });

  // после изменения участников обновить поле team, чтобы оно оставалось валидным
  const updateTeam = (members: IMember[], team?: string) => {
    if (team === 'empty') setValue('team', '');
    if (!members.length) setValue('team', 'empty');
  }

  // добавить участника
  const addMember = (data: IMemberForm) => {
    const {team, ...user} = data;
    const isNewMember = !memberAlreadyExist(members, user);
    reset(); // очистить все поля и затем установить team
    setValue('team', team); 
    if (isNewMember) {
      const updatedMembers = [user, ...members];
      setMembers(updatedMembers);
      updateTeam(updatedMembers, team);
      return updatedMembers;
    } else {
      dispatch(setEventErrorMessage('Такой участник уже добавлен'));
    }
  }
  
  // добавить участника и отправить запрос
  const sendMembers = () => {
    const data = getValues();
    const updatedMembers = addMember(data);
    if (updatedMembers && id) {
      const newTeam = (data.team === 'empty') ? null : data.team;
      const body = {team: newTeam, members: updatedMembers}
      dispatch(setEventMembersAction({id, body}));
      setMembers([]);
      setValue('team', 'empty');
    }
  }

  // удалить участника
  const deleteMember = (user: IMember) => {
    const updatedMembers = removeMember(members, user);
    setMembers(updatedMembers);
    updateTeam(updatedMembers);
  }

  return (
    <div className="membersRegistration">
      <form className="membersRegistration__fields" onSubmit={handleSubmit(addMember)}>
        {!!members.length &&
          <div className="fields__team">
            <Input
              id='team'
              register={register}
              type="text"
              placeholder='Название команды'
              className='input__team' 
              error={errors.team?.message}
            />
          </div>
        }
        <div className="fields__member">
          <Input
            id='name'
            register={register}
            type="text" 
            placeholder='Имя'
            error={errors.name?.message}
          />
          <Input
            id='surname'
            register={register}
            type="text" 
            placeholder='Фамилия'
            error={errors.surname?.message}
          />
          <Input
            id='group'
            register={register}
            type="text"
            placeholder='Группа'
            error={errors.group?.message}
          />
          <button type='submit' className='member__button'>
            <img src={plusIcon} alt="plus" />
          </button>
        </div>
      </form>
      {members.map((obj, i) => 
        <div className='membersRegistration__member' key={i}>
          <p className='member__field'>{obj.name}</p>
          <p className='member__field'>{obj.surname}</p>
          <p className='member__field'>{obj.group}</p>
          <button type='button' className='member__button' onClick={() => deleteMember(obj)}>
            <img src={minusIcon} alt="minus" />
          </button>
        </div>
      )}
      <button type='button' className='button membersRegistration__btn-send' disabled={!isValid} onClick={sendMembers}>Зарегистрироваться</button>
    </div>
  )
}
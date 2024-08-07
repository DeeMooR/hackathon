import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { clearEventAllMembers, clearEventMember, getEventSelector, setEventMembers, setEventMembersAction, useAppDispatch, useAppSelector } from 'src/store';
import { Input } from 'src/components';
import { IMember, IMemberForm } from 'src/interface';
import { eventMemberScheme } from 'src/validation';
import { minusIcon, plusIcon } from 'src/assets';
import './MembersRegistration.css';

export const MembersRegistration = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { members } = useAppSelector(getEventSelector);

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
  });

  useEffect(() => {
    const { team } = getValues();
    if (team === 'empty') setValue('team', '');
    if (!members.length) setValue('team', 'empty');
  }, [members])
  
  const onSubmit = (data: IMemberForm) => {
    const {team, ...user} = data;
    dispatch(setEventMembers(user));
    reset();
    setValue('team', team);
  }
  const sendMembers = () => {
    const {team, ...user} = getValues();
    dispatch(setEventMembers(user));
    if (id) dispatch(setEventMembersAction({id: +id, team}));
    dispatch(clearEventAllMembers());
    reset();
  }
  const deleteMember = (obj: IMember) => {
    dispatch(clearEventMember(obj));
  }

  return (
    <div className="membersRegistration">
      <form className="membersRegistration__fields" onSubmit={handleSubmit(onSubmit)}>
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
            className='input__name' 
            error={errors.name?.message}
          />
          <Input
            id='surname'
            register={register}
            type="text" 
            placeholder='Фамилия'
            className='input__surname' 
            error={errors.surname?.message}
          />
          <Input
            id='group'
            register={register}
            type="text"
            placeholder='Группа'
            className='input__group'
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
import React, { FC, useEffect } from 'react'
import { clearAdminModal, getAdminModalSelector, getAdminSelector, getEventMembersAction, useAppDispatch, useAppSelector } from 'src/store';
import { ModalTemplate } from 'src/modals';
import './ModalMembers.css';
import { Loading } from 'src/components';

export const ModalMembers = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(getAdminSelector);
  const { eventId, teams, members: onlyMembers } = useAppSelector(getAdminModalSelector);
 
  useEffect(() => {
    if (eventId) dispatch(getEventMembersAction(eventId));
  }, []);

  const closeModal = () => {
    dispatch(clearAdminModal());
  }

  return (
    <ModalTemplate closeModal={closeModal}>
      <div className="modalMembers">
        <h2>Список участников</h2>
        {isLoading ? <Loading /> : 
        <>
          {!!teams.length &&
            <div className="modalMembers__category">
              <h3 className='category__title'>Команды:</h3>
              <ol className="category__teams">
                {teams.map(({team, members}, i) => 
                  <li className='category__team' key={i}>
                    <p className='team__title'>{team}</p>
                    <div className="team__members">
                      {members.map(({groupNumber, name, surname}) =>
                        <p className='team__member'>{groupNumber} {surname} {name}</p>
                      )}
                    </div>
                  </li>
                )}
              </ol>
            </div>
          }
          {!!onlyMembers.length && 
          <div className="modalMembers__category">
           <h3 className='category__title'>Участники без команд:</h3>
            <ol className="category__members">
              {onlyMembers.map(({groupNumber, name, surname}) =>
                <li className='category__member'>{groupNumber} {surname} {name}</li>
              )}
            </ol>
          </div>
          }
        </>
        }
        <button className='button' onClick={closeModal}>Назад</button>
      </div>
    </ModalTemplate>
  )
}

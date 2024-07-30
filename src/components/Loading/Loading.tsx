import React, { FC, useEffect, useState } from 'react'
import './Loading.css'

interface ILoading {
  delay?: number,
}

export const Loading:FC<ILoading> = ({ delay = 0 }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // отложенное отображение loader
    const timeout = setTimeout(() => {
      setIsActive(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return isActive ? (
    <div className='loading'>
      <div className='loading__spinner' />
    </div>
  ) : null;
}

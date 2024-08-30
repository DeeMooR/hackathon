import { useEffect, useState } from 'react';

export const Wait = (isLoading: boolean, delay: number = 50) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShow(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isLoading, delay]);

  return show;
}
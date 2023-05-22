import { RefObject, useEffect } from 'react';

/* const useClickOutsideDiv = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref?.current && !ref?.current?.contains(e.target as Node)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};
 */
const useClickOutsideDiv = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);
};
export default useClickOutsideDiv;

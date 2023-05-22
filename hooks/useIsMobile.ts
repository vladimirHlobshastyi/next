import { useMemo } from 'react';

export const useIsMobile = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const isMobileMemo = useMemo(() => isMobile, [isMobile]);
  return isMobileMemo;
};

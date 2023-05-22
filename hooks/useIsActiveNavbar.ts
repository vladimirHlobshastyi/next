import { useMemo } from 'react';

type useIsActiveNavbarType = { path: string; variableString: string };

const useIsActiveNavbar = ({ path, variableString }: useIsActiveNavbarType) => {
  const checkIsActive = useMemo(() => {
    if (path === variableString) {
      return true;
    }
    return false;
  }, [path, variableString]);
  return checkIsActive;
};
export default useIsActiveNavbar;

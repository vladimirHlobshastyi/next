import { useMemo } from 'react';
import ControlCountComponent from '../components/ControlCountComponent/ControlCountComponent';

function useControlCount(totalCount: number) {
  return useMemo(
    () => (totalCount ? <ControlCountComponent countProductsInCart={totalCount} /> : null),
    [totalCount]
  );
}

export default useControlCount;

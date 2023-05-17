import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

const useRootDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return dispatch;
};

export default useRootDispatch;

import useAppSelector from "./useAppSelector";
import { isAuthState, isLoadingAuthState } from "../store/auth/authSlice";

const useIsAuth = () => {
  const isAuth = useAppSelector(isAuthState);
  const isLoading = useAppSelector(isLoadingAuthState);

  if (isAuth && !isLoading) {
    return { isAuth, isLoading };
  }
  return { isAuth: false, isLoading: false };
};

export default useIsAuth;

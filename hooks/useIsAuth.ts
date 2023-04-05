import { useRouter } from "next/router";
import { useEffect } from "react";
import useAppSelector from "./useAppSelector";
import { isAuthState, isLoadingAuthState } from "../store/auth/authSlice";

const useIsAuth = () => {
  const router = useRouter();
  const isAuth = useAppSelector(isAuthState);
  const isLoading = useAppSelector(isLoadingAuthState);

  useEffect(() => {
    if (!isAuth && !isLoading) {
      router.push("/login");
    }
  }, [isAuth, isLoading]);

  if (isAuth && !isLoading) {
    return { isAuth, isLoading };
  } else {
    return { isAuth: false, isLoading: false };
  }
};

export default useIsAuth;


import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/configs/redux/hooks";
import { fetchLoggedInUser } from "@/configs/redux/auth/authSlice";
import axios from "axios";


interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const useSaveTokens = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const SaveTokensToLocal = (Tokens: Tokens): void => {
    const HandleFetchUser = (): void => {
      dispatch(fetchLoggedInUser());
    }
    localStorage.setItem('accessToken', Tokens.accessToken);
    const cookieName = "refreshToken";
    const cookieValue = Tokens.refreshToken;
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/; SameSite=strict`;
    HandleFetchUser();
    router.push('/');
  }
  return SaveTokensToLocal;
}

import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useCallback,
} from 'react';
import { CredentialResponse, googleLogout } from '@react-oauth/google';

interface GoogleAuth {
  jwt: string;
}

interface Auth {
  googleAuth: GoogleAuth;
  onLoginSuccess: (googleLoginResponse: CredentialResponse) => void;
  onLoginFailure: () => void;
  onClickLogout: () => void;
}

const defaultAuth: Auth = {
  googleAuth: {
    jwt: '',
  },
  onLoginSuccess: () => {},
  onLoginFailure: () => {},
  onClickLogout: () => {},
};

const AuthContext = createContext<Auth>(defaultAuth);

export const useAuthContext = () => useContext(AuthContext);

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [googleAuth, setGoogleAuth] = useState<GoogleAuth>(
    defaultAuth.googleAuth
  );

  const onLoginSuccess = useCallback(
    (googleLoginResponse: CredentialResponse) => {
      if (googleLoginResponse.credential) {
        setGoogleAuth({ jwt: googleLoginResponse.credential });
      }
    },
    []
  );

  const onLoginFailure = useCallback(() => {}, []);

  const onClickLogout = useCallback(() => {
    setGoogleAuth(defaultAuth.googleAuth);
    googleLogout();
  }, []);

  return (
    <AuthContext.Provider
      value={{ googleAuth, onLoginSuccess, onLoginFailure, onClickLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

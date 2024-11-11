import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useCallback,
} from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { CredentialResponse, googleLogout } from '@react-oauth/google';

interface GoogleJwtDecoded extends JwtPayload {
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string; // first name
  family_name?: string; // last name
  picture?: string;
}

interface GoogleAuth {
  jwt: string;
  decoded: GoogleJwtDecoded;
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
    decoded: {},
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

  const onLoginSuccess = useCallback(({ credential }: CredentialResponse) => {
    if (!credential) return;

    const decoded: GoogleJwtDecoded = jwtDecode(credential);
    if (!decoded) return;

    setGoogleAuth({ jwt: credential, decoded });
  }, []);

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

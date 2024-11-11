import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  defaultLocation as defaultLocationUtil,
  getCurrentLocationAsync,
} from 'utils/locationUtils';

export interface LocationState {
  latitude: string;
  longitude: string;
  timestamp: string;
}

const defaultLocation: LocationState = {
  timestamp: defaultLocationUtil.timestamp.toString(),
  latitude: defaultLocationUtil.coords.latitude.toString(),
  longitude: defaultLocationUtil.coords.longitude.toString(),
};

const LocationContext = createContext(defaultLocation);

export const useLocationContext = () => useContext(LocationContext);

export interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [location, setLocation] = useState(defaultLocation);

  useEffect(() => {
    getCurrentLocationAsync().then(({ timestamp, coords }) =>
      setLocation({
        timestamp: timestamp.toString(),
        latitude: coords.latitude.toString(),
        longitude: coords.longitude.toString(),
      })
    );
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
}

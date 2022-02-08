import React, { createContext, useState, useEffect } from 'react';

declare type LocationContextType = {
  latitude: number;
  longitude: number;
  fetchLocation: () => void;
};

const defaultLocation: LocationContextType = {
  latitude: 41.882691985764495, // Chicago
  longitude: -87.62336315997155, // Chicago
  fetchLocation: () => {},
};

export const LocationContext =
  createContext<LocationContextType>(defaultLocation);

export const LocationProvider: React.FC = ({ children }) => {
  const [location, setLocation] =
    useState<LocationContextType>(defaultLocation);

  const fetchLocation = () => {
    const onSuccess = (position: GeolocationPosition) =>
      setLocation({
        ...location,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    const onFailure = () => setLocation(defaultLocation);

    if (window?.navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
    } else {
      setLocation(defaultLocation);
    }
  };

  // fetch location on initial render
  useEffect(() => {
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};

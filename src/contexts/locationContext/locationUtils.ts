export const defaultLocation: GeolocationPosition = {
  timestamp: 0,
  coords: {
    latitude: 41.882691985764495, // Chicago
    longitude: -87.62336315997155, // Chicago
    accuracy: 0.0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  },
};

declare type GetCurrentLocationAsync = () => Promise<GeolocationPosition>;

export const getCurrentLocationAsync: GetCurrentLocationAsync = () =>
  new Promise((resolve) => {
    !window?.navigator?.geolocation
      ? resolve(defaultLocation)
      : window.navigator.geolocation.getCurrentPosition(
          (position) => resolve(position), // onSuccess
          () => resolve(defaultLocation) // onFailure
        );
  });

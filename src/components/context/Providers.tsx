import React from 'react';
import { LocationProvider } from './LocationContext';

export const Providers: React.FC = ({ children }) => (
  <LocationProvider>{children}</LocationProvider>
);

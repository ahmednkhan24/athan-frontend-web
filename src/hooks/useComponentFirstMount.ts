import { useEffect, EffectCallback } from 'react';

const useComponentFirstMount = (callback: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};

export default useComponentFirstMount;

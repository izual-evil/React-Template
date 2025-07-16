import { useContext } from 'react';

import { AppContext } from '@/contexts';

const useAppContext = () => {
  const appContext = useContext(AppContext);

  return {
    appContext,
  };
};
export default useAppContext;

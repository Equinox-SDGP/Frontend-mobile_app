import { createContext, useContext } from 'react';

export const SpaceContext = createContext();

export function useSpaceContext() {
  const spaceData = useContext(SpaceContext);

  if (spaceData === undefined) {
    throw new Error('useSpaceContext must be used within a SpaceContext.Provider');
  }
  return spaceData;
}

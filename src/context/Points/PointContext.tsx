import React, { ReactNode, createContext, useContext, useState } from 'react';

interface PointContextType {
  isEnrolled: boolean | null;
  setIsEnrolled: (value: boolean) => void;
}

export const PointContext = createContext<PointContextType | undefined>(undefined);

export function PointContextProvider({ children }: { children: ReactNode }) {
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);

  return (
    <PointContext.Provider value={{ isEnrolled, setIsEnrolled }}>{children}</PointContext.Provider>
  );
}

export function usePointContext(): PointContextType {
  const context = useContext(PointContext);
  if (!context) {
    throw new Error('usePointContext must be used within a PointContextProvider');
  }
  return context;
}

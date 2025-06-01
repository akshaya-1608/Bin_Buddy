import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [resultData, setResultData] = useState(null);

  return (
    <AppContext.Provider value={{ image, setImage, resultData, setResultData }}>
      {children}
    </AppContext.Provider>
  );
};
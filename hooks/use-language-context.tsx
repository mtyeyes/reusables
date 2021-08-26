import React, { createContext, useContext, useState } from 'react';

type LanguageContext = {
  language: Language;
  changeLanguage: ChangeLanguage;
};

type Language = 'en' | 'ru';

type ChangeLanguage = (language: Language) => void;

const LanguageContext = createContext({} as LanguageContext);

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageContextProvider: React.FC = ({ children }) => {
  const isRussian = typeof window === 'object' && navigator.languages.includes('ru');
  const [language, setLanguage] = useState<Language>( isRussian ? 'ru' : 'en');

  const changeLanguage: ChangeLanguage = (language) => {
    setLanguage(language);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

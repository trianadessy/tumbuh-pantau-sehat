import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { translations, Language, TranslationKey } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  tArray: (key: TranslationKey) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("appLanguage");
    return (stored === "en" || stored === "id") ? stored : "id";
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("appLanguage", lang);
  }, []);

  const t = useCallback((key: TranslationKey, params?: Record<string, string | number>): string => {
    const entry = translations[key];
    if (!entry) return key;
    const val = entry[language];
    if (Array.isArray(val)) return val.join(", ");
    let result = val as string;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        result = result.replace(`{${k}}`, String(v));
      });
    }
    return result;
  }, [language]);

  const tArray = useCallback((key: TranslationKey): string[] => {
    const entry = translations[key];
    if (!entry) return [];
    const val = entry[language];
    return Array.isArray(val) ? val : [val as string];
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

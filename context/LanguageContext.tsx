"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LanguageContextType {
  locale: string;
  t: (key: string) => string;
  setLocale: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState("pl");
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedLocale = localStorage.getItem("language");

    if (savedLocale) {
      setLocale(savedLocale);
    } else {
      // Pobierz język przeglądarki i ustaw domyślnie, jeśli nie zapisano w localStorage
      const browserLang = navigator.language.split("-")[0]; // "pl-PL" -> "pl"
      const supportedLangs = ["pl", "en"]; // Lista obsługiwanych języków

      if (supportedLangs.includes(browserLang)) {
        setLocale(browserLang);
      } else {
        setLocale("en"); // Domyślny język, jeśli przeglądarka ma inny
      }
    }
  }, []);

  useEffect(() => {
    async function loadTranslations() {
      const res = await import(`@/locales/${locale}.json`);
      setTranslations(res.default);
    }
    loadTranslations();

    localStorage.setItem("language", locale);
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, t: (key) => translations[key] || key, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

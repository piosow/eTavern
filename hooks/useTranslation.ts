import { useState, useEffect } from "react";

export default function useTranslation() {
  const [locale, setLocale] = useState("pl");
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadTranslations() {
      const res = await import(`@/locales/${locale}.json`);
      setTranslations(res.default);
    }
    loadTranslations();
  }, [locale]);

  return { t: (key: string) => translations[key] || key, setLocale };
}

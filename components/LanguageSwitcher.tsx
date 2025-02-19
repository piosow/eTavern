"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
      className="p-2 bg-gray-700 rounded text-white"
    >
      <option value="pl">🇵🇱</option>
      <option value="en">🇬🇧</option>
    </select>
  );
}

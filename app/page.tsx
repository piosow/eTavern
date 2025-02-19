"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="text-center mt-10 fade-in">
      <h1 className="text-3xl font-bold">{t("welcome_message")}</h1>
    </div>
  );
}

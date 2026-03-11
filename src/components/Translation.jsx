"use client";
import { useLanguage } from "@/contexts/LanguageProvider";

const Translation = ({ en, bn }) => {
  const { language } = useLanguage();
  return <>{language === "bn" ? bn : en}</>;
};

export default Translation;

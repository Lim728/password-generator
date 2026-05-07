import React, { createContext, useContext, useState, useEffect } from "react";
import en from "@/locales/en.json";
import zh from "@/locales/zh.json";

type Language = "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en,
  zh,
};

function getNestedValue(obj: any, path: string): string {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      return path; // 返回原始路径作为后备
    }
  }

  return typeof result === "string" ? result : path;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // 从本地存储读取语言设置
    const saved = localStorage.getItem("language");
    return (saved as Language) || "zh";
  });

  useEffect(() => {
    // 保存语言设置到本地存储
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[language];
    return getNestedValue(translation, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

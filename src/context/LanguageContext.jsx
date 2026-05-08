import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    dashboard: "Dashboard",
    completed: "Completed Goals",
    newGoal: "New Goal",
  },
  fa: {
    dashboard: "داشبورد",
    completed: "اهداف تکمیل‌شده",
    newGoal: "هدف جدید",
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });

  // 🌍 set direction + persist
  useEffect(() => {
    const isRTL = lang === "fa";

    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";

    localStorage.setItem("lang", lang);
  }, [lang]);

  // 🧠 translation function
  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);

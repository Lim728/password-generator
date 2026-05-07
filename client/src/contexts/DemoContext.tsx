import React, { createContext, useContext, useState, useEffect } from "react";

interface DemoContextType {
  isDemo: boolean;
  setIsDemo: (demo: boolean) => void;
  clearDemoData: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // 检查是否是演示模式
    const demoMode = localStorage.getItem("demoMode") === "true";
    setIsDemo(demoMode);
  }, []);

  const clearDemoData = () => {
    // 清除演示数据
    localStorage.removeItem("passwordHistory");
    localStorage.removeItem("user");
    localStorage.removeItem("demoMode");
    setIsDemo(false);
  };

  return (
    <DemoContext.Provider value={{ isDemo, setIsDemo, clearDemoData }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return context;
}

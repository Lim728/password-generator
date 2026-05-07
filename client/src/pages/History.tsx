import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { ArrowLeft, Copy, Trash2 } from "lucide-react";

interface HistoryItem {
  id: number;
  passwords: string[];
  options: {
    length: number;
    useUppercase: boolean;
    useLowercase: boolean;
    useNumbers: boolean;
    useSpecialChars: boolean;
  };
  createdAt: string;
}

export default function History() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      setLocation("/login");
      return;
    }

    // 从本地存储加载历史记录
    const savedHistory = localStorage.getItem("passwordHistory");
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);
      } catch (error) {
        console.error("Failed to parse history:", error);
      }
    }
    setIsLoading(false);
  }, [setLocation]);

  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    toast.success(t("history.passwordCopied"));
  };

  const handleDeleteHistory = (id: number) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    
    // 更新本地存储
    const updatedHistory = history.filter((item) => item.id !== id);
    localStorage.setItem("passwordHistory", JSON.stringify(updatedHistory));
    
    toast.success(t("history.historyDeleted"));
  };

  const handleClearAll = () => {
    if (confirm(t("history.clearAllConfirm"))) {
      setHistory([]);
      localStorage.removeItem("passwordHistory");
      toast.success(t("history.allHistoryCleared"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation("/dashboard")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("common.back")}
            </Button>
            <h1 className="font-display text-2xl text-foreground">
              {t("history.title")}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {history.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearAll}
              >
                {t("history.clearAll")}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="font-body text-muted-foreground">
              {t("messages.loading")}
            </p>
          </div>
        ) : history.length === 0 ? (
          <Card className="glass-card p-12 rounded-lg border-0 text-center">
            <p className="font-body text-muted-foreground text-lg">
              {t("history.noHistory")}
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <Card
                key={item.id}
                className="glass-card p-6 rounded-lg border-0"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-heading text-foreground">
                      {t("history.record")} #{history.length - index}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteHistory(item.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mb-4">
                  <p className="font-body text-muted-foreground text-sm mb-2">
                    {t("history.options")}: {t("history.length")} {item.options.length}
                    {item.options.useUppercase && ` • ${t("history.uppercase")}`}
                    {item.options.useLowercase && ` • ${t("history.lowercase")}`}
                    {item.options.useNumbers && ` • ${t("history.numbers")}`}
                    {item.options.useSpecialChars && ` • ${t("history.specialChars")}`}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.passwords.map((password, pwIndex) => (
                    <div
                      key={pwIndex}
                      className="flex items-center justify-between gap-2 p-3 bg-white/50 rounded-lg"
                    >
                      <code className="font-mono text-sm text-foreground break-all flex-1">
                        {password}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyPassword(password)}
                        className="flex-shrink-0 text-primary hover:bg-primary/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Button
        variant={language === "zh" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("zh")}
        className="px-3"
      >
        中文
      </Button>
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="px-3"
      >
        EN
      </Button>
    </div>
  );
}

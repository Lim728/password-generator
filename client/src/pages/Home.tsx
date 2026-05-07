import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Lock, Zap, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    // Check是否已登录
    const user = localStorage.getItem("user");
    if (user) {
      setLocation("/dashboard");
    }
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl text-foreground">
            {t("home.title")}
          </h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              onClick={() => setLocation("/login")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {t("common.login")}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-6xl text-foreground mb-6">
            {t("home.title")}
          </h2>
          <p className="font-body text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("home.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation("/login")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            >
              {t("home.getStarted")}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setLocation("/login")}
            >
              {t("home.learnMore")}
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass-card p-8 rounded-2xl border-0 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Zap className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="font-heading text-lg text-foreground mb-2">
              {t("home.features.fastGenerate")}
            </h3>
            <p className="font-body text-muted-foreground">
              {t("home.features.fastGenerateDesc")}
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border-0 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="font-heading text-lg text-foreground mb-2">
              {t("home.features.strengthAssess")}
            </h3>
            <p className="font-body text-muted-foreground">
              {t("home.features.strengthAssessDesc")}
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border-0 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="font-heading text-lg text-foreground mb-2">
              {t("home.features.privacy")}
            </h3>
            <p className="font-body text-muted-foreground">
              {t("home.features.privacyDesc")}
            </p>
          </div>
        </div>

        {/* 功能列表 */}
        <div className="glass-card p-12 rounded-2xl border-0 mb-20">
          <h3 className="font-heading text-2xl text-foreground mb-8 text-center">
            {t("home.fullFeatures")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-heading text-foreground">
                  {t("home.customLength")}
                </h4>
                <p className="font-body text-muted-foreground text-sm">
                  {t("home.customLengthDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-heading text-foreground">
                  {t("home.characterTypes")}
                </h4>
                <p className="font-body text-muted-foreground text-sm">
                  {t("home.characterTypesDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-heading text-foreground">
                  {t("home.historyRecords")}
                </h4>
                <p className="font-body text-muted-foreground text-sm">
                  {t("home.historyRecordsDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-heading text-foreground">
                  {t("home.personalization")}
                </h4>
                <p className="font-body text-muted-foreground text-sm">
                  {t("home.personalizationDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-heading text-foreground">
                  {t("home.quickCopy")}
                </h4>
                <p className="font-body text-muted-foreground text-sm">
                  {t("home.quickCopyDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-heading text-foreground">
                  {t("home.userAccount")}
                </h4>
                <p className="font-body text-muted-foreground text-sm">
                  {t("home.userAccountDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部CTA */}
        <div className="text-center">
          <h3 className="font-heading text-2xl text-foreground mb-4">
            {t("home.readyToStart")}
          </h3>
          <p className="font-body text-muted-foreground mb-6">
            {t("home.readyToStartDesc")}
          </p>
          <Button
            onClick={() => setLocation("/login")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 mx-auto"
          >
            {t("home.getStarted")}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="font-body text-muted-foreground">
            {t("home.footer")}
          </p>
        </div>
      </footer>
    </div>
  );
}

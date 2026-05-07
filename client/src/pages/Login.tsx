import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDemo } from "@/contexts/DemoContext";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const { setIsDemo } = useDemo();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "admin",
    password: "admin123",
    confirmPassword: "",
  });

  const handleDemoLogin = () => {
    // 演示模式登录
    const demoUser = {
      id: 0,
      username: "Demo User",
      email: "demo@example.com",
      role: "user",
      isDemo: true,
    };
    localStorage.setItem("user", JSON.stringify(demoUser));
    localStorage.setItem("demoMode", "true");
    setIsDemo(true);
    toast.success("进入演示模式");
    setLocation("/dashboard");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("请填写所有字段");
      return;
    }

    setIsLoading(true);

    try {
      // 演示账号验证
      if (formData.username === "admin" && formData.password === "admin123") {
        const user = {
          id: 1,
          username: "admin",
          email: "admin@example.com",
          role: "admin",
          isDemo: false,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("demoMode", "false");
        setIsDemo(false);
        toast.success("登录成功");
        setLocation("/dashboard");
      } else {
        toast.error("用户名或密码错误");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("请填写所有字段");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("两次输入的密码不一致");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("密码长度至少6个字符");
      return;
    }

    setIsLoading(true);

    try {
      // 创建新用户（实际应该调用后端API）
      const user = {
        id: Date.now(),
        username: formData.username,
        email: `${formData.username}@example.com`,
        role: "user",
        isDemo: false,
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("demoMode", "false");
      setIsDemo(false);
      toast.success("注册成功");
      setLocation("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (isRegister) {
      handleRegister(e);
    } else {
      handleLogin(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl text-foreground">
            {t("login.title")}
          </h1>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="glass-card p-8 rounded-2xl border-0 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl text-foreground mb-2">
              {isRegister ? "创建账户" : t("login.title")}
            </h2>
            <p className="font-body text-muted-foreground text-sm">
              {isRegister
                ? "注册新账户以永久保存您的数据"
                : "登录以访问您的账户"}
            </p>
          </div>

          {/* 演示账号提示 */}
          {!isRegister && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="font-body text-xs text-blue-900 mb-2">
                {t("login.demoAccount")}
              </p>
              <p className="font-mono text-xs text-blue-800">
                admin / admin123
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="font-heading text-foreground">
                {t("login.username")}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder={t("login.username")}
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-heading text-foreground">
                {t("login.password")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t("login.password")}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            {isRegister && (
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="font-heading text-foreground"
                >
                  确认密码
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="确认密码"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading py-6 rounded-lg transition-smooth"
              disabled={isLoading}
            >
              {isLoading
                ? "处理中..."
                : isRegister
                  ? "创建账户"
                  : t("login.login")}
            </Button>
          </form>

          {/* 切换登录/注册 */}
          <div className="mt-6 text-center">
            <p className="font-body text-muted-foreground text-sm mb-3">
              {isRegister ? "已有账户？" : "没有账户？"}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsRegister(!isRegister);
                setFormData({
                  username: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              className="w-full"
            >
              {isRegister ? "返回登录" : "创建新账户"}
            </Button>
          </div>

          {/* 演示模式按钮 */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="font-body text-muted-foreground text-xs text-center mb-3">
              想先体验一下？
            </p>
            <Button
              type="button"
              onClick={handleDemoLogin}
              variant="secondary"
              className="w-full"
            >
              进入演示模式
            </Button>
            <p className="font-body text-muted-foreground text-xs text-center mt-3">
              演示模式中的数据将在页面刷新后清空
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

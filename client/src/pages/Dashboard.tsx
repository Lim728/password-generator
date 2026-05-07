import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator";
import { Copy, Check, RotateCcw, Settings, History, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface PasswordOptions {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSpecialChars: boolean;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSpecialChars: false,
  });

  useEffect(() => {
    // 检查用户是否登录
    const user = localStorage.getItem("user");
    if (!user) {
      setLocation("/login");
    }
  }, [setLocation]);

  const generatePassword = useCallback(
    (opts: PasswordOptions): string => {
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      const numbers = "0123456789";
      const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";

      let chars = "";
      if (opts.useUppercase) chars += uppercase;
      if (opts.useLowercase) chars += lowercase;
      if (opts.useNumbers) chars += numbers;
      if (opts.useSpecialChars) chars += special;

      if (chars.length === 0) {
        toast.error("请至少选择一种字符类型");
        return "";
      }

      let password = "";
      for (let i = 0; i < opts.length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    },
    []
  );

  const handleGeneratePasswords = useCallback(() => {
    if (
      !options.useUppercase &&
      !options.useLowercase &&
      !options.useNumbers &&
      !options.useSpecialChars
    ) {
      toast.error("请至少选择一种字符类型");
      return;
    }

    const newPasswords = Array.from({ length: 10 }, () =>
      generatePassword(options)
    );
    setPasswords(newPasswords);
    toast.success("已生成10个密码");
  }, [options, generatePassword]);

  const handleCopyPassword = useCallback((password: string, index: number) => {
    navigator.clipboard.writeText(password);
    setCopiedIndex(index);
    toast.success(`已复制第 ${index + 1} 个密码`);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const handleReset = useCallback(() => {
    setPasswords([]);
    setOptions({
      length: 16,
      useUppercase: true,
      useLowercase: true,
      useNumbers: true,
      useSpecialChars: false,
    });
    toast.success("已重置所有设置");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("已退出登录");
    setLocation("/login");
  };

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl text-foreground">密码生成器</h1>
          <div className="flex items-center gap-4">
            <span className="font-body text-muted-foreground">
              欢迎, {user?.username}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation("/settings")}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              设置
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation("/history")}
              className="flex items-center gap-2"
            >
              <History className="w-4 h-4" />
              历史
            </Button>
            {user?.role === "admin" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation("/admin")}
                className="flex items-center gap-2"
              >
                管理员
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              退出
            </Button>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="container max-w-2xl mx-auto px-4 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-3">
            密码生成器
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            快速生成安全的随机密码，支持自定义长度和字符类型
          </p>
        </div>

        {/* 设置面板 */}
        <Card className="glass-card p-8 mb-8 rounded-2xl border-0">
          <div className="space-y-6">
            {/* 密码长度滑块 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="font-heading text-foreground">
                  密码长度
                </Label>
                <span className="text-2xl font-bold text-primary">
                  {options.length}
                </span>
              </div>
              <Slider
                value={[options.length]}
                onValueChange={(value) =>
                  setOptions({ ...options, length: value[0] })
                }
                min={8}
                max={32}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                推荐长度：12-20 个字符
              </p>
            </div>

            {/* 字符类型选择 */}
            <div className="space-y-3">
              <Label className="font-heading text-foreground block">
                字符类型
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth">
                  <Checkbox
                    id="uppercase"
                    checked={options.useUppercase}
                    onCheckedChange={(checked) =>
                      setOptions({
                        ...options,
                        useUppercase: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="uppercase"
                    className="cursor-pointer font-body text-foreground"
                  >
                    大写字母 (A-Z)
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth">
                  <Checkbox
                    id="lowercase"
                    checked={options.useLowercase}
                    onCheckedChange={(checked) =>
                      setOptions({
                        ...options,
                        useLowercase: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="lowercase"
                    className="cursor-pointer font-body text-foreground"
                  >
                    小写字母 (a-z)
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth">
                  <Checkbox
                    id="numbers"
                    checked={options.useNumbers}
                    onCheckedChange={(checked) =>
                      setOptions({
                        ...options,
                        useNumbers: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="numbers"
                    className="cursor-pointer font-body text-foreground"
                  >
                    数字 (0-9)
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth">
                  <Checkbox
                    id="special"
                    checked={options.useSpecialChars}
                    onCheckedChange={(checked) =>
                      setOptions({
                        ...options,
                        useSpecialChars: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="special"
                    className="cursor-pointer font-body text-foreground"
                  >
                    特殊字符 (!@#$%)
                  </Label>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleGeneratePasswords}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-heading py-6 rounded-lg transition-smooth"
              >
                生成10个密码
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="px-6 py-6 rounded-lg transition-smooth"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* 密码显示区域 */}
        {passwords.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-heading text-foreground text-xl mb-4">
              生成的密码
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {passwords.map((password, index) => (
                <div
                  key={index}
                  className="glass-card p-5 rounded-lg border-0 space-y-3 hover:shadow-lg transition-smooth"
                >
                  <div className="flex items-center justify-between gap-2">
                    <code className="font-mono text-sm text-foreground break-all flex-1 select-all">
                      {password}
                    </code>
                    <Button
                      onClick={() => handleCopyPassword(password, index)}
                      size="sm"
                      variant="ghost"
                      className={`flex-shrink-0 transition-smooth ${
                        copiedIndex === index
                          ? "text-cyan-500 hover:bg-cyan-50"
                          : "text-primary hover:bg-primary/10"
                      }`}
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <PasswordStrengthIndicator password={password} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 空状态提示 */}
        {passwords.length === 0 && (
          <div className="text-center py-12">
            <p className="font-body text-muted-foreground text-lg">
              配置选项后点击"生成10个密码"按钮开始
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

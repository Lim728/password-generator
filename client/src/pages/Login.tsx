import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 这里应该调用后端API进行登录
      // 目前使用演示账号
      if (username === "admin" && password === "admin123") {
        toast.success("登录成功！");
        // 存储登录状态
        localStorage.setItem("user", JSON.stringify({ username, role: "admin" }));
        setLocation("/dashboard");
      } else {
        toast.error("用户名或密码错误");
      }
    } catch (error) {
      toast.error("登录失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="glass-card p-8 rounded-2xl border-0">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-foreground mb-2">
              密码生成器
            </h1>
            <p className="font-body text-muted-foreground">
              登录以访问您的账户
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* 用户名 */}
            <div className="space-y-2">
              <Label htmlFor="username" className="font-heading text-foreground">
                用户名
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="输入用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* 密码 */}
            <div className="space-y-2">
              <Label htmlFor="password" className="font-heading text-foreground">
                密码
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                演示账号: admin / admin123
              </p>
            </div>

            {/* 登录按钮 */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading py-6 rounded-lg transition-smooth"
              disabled={isLoading}
            >
              {isLoading ? "登录中..." : "登录"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-muted-foreground text-sm">
              首次使用？默认账号已为您创建
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

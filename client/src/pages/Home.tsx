import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Lock, Zap, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // 检查是否已登录
    const user = localStorage.getItem("user");
    if (user) {
      setLocation("/dashboard");
    }
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl text-foreground">密码生成器</h1>
          <Button
            onClick={() => setLocation("/login")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            登录
          </Button>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="container max-w-6xl mx-auto px-4 py-20">
        {/* 英雄部分 */}
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-6xl text-foreground mb-6">
            安全的密码生成器
          </h2>
          <p className="font-body text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            快速生成强大的随机密码，支持自定义长度和字符类型。保护您的账户安全。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation("/login")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            >
              立即开始
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setLocation("/login")}
            >
              了解更多
            </Button>
          </div>
        </div>

        {/* 功能特性 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass-card p-8 rounded-2xl border-0 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Zap className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="font-heading text-lg text-foreground mb-2">
              快速生成
            </h3>
            <p className="font-body text-muted-foreground">
              一次生成10个密码，支持自定义长度和字符类型
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border-0 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="font-heading text-lg text-foreground mb-2">
              强度评估
            </h3>
            <p className="font-body text-muted-foreground">
              实时显示密码强度等级，帮助您生成更安全的密码
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border-0 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="font-heading text-lg text-foreground mb-2">
              隐私保护
            </h3>
            <p className="font-body text-muted-foreground">
              所有密码生成都在本地进行，不上传任何数据
            </p>
          </div>
        </div>

        {/* 功能列表 */}
        <div className="glass-card p-12 rounded-2xl border-0 mb-20">
          <h3 className="font-heading text-2xl text-foreground mb-8 text-center">
            完整功能
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-heading text-foreground">自定义密码长度</h4>
                <p className="font-body text-muted-foreground text-sm">
                  支持8-32字符的自定义长度
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-heading text-foreground">字符类型选择</h4>
                <p className="font-body text-muted-foreground text-sm">
                  大小写字母、数字、特殊字符任意组合
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-heading text-foreground">历史记录</h4>
                <p className="font-body text-muted-foreground text-sm">
                  保存生成的密码历史，随时查看和复用
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-heading text-foreground">个性化设置</h4>
                <p className="font-body text-muted-foreground text-sm">
                  自定义背景、主题和界面样式
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-heading text-foreground">一键复制</h4>
                <p className="font-body text-muted-foreground text-sm">
                  快速复制密码到剪贴板，即时反馈提示
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-heading text-foreground">用户账户</h4>
                <p className="font-body text-muted-foreground text-sm">
                  创建账户保存您的设置和历史记录
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部CTA */}
        <div className="text-center">
          <h3 className="font-heading text-2xl text-foreground mb-4">
            准备好了吗？
          </h3>
          <p className="font-body text-muted-foreground mb-6">
            立即登录开始生成安全的密码
          </p>
          <Button
            onClick={() => setLocation("/login")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 mx-auto"
          >
            立即开始
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="font-body text-muted-foreground">
            © 2026 密码生成器. 保护您的账户安全。
          </p>
        </div>
      </footer>
    </div>
  );
}

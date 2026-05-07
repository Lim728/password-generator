import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { ArrowLeft, Save } from "lucide-react";

export default function Settings() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    backgroundType: "system",
    backgroundColor: "#ffffff",
    backgroundImage: "",
    customCSS: "",
    passwordLength: 16,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSpecialChars: false,
  });

  const [profile, setProfile] = useState({
    name: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      setLocation("/login");
    }
  }, [setLocation]);

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleProfileChange = (key: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // 这里应该调用后端API保存设置
      // 目前使用本地存储模拟
      localStorage.setItem("settings", JSON.stringify(settings));
      toast.success("设置已保存");
    } catch (error) {
      toast.error("保存失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      toast.error("两次输入的密码不一致");
      return;
    }

    setIsLoading(true);
    try {
      // 这里应该调用后端API更新个人资料
      toast.success("个人资料已更新");
      setProfile({
        name: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("更新失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation("/dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </Button>
          <h1 className="font-display text-2xl text-foreground">设置</h1>
        </div>
      </div>

      {/* 主内容 */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 个人资料 */}
          <Card className="glass-card p-6 rounded-lg border-0">
            <h2 className="font-heading text-lg text-foreground mb-6">
              个人资料
            </h2>
            <div className="space-y-4">
              <div>
                <Label className="font-body text-foreground">用户名</Label>
                <Input
                  type="text"
                  placeholder="输入新用户名"
                  value={profile.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  disabled={isLoading}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="font-body text-foreground">当前密码</Label>
                <Input
                  type="password"
                  placeholder="输入当前密码"
                  value={profile.currentPassword}
                  onChange={(e) =>
                    handleProfileChange("currentPassword", e.target.value)
                  }
                  disabled={isLoading}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="font-body text-foreground">新密码</Label>
                <Input
                  type="password"
                  placeholder="输入新密码"
                  value={profile.newPassword}
                  onChange={(e) =>
                    handleProfileChange("newPassword", e.target.value)
                  }
                  disabled={isLoading}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="font-body text-foreground">确认密码</Label>
                <Input
                  type="password"
                  placeholder="确认新密码"
                  value={profile.confirmPassword}
                  onChange={(e) =>
                    handleProfileChange("confirmPassword", e.target.value)
                  }
                  disabled={isLoading}
                  className="mt-2"
                />
              </div>

              <Button
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Save className="w-4 h-4 mr-2" />
                保存个人资料
              </Button>
            </div>
          </Card>

          {/* 背景设置 */}
          <Card className="glass-card p-6 rounded-lg border-0">
            <h2 className="font-heading text-lg text-foreground mb-6">
              背景设置
            </h2>
            <div className="space-y-4">
              <div>
                <Label className="font-body text-foreground">背景类型</Label>
                <select
                  value={settings.backgroundType}
                  onChange={(e) =>
                    handleSettingChange("backgroundType", e.target.value)
                  }
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                >
                  <option value="system">系统默认</option>
                  <option value="color">纯色</option>
                  <option value="image">图片</option>
                  <option value="custom">自定义CSS</option>
                </select>
              </div>

              {settings.backgroundType === "color" && (
                <div>
                  <Label className="font-body text-foreground">背景颜色</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) =>
                        handleSettingChange("backgroundColor", e.target.value)
                      }
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      value={settings.backgroundColor}
                      onChange={(e) =>
                        handleSettingChange("backgroundColor", e.target.value)
                      }
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                </div>
              )}

              {settings.backgroundType === "image" && (
                <div>
                  <Label className="font-body text-foreground">
                    图片URL或本地路径
                  </Label>
                  <Input
                    type="text"
                    placeholder="输入图片URL或上传本地图片"
                    value={settings.backgroundImage}
                    onChange={(e) =>
                      handleSettingChange("backgroundImage", e.target.value)
                    }
                    className="mt-2"
                  />
                </div>
              )}

              {settings.backgroundType === "custom" && (
                <div>
                  <Label className="font-body text-foreground">
                    自定义CSS
                  </Label>
                  <Textarea
                    placeholder="输入自定义CSS代码"
                    value={settings.customCSS}
                    onChange={(e) =>
                      handleSettingChange("customCSS", e.target.value)
                    }
                    className="mt-2 font-mono text-sm"
                    rows={6}
                  />
                </div>
              )}

              <Button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Save className="w-4 h-4 mr-2" />
                保存背景设置
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

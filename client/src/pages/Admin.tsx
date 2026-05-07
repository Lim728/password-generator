import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";

interface User {
  id: number;
  username: string;
  email?: string;
  role: "user" | "admin";
  createdAt: string;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      setLocation("/login");
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== "admin") {
      toast.error("您没有管理员权限");
      setLocation("/dashboard");
      return;
    }

    // 模拟加载用户列表
    const mockUsers: User[] = [
      {
        id: 1,
        username: "admin",
        email: "admin@example.com",
        role: "admin",
        createdAt: new Date().toISOString(),
      },
    ];
    setUsers(mockUsers);
    setIsLoading(false);
  }, [setLocation]);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleSaveUser = () => {
    if (!editingUser) return;

    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? editingUser : u))
    );
    toast.success("用户已更新");
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    if (confirm("确定要删除此用户吗？")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("用户已删除");
    }
  };

  const handleToggleRegistration = () => {
    setRegistrationEnabled(!registrationEnabled);
    toast.success(
      registrationEnabled ? "已关闭注册功能" : "已开启注册功能"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation("/dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </Button>
          <h1 className="font-display text-2xl text-foreground">管理员面板</h1>
        </div>
      </div>

      {/* 主内容 */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* 系统设置 */}
        <Card className="glass-card p-6 rounded-lg border-0 mb-8">
          <h2 className="font-heading text-lg text-foreground mb-4">
            系统设置
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-heading text-foreground">
                  允许用户注册
                </Label>
                <p className="font-body text-muted-foreground text-sm">
                  {registrationEnabled ? "已开启" : "已关闭"}
                </p>
              </div>
              <Button
                onClick={handleToggleRegistration}
                variant={registrationEnabled ? "default" : "outline"}
              >
                {registrationEnabled ? "关闭" : "开启"}
              </Button>
            </div>
          </div>
        </Card>

        {/* 用户管理 */}
        <Card className="glass-card p-6 rounded-lg border-0">
          <h2 className="font-heading text-lg text-foreground mb-4">
            用户管理
          </h2>

          {isLoading ? (
            <p className="font-body text-muted-foreground">加载中...</p>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-heading text-foreground">
                      {user.username}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm">
                      {user.email} • {user.role === "admin" ? "管理员" : "用户"}
                    </p>
                    <p className="font-body text-muted-foreground text-xs">
                      创建时间: {new Date(user.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditUser(user)}
                      className="flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      编辑
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      删除
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* 编辑用户对话框 */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="glass-card p-6 rounded-lg border-0 w-full max-w-md">
              <h2 className="font-heading text-lg text-foreground mb-4">
                编辑用户
              </h2>
              <div className="space-y-4">
                <div>
                  <Label className="font-body text-foreground">用户名</Label>
                  <Input
                    type="text"
                    value={editingUser.username}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        username: e.target.value,
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="font-body text-foreground">邮箱</Label>
                  <Input
                    type="email"
                    value={editingUser.email || ""}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        email: e.target.value,
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="font-body text-foreground">角色</Label>
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        role: e.target.value as "user" | "admin",
                      })
                    }
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="user">用户</option>
                    <option value="admin">管理员</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveUser}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    保存
                  </Button>
                  <Button
                    onClick={() => setEditingUser(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    取消
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

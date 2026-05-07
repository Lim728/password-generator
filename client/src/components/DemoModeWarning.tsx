import { useDemo } from "@/contexts/DemoContext";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export function DemoModeWarning() {
  const { isDemo, clearDemoData } = useDemo();
  const [, setLocation] = useLocation();
  const [dismissed, setDismissed] = useState(false);

  if (!isDemo || dismissed) return null;

  const handleLogout = () => {
    clearDemoData();
    setLocation("/login");
  };

  return (
    <div className="fixed top-4 right-4 bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-sm shadow-lg z-50">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-heading text-amber-900 mb-1">演示模式</h3>
          <p className="font-body text-amber-800 text-sm mb-3">
            您正在使用演示模式。此模式中的所有数据将在刷新页面后清空。如需永久保存数据，请注册账户。
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleLogout}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              注册账户
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setDismissed(true)}
            >
              关闭
            </Button>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-600 hover:text-amber-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

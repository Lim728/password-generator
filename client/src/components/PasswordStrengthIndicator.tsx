import { calculatePasswordStrength } from "@/lib/passwordStrength";

interface PasswordStrengthIndicatorProps {
  password: string;
}

/**
 * 密码强度指示器组件
 * 显示密码的强度等级、进度条和描述文本
 */
export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const strength = calculatePasswordStrength(password);

  return (
    <div className="space-y-2">
      {/* 强度进度条 */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${strength.color} transition-all duration-300`}
            style={{ width: `${strength.score}%` }}
          />
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded text-white ${strength.color}`}
        >
          {strength.label}
        </span>
      </div>

      {/* 强度描述 */}
      <p className="text-xs text-muted-foreground">{strength.description}</p>
    </div>
  );
}

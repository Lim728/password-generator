/**
 * 密码强度评估工具
 * 根据密码的复杂度、长度和字符多样性计算强度等级
 */

export interface PasswordStrengthResult {
  score: number; // 0-100
  level: 'weak' | 'fair' | 'good' | 'strong' | 'very-strong';
  label: string;
  color: string;
  description: string;
}

/**
 * 计算密码强度
 * @param password 要评估的密码
 * @returns 强度评估结果
 */
export function calculatePasswordStrength(
  password: string
): PasswordStrengthResult {
  let score = 0;

  if (!password) {
    return {
      score: 0,
      level: 'weak',
      label: '无效',
      color: 'bg-gray-200',
      description: '请输入密码',
    };
  }

  // 1. 长度评分 (最多30分)
  const length = password.length;
  if (length >= 8) score += 10;
  if (length >= 12) score += 10;
  if (length >= 16) score += 10;

  // 2. 字符多样性评分 (最多70分)
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (hasLowercase) score += 15;
  if (hasUppercase) score += 15;
  if (hasNumbers) score += 20;
  if (hasSpecial) score += 20;

  // 3. 额外加分 (最多10分)
  // 检查是否有连续字符
  if (!/(.)\1{2,}/.test(password)) score += 5;
  // 检查是否有连续数字或字母
  if (!/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password)) {
    score += 5;
  }

  // 确保分数在0-100之间
  score = Math.min(100, Math.max(0, score));

  // 根据分数确定等级
  let level: 'weak' | 'fair' | 'good' | 'strong' | 'very-strong';
  let label: string;
  let color: string;
  let description: string;

  if (score < 20) {
    level = 'weak';
    label = '弱';
    color = 'bg-red-500';
    description = '密码过于简单，容易被破解';
  } else if (score < 40) {
    level = 'fair';
    label = '一般';
    color = 'bg-orange-500';
    description = '密码强度一般，建议增加复杂度';
  } else if (score < 60) {
    level = 'good';
    label = '良好';
    color = 'bg-yellow-500';
    description = '密码强度良好，可以使用';
  } else if (score < 80) {
    level = 'strong';
    label = '强';
    color = 'bg-blue-500';
    description = '密码强度很强，安全性高';
  } else {
    level = 'very-strong';
    label = '非常强';
    color = 'bg-green-500';
    description = '密码强度极高，安全性极好';
  }

  return {
    score,
    level,
    label,
    color,
    description,
  };
}

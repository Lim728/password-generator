import { getDatabase } from "./db-local";
import crypto from "crypto";

// 密码哈希函数（简单实现，生产环境应使用bcrypt）
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// 验证密码
function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// 用户相关查询
export const userQueries = {
  // 创建用户
  create: (username: string, password: string, email?: string) => {
    const db = getDatabase();
    const hashedPassword = hashPassword(password);
    const stmt = db.prepare(
      "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)"
    );
    const result = stmt.run(username, hashedPassword, email || null, "user");
    return result.lastInsertRowid;
  },

  // 获取用户
  getByUsername: (username: string) => {
    const db = getDatabase();
    return db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username) as any;
  },

  // 获取用户（通过ID）
  getById: (id: number) => {
    const db = getDatabase();
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as any;
  },

  // 验证用户登录
  authenticate: (username: string, password: string) => {
    const user = userQueries.getByUsername(username);
    if (!user) return null;
    if (!verifyPassword(password, user.password)) return null;
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // 更新用户
  update: (id: number, updates: any) => {
    const db = getDatabase();
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updates);
    const stmt = db.prepare(
      `UPDATE users SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`
    );
    stmt.run(...values, id);
  },

  // 修改密码
  changePassword: (id: number, oldPassword: string, newPassword: string) => {
    const user = userQueries.getById(id);
    if (!user || !verifyPassword(oldPassword, user.password)) {
      throw new Error("Invalid password");
    }
    const hashedPassword = hashPassword(newPassword);
    userQueries.update(id, { password: hashedPassword });
  },

  // 获取所有用户
  getAll: () => {
    const db = getDatabase();
    return db
      .prepare("SELECT id, username, email, role, createdAt FROM users")
      .all() as any[];
  },

  // 删除用户
  delete: (id: number) => {
    const db = getDatabase();
    db.prepare("DELETE FROM users WHERE id = ?").run(id);
  },
};

// 密码历史相关查询
export const historyQueries = {
  // 添加历史记录
  add: (userId: number, passwords: string[], options: any) => {
    const db = getDatabase();
    const stmt = db.prepare(
      "INSERT INTO password_history (userId, passwords, options) VALUES (?, ?, ?)"
    );
    stmt.run(userId, JSON.stringify(passwords), JSON.stringify(options));
  },

  // 获取用户的历史记录
  getByUserId: (userId: number) => {
    const db = getDatabase();
    const records = db
      .prepare(
        "SELECT * FROM password_history WHERE userId = ? ORDER BY createdAt DESC"
      )
      .all(userId) as any[];
    return records.map((record) => ({
      ...record,
      passwords: JSON.parse(record.passwords),
      options: JSON.parse(record.options),
    }));
  },

  // 删除历史记录
  delete: (id: number) => {
    const db = getDatabase();
    db.prepare("DELETE FROM password_history WHERE id = ?").run(id);
  },

  // 清除用户的所有历史记录
  clearByUserId: (userId: number) => {
    const db = getDatabase();
    db.prepare("DELETE FROM password_history WHERE userId = ?").run(userId);
  },
};

// 用户设置相关查询
export const settingsQueries = {
  // 获取用户设置
  getByUserId: (userId: number) => {
    const db = getDatabase();
    return db
      .prepare("SELECT * FROM user_settings WHERE userId = ?")
      .get(userId) as any;
  },

  // 创建或更新用户设置
  upsert: (userId: number, settings: any) => {
    const db = getDatabase();
    const existing = settingsQueries.getByUserId(userId);

    if (existing) {
      const fields = Object.keys(settings)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(settings);
      const stmt = db.prepare(
        `UPDATE user_settings SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?`
      );
      stmt.run(...values, userId);
    } else {
      const stmt = db.prepare(
        "INSERT INTO user_settings (userId, backgroundType, backgroundColor, backgroundImage, customCSS) VALUES (?, ?, ?, ?, ?)"
      );
      stmt.run(
        userId,
        settings.backgroundType || "system",
        settings.backgroundColor || null,
        settings.backgroundImage || null,
        settings.customCSS || null
      );
    }
  },
};

// 系统设置相关查询
export const systemSettingsQueries = {
  // 获取系统设置
  get: (key: string) => {
    const db = getDatabase();
    const result = db
      .prepare("SELECT value FROM system_settings WHERE key = ?")
      .get(key) as any;
    return result?.value;
  },

  // 设置系统设置
  set: (key: string, value: string) => {
    const db = getDatabase();
    const existing = systemSettingsQueries.get(key);

    if (existing !== undefined) {
      const stmt = db.prepare(
        "UPDATE system_settings SET value = ?, updatedAt = CURRENT_TIMESTAMP WHERE key = ?"
      );
      stmt.run(value, key);
    } else {
      const stmt = db.prepare(
        "INSERT INTO system_settings (key, value) VALUES (?, ?)"
      );
      stmt.run(key, value);
    }
  },

  // 检查是否允许注册
  isRegistrationAllowed: () => {
    const value = systemSettingsQueries.get("allowRegistration");
    return value !== "false";
  },
};

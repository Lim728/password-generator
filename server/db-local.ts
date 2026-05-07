import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// 获取数据库文件路径
function getDbPath(): string {
  // 在开发环境中，使用项目目录
  // 在生产环境中，使用用户主目录
  if (process.env.NODE_ENV === "development") {
    return path.join(process.cwd(), "data", "app.db");
  }
  return path.join(process.env.HOME || ".", ".password-generator", "app.db");
}

// 初始化数据库
export function initializeDatabase(): Database.Database {
  const dbPath = getDbPath();
  const dbDir = path.dirname(dbPath);

  // 确保目录存在
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  // 创建表
  db.exec(`
    -- 用户表
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT,
      role TEXT DEFAULT 'user',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 密码历史表
    CREATE TABLE IF NOT EXISTS password_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      passwords TEXT NOT NULL,
      options TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 用户设置表
    CREATE TABLE IF NOT EXISTS user_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER UNIQUE NOT NULL,
      backgroundType TEXT DEFAULT 'system',
      backgroundColor TEXT,
      backgroundImage TEXT,
      customCSS TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 系统设置表
    CREATE TABLE IF NOT EXISTS system_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 创建索引以提高查询性能
    CREATE INDEX IF NOT EXISTS idx_password_history_userId ON password_history(userId);
    CREATE INDEX IF NOT EXISTS idx_user_settings_userId ON user_settings(userId);
  `);

  // 创建默认管理员账户（如果不存在）
  const adminExists = db
    .prepare("SELECT id FROM users WHERE username = ?")
    .get("admin");

  if (!adminExists) {
    // 注意：在生产环境中应该使用密码哈希
    db.prepare(
      "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)"
    ).run("admin", "admin123", "admin@example.com", "admin");
  }

  // 初始化系统设置
  const registrationEnabled = db
    .prepare("SELECT value FROM system_settings WHERE key = ?")
    .get("allowRegistration");

  if (!registrationEnabled) {
    db.prepare(
      "INSERT INTO system_settings (key, value) VALUES (?, ?)"
    ).run("allowRegistration", "true");
  }

  return db;
}

// 获取数据库实例
let dbInstance: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!dbInstance) {
    dbInstance = initializeDatabase();
  }
  return dbInstance;
}

// 关闭数据库
export function closeDatabase(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

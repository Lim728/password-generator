import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  password: varchar("password", { length: 255 }), // 用于本地登录
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * 用户设置表 - 存储每个用户的个性化配置
 */
export const userSettings = mysqlTable("userSettings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  // 背景设置
  backgroundType: mysqlEnum("backgroundType", ["system", "color", "image", "custom"]).default("system").notNull(),
  backgroundColor: varchar("backgroundColor", { length: 50 }), // 颜色值
  backgroundImage: varchar("backgroundImage", { length: 500 }), // 图片URL或本地路径
  customCSS: text("customCSS"), // 自定义CSS
  // 密码生成选项
  passwordLength: int("passwordLength").default(16).notNull(),
  useUppercase: int("useUppercase").default(1).notNull(), // 0 or 1
  useLowercase: int("useLowercase").default(1).notNull(),
  useNumbers: int("useNumbers").default(1).notNull(),
  useSpecialChars: int("useSpecialChars").default(0).notNull(),
  // 功能开关
  registrationEnabled: int("registrationEnabled").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserSettings = typeof userSettings.$inferSelect;
export type InsertUserSettings = typeof userSettings.$inferInsert;

/**
 * 密码历史记录表 - 存储每个用户生成的密码历史
 */
export const passwordHistory = mysqlTable("passwordHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  passwords: json("passwords").$type<string[]>().notNull(), // 存储10个密码的数组
  options: json("options").$type<{
    length: number;
    useUppercase: boolean;
    useLowercase: boolean;
    useNumbers: boolean;
    useSpecialChars: boolean;
  }>().notNull(), // 生成时的选项
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PasswordHistory = typeof passwordHistory.$inferSelect;
export type InsertPasswordHistory = typeof passwordHistory.$inferInsert;

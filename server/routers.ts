import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { getUserById, updateUser } from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    updateProfile: protectedProcedure
      .input(z.object({
        name: z.string().optional(),
        password: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });

        const updates: any = {};
        if (input.name) updates.name = input.name;
        if (input.password) updates.password = input.password; // 实际应该加密

        await updateUser(ctx.user.id, updates);
        return { success: true };
      }),
  }),

  // 密码生成器功能
  passwordGenerator: router({
    // 保存密码历史
    saveHistory: protectedProcedure
      .input(z.object({
        passwords: z.array(z.string()),
        options: z.object({
          length: z.number(),
          useUppercase: z.boolean(),
          useLowercase: z.boolean(),
          useNumbers: z.boolean(),
          useSpecialChars: z.boolean().optional(),
        }),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        
        await db.savePasswordHistory(ctx.user.id, input.passwords, input.options);
        return { success: true };
      }),

    // 获取密码历史
    getHistory: protectedProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(async ({ ctx, input }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        
        return await db.getPasswordHistory(ctx.user.id, input.limit);
      }),
  }),

  // 用户设置
  settings: router({
    // 获取用户设置
    get: protectedProcedure.query(async ({ ctx }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      
      let settings = await db.getUserSettings(ctx.user.id);
      if (!settings) {
        // 创建默认设置
        await db.createOrUpdateUserSettings(ctx.user.id, {
          backgroundType: "system",
          passwordLength: 16,
          useUppercase: 1,
          useLowercase: 1,
          useNumbers: 1,
          useSpecialChars: 0,
          registrationEnabled: 1,
        });
        settings = await db.getUserSettings(ctx.user.id);
      }
      return settings;
    }),

    // 更新用户设置
    update: protectedProcedure
      .input(z.object({
        backgroundType: z.enum(["system", "color", "image", "custom"]).optional(),
        backgroundColor: z.string().optional(),
        backgroundImage: z.string().optional(),
        customCSS: z.string().optional(),
        passwordLength: z.number().optional(),
        useUppercase: z.number().optional(),
        useLowercase: z.number().optional(),
        useNumbers: z.number().optional(),
        useSpecialChars: z.number().optional(),
        registrationEnabled: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        
        await db.createOrUpdateUserSettings(ctx.user.id, input);
        return { success: true };
      }),
  }),

  // 管理员功能
  admin: router({
    // 获取所有用户
    getAllUsers: adminProcedure.query(async () => {
      return await db.getAllUsers();
    }),

    // 获取特定用户的设置
    getUserSettings: adminProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return await db.getAdminUserSettings(input.userId);
      }),

    // 更新任意用户的设置
    updateUserSettings: adminProcedure
      .input(z.object({
        userId: z.number(),
        backgroundType: z.enum(["system", "color", "image", "custom"]).optional(),
        backgroundColor: z.string().optional(),
        backgroundImage: z.string().optional(),
        customCSS: z.string().optional(),
        passwordLength: z.number().optional(),
        useUppercase: z.number().optional(),
        useLowercase: z.number().optional(),
        useNumbers: z.number().optional(),
        useSpecialChars: z.number().optional(),
        registrationEnabled: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { userId, ...settings } = input;
        await db.createOrUpdateUserSettings(userId, settings);
        return { success: true };
      }),

    // 更新用户信息
    updateUser: adminProcedure
      .input(z.object({
        userId: z.number(),
        name: z.string().optional(),
        email: z.string().optional(),
        role: z.enum(["user", "admin"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { userId, ...updates } = input;
        await updateUser(userId, updates);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;

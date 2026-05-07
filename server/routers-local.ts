import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  userQueries,
  historyQueries,
  settingsQueries,
  systemSettingsQueries,
} from "./db-queries";
import { TRPCError } from "@trpc/server";

export const localRouter = router({
  // 认证相关
  auth: router({
    login: publicProcedure
      .input(
        z.object({
          username: z.string(),
          password: z.string(),
        })
      )
      .mutation(({ input }) => {
        const user = userQueries.authenticate(input.username, input.password);
        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid credentials",
          });
        }
        return user;
      }),

    register: publicProcedure
      .input(
        z.object({
          username: z.string().min(3),
          password: z.string().min(6),
          email: z.string().email().optional(),
        })
      )
      .mutation(({ input }) => {
        // 检查是否允许注册
        if (!systemSettingsQueries.isRegistrationAllowed()) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Registration is disabled",
          });
        }

        // 检查用户是否已存在
        const existing = userQueries.getByUsername(input.username);
        if (existing) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Username already exists",
          });
        }

        const userId = userQueries.create(
          input.username,
          input.password,
          input.email
        );
        const user = userQueries.getById(Number(userId));
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }),

    changePassword: protectedProcedure
      .input(
        z.object({
          oldPassword: z.string(),
          newPassword: z.string().min(6),
        })
      )
      .mutation(({ input, ctx }) => {
        userQueries.changePassword(
          ctx.user.id,
          input.oldPassword,
          input.newPassword
        );
        return { success: true };
      }),

    updateProfile: protectedProcedure
      .input(
        z.object({
          username: z.string().optional(),
          email: z.string().email().optional(),
        })
      )
      .mutation(({ input, ctx }) => {
        const updates: any = {};
        if (input.username) updates.username = input.username;
        if (input.email) updates.email = input.email;

        if (Object.keys(updates).length > 0) {
          userQueries.update(ctx.user.id, updates);
        }

        const user = userQueries.getById(ctx.user.id);
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }),
  }),

  // 密码历史相关
  history: router({
    add: protectedProcedure
      .input(
        z.object({
          passwords: z.array(z.string()),
          options: z.any(),
        })
      )
      .mutation(({ input, ctx }) => {
        historyQueries.add(ctx.user.id, input.passwords, input.options);
        return { success: true };
      }),

    getAll: protectedProcedure.query(({ ctx }) => {
      return historyQueries.getByUserId(ctx.user.id);
    }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => {
        historyQueries.delete(input.id);
        return { success: true };
      }),

    clearAll: protectedProcedure.mutation(({ ctx }) => {
      historyQueries.clearByUserId(ctx.user.id);
      return { success: true };
    }),
  }),

  // 用户设置相关
  settings: router({
    get: protectedProcedure.query(({ ctx }) => {
      return settingsQueries.getByUserId(ctx.user.id);
    }),

    update: protectedProcedure
      .input(
        z.object({
          backgroundType: z.string().optional(),
          backgroundColor: z.string().optional(),
          backgroundImage: z.string().optional(),
          customCSS: z.string().optional(),
        })
      )
      .mutation(({ input, ctx }) => {
        settingsQueries.upsert(ctx.user.id, input);
        return { success: true };
      }),
  }),

  // 管理员相关
  admin: router({
    getUsers: protectedProcedure.query(({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Admin access required",
        });
      }
      return userQueries.getAll();
    }),

    updateUser: protectedProcedure
      .input(
        z.object({
          userId: z.number(),
          role: z.enum(["user", "admin"]).optional(),
        })
      )
      .mutation(({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Admin access required",
          });
        }
        const updates: any = {};
        if (input.role) updates.role = input.role;
        userQueries.update(input.userId, updates);
        return { success: true };
      }),

    deleteUser: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Admin access required",
          });
        }
        userQueries.delete(input.userId);
        return { success: true };
      }),

    toggleRegistration: protectedProcedure
      .input(z.object({ enabled: z.boolean() }))
      .mutation(({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Admin access required",
          });
        }
        systemSettingsQueries.set(
          "allowRegistration",
          input.enabled ? "true" : "false"
        );
        return { success: true };
      }),

    getSettings: protectedProcedure.query(({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Admin access required",
        });
      }
      return {
        allowRegistration: systemSettingsQueries.isRegistrationAllowed(),
      };
    }),
  }),
});

export type LocalRouter = typeof localRouter;

# Password Generator | 密码生成器

[English](#english) | [中文](#中文)

---

## English

A secure, offline password generator with multi-language support, local SQLite database, and automatic theme switching. Generate strong random passwords instantly without uploading any data to the cloud.

### ✨ Features

- **🔐 Secure & Offline**: All password generation happens locally. No data is uploaded to the cloud.
- **🌍 Multi-Language Support**: Full support for English and Chinese with seamless language switching.
- **🎨 Automatic Theme Switching**: Automatically follows your system's light/dark theme preference.
- **💾 Local Database**: Uses SQLite to store all user data, settings, and password history locally.
- **🎯 Generate 10 Passwords**: Generate 10 random passwords at once with customizable options.
- **📊 Password Strength Indicator**: Real-time password strength assessment (Weak, Fair, Good, Strong, Very Strong).
- **📋 History Records**: Save and manage your password generation history.
- **👤 User Accounts**: Create accounts to save your settings and preferences.
- **👨‍💼 Admin Panel**: Complete user and system management for administrators.
- **🎮 Demo Mode**: Try the app without creating an account (demo data is cleared on page refresh).

### 🚀 Quick Start

#### Prerequisites
- Node.js 18+ and pnpm

#### Installation

```bash
# Clone the repository
git clone https://github.com/Lim728/password-generator.git
cd password-generator

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The application will be available at `http://localhost:3000`

#### Demo Account
- **Username**: `admin`
- **Password**: `admin123`

### 🎮 Usage

1. **Login or Try Demo**: 
   - Click "Login" to use your account
   - Click "Enter Demo Mode" to try without creating an account

2. **Generate Passwords**:
   - Configure password length (8-32 characters)
   - Select character types (uppercase, lowercase, numbers, special characters)
   - Click "Generate 10 Passwords" to create passwords

3. **Copy & Save**:
   - Click the copy icon to copy a password to clipboard
   - Passwords are automatically saved to your history

4. **View History**:
   - Click "History" to view all previously generated passwords
   - Delete individual records or clear all history

5. **Customize Settings**:
   - Click "Settings" to change your profile
   - Customize background (system default, solid color, image, or custom CSS)
   - Change password or username

### 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Backend**: Express.js, tRPC
- **Database**: SQLite (better-sqlite3)
- **Build Tool**: Vite
- **Package Manager**: pnpm

### 📁 Project Structure

```
password-generator/
├── client/
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Language, Theme, Demo)
│   │   ├── locales/        # i18n translation files
│   │   └── lib/            # Utility functions
│   └── index.html
├── server/
│   ├── db-local.ts         # SQLite database initialization
│   ├── db-queries.ts       # Database query helpers
│   ├── routers-local.ts    # tRPC API routes
│   └── _core/              # Core server infrastructure
├── drizzle/                # Database schema
└── package.json
```

### 🔐 Security & Privacy

- ✅ All password generation happens locally in your browser
- ✅ No data is sent to any server
- ✅ All user data is stored in a local SQLite database
- ✅ Demo mode data is automatically cleared on page refresh
- ✅ User passwords are hashed before storage

### 🌐 Internationalization

The application supports full internationalization with:
- **English**: Complete English interface
- **Chinese (Simplified)**: 完整的中文界面

Switch languages anytime using the language selector in the navigation bar.

### 🎨 Theme Support

The application automatically detects and follows your system's theme preference:
- **Light Theme**: For bright environments
- **Dark Theme**: For low-light environments
- **System Default**: Automatically switches based on your OS settings

You can manually override the theme selection anytime.

### 📝 Admin Features

Administrators can:
- View all user accounts
- Manage user roles (user/admin)
- Enable/disable user registration
- Delete user accounts
- Manage system settings

### 🔄 Demo Mode

Try the application without creating an account:
- Click "Enter Demo Mode" on the login page
- Use all features with temporary data
- Data is automatically cleared when you refresh the page
- Create a real account to permanently save your data

### 📦 Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### 🐛 Troubleshooting

**Issue**: Application shows Chinese text even when English is selected
- **Solution**: Clear browser cache and refresh the page

**Issue**: Database errors on startup
- **Solution**: Delete the `.password-generator` folder in your home directory and restart

**Issue**: Port 3000 already in use
- **Solution**: Change the port in `vite.config.ts` or kill the process using port 3000

### 📄 License

This project is open source and available under the MIT License.

### 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

### 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

## 中文

一个安全的离线密码生成器，支持多语言、本地SQLite数据库和自动主题切换。立即生成强大的随机密码，无需将任何数据上传到云端。

### ✨ 功能特性

- **🔐 安全离线**: 所有密码生成都在本地进行，不上传任何数据到云端。
- **🌍 多语言支持**: 完全支持中文和英文，支持无缝语言切换。
- **🎨 自动主题切换**: 自动跟随系统的浅色/深色主题偏好。
- **💾 本地数据库**: 使用SQLite存储所有用户数据、设置和密码历史。
- **🎯 一次生成10个密码**: 一次生成10个随机密码，支持自定义选项。
- **📊 密码强度指示器**: 实时显示密码强度等级（弱、一般、良好、强、非常强）。
- **📋 历史记录**: 保存和管理密码生成历史。
- **👤 用户账户**: 创建账户以保存您的设置和偏好。
- **👨‍💼 管理员面板**: 完整的用户和系统管理功能。
- **🎮 演示模式**: 无需创建账户即可体验应用（演示数据在页面刷新时清空）。

### 🚀 快速开始

#### 前置要求
- Node.js 18+ 和 pnpm

#### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/Lim728/password-generator.git
cd password-generator

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

应用将在 `http://localhost:3000` 可用

#### 演示账号
- **用户名**: `admin`
- **密码**: `admin123`

### 🎮 使用方法

1. **登录或尝试演示**:
   - 点击"登录"使用您的账户
   - 点击"进入演示模式"无需创建账户即可体验

2. **生成密码**:
   - 配置密码长度（8-32字符）
   - 选择字符类型（大小写字母、数字、特殊字符）
   - 点击"生成10个密码"创建密码

3. **复制并保存**:
   - 点击复制图标将密码复制到剪贴板
   - 密码会自动保存到历史记录

4. **查看历史**:
   - 点击"历史"查看所有之前生成的密码
   - 删除单条记录或清除所有历史

5. **自定义设置**:
   - 点击"设置"更改您的个人资料
   - 自定义背景（系统默认、纯色、图片或自定义CSS）
   - 修改密码或用户名

### 🛠️ 技术栈

- **前端**: React 19、TypeScript、Tailwind CSS 4
- **后端**: Express.js、tRPC
- **数据库**: SQLite (better-sqlite3)
- **构建工具**: Vite
- **包管理器**: pnpm

### 📁 项目结构

```
password-generator/
├── client/
│   ├── src/
│   │   ├── pages/          # 页面组件
│   │   ├── components/     # 可复用UI组件
│   │   ├── contexts/       # React上下文（语言、主题、演示）
│   │   ├── locales/        # i18n翻译文件
│   │   └── lib/            # 工具函数
│   └── index.html
├── server/
│   ├── db-local.ts         # SQLite数据库初始化
│   ├── db-queries.ts       # 数据库查询辅助函数
│   ├── routers-local.ts    # tRPC API路由
│   └── _core/              # 核心服务器基础设施
├── drizzle/                # 数据库schema
└── package.json
```

### 🔐 安全与隐私

- ✅ 所有密码生成都在您的浏览器本地进行
- ✅ 不向任何服务器发送数据
- ✅ 所有用户数据存储在本地SQLite数据库中
- ✅ 演示模式数据在页面刷新时自动清空
- ✅ 用户密码在存储前进行哈希处理

### 🌐 国际化

应用支持完整的国际化功能：
- **英文**: 完整的英文界面
- **中文（简体）**: 完整的中文界面

可随时使用导航栏中的语言选择器切换语言。

### 🎨 主题支持

应用自动检测并跟随系统主题偏好：
- **浅色主题**: 适合明亮环境
- **深色主题**: 适合低光环境
- **系统默认**: 根据操作系统设置自动切换

您可以随时手动覆盖主题选择。

### 📝 管理员功能

管理员可以：
- 查看所有用户账户
- 管理用户角色（用户/管理员）
- 启用/禁用用户注册
- 删除用户账户
- 管理系统设置

### 🔄 演示模式

无需创建账户即可体验应用：
- 在登录页点击"进入演示模式"
- 使用所有功能，数据临时存储
- 刷新页面时数据自动清空
- 创建真实账户以永久保存数据

### 📦 生产环境构建

```bash
# 构建应用
pnpm build

# 启动生产服务器
pnpm start
```

### 🐛 故障排除

**问题**: 即使选择了英文，应用仍显示中文
- **解决方案**: 清除浏览器缓存并刷新页面

**问题**: 启动时出现数据库错误
- **解决方案**: 删除主目录中的 `.password-generator` 文件夹并重启

**问题**: 端口3000已被占用
- **解决方案**: 在 `vite.config.ts` 中更改端口或杀死占用端口3000的进程

### 📄 许可证

本项目是开源项目，采用MIT许可证。

### 🤝 贡献

欢迎贡献！您可以：
- 报告错误
- 建议新功能
- 提交拉取请求

### 📞 支持

如有问题、疑问或建议，请在GitHub上提交issue。

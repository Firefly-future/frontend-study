# NVM (Node Version Manager) 使用文档
NVM (Node Version Manager) 是一个用于管理多个 Node.js 版本的工具，允许你在同一台机器上轻松安装、切换和使用不同版本的 Node.js。

### 主要特性
- ✅ 多版本管理：同时安装多个 Node.js 版本
- ✅ 快速切换：轻松在不同版本间切换
- ✅ 项目级配置：为不同项目指定 Node.js 版本
- ✅ 跨平台支持：Windows、macOS、Linux

## 安装指南

### Windows 系统安装
1. **卸载现有 Node.js**
2. **下载安装包**
- 访问 [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases)
- 下载 `nvm-setup.zip` 文件

### macOS/Linux 安装
```bash
# 使用 curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 或使用 wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载配置
source ~/.bashrc  # 或 ~/.zshrc, ~/.profile
```

### 验证安装
```bash
nvm version
# 输出版本号表示安装成功
```

## 基本使用
### 查看可用版本
```bash
# 查看可安装的版本列表
nvm list available

# 查看所有远程版本（包括不稳定版本）
nvm ls-remote
```
### 安装 Node.js 版本
```bash
# 安装最新 LTS 版本
nvm install lts

# 安装最新版本
nvm install latest

# 安装指定版本
nvm install 18.19.0
nvm install 16.20.2

# 安装并使用该版本
nvm install 18.19.0 --use
```
### 查看已安装版本
```bash
# 查看已安装的版本
nvm list
# 或
nvm ls

# 示例输出：
#   * 18.19.0 (Currently using 64-bit executable)
#     16.20.2
#     14.21.3
```

### 切换 Node.js 版本
```bash
# 切换到指定版本
nvm use 18.19.0

# 切换到最新版本
nvm use latest

# 切换到 LTS 版本
nvm use lts

# 在 PowerShell 中可能需要以管理员身份运行
```

### 卸载版本
```bash
# 卸载指定版本
nvm uninstall 14.21.3

# 如果该版本正在使用，需要先切换到其他版本
```

## 命令速查表

| 命令 | 描述 |
|------|------|
| `nvm version` | 查看 nvm 版本 |
| `nvm install <version>` | 安装指定版本 |
| `nvm uninstall <version>` | 卸载指定版本 |
| `nvm use <version>` | 切换到指定版本 |
| `nvm list` | 查看已安装版本 |
| `nvm current` | 查看当前使用版本 |
| `nvm alias default <version>` | 设置默认版本 |
| `nvm run <version> <script>` | 使用指定版本运行脚本 |
| `nvm exec <version> <command>` | 使用指定版本执行命令 |

## 资源链接

- [官方 GitHub 仓库](https://github.com/coreybutler/nvm-windows)
- [Node.js 官方下载页](https://nodejs.org/)
- [npm 镜像站](https://npmmirror.com/)

---
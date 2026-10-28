# Kobe 全栈学习项目

这是一个用于学习 React、FastAPI 和前后端交互的简单全栈项目。

前端使用 React、React Router 和 Vite，后端使用 FastAPI。项目提供主页资料查询和一个基于关键词计数的简单中文情感分析示例。

## 主要功能

- React 双页面应用
- React Router 前端路由
- 可复用的 `Card` 组件
- GET `/api/profile` 获取主页资料
- POST `/api/sentiment` 分析文字的简单情感值
- 本地开发时通过 Vite 代理访问后端
- 生产环境可通过 Nginx 提供前端并代理 API

> 情感分析功能是用于演示 POST API 的关键词计数示例，不是机器学习模型。

## 技术栈

### 前端

- React 19
- React Router 7
- Vite 8
- CSS

### 后端

- Python
- FastAPI
- Uvicorn
- Pydantic
- python-dotenv

## 项目结构

```text
kobe/
├── backend/
│   ├── .env.example       后端环境变量示例
│   ├── config.py          后端配置读取
│   ├── main.py            FastAPI 应用和 API
│   └── requirements.txt   Python 依赖
├── src/
│   ├── data/
│   │   └── content.js     页面文字和卡片数据
│   ├── pages/
│   │   ├── GuidePage.jsx  学习页和情感分析表单
│   │   └── HomePage.jsx   首页和资料请求
│   ├── router/
│   │   └── index.jsx      React Router 路由
│   ├── App.jsx            网站公共布局
│   ├── Card.jsx           可复用卡片组件
│   ├── main.jsx           React 入口
│   └── styles.css         全局样式
├── .env.example           前端环境变量示例
├── index.html             HTML 入口
├── package.json           前端依赖和命令
└── vite.config.js         Vite 开发代理配置
```

## 本地运行

### 1. 获取项目

```bash
git clone <你的仓库地址>
cd kobe
```

### 2. 配置并启动后端

进入后端目录并创建虚拟环境：

```bash
cd backend
python -m venv .venv
```

Windows PowerShell 激活虚拟环境：

```powershell
.\.venv\Scripts\Activate.ps1
```

Linux 或 macOS 激活虚拟环境：

```bash
source .venv/bin/activate
```

安装依赖：

```bash
python -m pip install -r requirements.txt
```

在 `backend` 目录创建 `.env`：

```env
API_HOST=127.0.0.1
API_PORT=8000
API_RELOAD=true
FRONTEND_ORIGINS=
```

启动后端：

```bash
python main.py
```

后端默认运行在：

```text
http://127.0.0.1:8000
```

FastAPI 接口文档：

```text
http://127.0.0.1:8000/docs
```

### 3. 配置并启动前端

打开另一个终端，回到项目根目录，在根目录创建 `.env.local`：

```env
VITE_API_PROXY_TARGET=http://127.0.0.1:8000
```

安装依赖并启动 Vite：

```bash
npm install
npm run dev
```

浏览器打开终端显示的地址，默认通常是：

```text
http://localhost:5173
```

本地请求流程：

```text
浏览器 → Vite（5173）→ FastAPI（8000）
```

前端始终使用相对地址，例如：

```js
fetch("/api/profile");
```

## API

### 获取主页资料

```http
GET /api/profile
```

响应示例：

```json
{
  "heroTitle": "我是神",
  "heroSubtitle": "项目，创意，灵感，心得，我的作品"
}
```

### 情感分析

```http
POST /api/sentiment
Content-Type: application/json
```

请求示例：

```json
{
  "text": "今天很开心"
}
```

响应示例：

```json
{
  "score": 0.33,
  "label": "积极",
  "positive_count": 1,
  "negative_count": 0
}
```

## 前端命令

```bash
npm run dev       # 启动本地开发服务器
npm run build     # 生成生产环境 dist
npm run preview   # 本地预览打包结果
```

## 生产环境部署

生产环境推荐使用：

```text
浏览器 → Nginx（80/443）
             ├── 前端静态文件
             └── /api/ → FastAPI（127.0.0.1:8000）
```

### 构建前端

```bash
npm ci
npm run build
```

构建结果位于 `dist/`。生产环境不需要前端 `.env.local`，因为 `/api` 请求由 Nginx 代理。

### 后端生产配置

服务器上的 `backend/.env`：

```env
API_HOST=127.0.0.1
API_PORT=8000
API_RELOAD=false
FRONTEND_ORIGINS=
```

### Nginx 配置示例

Ubuntu 上可以将配置保存到 `/etc/nginx/sites-available/kobe`：

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name _;

    root /var/www/kobe;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

`try_files` 的回退规则用于支持 React Router，例如直接打开 `/guide`。

### systemd 后端服务示例

```ini
[Unit]
Description=Kobe Backend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/kobe/backend
EnvironmentFile=/home/ubuntu/kobe/backend/.env
ExecStart=/home/ubuntu/kobe/backend/.venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000 --proxy-headers --forwarded-allow-ips=127.0.0.1
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

启用并启动服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now kobe
sudo systemctl status kobe
```

## 环境变量与 Git

真实环境变量文件不会提交到 Git：

```text
.env.local
backend/.env
```

仓库只保留不包含秘密的示例文件：

```text
.env.example
backend/.env.example
```

不要把密码、密钥或其他敏感信息写入以 `VITE_` 开头的变量，因为 Vite 会把这些变量提供给浏览器端代码。

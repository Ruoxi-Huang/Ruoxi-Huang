# 量化研究工作集（作品集站点）

用 Astro 构建的静态站点，部署到 GitHub Pages。当前只上线第一个项目页
（动态多专家 Alpha 融合与路由），其余页面陆续补齐。

## 本地运行

```bash
cd portfolio
npm install
npm run dev        # http://localhost:4321
npm run build      # 输出到 dist/
npm run preview    # 本地预览构建结果
```

## 目录

```
src/pages/index.astro                     首页（作品集索引：数字条 / 项目 / 组件 / 研究笔记 / 关于）
src/pages/projects/p2-dynamic-blend.astro 项目页：动态多专家 Alpha 融合与路由
src/pages/components/*.astro              组件短页：因子工厂、单因子检验体系
src/pages/notes/*.astro                   研究笔记短页（9 篇）：结论 / 口径 / 局限
src/layouts/Base.astro                    全站骨架（页头 / 页脚 / 免责声明）
src/styles/global.css                     全站样式
public/diagrams/*.svg                     架构图（手写 SVG）
public/figures/*.png                      数据图（由 scripts/portfolio 下的脚本生成）
data/*.csv                                生成数据图的中间数据
DESIGN.md                                 设计系统（黑白极简的唯一依据）
references/*.md                           早期参考过的设计体系，不参与构建
```

## 设计语言

全站只有一个墨色阶梯，没有任何色相。主题（表面、间距、圆角、阴影、字体分工）
参考 Vercel 的设计体系；排版与收尾细节参考
[impeccable](https://github.com/pbakaus/impeccable)。两者冲突时按下面这条判断：
凡是靠颜色承担的工作（强调、分组、层级、深度），一律改由字重、字号、0.5px 分隔线
和明暗反转来承担。

改动样式前先读 `DESIGN.md`，`src/styles/global.css` 里在对应位置写了同样的理由。

## 部署到 GitHub Pages

**只发布 `portfolio/` 这一个目录**。上层仓库里有数据、日志、数据库配置与简历文件，
不要一起推上去。

1. 在 GitHub 新建仓库：Public，**不要**勾选 "Add a README file"、".gitignore"、
   "license"（否则首次 push 会冲突）。
2. 在本地把 `portfolio/` 当作仓库根目录推送：

   ```bash
   cd portfolio
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```

   首次 push 会弹出浏览器让你登录 GitHub（Git for Windows 自带的凭据管理器），
   如果不想用交互登录，就去 **Settings → Developer settings → Personal access
   tokens** 建一个有 `repo` 权限的 token，push 时用户名填 GitHub 用户名、密码填 token。
3. 仓库 **Settings → Pages → Source** 选 **GitHub Actions**（只需设置一次）。之后
   每次 push 到 `main` 都会自动构建部署，地址是
   `https://<user>.github.io/<repo>/`（用户站则没有 `/<repo>`）。

构建地址不用手改：工作流先跑 `actions/configure-pages` 读出本站真实地址，以
`SITE` / `BASE_PATH` 环境变量传给 `astro.config.mjs`，用户站和项目站都能直接用。
页面里所有图片与链接都用 `import.meta.env.BASE_URL` 拼，所以子路径部署也不会断图。
构建日志在仓库 **Actions** 页，失败时先看那一步的输出。

### 不想用命令行？两条替代路径

网页上传本身也是一次 git 提交，所以两条路都可行。区别在于你上传的是**源码**还是
**构建产物**，两者不能混。

**路径 A（推荐）：上传源码，让 GitHub 自动构建**

1. 仓库页面 **Add file → Upload files**，把 `portfolio/` 里的内容拖进去，但**不要**
   拖 `node_modules/`、`dist/`、`.preview/`。
2. 确认 `.github/workflows/deploy.yml` 进了仓库。浏览器拖文件夹一般会带上 `.github`；
   如果没带上，就用 **Add file → Create new file**，文件名直接输入
   `.github/workflows/deploy.yml`（GitHub 会自动建目录），再把本仓库里该文件的内容粘进去。
3. **Settings → Pages → Source** 选 **GitHub Actions**。之后每次提交都会自动构建部署。

**路径 B：上传构建产物，完全不跑 CI**

1. 先在本地按仓库名构建（`<repo>` 换成你的仓库名；部署在用户站则去掉这一行）：

   ```powershell
   cd portfolio
   $env:BASE_PATH='/<repo>'
   npm run build
   ```

   这一步不能省：产物里的链接是绝对路径，base 不对会全站断链。
2. 把 `dist/` **里面的内容**（`index.html`、`_astro/`、`figures/`、`diagrams/`、
   `notes/`、`components/`、`projects/`、`.nojekyll`）上传到仓库的发布根目录
   （仓库根目录或 `docs/`）。`.nojekyll` 必须存在，否则 GitHub 的 Jekyll 会丢掉
   `_astro/`，页面会没有样式。
3. **Settings → Pages → Source** 选 **Deploy from a branch**，再选分支与目录。

代价是：仓库里存的是构建产物，改内容要重新构建再上传，历史记录也不如源码清晰。

## 数据图怎么重新生成

数据图脚本在上一层仓库的 `scripts/portfolio/` 下，需要在那个 Python 环境里跑；
脚本里的调色板就是站点用的墨色阶梯，改配色要两边一起改：

```bash
python scripts/portfolio/build_p2_expert_oof_dataset.py   # 只在数据需要重建时跑
python scripts/portfolio/p2_figures.py                    # 出图 + 对齐/碰撞审计
```

出图的脚本会顺带跑口径检查：面板对齐不通过会直接报错，PDF 碰撞审计的结论会打印在
终端里。改完图别忘了同步页面图注里对各条柱子的描述。

## 内容原则

- 不贴源码、不放仓库链接；用架构图、脱敏截图、结果图表与设计取舍代替。
- 每个项目页都写明可验证性与已知局限。
- 所有业绩数字标注区间、样本内外与成本口径，并统一声明"历史回测，非实盘"。

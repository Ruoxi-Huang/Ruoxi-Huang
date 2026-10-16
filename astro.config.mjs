import { defineConfig } from "astro/config";

// 部署地址由 GitHub Actions 注入：工作流用 actions/configure-pages 读出本站真实
// 地址，以 SITE / BASE_PATH 传进来（见 .github/workflows/deploy.yml）。因此用户站
// （<user>.github.io）和项目站（<user>.github.io/<repo>）都不需要改这个文件。
// 本地构建走下面的默认值，仅用于预览。
export default defineConfig({
  site: process.env.SITE || "https://example.github.io",
  base: process.env.BASE_PATH || "/",
  trailingSlash: "ignore",
});

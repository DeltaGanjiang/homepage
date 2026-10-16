# 首页幻灯片预览

首页使用 `presentation.js` / `presentation.css` 浏览本站 WebP 图片，PPT 下载直接指向仓库中的原文件。预览不请求外部文档查看服务，也没有运行时转换依赖。

## 当前版本

- 源文件：`assets/ganjiang-presentation-20260916.pptx`，22 页。
- 源文件 SHA-256：`44aa934001fe9d4d4b5fec67509de188de70c735477e2f975b25cf9622ebbe4d`。
- 图片目录：`20260916/`，按演示顺序命名为 `slide-01.webp` 至 `slide-22.webp`。
- 图片尺寸：1920 × 1080。使用 `@oai/artifact-tool` 2.8.94 导入原 PPT，以 1.5 倍导出 PNG，再用 `cwebp -lossless -z 6` 无损转换。原始 PPT 保持不变。
- 共 5,726,488 字节；首张 126,428 字节。首页首张懒加载，进入预览区域后只预取下一页；省流量和 2G 网络下不预取。

## 更新演示

1. 将新 PPT 放入 `assets/`，从该文件按实际幻灯片顺序导出全部页面。预览为静态画面，动画与其他可编辑内容保留在 PPT 下载中。
2. 生成 16:9、1920 × 1080 的 PNG，并用 `cwebp -lossless -z 6 input.png -o slide-01.webp` 转换。为新版创建独立目录，避免浏览器缓存混用旧页。
3. 同步修改 `index.html` 中的 PPT 下载地址、`data-slide-count`、`data-slide-base`、首张图片和大图链接，以及初始页数、图片替代文本和无脚本提示。
4. 检查全部导出页面，确认图表、中文及页序正常。验证前后翻页、首尾边界、快速连续翻页、键盘、触摸滑动、放大后关闭、语言切换和图片失败后的重试。

放大窗口复用同一个预览，不重复加载一套幻灯片。禁用 JavaScript 时仍可查看封面大图并下载完整 PPT。高清 PNG 和检查用拼图保存在忽略目录 `.local-production/presentation-20261016/`，不随站点发布。

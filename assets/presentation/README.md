# 首页幻灯片预览

首页使用 `presentation.js` / `presentation.css` 浏览本站 WebP 图片，PPT 下载直接指向仓库中的原文件。预览不请求外部文档查看服务，也没有运行时转换依赖。

## 当前版本

- 源文件：`assets/ganjiang-presentation-20260916.pptx`，22 页。
- 源文件 SHA-256：`cace2f15db32b0d647ffc7afa8b907140ba2f6b6c0adb8e7e9488a41dd6bab1c`。
- 预览来自 PowerPoint 原生导出的 PDF：22 页，每页 960 × 540 pt，字体已嵌入。中间 PDF 已在预览生成并核验后删除，网站运行不需要该文件。
- PDF SHA-256：`d325102dda7c07cae323692cdaf88e0cca129369265833280bacac6437ba4772`。
- 图片目录：`native-cace2f15db32-d325102dda7c/`，按演示顺序命名为 `slide-01.webp` 至 `slide-22.webp`。同目录的 `manifest.json` 记录源文件及各页图片校验值。
- 图片尺寸：1920 × 1080。使用 Poppler 将 PDF 页面直接栅格化，再用 `cwebp -lossless -z 6` 无损转换。原始 PPT 保持不变。
- 共 6,293,246 字节；首张 133,336 字节。首页首张懒加载，进入预览区域后只预取下一页；省流量和 2G 网络下不预取。

## 更新方式

2026-10-25 已将首页全部 22 页切换为 PowerPoint 原生 PDF 生成的预览，并同步封面和末页的新内容。旧预览由 `@oai/artifact-tool` 导入 PPT 后生成，存在文字换行和溢出问题，已删除。新版已检查全部页面，并对照 PowerPoint 第 21 页确认句号掉行和文字溢出消失。后续继续使用原生 PDF 作为预览来源。

1. 在 PowerPoint 中保存当前 PPT，通过「文件 → 导出 → PDF」选择「Best for printing」，将全部幻灯片导出到 `output/pdf/ganjiang-presentation.pdf`。该目录已被 Git 忽略，中间 PDF 不放入网站资源目录。每页一张幻灯片，保留 16:9 比例。先确认 PDF 本身与 PowerPoint 一致，转换脚本不能修正 PDF 内已有的排版问题。
2. 在仓库根目录运行以下命令。需要 Python 3、Poppler（`pdfinfo`、`pdftoppm`）和 `cwebp`，无需额外 Python 包。

   ```sh
   python3 assets/presentation/update-preview.py output/pdf/ganjiang-presentation.pdf
   ```

   脚本核对页数、页面比例与旋转方向，直接将 PDF 页面栅格化为 1920 × 1080，并无损编码为 WebP。预览和校验清单保存在命令输出的 `.local-production/native-…/` 目录，尚不切换首页。
3. 对照 PowerPoint 检查该目录下的全部图片，尤其是中文换行、图表、公式、首末页和第 21 页。确认无误后运行：

   ```sh
   python3 assets/presentation/update-preview.py output/pdf/ganjiang-presentation.pdf --apply
   ```

   脚本核对源文件和预览图片的 SHA-256，将图片复制到独立版本目录，并同步首页图片地址与页数。源文件变化时需重新生成和检查。原 PPT 保持不变，此命令仅更新本地网站，不部署。
4. 更新上方「当前版本」信息，并验证前后翻页、放大与关闭、语言切换和图片失败重试。预览为静态画面，动画与可编辑内容保留在 PPT 下载中。
5. 验证完成后，删除不再被首页引用的旧版幻灯片目录，以及本次中间 PDF、`.local-production/native-…/` 中的生成副本与检查拼图。保留首页正在引用的图片目录、校验清单及原始 PPT。

放大窗口复用同一个预览，不重复加载一套幻灯片。禁用 JavaScript 时仍可查看封面大图并下载完整 PPT。本次中间 PDF、旧版图片、生成副本与检查拼图已清理。

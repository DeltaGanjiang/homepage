# Homepage

GanJiang agent [homepage](https://ganjiang.asia/) [https://ganjiang.asia/](https://ganjiang.asia/).

## 生态合作申报

独立页面 `collaborate.html` 沿用网站的深色视觉与 `site-chrome.css` 公共导航、页脚。首页导航、生态合作区块和页脚均提供入口。`collaborate.css`、`collaborate.js` 管理页面与表单；`collaborate.en.js` 配合已有 `apps/i18n.js` 完成中英文切换，保留填写内容并共享语言偏好。

申请人可提交开源或闭源软件、授权与接入方式、[DeltaXRDbench](https://github.com/DeltaGanjiang/deltaxrdbench) 版本、数据集、评测结果及复现说明。联系人为曹斌博士（英文显示 Dr.Bin Cao），邮箱 `bincao@hkust-gz.edu.cn`。闭源合作可讨论采购或授权，按约定闭源调用并以书面协议确认保密安排；共同成果按实际贡献协商署名。

生态合作同时支持学术项目：研究者可提交研究、测试或对比分析 proposal，说明研究目标、数据、实验方案、预计 API 调用量、项目周期与预期成果。审核通过后，可在获批额度内免费调用 GanJiang API，具体额度与使用期限以审核结果为准。统一申报表可切换「软件生态共建」与「学术项目合作」，仅校验并导出所选类型的材料；两类表单切换和语言切换均保留填写内容。

表单仅在浏览器中生成申报预览，可复制、导出 UTF-8 文本或打开预填邮件；无服务端收件、自动发送或附件上传。申请人需自行添加评测附件并发送邮件。内容超过邮件链接长度阈值时，预填简短信件并明确要求下载、附上完整申报材料。修改表单会使旧预览失效，避免发送旧内容。未启用 JavaScript 时提供直接邮件联系说明，不提交表单内容到 URL。

页面链接和按钮不使用斜向箭头装饰。

`title-style.js` 统一处理首页、团队、视频、下载、合作页和中英文说明书的标题格式，去掉标题及分行末尾的句尾标点；语言切换或动态标题更新后同样生效。静态 HTML 也保留无句尾标点的标题，正文不受影响。

## 全球用户地球

首页介绍视频后紧接 `#global-users`，使用本地 Canvas 绘制可旋转地球，包含 1,000 个预设展示点和 12 所高校地理标记，页面展示数字为「500+」，说明为「红点为用户位置示意图」。支持拖动、方向键、暂停、重置和点击单位定位，跟随中英文切换，并适配手机和减少动态效果设置。点位不是用户统计，单位标记不代表用户或合作关系；真实用户分布需接入脱敏数据。

样式与交互分别位于 `global-users.css`、`global-users.js`；地图数据内嵌在脚本中，支持直接打开本地 HTML，接近视口时才初始化地球，离屏或后台停止动画。地图来源及数据说明见 [assets/globe/README.md](assets/globe/README.md)。

地球支持 1–4 倍局部缩放（+/− 按钮、键盘、聚焦后的滚轮），双击可定位并放大选中区域；重置恢复全景。学校名称前显示本地 Logo，英文使用全称；清华、新加坡国立和圣保罗使用矢量版本，上交使用高清校徽。

## 全球合作伙伴

首页 `index.html`、团队页 `team.html` 和下载页 `apps/index.html` 在页脚上方共用合作伙伴展示，样式位于 `site-chrome.css`，滚动与语言切换逻辑位于 `partners.js`。

- 收录 [Yangtze AI Lab 官网](https://www.yangtzeailab.com/)“全球合作伙伴”中的全部 10 个 Logo：6 家学术机构、4 家产业伙伴。原始图片与来源记录保存在 `assets/partners/`。
- 两行反向循环滚动，悬停、键盘聚焦或暂停按钮可暂停；离开可见区域或切到后台时停止动画。
- 跟随网站切换中英文。开启“减少动态效果”或禁用 JavaScript 时，展示可横向浏览的静态列表；循环副本对辅助技术隐藏。
- Logo 使用本地图片并延迟加载，不依赖第三方图片请求。

## 加载与媒体优化（2026-10-15）

网站继续直接使用静态 HTML/CSS/JS；`.nojekyll` 跳过 GitHub Pages 的 Jekyll 处理。

- 首屏标志、首页短片封面和完整视频页封面使用图片预加载；脚本使用 `defer` 并保持原有执行顺序。
- 完整实验数据在进入正文或接近研究区块时加载，所有原始采样点、数值精度和图表功能保持不变。
- 视频使用 `preload="none"`；首页短片通过原生 `poster` 显示封面，不依赖脚本或视口检测。团队短片在省流量、慢速连接或减少动态效果模式下等待点击播放。
- 社群二维码在卡片接近视口时提前加载，悬停、键盘聚焦或触摸卡片时提高加载优先级；弹窗保留图片位置并显示加载提示，失败可重试。PNG 采用无损压缩；封面使用原尺寸高质量 WebP。

| 资源 | 优化前 | 优化后 |
| --- | ---: | ---: |
| 58 秒说明短片 | 53.81 MiB | 24.82 MiB |
| 团队页短片 | 8.26 MiB | 4.24 MiB |
| 干将透明插画 | 1.42 MiB | 0.71 MiB |

两段短片保持 1920×1080、原始帧时间戳和原音轨，使用 H.264 `-preset slow -crf 18 -fps_mode passthrough -c:a copy -movflags +faststart`。全片平均 SSIM 分别为 0.998476 / 0.997429，音轨哈希一致；已抽查字幕、晶体和细线场景。9 分 42 秒完整视频已有较低码率和前置索引，保持原文件。图片未降低像素尺寸，透明插画的 alpha 通道保持一致。

本机 Chrome 桌面（1440×900）和手机（390×844）验证了入口按需加载、视频播放、图表交互、语言切换和二维码弹窗。入口首屏资源由 1,421,424 字节降至 307,341 字节，减少约 78%。统计不包含 HTML、视频流和 HTTP 压缩；它不是线上 GitHub Pages 加载耗时。

优化前的媒体与画质对比保存在本机忽略目录 `.local-production/web-performance-20261015/`，不会随网站发布。以后重新编码时应从原始素材开始，避免反复压缩已发布文件。

参考：[视频按需加载](https://web.dev/articles/lazy-loading-video)、[FFmpeg 编码与 MP4 faststart](https://www.ffmpeg.org/ffmpeg-all.html)。



## Citation

If you use Gan Jiang in your research, please cite our paper:

```bibtex
@misc{cao2026selflearningscientificagentxray,
  title         = {A self-learning scientific agent for X-ray diffraction},
  author        = {Bin Cao and Huichi Zhou and Runyu Yang and Jingsong Li and Shuchen Sun and Yan Song and Hanyu Gao and Zhongwei Yu and Tong-Yi Zhang and Jun Wang},
  year          = {2026},
  eprint        = {2610.07862},
  archivePrefix = {arXiv},
  primaryClass  = {cond-mat.mtrl-sci},
  url           = {https://arxiv.org/abs/2610.07862}
}
```

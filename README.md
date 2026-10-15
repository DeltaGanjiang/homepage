# Homepage

GanJiang agent [homepage](https://ganjiang.asia/) [https://ganjiang.asia/](https://ganjiang.asia/).

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

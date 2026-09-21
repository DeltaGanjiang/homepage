# 自动部署到服务器

当 `main` 分支收到新提交时，`.github/workflows/deploy.yml` 会通过 SSH 和 rsync 将站点同步到生产服务器。Actions 页面也可以手动触发部署。

## 当前部署目标

Workflow 已配置为：

| 项目 | 值 |
| --- | --- |
| 服务器 | `113.45.229.10` |
| SSH 端口 | `22` |
| 部署目录 | `/home/ganjiang` |

SSH 用户仍通过 GitHub Environment variable `DEPLOY_USER` 配置。不建议使用 `root`；请为 Actions 创建只能写入该站点目录的专用用户。

## 1. 服务器准备

服务器需要：

- 可从公网通过 SSH 访问。
- 已安装 `rsync`。
- 一个不需要 `sudo` 的专用部署用户。
- 部署目录对该用户可写，对 Nginx/Caddy 等 Web 服务可读。

假设专用用户为 `deploy`：

```bash
sudo useradd --create-home --shell /bin/bash deploy
sudo mkdir -p /home/ganjiang
sudo chown -R deploy:deploy /home/ganjiang
sudo -u deploy touch /home/ganjiang/.ganjiang-deploy-target
```

`.ganjiang-deploy-target` 是安全标记。只有目标目录内存在该文件时，workflow 才会执行同步。

## 2. 创建独立部署密钥

在信任的本机上生成一对专用密钥：

```bash
ssh-keygen -t ed25519 -C "github-actions@DeltaGanjiang/homepage" -f ./ganjiang_deploy_key -N ""
```

将公钥安装到服务器：

```bash
ssh-copy-id -i ./ganjiang_deploy_key.pub -p 22 deploy@113.45.229.10
```

不要将 `ganjiang_deploy_key` 私钥提交到 Git，也不要通过聊天发送。

## 3. 确认服务器指纹

在服务器上查看 SSH 主机指纹：

```bash
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

再从信任的本机获取 `known_hosts` 记录：

```bash
ssh-keyscan -p 22 113.45.229.10
```

将 `ssh-keyscan` 输出的指纹与服务器上的指纹核对后，才将它保存到 GitHub。

## 4. 配置 GitHub production Environment

进入仓库：

`Settings` → `Environments` → `New environment` → 创建 `production`

添加以下 Environment variable：

| 名称 | 示例 | 说明 |
| --- | --- | --- |
| `DEPLOY_USER` | `deploy` | SSH 部署用户 |

`DEPLOY_HOST`、`DEPLOY_PORT` 和 `DEPLOY_PATH` 已固定在 workflow 内，无需重复配置。

添加以下 Environment secrets：

| 名称 | 内容 |
| --- | --- |
| `DEPLOY_SSH_KEY` | `ganjiang_deploy_key` 私钥的完整内容 |
| `DEPLOY_KNOWN_HOSTS` | 经过指纹核对的 `ssh-keyscan` 完整输出 |

GitHub 的 Secrets 会注入 workflow，不会写入仓库。

## 5. 首次部署

配置完成后推送 `main`：

```bash
git push origin main
```

在 GitHub 仓库的 `Actions` 页面打开 **Deploy website** 即可查看进度。部署会使用 `--delete-delay` 使服务器目录与仓库站点内容保持一致，但会保留 `.ganjiang-deploy-target` 安全标记。

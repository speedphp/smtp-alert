## 模拟SMTP服务

通过模拟SMTP服务，来获取metabase发送告警邮件内容的标题和URL。

然后再发送到企业微信的告警渠道。

这是由于metabase只有邮件告警的原因。

完成可通过pm2执行

完成发送企业微信功能

### 环境

Node v14

### 安装

> npm i

### 执行

> pm2 start

### 清单

1. 安装nodejs，14 LTS 版本
2. 建个目录
3. 把文件解压到目录里面
4. 在目录里面运行npm i
5. 执行 npm i -g pm2
6. 启动 pm2 start



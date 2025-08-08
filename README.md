# hosts-manager

一款跨平台的hosts文件管理工具，本工具基于[electron](http://electron.atom.io/)，使用javascript就能编写跨平台的桌面应用。

## how to use

推荐使用 Node.js 12.x

```shell
# 安装依赖
npm install

# 编译工具源文件
npm run build

# 用electron打包
npm run pack
```

然后你就可以在根目录看到一个新文件夹`out/hosts-manager-xxx-xx`，打开这个文件夹下面的`hosts-manager`就可以执行本工具了。

> 注意

> OS X和linux系统，需要root权限运行

## 数据结构

```js
// project
{
    id: '',
    projectName: '',
    active: false,
    groups: [
        {
            id: '',
            groupName: '',
            active: false,
            status: '',
            content: ''
        }
    ]
}
```

## changelog

### v0.0.7
* 调整 UI
* 更新 electron 到 v4
* 更新 react 到 v16
* 增加 codemirror

### v0.0.5
* 样式调整
* hosts 文件内容预览移到顶部导航

### v0.0.4
* 一些UI上的优化

### v0.0.3

* 增加导入导出功能
* 增加全局hosts配置

### v0.0.2

* 添加project的名称修改
* 修复modal的clickAway bug
* 样式进行一些修改

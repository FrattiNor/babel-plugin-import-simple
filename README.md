<h1 align="center">babel-plugin-import-simple</h1>

babel 按需加载插件 简易版

### Install

```
npm install babel-plugin-import-simple --save-dev
```

`babelrc` 配置

```
{
  "plugins": [["import-simple", options]]
}
```

### options

```
{
  "libraryName": "xxx", // 包名
  "libraryDirectory": "lib", // 仓库名
  "toUnderlineLowerCase": true // 转中划线小写
}
```

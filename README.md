# TMedia

多媒体组件`tmedia`，封装了`React`和`Vue`两个版本的`video, audio`组件

## Usage

### Install

```bash
# 安装tmedia依赖包，并且安装所有packages的相关依赖
npm run bootstrap

# 安装预览项目examples相关依赖
cd examples
npm install
```

### Preview

```bash
# 通过预览项目调试tmedia
cd examples
npm start
```

### Build & Publish

```bash
# 通过lerna构架和发布tmedia
npm run build
npm run publish
```

### 工程目录

```
- examples                  // 测试demo工程
- packages
    - tma                   // 音频组件
        - dist
            - tmav.js       // 打包出来的Vue音频组件
            - tmar.js       // 打包出来的React音频组件
        - src
            - components    // 原子组件
            - assets        // 资源文件
            - ReactApp.tsx  // React入口文件
            - VueApp.vue    // Vue入口文件
    - tmv                   // 视频组件
        - dist
            - tmvv.js        // 打包出来的Vue视频组件
            - tmvr.js        // 打包出来的React视频组件        
        - src
            - components    // 原子组件
            - assets        // 资源文件
            - ReactApp.tsx  // React入口文件
            - VueApp.vue    // Vue入口文件
```
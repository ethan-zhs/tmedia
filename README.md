# TMedia

多媒体组件`tmedia`，封装了`React`和`Vue`两个版本的`video, audio`组件

## Usage

```bash
# 分别cd到examples, packages/tmv, packages/tma 执行install命令
npm install

# cd 到examples执行start命令, 预览项目
npm start

# cd 到根目录执行publish命令发布packages里面的包
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
            - tmv.js        // 打包出来的Vue视频组件
            - tmv.js        // 打包出来的Vue视频组件        
        - src
            - components    // 原子组件
            - assets        // 资源文件
            - ReactApp.tsx  // React入口文件
            - VueApp.vue    // Vue入口文件
```
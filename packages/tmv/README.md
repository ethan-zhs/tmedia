# Tmedia Video Player

Tmedia Video Player 是一个跨平台的视频播放器，解决多端视频播放器功能样式统一问题。
1. 支持PC端和移动端样式
2. 同时支持 `React Vue` 组件，也支持原生js引入使用
3. 支持视频源`mp4, hls, flv`

## Install

```bash
npm install @tmedia/tmv --registry http://192.168.31.66:4873
```

## Usage

### CDN引入

```javascript
<script src="https://cdndomian/tmv.js"></script>

var video = document.getElementById('tmv')

var tmv = new Tmv(options)
tmv.attachMedia(video)
tmv.load()
```

### NPM引入

```javascript
import Tmv from '@tmedia/tmv'

const video = document.getElementById('tmv')

const tmv = new Tmv(options)
tmv.attachMedia(video)
tmv.load()
```

### React Component

```javascript
// React Component
import Tmvr from '@tmedia/tmv/dist/tmvr.js'
import '@tmedia/tmv/dist/tmvr.css'

<Tmvr
    poster="poster url"
    url="video url"
/>
```

### Vue Component

```javascript
// Vue Component
import Tmvv from '@tmedia/tmv/dist/tmvv.js'
import '@tmedia/tmv/dist/tmvv.css'

<Tmvv
    poster="poster url"
    url="video url"
/>
```

### Webpack config

```javascript
// webpack 配置打包 @tmedia/tmv css 文件
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    include: [path.join(__dirname, 'node_modules/@tmedia/tmv/dist')]
}
```

## Configuration

| 配置项| 类型| 默认值| 描述 | 可选 |
| :---- | :----: | :----: | ---- | :----: |
| poster| string | null | 视频封面图片 | 是 |
| url | string | null | 播放地址, 目前支持`.mp4 .flv .m3u8`三种播放源 | 否 |
| autoPlay | boolean | true | 自动播放 | 是 |
| mute | boolean | false | 静音 | 是 |
| device | string | "pc" | 播放平台，支持`"pc"`和`"mobile"`两种UI | 是 |
| type | string | "mp4" | 播放源类型, 决定播放视频的方式, 取值包括`["hls","flv","mp4"] `| 是 |
| controls | string | true | 是否显示播放控件 | 是 |
| definition | array | null | 画质选择列表, 数据结构`[{name: 'hd', cName: '高清', url: ''},{name: 'sd', cName: '标清', url: ''}]` | 是 |
| playbackRateList | array | null | 播放速率列表, 数据结构`[{value: '1', default: true},{value: '1.5'}]` | 是 |
| toNextVideo | function | null | 点击下一条或播放结束回调函数 | 是 |
| castScreen | function | null, 当有值时显示投屏 | 触发投屏回调 | 是 |


## Properties

### `attachMedia()`
注入video Element, 初始化Tmv UI及相关组件

**Arguments**
1. video(HTMLVideoElement): 视频元素

**Returns**
_(Undefined)_

**Example**
```javascript
tmv.attachMedia(video)
```

### `load()`
加载播放视频源，`Hls Mp4 Flv`分别用不同的加载方式

**Arguments**

**Returns**
_(Undefined)_

**Example**
```javascript
tmv.load()
```

### `play()`
主动播放视频

**Arguments**

**Returns**
_(Undefined)_

**Example**
```javascript
tmv.play()
```

### `on()`
监听视频播放事件

**Arguments**
1. EvenType(string): 事件类型
2. callback(func): 事件回调函数

**Returns**
_(Undefined)_

**Example**
```javascript
tmv.on('play', () => {})
```

### `media()`
获得Tmv video element

**Arguments**

**Returns**
_(HTMLVideoElement)_

**Example**
```javascript
tmv.media()
```

### `destroy()`
销毁正在播放的视频源，live停止拉流

**Arguments**

**Returns**
_(Undefined)_

**Example**
```javascript
tmv.destroy()
```
import window from '../global/window'

/**
 * 异步加载script
 *
 * @param {String} url script url
 */
export function loadScript(url: string) {
    return new Promise(resolve => {
        const script = document.createElement('script')

        script.setAttribute('type', 'text/javascript')
        script.setAttribute('src', url)
        script.onload = async res => {
            resolve(res)
        }

        document.body.appendChild(script)
    })
}

/**
 * 生产随机字符串
 *
 * @param {Number} size 随机字符串长度
 */
export function randomHash(size: number) {
    const seed = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9'
    ]

    let hashStr = ''

    for (let i = 0; i < size; i++) {
        const num = Math.round(Math.random() * (seed.length - 1))
        hashStr += seed[num]
    }

    return hashStr
}

/**
 * 格式化播放时间(HH:mm:ss)
 *
 * @param {Number} second 秒
 */
export function timeFormat(second: number) {
    second = Math.round(second)
    const h = Math.floor(second / 3600)
    const m = Math.floor((second % 3600) / 60)
    const s = second % 60 || 0

    let timeStr = h > 0 ? `${h}:` : ''
    timeStr += m > 0 ? `${m}:` : '0:'
    timeStr += s > 9 ? s : `0${s}`

    return timeStr
}

/**
 * 获得终端设备类型
 *
 */
export function getDevice() {
    const ua = navigator.userAgent
    const isWindowsPhone = /(?:Windows Phone)/.test(ua)
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
    const isApp = /(?:touchtv)/.test(ua)
    const isAndroid = /(?:Android)/.test(ua)
    const isFireFox = /(?:Firefox)/.test(ua)
    // const isChrome = /(?:Chrome|CriOS)/.test(ua)
    const isTablet =
        /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet
    const isPC = !isPhone && !isAndroid && !isSymbian && !isTablet
    return {
        isTablet,
        isPhone,
        isAndroid,
        isPC,
        isApp
    }
}

/**
 * 初始化视频
 *
 * @param {Object} options 视频配置
 * @param {Func} errorCallBack 错误回调函数
 *
 * @desc 根据不同的类型选择不同的视频源解析器初始化播放视频
 */
export async function videoInitialize({ type = 'mp4', autoPlay = false, video }: any, errorCallBack?: any) {
    switch (type) {
        case 'hls':
            // 如果是PC则用hls.js播放m3u8
            const { isPC } = getDevice()
            if (isPC) {
                await loadScript('https://sitecdn.itouchtv.cn/sitecdn/cdn-lib/hls/hls.min.js')
                if (window.Hls.isSupported()) {
                    const hls = new window.Hls({})
                    hls.loadSource(video.src)
                    hls.attachMedia(video)
                    hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
                        autoPlay && video.play()
                    })
                    hls.on(window.Hls.Events.ERROR, (event: any, data: any) => {
                        switch (data.type) {
                            case 'networkError':
                                errorCallBack && errorCallBack(data)
                                break
                            default:
                                console.log(data)
                                break
                        }
                    })

                    hls.on(window.Hls.Events.LEVEL_LOADED, (event: any, data: any) => {
                        const isLive = data.details.live
                        video.isLive = isLive
                    })

                    video.addEventListener('play', () => {
                        const duration = video.duration

                        if (duration && duration - 18 > 0) {
                            const timer = setTimeout(() => {
                                video.currentTime = duration - 18
                                clearTimeout(timer)
                            }, 3000)
                        }
                    })

                    return hls
                }
            }

            break
        case 'flv':
            await loadScript('https://sitecdn.itouchtv.cn/sitecdn/cdn-lib/flv/flv.min.js')

            if (window.flvjs.isSupported()) {
                const flv = window.flvjs.createPlayer({
                    type: 'flv',
                    url: video.src
                })
                flv.attachMediaElement(video)
                flv.load()
                autoPlay && flv.play()
                flv.on('error', (err: any) => {
                    switch (err) {
                        case 'NetworkError':
                            errorCallBack && errorCallBack(err)
                    }
                })

                return flv
            }
            break

        default:
            video.load()
            if (autoPlay) {
                const play = video.play() || {}
                if (play && play.catch) {
                    play.catch(() => {
                        console.log('[TMV] Video cannot autoplay')
                    })
                }
            }
    }
}

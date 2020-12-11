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

export function videoInitialize({ type = 'mp4', autoPlay = false, video }: any, errorCallBack?: any) {
    const win: any = window

    switch (type) {
        case 'hls':
            // 如果是PC则用hls.js播放m3u8
            const { isPC } = getDevice()
            isPC &&
                loadScript('https://sitecdn.itouchtv.cn/sitecdn/cdn-lib/hls/hls.min.js').then(() => {
                    if (win.Hls.isSupported()) {
                        const hls = new win.Hls({
                            liveDurationInfinity: true
                        })
                        hls.loadSource(video.src)
                        hls.attachMedia(video)
                        hls.on(win.Hls.Events.MANIFEST_PARSED, () => {
                            autoPlay && video.play()
                        })
                        hls.on(win.Hls.Events.ERROR, function (event: any, data: any) {
                            errorCallBack && errorCallBack(data)
                        })
                    }
                })

            break
        case 'flv':
            loadScript('https://sitecdn.itouchtv.cn/sitecdn/cdn-lib/flv/flv.min.js').then(() => {
                if (win.flvjs.isSupported()) {
                    const flv = win.flvjs.createPlayer({
                        type: 'flv',
                        url: video.src
                    })
                    flv.attachMediaElement(this.video)
                    flv.load()
                    autoPlay && flv.play()
                    flv.on('error', (err: any) => {
                        console.log(err)
                        errorCallBack && errorCallBack(err)
                    })
                }
            })
            break

        default:
            video.load()
            autoPlay &&
                video.play().catch(() => {
                    console.log('[TMV] Video cannot autoplay')
                })
    }
}

export function createDomWithClass(className: string, domType?: string) {
    const dom = document.createElement(domType || 'div')
    dom.setAttribute('class', className)
    return dom
}

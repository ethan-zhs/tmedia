class Component {
    // 播放器配置信息
    options_: any

    // 播放器videoElement
    player_: any

    // 当前控件Element
    el_: any

    // 全局state
    state_: any

    // setTimeout / clearTimeout使用的timer变量
    timer_: any

    // 存放注册组件的全局对象
    static components_: any = {}

    constructor(player: any, options: any = {}) {
        this.options_ = options
        this.player_ = player

        this.state_ = this.options_.state || {}

        this.el_ = this.createEl()
    }

    /**
     * 初始化子组件
     *
     * @param {Array<String> | String} childrens 子组件名
     * @param {HTMLElement} el 父组件
     */
    initChildren(childrens: Array<string> | string, el?: any) {
        childrens = Array.isArray(childrens) ? childrens : [childrens]

        childrens.forEach((com: string) => {
            this.addChild(com, el)
        })
    }

    /**
     * 添加子组件
     *
     * @param {String} ComponentClassName 组件名
     * @param {HTMLElement} el 父组件
     */
    addChild(ComponentClassName: string, el?: any) {
        const ComponentClass = Component.getComponent(ComponentClassName)

        const component = new ComponentClass(this.player_, this.options_)
        this.appendContent(component.el(), el)
    }

    /**
     * 设置全局状态state
     *
     * @param {Object} stateUpdates 更新的State
     */
    setState(stateUpdates: any) {
        this.state_ = Object.assign(this.state_, stateUpdates)
    }

    /**
     * 创建元素
     *
     * @param {String} tagName 标签名
     * @param {Object} attributes 标签属性
     */
    createEl(tagName?: string, attributes?: any) {
        const el = document.createElement(tagName || 'div')

        Object.getOwnPropertyNames(attributes || {}).forEach(function (attrName) {
            el.setAttribute(attrName, attributes[attrName])
        })

        return el
    }

    /**
     * 添加CSS类
     *
     * @param {String} className css类名
     * @param {HTMLElement} el 操作元素
     */
    addClass(className: string, el?: any) {
        if (!el) {
            el = this.el_
        }

        el.classList.add(className)
    }

    /**
     * 移除CSS类
     *
     * @param {String} className css类名
     * @param {HTMLElement} el 操作元素
     */
    removeClass(className: string, el?: any) {
        if (!el) {
            el = this.el_
        }

        el.classList.remove(className)
    }

    /**
     * 插入子元素
     *
     * @param {HTMLElement} content 插入的子元素
     * @param {HTMLElement} el 被插入的元素
     */
    appendContent(content: any, el?: any) {
        if (!el) {
            el = this.el_
        }

        content = Array.isArray(content) ? content : [content]
        content.map((elem: any) => {
            el.appendChild(elem)
        })
    }

    /**
     * 获得player video Element
     *
     * @return {HTMLVideoElement}
     */
    player() {
        return this.player_
    }

    /**
     * 获得当前控件Element
     *
     * @return {HTMLElement}
     */
    el() {
        return this.el_
    }

    /**
     * 设置setTimeout
     *
     * @param {Func} cb 回调函数
     * @param {Number} time 延时时间
     */
    setTimer(cb: any, time: number) {
        this.timer_ = setTimeout(cb, time)
    }

    /**
     * 清理setTimeout
     */
    clearTimer() {
        if (this.timer_) {
            clearTimeout(this.timer_)
            this.timer_ = null
        }
    }

    /**
     * 监听事件
     *
     * @param {HTMLElement} el 监听元素
     * @param {String} eventType 事件类型
     * @param {Func} cb 回调函数
     */
    on(el: any, eventType: string, cb: any) {
        el.addEventListener(eventType, cb)
    }

    /**
     * 插入富文本
     *
     * @param {String} htmlStr HTML文本
     */
    html(htmlStr: string) {
        this.el_.innerHTML = htmlStr
    }

    /**
     * 获得已注册的组件
     *
     * @param {String} name 组件名称
     * @param {Component} Com 组件
     */
    static registerComponent(name: string, Com: any) {
        Component.components_[name] = Com
        Component.components_[name.toLowerCase()] = Com

        return Com
    }

    /**
     * 获得已注册的组件
     *
     * @param {String} name 组件名称
     */
    static getComponent(name: string) {
        return Component.components_[name]
    }
}

export default Component

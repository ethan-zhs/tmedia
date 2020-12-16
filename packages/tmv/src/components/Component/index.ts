class Component {
    options_: any
    player_: any

    el_: any

    state_: any

    timer_: any

    static components_: any = {}

    constructor(player: any, options: any = {}) {
        this.options_ = options
        this.player_ = player

        this.state_ = this.options_.state || {}

        this.el_ = this.createEl()
    }

    initChildren(childrens: any, el?: any) {
        childrens = Array.isArray(childrens) ? childrens : [childrens]

        childrens.forEach((com: string) => {
            this.addChild(com, el)
        })
    }

    addChild(ComponentClassName: string, el?: any) {
        const ComponentClass = Component.getComponent(ComponentClassName)

        const component = new ComponentClass(this.player_, this.options_)
        this.appendContent(component.el(), el)
    }

    setState(stateUpdates: any) {
        this.state_ = Object.assign(this.state_, stateUpdates)
    }

    createEl(tagName?: string, attributes?: any) {
        const el = document.createElement(tagName || 'div')

        Object.getOwnPropertyNames(attributes || {}).forEach(function (attrName) {
            el.setAttribute(attrName, attributes[attrName])
        })

        return el
    }

    addClass(className: string, el?: any) {
        if (!el) {
            el = this.el_
        }

        el.classList.add(className)
    }

    removeClass(className: string, el?: any) {
        if (!el) {
            el = this.el_
        }

        el.classList.remove(className)
    }

    appendContent(content: any, el?: any) {
        if (!el) {
            el = this.el_
        }

        content = Array.isArray(content) ? content : [content]
        content.map((elem: any) => {
            el.appendChild(elem)
        })
    }

    player() {
        return this.player_
    }

    el() {
        return this.el_
    }

    setTimer(cb: any, time: number) {
        this.timer_ = setTimeout(cb, time)
    }

    clearTimer() {
        if (this.timer_) {
            clearTimeout(this.timer_)
            this.timer_ = null
        }
    }

    on(el: any, eventType: string, cb: any) {
        el.addEventListener(eventType, cb)
    }

    html(htmlStr: string) {
        this.el_.innerHTML = htmlStr
    }

    static registerComponent(name: string, Com: any) {
        Component.components_[name] = Com
        Component.components_[name.toLowerCase()] = Com

        return Com
    }

    static getComponent(name: string) {
        return Component.components_[name]
    }
}

export default Component

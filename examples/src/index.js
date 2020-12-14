import '@babel/polyfill'
import ReactApp from './App.tsx'
import VueApp from './App.vue'
import JsApp from './index.tsx'
import Vue from 'vue'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './index.less'

ReactDOM.render(<JsApp />, document.getElementById('js-dom'))
ReactDOM.render(<ReactApp />, document.getElementById('react-dom'))

new Vue({
    el: '#vue-dom',
    render: h => h(VueApp)
})

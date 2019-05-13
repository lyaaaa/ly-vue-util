const path = require('path');
const fs = require('fs');
const __root__ = process.cwd()

module.exports = {
    makeStore: function () {
        var url = path.join(__root__, '/src/store');
var VUEXJS = [{
        name: '/actions.js',
        content: ''
    },
    {
        name: '/getters.js',
        content: ''
    },
    {
        name: '/index.js',
        content: `import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
Vue.use(Vuex)
export default new Vuex.Store({
actions,
getters,
state,
mutations,
strict: true})`
    },
    {
        name: '/mutation-types.js',
        content: ''
    },
    {
        name: '/mutation.js',
        content: `import * as types from './mutation-types'\n
const mutations = {}\n
export default mutations`
    },
    {
        name: '/state.js',
        content: `const state = {}\n
export default state`
    }
]
        fs.mkdir(url, (err) => {
            if (err) throw err;
            for (let i = 0; i < VUEXJS.length; i++) {
                fs.writeFile(path.join(__root__, '/src/store', VUEXJS[i].name), VUEXJS[i].content, err => {
                    if (err) throw err;
                })
            }
        })
    }
}
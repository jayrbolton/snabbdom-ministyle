const test = require('tape')
const snabbStyle = require('..')
const h = require('snabbdom/h').default
const snabbdom = require('snabbdom').default

const patch = snabbdom.init([
  snabbStyle
])


test('basic styles',  t => {
  const p = h('p', {
    css: {
      'font-weight': 'bold'
    }
  }, 'lorem ipsum')
  var container = document.createElement('div')
  const vnode = patch(container, p)
  console.log(vnode)
  console.log(vnode.elm)
  t.end()
})

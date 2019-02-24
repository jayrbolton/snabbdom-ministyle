const test = require('tape')
const snabbStyle = require('..')
const h = require('snabbdom/h').default
const snabbdom = require('snabbdom')

const patch = snabbdom.init([
  snabbStyle
])

test('basic styles', t => {
  const p = h('p', {
    css: {
      root: ['font-weight: bold'],
      ' span': ['font-weight: normal']
    }
  }, 'lorem ipsum')
  let container = document.createElement('div')
  let vnode = patch(container, p)
  t.strictEqual(vnode.elm.firstChild.innerHTML, '[data-sbid="0"] {font-weight: bold}\n[data-sbid="0"] span {font-weight: normal}\n')
  const p1 = h('p', {
    css: {root: ['font-weight: bold']}
  }, 'hi')
  const p2 = h('p', {
    css: {root: ['font-weight: bold']}
  }, 'hi')
  const div = h('div', [p1, p2])
  container = document.createElement('div')
  vnode = patch(container, div)
  const ids = Array.from(vnode.elm.children)
    .map(elm => elm.firstChild.innerHTML.slice(12, 13))
  t.deepEqual(ids, ['1', '2'])
  t.end()
})

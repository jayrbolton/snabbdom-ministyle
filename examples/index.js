const snabbStyle = require('..')
const h = require('snabbdom/h').default
const snabbdom = require('snabbdom')

const patch = snabbdom.init([
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/eventlisteners').default,
  snabbStyle
])

const el = h('div', {
  css: {
    root: [
      'display: flex',
      'animation-duration: 3s',
      'animation-name: sliden'
    ],

    ' div': [ 'margin: 1rem' ],

    ' > div > span': [
      'color: pink',
      'font-style: italic',
      'font-weight: bold'
    ]
  }
}, [
  h('div', {
    css: {
      root: [
        'cursor: pointer'
      ]
    },
    on: {
      click: ev => {
        console.log('hello!')
      }
    }
  }, 'one'),
  h('div', 'two'),
  h('div', [h('span', 'three')])
])

var container = document.createElement('div')
const vnode = patch(container, el)
document.body.appendChild(vnode.elm)

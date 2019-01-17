
# snabbdom-picostyle

This combines the usage of snabbdom and picostyle for a minimalistic approach to CSS-in-JS. 

While picostyle is not compatible with the snabbdom API, we have forked and adapted the picostyle code to work as a snabbdom plugin.

## Usage

Install with `npm i snabbdom-picostyle`

```js
const patch = require('snabbdom').init([
  // Put snabbdom-picostyle first
  require('snabbdom-picostyle'),
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/eventlisteners').default,
  require('snabbdom/modules/dataset').default,
  require('snabbdom/modules/attributes').default
])

const h = requiree('snabbdom/h').default

// Use with the `css` property
h('div', {
  // picostyle CSS rules below
  css: {
    color: 'pink',
    background: 'pink'
  }
}, 'hello world')
```

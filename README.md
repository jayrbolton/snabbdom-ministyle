# snabbdom-ministyle

This is a small snabbdom module for writing stylesheets inside snabbdom components. Style rules can apply to the root component, as well as  any child components.

## Installation

Install with `npm i snabbdom-ministyle`

## Usage

```js
const patch = require('snabbdom').init([
  // Include the module as a snabbdom plugin
  require('snabbdom-ministyle'),
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/eventlisteners').default,
  require('snabbdom/modules/dataset').default,
  require('snabbdom/modules/attributes').default
])

const h = require('snabbdom/h').default

// Use with the `css` property
// The `root` key applies style rules to the `div`
// Any other keys can apply to children or pseudo-selectors
h('div', {
  // picostyle CSS rules below
  css: {
    root: [ 'color: pink' ],
    ' span': [ 'color: blue' ],
    ' > div > span': [ 'color: purple' ]
  }
}, [
  h('span', 'i will be blue'),
  h('div', [
    h('span', 'i will be purple')
  ])
])
```

Also see the [/examples](/examples) folder for more examples.

## API

### h(selector, { css: rules }, children)

The `rules` inside the `css` option passed to the `h()` function can have the following keys:

* The `root` node: rules applied to the root snabbdom node defined by the `h()` function
* Any other keys can be used as rules concatenated to the base node, such as child nodes or psuedo-selectors

Style rules are written as arrays of strings, where each string is the rule (key + value), such as `font-weight: 800`.

_Styling the root node:_

```js
h('div', {
  css: {
    root: ['color: blue']
  }
}, 'root')
```

_Styling child nodes_

```js
h('fieldset', {
  css: {
    ' label': [
      'display: inline-block',
      'margin-right: 1rem'
    ],
    ' input': [
      'display: inline-block'
    ]
  }
}, [
  label,
  input
])
```

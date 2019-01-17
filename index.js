// ID for generating unique css classnames
var _id = 0
// Stylesheet to which we will insert all our css rules
var sheet = document.head.appendChild(document.createElement('style')).sheet

// Convert camel case rule names to hyphenated names
function hyphenate (str) {
  return str.replace(/[A-Z]/g, '-$&').toLowerCase()
}

// Insert a new rule into the sheet
function insert (rule) {
  sheet.insertRule(rule, sheet.cssRules.length)
}

// Create a new css style rule with a unique classname
function createStyle (obj) {
  var id = 'p' + _id++
  parse(obj, '.' + id).forEach(insert)
  return id
}

// Wrap a set of css rules in a selector and braces
function wrap (stringToWrap, wrapper) {
  return wrapper + '{' + stringToWrap + '}'
}

// Parse an object containing multiple css rules
function parse (obj, classname, isInsideObj) {
  var arr = ['']
  isInsideObj = isInsideObj || 0
  for (var prop in obj) {
    var value = obj[prop]
    prop = hyphenate(prop)
    // Same as typeof value === 'object', but smaller
    if (!value.sub && !Array.isArray(value)) {
      if (/^(:|>|\.|\*)/.test(prop)) {
        prop = classname + prop
      }
      // replace & in "&:hover", "p>&"
      prop = prop.replace(/&/g, classname)
      arr.push(
        wrap(parse(value, classname, 1 && !/^@/.test(prop)).join(''), prop)
      )
    } else {
      value = Array.isArray(value) ? value : [value]
      value.forEach((value) => {
        arr[0] += prop + ':' + value + ';'
      })
    }
  }
  if (!isInsideObj) {
    arr[0] = wrap(arr[0], classname)
  }
  return arr
}

/*
export default function(h) {
  return function(nodeName) {
    var cache = {}
    return function(decls) {
      return function(attributes, children) {
        attributes = attributes || {}
        children = attributes.children || children
        var nodeDecls = typeof decls == "function" ? decls(attributes) : decls
        var key = JSON.stringify(nodeDecls)
        cache[key] || (cache[key] = createStyle(nodeDecls))
        attributes.class = [attributes.class, cache[key]]
          .filter(Boolean)
          .join(" ")
        return h(nodeName, attributes, children)
      }
    }
  }
}
*/

// TODO move to subdir
function keyframes (obj) {
  var id = 'p' + _id++
  insert(wrap(parse(obj, id, 1).join(''), '@keyframes ' + id))
  return id
}

// Snabbdom hook for updating picostyles for an element
// oldVnode will be an empty vnode on create
function snabbUpdate (oldVnode, vnode) {
  var elm = vnode.elm
  var oldCss = oldVnode.data.props
  var newCss = vnode.data.props
  if (!oldCss && !newCss) return
  if (oldCss === newCss) return
  var key
  for (key in oldCss) {
    if (!newCss[key]) {
      // Remove a css rule
    }
  }
  var current, old
  for (key in newCss) {
    current = newCss[key]
    old = oldCss[key]
    if (current !== old) {
      // Insert a new css rule
    }
  }
}

module.exports = {
  create: snabbUpdate,
  update: snabbUpdate
}

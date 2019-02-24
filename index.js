// ID for generating unique css classnames
document.body._snabbdomMiniStyleID = 0
function createClassName () {
  // TODO make a little more robust
  return document.body._snabbdomMiniStyleID++
}

// Snabbdom hook for updating element css
// oldVnode will be an empty vnode on create
function snabbUpdate (oldVnode, vnode) {
  var elm = vnode.elm
  var oldCss = oldVnode.data.css
  var newCss = vnode.data.css
  if (!oldCss && !newCss) return
  if (oldCss === newCss) return
  if (!elm.dataset.sbid) {
    elm.dataset.sbid = createClassName()
  }
  var styleid = elm.dataset.sbid
  var styleStr = ''
  var sel = '[data-sbid="' + styleid + '"]'
  for (var name in newCss) {
    var content = ' {' + newCss[name].join('; ') + '}\n'
    if (name === 'root') {
      styleStr += sel + content
    } else {
      styleStr += sel + name + content
    }
  }
  if (!elm._stylesheet) {
    elm._stylesheet = document.createElement('style')
    elm.appendChild(elm._stylesheet)
  }
  elm._stylesheet.innerHTML = styleStr
}

// Remove the stylesheet for this node
function snabbDestroy (vnode) {
  if (vnode.elm._stylesheet) {
    vnode.elm.removeChild(vnode.elm._stylesheet)
  }
}

module.exports = {
  create: snabbUpdate,
  update: snabbUpdate,
  destroy: snabbDestroy
}

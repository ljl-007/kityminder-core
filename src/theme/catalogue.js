define(function (require, exports, module) {
  const theme = require('../core/theme')
  theme.register('catalogue', {
    background: '#fff',

    'root-color': '#FFF',
    'root-background': '#417FF9',
    'root-stroke': 'none',
    'root-font-size': 16,
    'root-padding': [12, 21],
    'root-radius': 6,
    'root-space': 10,

    'main-color': '#333333',
    'main-background': '#F0F2F5',
    'main-stroke': 'none ',
    'main-font-size': 14,
    'main-padding': [6, 20],
    'main-margin': [8, 0, 0, 0],
    'main-radius': 6,
    'main-space': 5,

    'sub-color': '#333333',
    'sub-background': '#F0F2F5',
    'sub-stroke': 'none',
    'sub-font-size': 14,
    'sub-padding': [5, 10],
    'sub-margin': [5, 0, 0, 0],
    'sub-tree-margin': 1,
    'sub-radius': 6,
    'sub-space': 5,

    'connect-color': '#417FF9',
    'connect-width': 1,
    'main-connect-width': 1,
    'connect-radius': 1,

    'selected-background': 'none',
    'selected-stroke': '#2FBDFF',
    'selected-color': 'black',

    'marquee-background': 'rgba(255,255,255,.3)',
    'marquee-stroke': 'white',

    'drop-hint-color': 'yellow',
    'sub-drop-hint-width': 2,
    'main-drop-hint-width': 4,
    'root-drop-hint-width': 4,

    'order-hint-area-color': 'rgba(0, 255, 0, .5)',
    'order-hint-path-color': '#0f0',
    'order-hint-path-width': 1,

    'text-selection-color': 'rgb(27,171,255)',
    'line-height': 1.5
  })
})

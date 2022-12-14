/*
 * @Author: liujinlei liujinlei@zhihuiliu.com
 * @Date: 2022-11-28 11:38:18
 * @LastEditors: liujinlei liujinlei@zhihuiliu.com
 * @LastEditTime: 2022-12-14 17:44:19
 * @FilePath: \kityminder-core\src\theme\catalogue.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
define(function (require, exports, module) {
  const theme = require('../core/theme')
  theme.register('catalogue-edit', {
    background: '#fff',

    'root-color': '#FFF',
    'root-background': '#417FF9',
    'root-stroke': 'none',
    'root-font-size': 16,
    'root-padding': [12, 21],
    'root-radius': 6,
    'root-space': 10,
    'root-selected-background':'#417FF9',
    'root-selected-color': '#FFF',

    'main-color': '#333333',
    'main-background': '#F0F2F5',
    'main-stroke': 'none ',
    'main-font-size': 14,
    'main-padding': [6, 20],
    'main-margin': [8, 0, 0, 0],
    'main-radius': 6,
    'main-space': 5,
    

    'grp-color': '#333333',
    'grp-background': '#DEEAFF',
    'grp-stroke': 'none ',
    'grp-font-size': 14,
    'grp-padding': [9, 12],
    'grp-margin': [8, 0, 0, 0],
    'grp-radius': 6,
    'grp-space': 5,

    'knp-color': '#333333',
    'knp-background': '#DEEAFF',
    'knp-stroke': 'none ',
    'knp-font-size': 14,
    'knp-padding': [9, 12],
    'knp-margin': [8, 0, 0, 0],
    'knp-radius': 6,
    'knp-space': 5,
    'knp-selected-background':'#DEEAFF',

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
    'selected-stroke': '#42D9D4',
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

/**
 * @fileOverview
 *
 * 往右布局结构模板
 *
 * @author: techird
 * @copyright: Baidu FEX, 2014
 */
define(function(require, exports, module) {
    var template = require('../core/template');

    template.register('catalogue', {
        getLayout: function(node) {
            return 'catalogue';
        },

        getConnect: function(node) {
            return 'l';
        }
    });
});
define(function(require, exports, module) {
    var kity = require('../core/kity');
    var utils = require('../core/utils');

    var Minder = require('../core/minder');
    var MinderNode = require('../core/node');
    var Command = require('../core/command');
    var Module = require('../core/module');
    var Renderer = require('../core/render');
    /**
     * 
     * 暂时未增加Linux的处理
     */
    var FONT_ADJUST = {
        'safari': {
            '微软雅黑,Microsoft YaHei': -0.17,
            '楷体,楷体_GB2312,SimKai': -0.1,
            '隶书, SimLi': -0.1,
            'comic sans ms': -0.23,
            'impact,chicago': -0.15,
            'times new roman': -0.1,
            'arial black,avant garde': -0.17,
            'default': 0
        },
        'ie': {
            10: {
                '微软雅黑,Microsoft YaHei': -0.17,
                'comic sans ms': -0.17,
                'impact,chicago': -0.08,
                'times new roman': 0.04,
                'arial black,avant garde': -0.17,
                'default': -0.15
            },
            11: {
                '微软雅黑,Microsoft YaHei': -0.17,
                'arial,helvetica,sans-serif': -0.17,
                'comic sans ms': -0.17,
                'impact,chicago': -0.08,
                'times new roman': 0.04,
                'sans-serif': -0.16,
                'arial black,avant garde': -0.17,
                'default': -0.15
            }
        },
        'edge': {
            '微软雅黑,Microsoft YaHei': -0.15,
            'arial,helvetica,sans-serif': -0.17,
            'comic sans ms': -0.17,
            'impact,chicago': -0.08,
            'sans-serif': -0.16,
            'arial black,avant garde': -0.17,
            'default': -0.15
        },
        'sg': {
            '微软雅黑,Microsoft YaHei': -0.15,
            'arial,helvetica,sans-serif': -0.05,
            'comic sans ms': -0.22,
            'impact,chicago': -0.16,
            'times new roman': -0.03,
            'arial black,avant garde': -0.22,
            'default': -0.15
        },
        'chrome': {
            'Mac': {
                'andale mono': -0.05,
                'comic sans ms': -0.3,
                'impact,chicago': -0.13,
                'times new roman': -0.1,
                'arial black,avant garde': -0.17,
                'default': 0
            },
            'Win': {
                '微软雅黑,Microsoft YaHei': -0.15,
                'arial,helvetica,sans-serif': -0.02,
                'arial black,avant garde': -0.2,
                'comic sans ms': -0.2,
                'impact,chicago': -0.12,
                'times new roman': -0.02,
                'default': -0.15
            },
            'Lux': {
                'andale mono': -0.05,
                'comic sans ms': -0.3,
                'impact,chicago': -0.13,
                'times new roman': -0.1,
                'arial black,avant garde': -0.17,
                'default': 0
            }
        },
        'firefox': {
            'Mac': {
                '微软雅黑,Microsoft YaHei': -0.2,
                '宋体,SimSun': 0.05,
                'comic sans ms': -0.2,
                'impact,chicago': -0.15,
                'arial black,avant garde': -0.17,
                'times new roman': -0.1,
                'default': 0.05
            },
            'Win': {
                '微软雅黑,Microsoft YaHei': -0.16,
                'andale mono': -0.17,
                'arial,helvetica,sans-serif': -0.17,
                'comic sans ms': -0.22,
                'impact,chicago': -0.23,
                'times new roman': -0.22,
                'sans-serif': -0.22,
                'arial black,avant garde': -0.17,
                'default': -0.16
            },
            'Lux': {
                "宋体,SimSun": -0.2,
                "微软雅黑,Microsoft YaHei": -0.2,
                "黑体, SimHei": -0.2,
                "隶书, SimLi": -0.2,
                "楷体,楷体_GB2312,SimKai": -0.2,
                "andale mono": -0.2,
                "arial,helvetica,sans-serif": -0.2,
                "comic sans ms": -0.2,
                "impact,chicago": -0.2,
                "times new roman": -0.2,
                "sans-serif": -0.2,
                "arial black,avant garde": -0.2,
                "default": -0.16
            }
        },
    };

    var TextRenderer = kity.createClass('TextRenderer', {
        base: Renderer,

        create: function() {
            return new kity.Group().setId(utils.uuid('node_text'));
        },

        update: function(textGroup, node) {

            function getDataOrStyle(name) {
                return node.getData(name) || node.getStyle(name);
            }

            var nodeText = node.getText();

            var textArr = nodeText
            if(nodeText && utils.checkHtml(nodeText)){
                textArr = [nodeText]
            }else if (nodeText && utils.isArray(nodeText)) {
                textArr = nodeText
            } else {
                textArr = nodeText ? nodeText.split('\n'): [' ']
            }
            
            // var textArr = nodeText
            //                 ? utils.isArray(nodeText)
            //                 ? nodeText
            //                 : nodeText
            //                 ? nodeText.split('\n')
            //                 : ['']
            //                 : ['']

            var lineHeight = node.getStyle('line-height');

            var fontSize = getDataOrStyle('font-size');
            var fontFamily = getDataOrStyle('font-family') || 'default';

            var height = (lineHeight * fontSize) * textArr.length - (lineHeight - 1) * fontSize;
            var yStart = -height / 2;
            var Browser = kity.Browser;
            var adjust;

            if (Browser.chrome || Browser.opera || Browser.bd ||Browser.lb === "chrome") {
                adjust = FONT_ADJUST['chrome'][Browser.platform][fontFamily];
            } else if (Browser.gecko) {
                adjust = FONT_ADJUST['firefox'][Browser.platform][fontFamily];
            } else if (Browser.sg) {
                adjust = FONT_ADJUST['sg'][fontFamily];
            } else if (Browser.safari) {
                adjust = FONT_ADJUST['safari'][fontFamily];
            } else if (Browser.ie) {
                adjust = FONT_ADJUST['ie'][Browser.version][fontFamily];
            } else if (Browser.edge) {
                adjust = FONT_ADJUST['edge'][fontFamily];
            } else if (Browser.lb) {
                // 猎豹浏览器的ie内核兼容性模式下
                adjust = 0.9;
            }

            textGroup.setTranslate(0, (adjust || 0) * fontSize);

            var rBox = new kity.Box(),
                r = Math.round;

            this.setTextStyle(node, textGroup);

            var textLength = textArr.length;

            var textGroupLength = textGroup.getItems().length;

            var i, ci, textShape, text;

            if (textLength < textGroupLength) {
                for (i = textLength, ci; ci = textGroup.getItem(i);) {
                    textGroup.removeItem(i);
                }
            } else if (textLength > textGroupLength) {
                var growth = 0;
                while (growth < textLength) {
                    textShape = new kity.Text().setAttr('text-rendering', 'inherit')
                    if (kity.Browser.ie || kity.Browser.edge) {
                        textShape.setVerticalAlign('top')
                    } else {
                        textShape.setAttr('dominant-baseline', 'text-before-edge')
                    }
                    // console.log(utils.checkHtml(textArr[growth]),textArr[growth])
                    if (!utils.checkHtml(textArr[growth])) {
                        textShape.setContent(textArr[growth])
                    } else {
                        // 方式 一
                        // textShape = textShape.pipe(function () {
                        //     var text_group = textArr[growth]? textArr[growth].text_group:[]
                        //     for (var t = 0; t < text_group.length; t++) {
                        //         const e = text_group[t];
                        //         this.addSpan(new kity.TextSpan(e.text_key).fill(e.text_key_color || ''))
                        //         this.addSpan(new kity.TextSpan(e.text_value).fill(e.text_value_color || '').setFontBold(600))
                        //     }
                        // })
                        
                        // 方式二
                        // var text_group = textArr[growth]? textArr[growth].text_group:[]
                        // var p = document.createElement('p')
                        // for (var t = 0; t < text_group.length; t++) {
                        //     var e = text_group[t];
                        //     var span = document.createElement('span')
                        //     span.innerHTML = textArr[growth]
                        //     p.appendChild(span)
                        // }
                        // 方式三
                        var size = this.fitFormulaSize(textArr[growth]||' ',node.getData('maxRow'),node.getData("maxWidth"));
                        var spaceTop = node.getStyle("space-top");
                        if (!size) return;
                        var x = 0;
                        var y = size.height - spaceTop;
                        if (node.getData("maxRow") !== 1 && size.width > 300) {
                            size.width = 300;
                        } else {
                            size.width += 8;
                        }
                        textShape = new kity.Formula()
                                        .setUrl(textArr[growth])
                                        .setX(x | 0)
                                        .setY(y | 0)
                                        .setWidth(size.width | 0)
                                        .setHeight(size.height | 0)
                    }
                    textGroup.addItem(textShape)
                    growth++
                }
            }

            for (i = 0, text, textShape;
                (text = textArr[i], textShape = textGroup.getItem(i)); i++) {
                if (!utils.checkHtml(text)) {
                    textShape.setContent(text)
                }
                if (kity.Browser.ie || kity.Browser.edge) {
                    textShape.fixPosition();
                }
            }

            this.setTextStyle(node, textGroup);

            var textHash = node.getText() +
                ['font-size', 'font-name', 'font-weight', 'font-style'].map(getDataOrStyle).join('/');

            if (node._currentTextHash == textHash && node._currentTextGroupBox) return node._currentTextGroupBox;

            node._currentTextHash = textHash;

            return function() {
                textGroup.eachItem(function(i, textShape) {
                    var y = yStart + i * fontSize * lineHeight;
                    // old
                    // var y = yStart + i * fontSize * lineHeight;
                    // new
                    var h = 0
                    if(textShape.__KityClassName === 'Formula' &&  node.getData("maxRow") !== 1){
                        if(node.getData("maxRow") === 1){
                            textShape.setY(y + 1);
                        }else{
                            textShape.setY(y + 3);
                        }
                        h = textShape.getHeight()
                    }else{
                        textShape.setY(y)
                        h = fontSize
                    }

                    // if(textShape.items && textShape.items.length){
                    //     var s_x = 0,count = 0,V_K = 2, V_X = 13
                    //     for (var n = 0; n < textShape.items.length; n++) {
                    //       const item = textShape.items[n];
                    //       s_x += item.getWidth()
                    //       if(count === 1){
                    //         s_x += V_K
                    //         item.setAttr('x',s_x - item.getWidth())
                    //       }else if(count === 2){
                    //         count = 0
                    //         s_x += V_X
                    //         item.setAttr('x',s_x - item.getWidth())
                    //       }
                    //       count ++
                    //     }
                    // }
                    var bbox = textShape.getBoundaryBox();
                    // old
                    // rBox = rBox.merge(new kity.Box(0, y, bbox.height && bbox.width || 1, fontSize));
                    // new
                    rBox = rBox.merge(new kity.Box(0, y, bbox.height && bbox.width || 1, h));
                });

                var nBox = new kity.Box(r(rBox.x), r(rBox.y), r(rBox.width), r(rBox.height));
                
                node._currentTextGroupBox = nBox;
                return nBox;
            };

        },

        setTextStyle: function(node, text) {
            var hooks = TextRenderer._styleHooks;
            hooks.forEach(function(hook) {
                hook(node, text);
            });
        },

        fitFormulaSize: function(str,line,maxWidth) {
            var width = 0, height = 0;
            var div = document.createElement('div')
            div.innerHTML = str
            div.style.position = 'absolute'
            div.style.zIndex = "999"
            div.style.fontSize = '14px'
            if(maxWidth){
              div.style.maxWidth = maxWidth + 'px';
            }
            div.style.display = '-webkit-box'
            div.style.overflow = 'hidden'
            div.style.textOverflow = 'ellipsis'
            div.style['-webkit-box-orient'] = 'vertical'
            div.style['-webkit-line-clamp'] = line || 2
            document.body.appendChild(div)
            width = parseFloat(getComputedStyle(div).width) + 1
            height = parseFloat(getComputedStyle(div).height)
            div.remove()
            return {
                width: width,
                height: height
            }
        }
    });

    var TextCommand = kity.createClass({
        base: Command,
        execute: function(minder, text) {
            var node = minder.getSelectedNode();
            if (node) {
                node.setText(text);
                node.render();
                minder.layout();
            }
        },
        queryState: function(minder) {
            return minder.getSelectedNodes().length == 1 ? 0 : -1;
        },
        queryValue: function(minder) {
            var node = minder.getSelectedNode();
            return node ? node.getText() : null;
        }
    });

    utils.extend(TextRenderer, {
        _styleHooks: [],

        registerStyleHook: function(fn) {
            TextRenderer._styleHooks.push(fn);
        }
    });

    kity.extendClass(MinderNode, {
        getTextGroup: function() {
            return this.getRenderer('TextRenderer').getRenderShape();
        }
    });

    Module.register('text', {
        'commands': {
            'text': TextCommand
        },
        'renderers': {
            center: TextRenderer
        }
    });

    module.exports = TextRenderer;
});

'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
const HtmlUtil = {
    escape(html) {
        const codeSpan = /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm;
        const codeBlock = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
        const spans = [];
        const blocks = [];
        let text = String(html).replace(/\r\n/g, '\n')
            .replace('/\r/g', '\n');

        text = `\n\n${text}\n\n`;
        text = text.replace(codeSpan, function(code) {
            spans.push(code);

            return '`span`';
        });
        text += '~0';

        return text.replace(codeBlock, function(whole, code, nextChar) {
            blocks.push(code);

            return `\n\tblock${nextChar}`;
        })
            .replace(/&(?!\w+;)/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;')
            .replace(/`span`/g, function() {
                return spans.shift();
            })
            .replace(/\n\tblock/g, function() {
                return blocks.shift();
            })
            .replace(/~0$/, '')
            .replace(/^\n\n/, '')
            .replace(/\n\n$/, '')
            .replace(/javascript/g, '')
        ;
    }
};

module.exports = HtmlUtil;

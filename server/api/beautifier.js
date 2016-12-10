import Router from 'koa-router';
import jsBeautify from 'js-beautify';
const beautifyJs = jsBeautify.js_beautify;
const beautifyCss = jsBeautify.css;
const beautifyHtml = jsBeautify.html;
const pd = require('pretty-data').pd;

const beautifier = new Router();

beautifier.get('/', function * (next) {
  var result = { beautifier: ''};
  this.body = result;
});

beautifier.post('/', function * (next) {
    var output;

    switch(this.request.body.type) {
        case "js":
            output =  beautifyJs(this.request.body.content, { indent_size: 4});
            break;
        case "html":
            output =  beautifyHtml(this.request.body.content, { indent_size: 4 });
            break;
        case "css":
            output =  beautifyCss(this.request.body.content, { indent_size: 4 });
            break;
        case "sql":
            output = pd.sql(this.request.body.content);
            break;
        case "xml":
            output = pd.xml(this.request.body.content);
            break;
        case "guess":
            output =  beautifyJs(this.request.body.content, { indent_size: 4 });
            break;
        default:
            output =  beautifyJs(this.request.body.content, { indent_size: 4 });
    }

    var result = {
      content: this.request.body.content,
      type: this.request.body.type,
      beautified: output
    };
    this.body = result;
});

export default beautifier;

'use strict';

var PluginError = require('gulp-util').PluginError;
var fs = require('fs');
var through = require('through2');
var node_path = require('path');

var file = node_path.join(__dirname, 'jade', 'common.jade');
var common = fs.readFileSync(file);

module.exports = function (options){
  options = options || {};
  return through.obj(function (file, enc, callback) {
    options.filename = file.path;
    // file.path = handleExtension(file.path, opts);

    if(file.isStream()){
      this.emit('error', new PluginError('gulp-jade', 'Streaming not supported'));
      return callback();
    }

    file.contents = new Buffer(common + String(file.contents));
    this.push(file);
    callback();
  });
};

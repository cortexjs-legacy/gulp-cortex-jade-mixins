'use strict';

var PluginError = require('gulp-util').PluginError;
var fs = require('fs');
var through = require('through2');

var common = fs.readFileSync('common.jade');

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

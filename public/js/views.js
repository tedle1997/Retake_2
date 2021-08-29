//EJS Compiled Views - This file was automatically generated on Sun Aug 29 2021 19:21:23 GMT+0200 (Central European Summer Time)
ejs.views_include = function(locals) {
    console.log("views_include_setup",locals);
    return function(path, d) {
        console.log("ejs.views_include",path,d);
        return ejs["views_"+path.replace(/\//g,"_")]({...d,...locals}, null, ejs.views_include(locals));
    }
};
ejs.views_editor = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<%#\n  #\n  # Web Atelier 2020  Exercise 6 - Persistent Web Applications with MongoDB\n  #\n  # Student: __STUDENT NAME__\n  #\n  # editor.ejs view\n  #\n  #%>\n<%#\n  #\n  # Web Atelier 2020  Exercise 5 - Web APIs with Express\n  #\n  # Student: Thuong L Le\n  #\n  # editor.ejs view\n  #\n  #%>\n<%- include(\"header\")%>\n<img src=\"<%= target.src%>\" style=\"filter: <%= filter%>\"/>\n<form class=\"filter\" method=\"post\" action=\"/pictures/<%= target._id%>?_method=PUT\">\n    <a href=\"/pictures/<%= target._id%>/edit?filter=none\">\n        <img src=\"<%= target.src_thumb%>\" style=\"filter:none\"/>\n    </a>\n    <input type=\"submit\" value=\"No filter\">\n    <input type=\"hidden\" name=\"filter\" placeholder=\"Filter\" value=\"none\">\n</form>\n\n<form class=\"filter\" method=\"post\" action=\"/pictures/<%= target._id%>?_method=PUT\">\n    <a href=\"/pictures/<%= target._id%>/edit?filter=opacity(0.3)\">\n        <img src=\"<%= target.src_thumb%>\" style=\"filter:opacity(0.3)\"/>\n    </a>\n    <input type=\"submit\" value=\"Choose this filter\">\n    <input type=\"hidden\" name=\"filter\" placeholder=\"Filter\" value=\"opacity(0.3)\">\n</form>\n\n<form class=\"filter\" method=\"post\" action=\"/pictures/<%= target._id%>?_method=PUT\">\n    <a href=\"/pictures/<%= target._id%>/edit?filter=grayscale(20%)sepia(54%)blur(2px)hue-rotate(244deg)saturate(206%)opacity(75%)contrast(207%)\">\n        <img src=\"<%= target.src_thumb%>\" style=\"filter:grayscale(20%)sepia(54%)blur(2px)hue-rotate(244deg)saturate(206%)opacity(75%)contrast(207%)\"/>\n    </a>\n    <input type=\"submit\" value=\"Choose this filter\">\n    <input type=\"hidden\" name=\"filter\" placeholder=\"Filter\" value=\"grayscale(20%)sepia(54%)blur(2px)hue-rotate(244deg)saturate(206%)opacity(75%)contrast(207%)\">\n</form>\n\n<form class=\"filter\" method=\"post\" action=\"/pictures/<%= target._id%>?_method=PUT\">\n    <a href=\"/pictures/<%= target._id%>/edit?filter=grayscale(20%)sepia(54%)blur(2px)brightness(65%)saturate(206%)opacity(75%)\">\n        <img src=\"<%= target.src_thumb%>\" style=\"filter:grayscale(20%) sepia(54%) blur(2px) brightness(65%) saturate(206%) opacity(75%)\"/>\n    </a>\n    <input type=\"submit\" value=\"Choose this filter\">\n    <input type=\"hidden\" name=\"filter\" placeholder=\"Filter\" value=\"grayscale(20%)sepia(54%)blur(2px)brightness(65%)saturate(206%)opacity(75%)\">\n</form>\n\n<form class=\"edit\" method=\"post\" action=\"/pictures/<%= target._id%>\" enctype=\"multipart/form-data\">\n    <input type=\"text\" name=\"title\" placeholder=\"Title\" value=\"<%= target.title%>\">\n    <input type=\"text\" name=\"desc\" placeholder=\"Description\" value=\"<%= target.desc%>\">\n    <input type=\"text\" name=\"favourite\" placeholder=\"Favorite\" value=\"<%= target.favourite%>\">\n    <input type=\"text\" name=\"author\" placeholder=\"Author\" value=\"<%= target.author%>\">\n    <input type=\"text\" name=\"quality\" placeholder=\"Quality\" value=\"<%= target.quality%>\">\n    <input type=\"file\" name=\"file\" placeholder=\"Select File\" value=\"\">\n    <input type=\"submit\" value=\"Upload picture to Gallery\">\n</form>\n\n<%- include(\"footer\")%>\n\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __line = 9
    ; __append("\n")
    ; __line = 10
    ; __line = 18
    ; __append("\n")
    ; __line = 19
    ; __append( include("header"))
    ; __append("\n<img src=\"")
    ; __line = 20
    ; __append(escapeFn( target.src))
    ; __append("\" style=\"filter: ")
    ; __append(escapeFn( filter))
    ; __append("\"/>\n<form class=\"filter\" method=\"post\" action=\"/pictures/")
    ; __line = 21
    ; __append(escapeFn( target._id))
    ; __append("?_method=PUT\">\n    <a href=\"/pictures/")
    ; __line = 22
    ; __append(escapeFn( target._id))
    ; __append("/edit?filter=none\">\n        <img src=\"")
    ; __line = 23
    ; __append(escapeFn( target.src_thumb))
    ; __append("\" style=\"filter:none\"/>\n    </a>\n    <input type=\"submit\" value=\"No filter\">\n    <input type=\"hidden\" name=\"filter\" placeholder=\"Filter\" value=\"none\">\n</form>\n\n<form class=\"filter\" method=\"post\" action=\"/pictures/")
    ; __line = 29
    ; __append(escapeFn( target._id))
    ; __append("?_method=PUT\">\n    <a href=\"/pictures/")
    ; __line = 30
    ; __append(escapeFn( target._id))
    ; __append("/edit?filter=opacity(0.3)\">\n        <img src=\"")
    ; __line = 31
    ; __append(escapeFn( target.src_thumb))
    ; __append("\" style=\"filter:opacity(0.3)\"/>\n    </a>\n    <input type=\"submit\" value=\"Choose this filter\">\n    <input type=\"hidden\" name=\"filter\" placeholder=\"Filter\" value=\"opacity(0.3)\">\n</form>\n\n<form class=\"filter\" method=\"post\" action=\"/pictures/")
    ; __line = 37
    ; __append(escapeFn( target._id))
    ; __append("?_method=PUT\">\n    <a href=\"/pictures/")
    ; __line = 38
    ; __append(escapeFn( target._id))
    ; __append("/edit?filter=grayscale(20%)sepia(54%)blur(2px)hue-rotate(244deg)saturate(206%)opacity(75%)contrast(207%)\">\n        <img src=\"")
    ; __line = 39
    ; __append(escapeFn( target.src_thumb))
    ; __append("\" style=\"filter:grayscale(20%)sepia(54%)blur(2px)hue-rotate(244deg)saturate(206%)opacity(75%)contrast(207%)\"/>\n    </a>\n    <input type=\"submit\" value=\"Choose this filter\">\n    <input type=\"hidden\" name=\"filter\" placeholder=\"Filter\" value=\"grayscale(20%)sepia(54%)blur(2px)hue-rotate(244deg)saturate(206%)opacity(75%)contrast(207%)\">\n</form>\n\n<form class=\"filter\" method=\"post\" action=\"/pictures/")
    ; __line = 45
    ; __append(escapeFn( target._id))
    ; __append("?_method=PUT\">\n    <a href=\"/pictures/")
    ; __line = 46
    ; __append(escapeFn( target._id))
    ; __append("/edit?filter=grayscale(20%)sepia(54%)blur(2px)brightness(65%)saturate(206%)opacity(75%)\">\n        <img src=\"")
    ; __line = 47
    ; __append(escapeFn( target.src_thumb))
    ; __append("\" style=\"filter:grayscale(20%) sepia(54%) blur(2px) brightness(65%) saturate(206%) opacity(75%)\"/>\n    </a>\n    <input type=\"submit\" value=\"Choose this filter\">\n    <input type=\"hidden\" name=\"filter\" placeholder=\"Filter\" value=\"grayscale(20%)sepia(54%)blur(2px)brightness(65%)saturate(206%)opacity(75%)\">\n</form>\n\n<form class=\"edit\" method=\"post\" action=\"/pictures/")
    ; __line = 53
    ; __append(escapeFn( target._id))
    ; __append("\" enctype=\"multipart/form-data\">\n    <input type=\"text\" name=\"title\" placeholder=\"Title\" value=\"")
    ; __line = 54
    ; __append(escapeFn( target.title))
    ; __append("\">\n    <input type=\"text\" name=\"desc\" placeholder=\"Description\" value=\"")
    ; __line = 55
    ; __append(escapeFn( target.desc))
    ; __append("\">\n    <input type=\"text\" name=\"favourite\" placeholder=\"Favorite\" value=\"")
    ; __line = 56
    ; __append(escapeFn( target.favourite))
    ; __append("\">\n    <input type=\"text\" name=\"author\" placeholder=\"Author\" value=\"")
    ; __line = 57
    ; __append(escapeFn( target.author))
    ; __append("\">\n    <input type=\"text\" name=\"quality\" placeholder=\"Quality\" value=\"")
    ; __line = 58
    ; __append(escapeFn( target.quality))
    ; __append("\">\n    <input type=\"file\" name=\"file\" placeholder=\"Select File\" value=\"\">\n    <input type=\"submit\" value=\"Upload picture to Gallery\">\n</form>\n\n")
    ; __line = 63
    ; __append( include("footer"))
    ; __append("\n\n")
    ; __line = 65
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_footer = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "</body></html>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("</body></html>")
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_header = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<html><head><title><%= title %></title></head><body>\n\n<h1 class=\"text-7xl text-center\"><%= title %></h1>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<html><head><title>")
    ; __append(escapeFn( title ))
    ; __append("</title></head><body>\n\n<h1 class=\"text-7xl text-center\">")
    ; __line = 3
    ; __append(escapeFn( title ))
    ; __append("</h1>")
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_pictures = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<%#\n  #\n  # Web Atelier 2020  Exercise 6 - Persistent Web Applications with MongoDB\n  #\n  # Student: __STUDENT NAME__\n  #\n  # pictures.ejs view\n  #\n  #%>\n<%- include(\"header\") %>\n<a href=\"/pictures/upload\">Upload Picture</a>\n<% Pictures.forEach((picture) => {%>\n    <p><img src=\"<%= picture.src_thumb%>\" style=\"filter: <%= picture.filter%>\" alt=\"image\"/>\n        <a href=\"/pictures/<%= picture._id%>/edit%>\">Edit Picture</a>\n        <a href=\"<%= picture.src%>\">Download Picture</a>\n        <a href=\"/pictures/<%= picture._id%>/duplicate\">Duplicate</a>\n        <a href=\"/pictures/<%=picture._id%>/delete\" class=\"btn\" role=\"button\">Delete picture</a>\n        <button id=\"<%= picture._id%>_button\">Slideshow</button>\n        <a href=\"./images/${file}\"></a>\n        <a href=\"/pictures/<%= picture._id%>/edit\"></a></p>\n\n<%});%>\n\n<%- include(\"footer\") %>\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __line = 9
    ; __append("\n")
    ; __line = 10
    ; __append( include("header") )
    ; __append("\n<a href=\"/pictures/upload\">Upload Picture</a>\n")
    ; __line = 12
    ;  Pictures.forEach((picture) => {
    ; __append("\n    <p><img src=\"")
    ; __line = 13
    ; __append(escapeFn( picture.src_thumb))
    ; __append("\" style=\"filter: ")
    ; __append(escapeFn( picture.filter))
    ; __append("\" alt=\"image\"/>\n        <a href=\"/pictures/")
    ; __line = 14
    ; __append(escapeFn( picture._id))
    ; __append("/edit")
    ; __append("\">Edit Picture</a>\n        <a href=\"")
    ; __line = 15
    ; __append(escapeFn( picture.src))
    ; __append("\">Download Picture</a>\n        <a href=\"/pictures/")
    ; __line = 16
    ; __append(escapeFn( picture._id))
    ; __append("/duplicate\">Duplicate</a>\n        <a href=\"/pictures/")
    ; __line = 17
    ; __append(escapeFn(picture._id))
    ; __append("/delete\" class=\"btn\" role=\"button\">Delete picture</a>\n        <button id=\"")
    ; __line = 18
    ; __append(escapeFn( picture._id))
    ; __append("_button\">Slideshow</button>\n        <a href=\"./images/${file}\"></a>\n        <a href=\"/pictures/")
    ; __line = 20
    ; __append(escapeFn( picture._id))
    ; __append("/edit\"></a></p>\n\n")
    ; __line = 22
    ; });
    ; __append("\n\n")
    ; __line = 24
    ; __append( include("footer") )
    ; __append("\n")
    ; __line = 25
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_slideshow = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<%#\n  #\n  # Web Atelier 2020  Exercise 6 - Persistent Web Applications with MongoDB\n  #\n  # Student: __STUDENT NAME__\n  #\n  # slideshow.ejs view\n  #\n  #%>\n<%- include(\"header\") %>\n<img src=\"<%= target.src%>\" style=\"filter:<%= target.filter%>\">\n<p><a href=\"/pictures/slideshow?picture=<%= first._id%>\">First image</a></p>\n <p><a href=\"/pictures/slideshow?picture=<%= next._id%>\">Next Image</a></p>\n<p><a href=\"/pictures/slideshow?picture=<%= prev._id%>\">Previous Image</a></p>\n\n<!--<p><a href=\"/pictures\">Gallery</a></p>-->\n\n<%- include(\"footer\") %>\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __line = 9
    ; __append("\n")
    ; __line = 10
    ; __append( include("header") )
    ; __append("\n<img src=\"")
    ; __line = 11
    ; __append(escapeFn( target.src))
    ; __append("\" style=\"filter:")
    ; __append(escapeFn( target.filter))
    ; __append("\">\n<p><a href=\"/pictures/slideshow?picture=")
    ; __line = 12
    ; __append(escapeFn( first._id))
    ; __append("\">First image</a></p>\n <p><a href=\"/pictures/slideshow?picture=")
    ; __line = 13
    ; __append(escapeFn( next._id))
    ; __append("\">Next Image</a></p>\n<p><a href=\"/pictures/slideshow?picture=")
    ; __line = 14
    ; __append(escapeFn( prev._id))
    ; __append("\">Previous Image</a></p>\n\n<!--<p><a href=\"/pictures\">Gallery</a></p>-->\n\n")
    ; __line = 18
    ; __append( include("footer") )
    ; __append("\n")
    ; __line = 19
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_timers = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<%- include(\"header\") %>\n<a href=\"/timer/new\" role=\"button\" class=\"btn btn-outline border-solid border-4 flex rounded-md m-2 p-2\" id=\"new_timer\">Create new timer</a>\n<section id=\"new-timer\"></section>\n<% Timers.forEach((timer) => {%>\n\n    <div class=\"border-solid border-4 flex flex-wrap flex-row rounded-md m-2 p-2 justify-center\">\n\n        <div class=\"flex flex-col\">\n            <h2 class=\"text-4xl text-center m-2 p-2\"><%= timer.title%></h2>\n            <div id=\"<%= timer._id%>_display\" class=\"<%= timer.style%>\"></div>\n        </div>\n        <div class=\"flex flex-col m-2\">\n            <a href=\"/timer/<%= timer._id%>/edit\" role=\"button\" class=\"btn m-2 p-2\">Play Sound</a>\n            <a href=\"/timer/<%= timer._id%>/edit\" role=\"button\" class=\"btn m-2 p-2\">Edit Timer</a>\n            <a href=\"/timer/<%= timer._id%>/delete\" role=\"button\" class=\"btn m-2 p-2\">Delete Timer</a>\n        </div>\n        <div id=\"<%= timer._id%>_edit\"></div>\n    </div>\n<%});%>\n\n<%- include(\"footer\") %>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append( include("header") )
    ; __append("\n<a href=\"/timer/new\" role=\"button\" class=\"btn btn-outline border-solid border-4 flex rounded-md m-2 p-2\" id=\"new_timer\">Create new timer</a>\n<section id=\"new-timer\"></section>\n")
    ; __line = 4
    ;  Timers.forEach((timer) => {
    ; __append("\n\n    <div class=\"border-solid border-4 flex flex-wrap flex-row rounded-md m-2 p-2 justify-center\">\n\n        <div class=\"flex flex-col\">\n            <h2 class=\"text-4xl text-center m-2 p-2\">")
    ; __line = 9
    ; __append(escapeFn( timer.title))
    ; __append("</h2>\n            <div id=\"")
    ; __line = 10
    ; __append(escapeFn( timer._id))
    ; __append("_display\" class=\"")
    ; __append(escapeFn( timer.style))
    ; __append("\"></div>\n        </div>\n        <div class=\"flex flex-col m-2\">\n            <a href=\"/timer/")
    ; __line = 13
    ; __append(escapeFn( timer._id))
    ; __append("/edit\" role=\"button\" class=\"btn m-2 p-2\">Play Sound</a>\n            <a href=\"/timer/")
    ; __line = 14
    ; __append(escapeFn( timer._id))
    ; __append("/edit\" role=\"button\" class=\"btn m-2 p-2\">Edit Timer</a>\n            <a href=\"/timer/")
    ; __line = 15
    ; __append(escapeFn( timer._id))
    ; __append("/delete\" role=\"button\" class=\"btn m-2 p-2\">Delete Timer</a>\n        </div>\n        <div id=\"")
    ; __line = 17
    ; __append(escapeFn( timer._id))
    ; __append("_edit\"></div>\n    </div>\n")
    ; __line = 19
    ; });
    ; __append("\n\n")
    ; __line = 21
    ; __append( include("footer") )
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}
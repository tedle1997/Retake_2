//EJS Compiled Views - This file was automatically generated on Mon Sep 13 2021 23:41:03 GMT+0200 (Central European Summer Time)
ejs.views_include = function(locals) {
    console.log("views_include_setup",locals);
    return function(path, d) {
        console.log("ejs.views_include",path,d);
        return ejs["views_"+path.replace(/\//g,"_")]({...d,...locals}, null, ejs.views_include(locals));
    }
};
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

ejs.views_new_timer = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<div class=\"p-10 card bg-base-200 m-2\">\n    <form class=\"form-control\">\n        Timer's Title\n        <input type=\"text\" placeholder=\"Title\" class=\"input input-info input-bordered\" name=\"title\">\n        Days\n        <input type=\"range\" min=\"0\" max=\"366\" value=\"0\" class=\"range range-lg\" name=\"days\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        Hours\n        <input type=\"range\" max=\"23\" value=\"0\" class=\"range range-primary range-lg\" name=\"hours\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        Minutes\n        <input type=\"range\" max=\"59\" value=\"0\" class=\"range range-secondary range-lg\" name=\"minutes\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        Seconds\n        <input type=\"range\" max=\"59\" value=\"0\" class=\"range range-accent range-lg\" name=\"seconds\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        <select class=\"select select-bordered select-info w-full max-w-xs m-2\" name=\"sound\">\n            <option disabled=\"disabled\">Choose your timer sound</option>\n            <option selected=\"selected\" value=\"no_sound\">no sound</option>\n            <option value=\"sound_1\">Sound 1</option>\n            <option value=\"sound_2\">Sound 2</option>\n            <option value=\"sound_3\">Sound 3</option>\n        </select>\n        <select class=\"select select-bordered select-info w-full max-w-xs m-2\" name=\"style\">\n            <option disabled=\"disabled\">Choose your timer's style</option>\n            <option value=\"style_1\">Style 1</option>\n            <option selected value=\"style_2\">Style 2</option>\n            <option value=\"style_3\">Style 3</option>\n        </select>\n        <input type=\"submit\" value=\"Submit\" class=\"btn m-2\"/>\n    </form>\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"p-10 card bg-base-200 m-2\">\n    <form class=\"form-control\">\n        Timer's Title\n        <input type=\"text\" placeholder=\"Title\" class=\"input input-info input-bordered\" name=\"title\">\n        Days\n        <input type=\"range\" min=\"0\" max=\"366\" value=\"0\" class=\"range range-lg\" name=\"days\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        Hours\n        <input type=\"range\" max=\"23\" value=\"0\" class=\"range range-primary range-lg\" name=\"hours\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        Minutes\n        <input type=\"range\" max=\"59\" value=\"0\" class=\"range range-secondary range-lg\" name=\"minutes\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        Seconds\n        <input type=\"range\" max=\"59\" value=\"0\" class=\"range range-accent range-lg\" name=\"seconds\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        <select class=\"select select-bordered select-info w-full max-w-xs m-2\" name=\"sound\">\n            <option disabled=\"disabled\">Choose your timer sound</option>\n            <option selected=\"selected\" value=\"no_sound\">no sound</option>\n            <option value=\"sound_1\">Sound 1</option>\n            <option value=\"sound_2\">Sound 2</option>\n            <option value=\"sound_3\">Sound 3</option>\n        </select>\n        <select class=\"select select-bordered select-info w-full max-w-xs m-2\" name=\"style\">\n            <option disabled=\"disabled\">Choose your timer's style</option>\n            <option value=\"style_1\">Style 1</option>\n            <option selected value=\"style_2\">Style 2</option>\n            <option value=\"style_3\">Style 3</option>\n        </select>\n        <input type=\"submit\" value=\"Submit\" class=\"btn m-2\"/>\n    </form>\n</div>")
    ; __line = 36
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_timer_editor = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<div class=\"p-10 card bg-base-200 m-2\">\n    <form class=\"form-control\">\n        Timer's New Title\n        <input type=\"text\" class=\"input input-info input-bordered\" value=\"<%= timer.title%>\" name=\"title\">\n        Adjust number of Days\n        <input type=\"range\" min=\"0\" max=\"366\" value=\"0\" class=\"range range-lg\" name=\"days\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        Adjust number of Hours\n        <input type=\"range\" max=\"23\" value=\"0\" class=\"range range-primary range-lg\" name=\"hours\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        Adjust number of Minutes\n        <input type=\"range\" max=\"59\" value=\"0\" class=\"range range-secondary range-lg\" name=\"minutes\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        Adjust number of Seconds\n        <input type=\"range\" max=\"59\" value=\"0\" class=\"range range-accent range-lg\" name=\"seconds\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        <select class=\"select select-bordered select-info w-full max-w-xs m-2\" name=\"sound\">\n            <option disabled=\"disabled\">Choose your timer sound</option>\n            <option value=\"no_sound\">no sound</option>\n            <option selected value=\"sound_1\">Sound 1</option>\n            <option value=\"sound_2\">Sound 2</option>\n            <option value=\"sound_3\">Sound 3</option>\n        </select>\n        <select class=\"select select-bordered select-info w-full max-w-xs m-2\" name=\"style\">\n            <option disabled=\"disabled\">Choose your timer's style</option>\n            <option value=\"style_1\">Style 1</option>\n            <option selected value=\"style_2\">Style 2</option>\n            <option value=\"style_3\">Style 3</option>\n        </select>\n        <input type=\"submit\" value=\"Submit\" class=\"btn btn-primary m-2\"/>\n    </form>\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"p-10 card bg-base-200 m-2\">\n    <form class=\"form-control\">\n        Timer's New Title\n        <input type=\"text\" class=\"input input-info input-bordered\" value=\"")
    ; __line = 4
    ; __append(escapeFn( timer.title))
    ; __append("\" name=\"title\">\n        Adjust number of Days\n        <input type=\"range\" min=\"0\" max=\"366\" value=\"0\" class=\"range range-lg\" name=\"days\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        Adjust number of Hours\n        <input type=\"range\" max=\"23\" value=\"0\" class=\"range range-primary range-lg\" name=\"hours\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        Adjust number of Minutes\n        <input type=\"range\" max=\"59\" value=\"0\" class=\"range range-secondary range-lg\" name=\"minutes\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        Adjust number of Seconds\n        <input type=\"range\" max=\"59\" value=\"0\" class=\"range range-accent range-lg\" name=\"seconds\"\n               oninput=\"this.nextElementSibling.value = this.value\">\n        <output>0</output>\n        <select class=\"select select-bordered select-info w-full max-w-xs m-2\" name=\"sound\">\n            <option disabled=\"disabled\">Choose your timer sound</option>\n            <option value=\"no_sound\">no sound</option>\n            <option selected value=\"sound_1\">Sound 1</option>\n            <option value=\"sound_2\">Sound 2</option>\n            <option value=\"sound_3\">Sound 3</option>\n        </select>\n        <select class=\"select select-bordered select-info w-full max-w-xs m-2\" name=\"style\">\n            <option disabled=\"disabled\">Choose your timer's style</option>\n            <option value=\"style_1\">Style 1</option>\n            <option selected value=\"style_2\">Style 2</option>\n            <option value=\"style_3\">Style 3</option>\n        </select>\n        <input type=\"submit\" value=\"Submit\" class=\"btn btn-primary m-2\"/>\n    </form>\n</div>")
    ; __line = 36
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
  , __lines = "<%- include(\"header\") %>\n<a href=\"/timer/new\" role=\"button\" class=\"btn btn-outline border-solid border-4 flex rounded-md m-2 p-2\" id=\"new_timer\">Create new timer</a>\n<section id=\"new-timer\"></section>\n<% Timers.forEach((timer) => {%>\n\n    <div class=\"border-solid border-4 flex flex-wrap flex-row rounded-md m-2 p-2 justify-center\">\n        <div class=\"flex flex-col\">\n            <h2 class=\"text-4xl text-center m-2 p-2\"><%= timer.title%></h2>\n            <div id=\"<%= timer._id%>_display\" class=\"<%= timer.style%>\"></div>\n            <div id=\"<%= timer._id%>_edit\"></div>\n        </div>\n        <div class=\"flex flex-col m-2\">\n            <a href=\"/timer/<%= timer._id%>/pause\" role=\"button\" class=\"btn m-2 p-2\" id=\"<%= timer._id%>_pause_resume\">Pause</a>\n            <a href=\"/timer/<%= timer._id%>/edit\" role=\"button\" class=\"btn m-2 p-2\" id=\"<%= timer._id%>_edit_btn\">Edit Timer</a>\n            <a href=\"/timer/<%= timer._id%>/delete\" role=\"button\" class=\"btn m-2 p-2\" id=\"<%= timer._id%>_delete\">Delete Timer</a>\n        </div>\n\n    </div>\n<%});%>\n\n<%- include(\"footer\") %>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append( include("header") )
    ; __append("\n<a href=\"/timer/new\" role=\"button\" class=\"btn btn-outline border-solid border-4 flex rounded-md m-2 p-2\" id=\"new_timer\">Create new timer</a>\n<section id=\"new-timer\"></section>\n")
    ; __line = 4
    ;  Timers.forEach((timer) => {
    ; __append("\n\n    <div class=\"border-solid border-4 flex flex-wrap flex-row rounded-md m-2 p-2 justify-center\">\n        <div class=\"flex flex-col\">\n            <h2 class=\"text-4xl text-center m-2 p-2\">")
    ; __line = 8
    ; __append(escapeFn( timer.title))
    ; __append("</h2>\n            <div id=\"")
    ; __line = 9
    ; __append(escapeFn( timer._id))
    ; __append("_display\" class=\"")
    ; __append(escapeFn( timer.style))
    ; __append("\"></div>\n            <div id=\"")
    ; __line = 10
    ; __append(escapeFn( timer._id))
    ; __append("_edit\"></div>\n        </div>\n        <div class=\"flex flex-col m-2\">\n            <a href=\"/timer/")
    ; __line = 13
    ; __append(escapeFn( timer._id))
    ; __append("/pause\" role=\"button\" class=\"btn m-2 p-2\" id=\"")
    ; __append(escapeFn( timer._id))
    ; __append("_pause_resume\">Pause</a>\n            <a href=\"/timer/")
    ; __line = 14
    ; __append(escapeFn( timer._id))
    ; __append("/edit\" role=\"button\" class=\"btn m-2 p-2\" id=\"")
    ; __append(escapeFn( timer._id))
    ; __append("_edit_btn\">Edit Timer</a>\n            <a href=\"/timer/")
    ; __line = 15
    ; __append(escapeFn( timer._id))
    ; __append("/delete\" role=\"button\" class=\"btn m-2 p-2\" id=\"")
    ; __append(escapeFn( timer._id))
    ; __append("_delete\">Delete Timer</a>\n        </div>\n\n    </div>\n")
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
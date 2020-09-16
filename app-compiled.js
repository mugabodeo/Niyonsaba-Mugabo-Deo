"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _articles = _interopRequireDefault(require("./routes/articles"));

var _queries = _interopRequireDefault(require("./routes/queries"));

var _userProfile = _interopRequireDefault(require("./routes/userProfile"));

var _admin = _interopRequireDefault(require("./routes/admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

var app = (0, _express["default"])();
var port = process.env.PORT || 8080;
app.use(_express["default"].json()); //defining routes

app.use('/', _userProfile["default"]);
app.use('/articles', _articles["default"]);
app.use('/queries', _queries["default"]);
app.use('/admin', _admin["default"]); //connect to database

_mongoose["default"].connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(function (res) {
  console.log('database connnected');
})["catch"](function (err) {
  console.log('failed to connect to database', err);
}); //starting a server


var _default = app.listen(port, function () {
  console.log(" listening at ".concat(port));
});

exports["default"] = _default;

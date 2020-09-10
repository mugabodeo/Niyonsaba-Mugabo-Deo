"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("./app"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = process.env.PORT || 8080; //connecting database

var connectDb = function connectDb() {
  return new Promise(function (resolve, reject) {
    _mongoose["default"].connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(function (res, err) {
      if (err) return reject(err);
      resolve();
      console.log('connected to db');
    });
  });
}; //creating a server


connectDb().then(function () {
  _app["default"].listen(port, function () {
    console.log(" listening at ".concat(port));
  });
});
var _default = connectDb;
exports["default"] = _default;

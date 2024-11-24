/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entry/index.js":
/*!****************************!*\
  !*** ./src/entry/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./main.scss */ \"./src/entry/main.scss\");\n\nvar _teamSlider = __webpack_require__(/*! ../js/team-slider */ \"./src/js/team-slider.js\");\n\nvar _teamSlider2 = _interopRequireDefault(_teamSlider);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Inlude style\n_teamSlider2.default.init();\n\n//# sourceURL=webpack:///./src/entry/index.js?");

/***/ }),

/***/ "./src/entry/main.scss":
/*!*****************************!*\
  !*** ./src/entry/main.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/entry/main.scss?");

/***/ }),

/***/ "./src/js/team-slider.js":
/*!*******************************!*\
  !*** ./src/js/team-slider.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _jquery = __webpack_require__(/*! jquery */ \"jquery\");\n\nvar _jquery2 = _interopRequireDefault(_jquery);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar initTeamMembersSlider = function initTeamMembersSlider(elem) {\n    (0, _jquery2.default)(document).ready(function () {\n        (0, _jquery2.default)(elem).slick({\n            infinite: false,\n            speed: 300,\n            rows: 2,\n            slidesToShow: 4,\n            slidesToScroll: 2,\n            prevArrow: '<button type=\"button\" class=\"slick-prev slick-arrow\">' + '<img src=\"img/team-members-slider-prev.png\" />' + '</button>',\n            nextArrow: '<button type=\"button\" class=\"slick-next slick-arrow\">' + '<img src=\"img/team-members-slider-next.png\" />' + '</button>',\n            responsive: [{\n                breakpoint: 1024,\n                settings: {\n                    slidesToShow: 4,\n                    slidesToScroll: 2\n                }\n            }, {\n                breakpoint: 767,\n                settings: {\n                    slidesToShow: 2,\n                    slidesToScroll: 2\n                }\n            }, {\n                breakpoint: 480,\n                settings: {\n                    rows: 1,\n                    slidesToShow: 1,\n                    slidesToScroll: 1\n                }\n            }]\n        });\n    });\n}; // eslint-disable-next-line import/extensions\n\n\nvar destroyTeamMembersSlider = function destroyTeamMembersSlider(elem) {\n    return (0, _jquery2.default)(elem).slick('unslick');\n};\n\nexports.default = {\n    init: function init() {\n        (0, _jquery2.default)('#team-members-carousel').length && initTeamMembersSlider((0, _jquery2.default)('#team-members-carousel'));\n    },\n    destroy: function destroy() {\n        (0, _jquery2.default)('#team-members-carousel').length && destroyTeamMembersSlider((0, _jquery2.default)('#team-members-carousel'));\n    }\n};\n\n//# sourceURL=webpack:///./src/js/team-slider.js?");

/***/ }),

/***/ 0:
/*!**********************************!*\
  !*** multi ./src/entry/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/entry/index.js */\"./src/entry/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/entry/index.js?");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = jQuery;\n\n//# sourceURL=webpack:///external_%22jQuery%22?");

/***/ })

/******/ });
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es6_array_copy_within__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var core_js_modules_es6_array_copy_within__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_copy_within__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_array_every__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony import */ var core_js_modules_es6_array_every__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_every__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_array_fill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
/* harmony import */ var core_js_modules_es6_array_fill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_fill__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_array_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41);
/* harmony import */ var core_js_modules_es6_array_filter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_filter__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42);
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es6_array_find_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(43);
/* harmony import */ var core_js_modules_es6_array_find_index__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find_index__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es7_array_flat_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(44);
/* harmony import */ var core_js_modules_es7_array_flat_map__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_array_flat_map__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es6_array_for_each__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(46);
/* harmony import */ var core_js_modules_es6_array_for_each__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_for_each__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es6_array_from__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(47);
/* harmony import */ var core_js_modules_es6_array_from__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_from__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(55);
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es6_array_index_of__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(58);
/* harmony import */ var core_js_modules_es6_array_index_of__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_index_of__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es6_array_is_array__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(59);
/* harmony import */ var core_js_modules_es6_array_is_array__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_is_array__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(60);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es6_array_last_index_of__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(73);
/* harmony import */ var core_js_modules_es6_array_last_index_of__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_last_index_of__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es6_array_map__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(74);
/* harmony import */ var core_js_modules_es6_array_map__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_map__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es6_array_of__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(75);
/* harmony import */ var core_js_modules_es6_array_of__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_of__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es6_array_reduce__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(76);
/* harmony import */ var core_js_modules_es6_array_reduce__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_reduce__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es6_array_reduce_right__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(78);
/* harmony import */ var core_js_modules_es6_array_reduce_right__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_reduce_right__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es6_array_some__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(79);
/* harmony import */ var core_js_modules_es6_array_some__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_some__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(80);
/* harmony import */ var core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es6_array_species__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(81);
/* harmony import */ var core_js_modules_es6_array_species__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_species__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es6_date_now__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(83);
/* harmony import */ var core_js_modules_es6_date_now__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_date_now__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es6_date_to_iso_string__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(84);
/* harmony import */ var core_js_modules_es6_date_to_iso_string__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_date_to_iso_string__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es6_date_to_json__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(86);
/* harmony import */ var core_js_modules_es6_date_to_json__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_date_to_json__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es6_date_to_primitive__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(87);
/* harmony import */ var core_js_modules_es6_date_to_primitive__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_date_to_primitive__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es6_date_to_string__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(89);
/* harmony import */ var core_js_modules_es6_date_to_string__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_date_to_string__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es6_function_bind__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(90);
/* harmony import */ var core_js_modules_es6_function_bind__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_bind__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es6_function_has_instance__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(93);
/* harmony import */ var core_js_modules_es6_function_has_instance__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_has_instance__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(94);
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var core_js_modules_es6_map__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(95);
/* harmony import */ var core_js_modules_es6_map__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_map__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var core_js_modules_es6_math_acosh__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(107);
/* harmony import */ var core_js_modules_es6_math_acosh__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_acosh__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var core_js_modules_es6_math_asinh__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(109);
/* harmony import */ var core_js_modules_es6_math_asinh__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_asinh__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var core_js_modules_es6_math_atanh__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(110);
/* harmony import */ var core_js_modules_es6_math_atanh__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_atanh__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var core_js_modules_es6_math_cbrt__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(111);
/* harmony import */ var core_js_modules_es6_math_cbrt__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_cbrt__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var core_js_modules_es6_math_clz32__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(113);
/* harmony import */ var core_js_modules_es6_math_clz32__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_clz32__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var core_js_modules_es6_math_cosh__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(114);
/* harmony import */ var core_js_modules_es6_math_cosh__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_cosh__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var core_js_modules_es6_math_expm1__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(115);
/* harmony import */ var core_js_modules_es6_math_expm1__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_expm1__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var core_js_modules_es6_math_fround__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(117);
/* harmony import */ var core_js_modules_es6_math_fround__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_fround__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var core_js_modules_es6_math_hypot__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(119);
/* harmony import */ var core_js_modules_es6_math_hypot__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_hypot__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var core_js_modules_es6_math_imul__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(120);
/* harmony import */ var core_js_modules_es6_math_imul__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_imul__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var core_js_modules_es6_math_log1p__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(121);
/* harmony import */ var core_js_modules_es6_math_log1p__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_log1p__WEBPACK_IMPORTED_MODULE_40__);
/* harmony import */ var core_js_modules_es6_math_log10__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(122);
/* harmony import */ var core_js_modules_es6_math_log10__WEBPACK_IMPORTED_MODULE_41___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_log10__WEBPACK_IMPORTED_MODULE_41__);
/* harmony import */ var core_js_modules_es6_math_log2__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(123);
/* harmony import */ var core_js_modules_es6_math_log2__WEBPACK_IMPORTED_MODULE_42___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_log2__WEBPACK_IMPORTED_MODULE_42__);
/* harmony import */ var core_js_modules_es6_math_sign__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(124);
/* harmony import */ var core_js_modules_es6_math_sign__WEBPACK_IMPORTED_MODULE_43___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_sign__WEBPACK_IMPORTED_MODULE_43__);
/* harmony import */ var core_js_modules_es6_math_sinh__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(125);
/* harmony import */ var core_js_modules_es6_math_sinh__WEBPACK_IMPORTED_MODULE_44___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_sinh__WEBPACK_IMPORTED_MODULE_44__);
/* harmony import */ var core_js_modules_es6_math_tanh__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(126);
/* harmony import */ var core_js_modules_es6_math_tanh__WEBPACK_IMPORTED_MODULE_45___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_tanh__WEBPACK_IMPORTED_MODULE_45__);
/* harmony import */ var core_js_modules_es6_math_trunc__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(127);
/* harmony import */ var core_js_modules_es6_math_trunc__WEBPACK_IMPORTED_MODULE_46___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_trunc__WEBPACK_IMPORTED_MODULE_46__);
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(128);
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_47___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_47__);
/* harmony import */ var core_js_modules_es6_number_epsilon__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(132);
/* harmony import */ var core_js_modules_es6_number_epsilon__WEBPACK_IMPORTED_MODULE_48___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_epsilon__WEBPACK_IMPORTED_MODULE_48__);
/* harmony import */ var core_js_modules_es6_number_is_finite__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(133);
/* harmony import */ var core_js_modules_es6_number_is_finite__WEBPACK_IMPORTED_MODULE_49___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_is_finite__WEBPACK_IMPORTED_MODULE_49__);
/* harmony import */ var core_js_modules_es6_number_is_integer__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(134);
/* harmony import */ var core_js_modules_es6_number_is_integer__WEBPACK_IMPORTED_MODULE_50___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_is_integer__WEBPACK_IMPORTED_MODULE_50__);
/* harmony import */ var core_js_modules_es6_number_is_nan__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(136);
/* harmony import */ var core_js_modules_es6_number_is_nan__WEBPACK_IMPORTED_MODULE_51___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_is_nan__WEBPACK_IMPORTED_MODULE_51__);
/* harmony import */ var core_js_modules_es6_number_is_safe_integer__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(137);
/* harmony import */ var core_js_modules_es6_number_is_safe_integer__WEBPACK_IMPORTED_MODULE_52___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_is_safe_integer__WEBPACK_IMPORTED_MODULE_52__);
/* harmony import */ var core_js_modules_es6_number_max_safe_integer__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(138);
/* harmony import */ var core_js_modules_es6_number_max_safe_integer__WEBPACK_IMPORTED_MODULE_53___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_max_safe_integer__WEBPACK_IMPORTED_MODULE_53__);
/* harmony import */ var core_js_modules_es6_number_min_safe_integer__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(139);
/* harmony import */ var core_js_modules_es6_number_min_safe_integer__WEBPACK_IMPORTED_MODULE_54___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_min_safe_integer__WEBPACK_IMPORTED_MODULE_54__);
/* harmony import */ var core_js_modules_es6_number_parse_float__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(140);
/* harmony import */ var core_js_modules_es6_number_parse_float__WEBPACK_IMPORTED_MODULE_55___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_parse_float__WEBPACK_IMPORTED_MODULE_55__);
/* harmony import */ var core_js_modules_es6_number_parse_int__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(142);
/* harmony import */ var core_js_modules_es6_number_parse_int__WEBPACK_IMPORTED_MODULE_56___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_parse_int__WEBPACK_IMPORTED_MODULE_56__);
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(144);
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_57___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_57__);
/* harmony import */ var core_js_modules_es6_object_create__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(147);
/* harmony import */ var core_js_modules_es6_object_create__WEBPACK_IMPORTED_MODULE_58___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_create__WEBPACK_IMPORTED_MODULE_58__);
/* harmony import */ var core_js_modules_es7_object_define_getter__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(148);
/* harmony import */ var core_js_modules_es7_object_define_getter__WEBPACK_IMPORTED_MODULE_59___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_object_define_getter__WEBPACK_IMPORTED_MODULE_59__);
/* harmony import */ var core_js_modules_es7_object_define_setter__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(150);
/* harmony import */ var core_js_modules_es7_object_define_setter__WEBPACK_IMPORTED_MODULE_60___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_object_define_setter__WEBPACK_IMPORTED_MODULE_60__);
/* harmony import */ var core_js_modules_es6_object_define_property__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(151);
/* harmony import */ var core_js_modules_es6_object_define_property__WEBPACK_IMPORTED_MODULE_61___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_define_property__WEBPACK_IMPORTED_MODULE_61__);
/* harmony import */ var core_js_modules_es6_object_define_properties__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(152);
/* harmony import */ var core_js_modules_es6_object_define_properties__WEBPACK_IMPORTED_MODULE_62___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_define_properties__WEBPACK_IMPORTED_MODULE_62__);
/* harmony import */ var core_js_modules_es7_object_entries__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(153);
/* harmony import */ var core_js_modules_es7_object_entries__WEBPACK_IMPORTED_MODULE_63___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_object_entries__WEBPACK_IMPORTED_MODULE_63__);
/* harmony import */ var core_js_modules_es6_object_freeze__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(155);
/* harmony import */ var core_js_modules_es6_object_freeze__WEBPACK_IMPORTED_MODULE_64___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_freeze__WEBPACK_IMPORTED_MODULE_64__);
/* harmony import */ var core_js_modules_es6_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(157);
/* harmony import */ var core_js_modules_es6_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_65___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_65__);
/* harmony import */ var core_js_modules_es7_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(158);
/* harmony import */ var core_js_modules_es7_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_66___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_66__);
/* harmony import */ var core_js_modules_es6_object_get_own_property_names__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(160);
/* harmony import */ var core_js_modules_es6_object_get_own_property_names__WEBPACK_IMPORTED_MODULE_67___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_get_own_property_names__WEBPACK_IMPORTED_MODULE_67__);
/* harmony import */ var core_js_modules_es6_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(162);
/* harmony import */ var core_js_modules_es6_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_68___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_68__);
/* harmony import */ var core_js_modules_es7_object_lookup_getter__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(163);
/* harmony import */ var core_js_modules_es7_object_lookup_getter__WEBPACK_IMPORTED_MODULE_69___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_object_lookup_getter__WEBPACK_IMPORTED_MODULE_69__);
/* harmony import */ var core_js_modules_es7_object_lookup_setter__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(164);
/* harmony import */ var core_js_modules_es7_object_lookup_setter__WEBPACK_IMPORTED_MODULE_70___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_object_lookup_setter__WEBPACK_IMPORTED_MODULE_70__);
/* harmony import */ var core_js_modules_es6_object_prevent_extensions__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(165);
/* harmony import */ var core_js_modules_es6_object_prevent_extensions__WEBPACK_IMPORTED_MODULE_71___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_prevent_extensions__WEBPACK_IMPORTED_MODULE_71__);
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(166);
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_72___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_72__);
/* harmony import */ var core_js_modules_es6_object_is__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(167);
/* harmony import */ var core_js_modules_es6_object_is__WEBPACK_IMPORTED_MODULE_73___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_is__WEBPACK_IMPORTED_MODULE_73__);
/* harmony import */ var core_js_modules_es6_object_is_frozen__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(169);
/* harmony import */ var core_js_modules_es6_object_is_frozen__WEBPACK_IMPORTED_MODULE_74___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_is_frozen__WEBPACK_IMPORTED_MODULE_74__);
/* harmony import */ var core_js_modules_es6_object_is_sealed__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(170);
/* harmony import */ var core_js_modules_es6_object_is_sealed__WEBPACK_IMPORTED_MODULE_75___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_is_sealed__WEBPACK_IMPORTED_MODULE_75__);
/* harmony import */ var core_js_modules_es6_object_is_extensible__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(171);
/* harmony import */ var core_js_modules_es6_object_is_extensible__WEBPACK_IMPORTED_MODULE_76___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_is_extensible__WEBPACK_IMPORTED_MODULE_76__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(172);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_77___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_77__);
/* harmony import */ var core_js_modules_es6_object_seal__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(173);
/* harmony import */ var core_js_modules_es6_object_seal__WEBPACK_IMPORTED_MODULE_78___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_seal__WEBPACK_IMPORTED_MODULE_78__);
/* harmony import */ var core_js_modules_es6_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(174);
/* harmony import */ var core_js_modules_es6_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_79___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_79__);
/* harmony import */ var core_js_modules_es7_object_values__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(175);
/* harmony import */ var core_js_modules_es7_object_values__WEBPACK_IMPORTED_MODULE_80___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_object_values__WEBPACK_IMPORTED_MODULE_80__);
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(176);
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_81___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_81__);
/* harmony import */ var core_js_modules_es7_promise_finally__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(184);
/* harmony import */ var core_js_modules_es7_promise_finally__WEBPACK_IMPORTED_MODULE_82___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_promise_finally__WEBPACK_IMPORTED_MODULE_82__);
/* harmony import */ var core_js_modules_es6_reflect_apply__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(185);
/* harmony import */ var core_js_modules_es6_reflect_apply__WEBPACK_IMPORTED_MODULE_83___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_apply__WEBPACK_IMPORTED_MODULE_83__);
/* harmony import */ var core_js_modules_es6_reflect_construct__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(186);
/* harmony import */ var core_js_modules_es6_reflect_construct__WEBPACK_IMPORTED_MODULE_84___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_construct__WEBPACK_IMPORTED_MODULE_84__);
/* harmony import */ var core_js_modules_es6_reflect_define_property__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(187);
/* harmony import */ var core_js_modules_es6_reflect_define_property__WEBPACK_IMPORTED_MODULE_85___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_define_property__WEBPACK_IMPORTED_MODULE_85__);
/* harmony import */ var core_js_modules_es6_reflect_delete_property__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(188);
/* harmony import */ var core_js_modules_es6_reflect_delete_property__WEBPACK_IMPORTED_MODULE_86___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_delete_property__WEBPACK_IMPORTED_MODULE_86__);
/* harmony import */ var core_js_modules_es6_reflect_get__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(189);
/* harmony import */ var core_js_modules_es6_reflect_get__WEBPACK_IMPORTED_MODULE_87___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_get__WEBPACK_IMPORTED_MODULE_87__);
/* harmony import */ var core_js_modules_es6_reflect_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(190);
/* harmony import */ var core_js_modules_es6_reflect_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_88___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_88__);
/* harmony import */ var core_js_modules_es6_reflect_get_prototype_of__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(191);
/* harmony import */ var core_js_modules_es6_reflect_get_prototype_of__WEBPACK_IMPORTED_MODULE_89___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_get_prototype_of__WEBPACK_IMPORTED_MODULE_89__);
/* harmony import */ var core_js_modules_es6_reflect_has__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(192);
/* harmony import */ var core_js_modules_es6_reflect_has__WEBPACK_IMPORTED_MODULE_90___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_has__WEBPACK_IMPORTED_MODULE_90__);
/* harmony import */ var core_js_modules_es6_reflect_is_extensible__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(193);
/* harmony import */ var core_js_modules_es6_reflect_is_extensible__WEBPACK_IMPORTED_MODULE_91___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_is_extensible__WEBPACK_IMPORTED_MODULE_91__);
/* harmony import */ var core_js_modules_es6_reflect_own_keys__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(194);
/* harmony import */ var core_js_modules_es6_reflect_own_keys__WEBPACK_IMPORTED_MODULE_92___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_own_keys__WEBPACK_IMPORTED_MODULE_92__);
/* harmony import */ var core_js_modules_es6_reflect_prevent_extensions__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(195);
/* harmony import */ var core_js_modules_es6_reflect_prevent_extensions__WEBPACK_IMPORTED_MODULE_93___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_prevent_extensions__WEBPACK_IMPORTED_MODULE_93__);
/* harmony import */ var core_js_modules_es6_reflect_set__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(196);
/* harmony import */ var core_js_modules_es6_reflect_set__WEBPACK_IMPORTED_MODULE_94___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_set__WEBPACK_IMPORTED_MODULE_94__);
/* harmony import */ var core_js_modules_es6_reflect_set_prototype_of__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(197);
/* harmony import */ var core_js_modules_es6_reflect_set_prototype_of__WEBPACK_IMPORTED_MODULE_95___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_set_prototype_of__WEBPACK_IMPORTED_MODULE_95__);
/* harmony import */ var core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(198);
/* harmony import */ var core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_96___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_96__);
/* harmony import */ var core_js_modules_es6_regexp_flags__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(201);
/* harmony import */ var core_js_modules_es6_regexp_flags__WEBPACK_IMPORTED_MODULE_97___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_flags__WEBPACK_IMPORTED_MODULE_97__);
/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(202);
/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_98___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_98__);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(209);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_99___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_99__);
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(210);
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_100___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_100__);
/* harmony import */ var core_js_modules_es6_regexp_search__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(211);
/* harmony import */ var core_js_modules_es6_regexp_search__WEBPACK_IMPORTED_MODULE_101___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_search__WEBPACK_IMPORTED_MODULE_101__);
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(212);
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_102___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_102__);
/* harmony import */ var core_js_modules_es6_set__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(213);
/* harmony import */ var core_js_modules_es6_set__WEBPACK_IMPORTED_MODULE_103___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_set__WEBPACK_IMPORTED_MODULE_103__);
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(214);
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_104___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_104__);
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(218);
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_105___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_105__);
/* harmony import */ var core_js_modules_es6_string_anchor__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(219);
/* harmony import */ var core_js_modules_es6_string_anchor__WEBPACK_IMPORTED_MODULE_106___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_anchor__WEBPACK_IMPORTED_MODULE_106__);
/* harmony import */ var core_js_modules_es6_string_big__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(221);
/* harmony import */ var core_js_modules_es6_string_big__WEBPACK_IMPORTED_MODULE_107___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_big__WEBPACK_IMPORTED_MODULE_107__);
/* harmony import */ var core_js_modules_es6_string_blink__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(222);
/* harmony import */ var core_js_modules_es6_string_blink__WEBPACK_IMPORTED_MODULE_108___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_blink__WEBPACK_IMPORTED_MODULE_108__);
/* harmony import */ var core_js_modules_es6_string_bold__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(223);
/* harmony import */ var core_js_modules_es6_string_bold__WEBPACK_IMPORTED_MODULE_109___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_bold__WEBPACK_IMPORTED_MODULE_109__);
/* harmony import */ var core_js_modules_es6_string_code_point_at__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(224);
/* harmony import */ var core_js_modules_es6_string_code_point_at__WEBPACK_IMPORTED_MODULE_110___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_code_point_at__WEBPACK_IMPORTED_MODULE_110__);
/* harmony import */ var core_js_modules_es6_string_ends_with__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(225);
/* harmony import */ var core_js_modules_es6_string_ends_with__WEBPACK_IMPORTED_MODULE_111___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_ends_with__WEBPACK_IMPORTED_MODULE_111__);
/* harmony import */ var core_js_modules_es6_string_fixed__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(228);
/* harmony import */ var core_js_modules_es6_string_fixed__WEBPACK_IMPORTED_MODULE_112___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_fixed__WEBPACK_IMPORTED_MODULE_112__);
/* harmony import */ var core_js_modules_es6_string_fontcolor__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(229);
/* harmony import */ var core_js_modules_es6_string_fontcolor__WEBPACK_IMPORTED_MODULE_113___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_fontcolor__WEBPACK_IMPORTED_MODULE_113__);
/* harmony import */ var core_js_modules_es6_string_fontsize__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_es6_string_fontsize__WEBPACK_IMPORTED_MODULE_114___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_fontsize__WEBPACK_IMPORTED_MODULE_114__);
/* harmony import */ var core_js_modules_es6_string_from_code_point__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(231);
/* harmony import */ var core_js_modules_es6_string_from_code_point__WEBPACK_IMPORTED_MODULE_115___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_from_code_point__WEBPACK_IMPORTED_MODULE_115__);
/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(232);
/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_116___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_116__);
/* harmony import */ var core_js_modules_es6_string_italics__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(233);
/* harmony import */ var core_js_modules_es6_string_italics__WEBPACK_IMPORTED_MODULE_117___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_italics__WEBPACK_IMPORTED_MODULE_117__);
/* harmony import */ var core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(234);
/* harmony import */ var core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_118___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_118__);
/* harmony import */ var core_js_modules_es6_string_link__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(235);
/* harmony import */ var core_js_modules_es6_string_link__WEBPACK_IMPORTED_MODULE_119___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_link__WEBPACK_IMPORTED_MODULE_119__);
/* harmony import */ var core_js_modules_es7_string_pad_start__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(236);
/* harmony import */ var core_js_modules_es7_string_pad_start__WEBPACK_IMPORTED_MODULE_120___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_string_pad_start__WEBPACK_IMPORTED_MODULE_120__);
/* harmony import */ var core_js_modules_es7_string_pad_end__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(239);
/* harmony import */ var core_js_modules_es7_string_pad_end__WEBPACK_IMPORTED_MODULE_121___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_string_pad_end__WEBPACK_IMPORTED_MODULE_121__);
/* harmony import */ var core_js_modules_es6_string_raw__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(240);
/* harmony import */ var core_js_modules_es6_string_raw__WEBPACK_IMPORTED_MODULE_122___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_raw__WEBPACK_IMPORTED_MODULE_122__);
/* harmony import */ var core_js_modules_es6_string_repeat__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(241);
/* harmony import */ var core_js_modules_es6_string_repeat__WEBPACK_IMPORTED_MODULE_123___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_repeat__WEBPACK_IMPORTED_MODULE_123__);
/* harmony import */ var core_js_modules_es6_string_small__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(242);
/* harmony import */ var core_js_modules_es6_string_small__WEBPACK_IMPORTED_MODULE_124___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_small__WEBPACK_IMPORTED_MODULE_124__);
/* harmony import */ var core_js_modules_es6_string_starts_with__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(243);
/* harmony import */ var core_js_modules_es6_string_starts_with__WEBPACK_IMPORTED_MODULE_125___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_starts_with__WEBPACK_IMPORTED_MODULE_125__);
/* harmony import */ var core_js_modules_es6_string_strike__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(244);
/* harmony import */ var core_js_modules_es6_string_strike__WEBPACK_IMPORTED_MODULE_126___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_strike__WEBPACK_IMPORTED_MODULE_126__);
/* harmony import */ var core_js_modules_es6_string_sub__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(245);
/* harmony import */ var core_js_modules_es6_string_sub__WEBPACK_IMPORTED_MODULE_127___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_sub__WEBPACK_IMPORTED_MODULE_127__);
/* harmony import */ var core_js_modules_es6_string_sup__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(246);
/* harmony import */ var core_js_modules_es6_string_sup__WEBPACK_IMPORTED_MODULE_128___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_sup__WEBPACK_IMPORTED_MODULE_128__);
/* harmony import */ var core_js_modules_es6_string_trim__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(247);
/* harmony import */ var core_js_modules_es6_string_trim__WEBPACK_IMPORTED_MODULE_129___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_trim__WEBPACK_IMPORTED_MODULE_129__);
/* harmony import */ var core_js_modules_es7_string_trim_left__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(248);
/* harmony import */ var core_js_modules_es7_string_trim_left__WEBPACK_IMPORTED_MODULE_130___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_string_trim_left__WEBPACK_IMPORTED_MODULE_130__);
/* harmony import */ var core_js_modules_es7_string_trim_right__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(249);
/* harmony import */ var core_js_modules_es7_string_trim_right__WEBPACK_IMPORTED_MODULE_131___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_string_trim_right__WEBPACK_IMPORTED_MODULE_131__);
/* harmony import */ var core_js_modules_es6_typed_array_buffer__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(250);
/* harmony import */ var core_js_modules_es6_typed_array_buffer__WEBPACK_IMPORTED_MODULE_132___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_typed_array_buffer__WEBPACK_IMPORTED_MODULE_132__);
/* harmony import */ var core_js_modules_es6_typed_data_view__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(254);
/* harmony import */ var core_js_modules_es6_typed_data_view__WEBPACK_IMPORTED_MODULE_133___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_typed_data_view__WEBPACK_IMPORTED_MODULE_133__);
/* harmony import */ var core_js_modules_es6_typed_int8_array__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(255);
/* harmony import */ var core_js_modules_es6_typed_int8_array__WEBPACK_IMPORTED_MODULE_134___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_typed_int8_array__WEBPACK_IMPORTED_MODULE_134__);
/* harmony import */ var core_js_modules_es6_typed_uint8_array__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(257);
/* harmony import */ var core_js_modules_es6_typed_uint8_array__WEBPACK_IMPORTED_MODULE_135___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_typed_uint8_array__WEBPACK_IMPORTED_MODULE_135__);
/* harmony import */ var core_js_modules_es6_typed_uint8_clamped_array__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(258);
/* harmony import */ var core_js_modules_es6_typed_uint8_clamped_array__WEBPACK_IMPORTED_MODULE_136___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_typed_uint8_clamped_array__WEBPACK_IMPORTED_MODULE_136__);
/* harmony import */ var core_js_modules_es6_typed_int16_array__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(259);
/* harmony import */ var core_js_modules_es6_typed_int16_array__WEBPACK_IMPORTED_MODULE_137___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_typed_int16_array__WEBPACK_IMPORTED_MODULE_137__);
/* harmony import */ var core_js_modules_es6_typed_uint16_array__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(260);
/* harmony import */ var core_js_modules_es6_typed_uint16_array__WEBPACK_IMPORTED_MODULE_138___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_typed_uint16_array__WEBPACK_IMPORTED_MODULE_138__);
/* harmony import */ var core_js_modules_es6_typed_int32_array__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(261);
/* harmony import */ var core_js_modules_es6_typed_int32_array__WEBPACK_IMPORTED_MODULE_139___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_typed_int32_array__WEBPACK_IMPORTED_MODULE_139__);
/* harmony import */ var core_js_modules_es6_typed_uint32_array__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(262);
/* harmony import */ var core_js_modules_es6_typed_uint32_array__WEBPACK_IMPORTED_MODULE_140___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_typed_uint32_array__WEBPACK_IMPORTED_MODULE_140__);
/* harmony import */ var core_js_modules_es6_typed_float32_array__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(263);
/* harmony import */ var core_js_modules_es6_typed_float32_array__WEBPACK_IMPORTED_MODULE_141___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_typed_float32_array__WEBPACK_IMPORTED_MODULE_141__);
/* harmony import */ var core_js_modules_es6_typed_float64_array__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(264);
/* harmony import */ var core_js_modules_es6_typed_float64_array__WEBPACK_IMPORTED_MODULE_142___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_typed_float64_array__WEBPACK_IMPORTED_MODULE_142__);
/* harmony import */ var core_js_modules_es6_weak_map__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(265);
/* harmony import */ var core_js_modules_es6_weak_map__WEBPACK_IMPORTED_MODULE_143___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_weak_map__WEBPACK_IMPORTED_MODULE_143__);
/* harmony import */ var core_js_modules_es6_weak_set__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(267);
/* harmony import */ var core_js_modules_es6_weak_set__WEBPACK_IMPORTED_MODULE_144___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_weak_set__WEBPACK_IMPORTED_MODULE_144__);
/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_145__ = __webpack_require__(268);
/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_145___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_145__);
/* harmony import */ var core_js_modules_web_immediate__WEBPACK_IMPORTED_MODULE_146__ = __webpack_require__(269);
/* harmony import */ var core_js_modules_web_immediate__WEBPACK_IMPORTED_MODULE_146___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_immediate__WEBPACK_IMPORTED_MODULE_146__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_147__ = __webpack_require__(270);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_147___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_147__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_148__ = __webpack_require__(271);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_148___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_148__);
/* harmony import */ var _init_constructor_js__WEBPACK_IMPORTED_MODULE_149__ = __webpack_require__(273);
/* harmony import */ var _init_init_js__WEBPACK_IMPORTED_MODULE_150__ = __webpack_require__(274);
/* harmony import */ var _player_set_data_js__WEBPACK_IMPORTED_MODULE_151__ = __webpack_require__(278);
/* harmony import */ var _player_init_status_js__WEBPACK_IMPORTED_MODULE_152__ = __webpack_require__(279);
/* harmony import */ var _player_play_js__WEBPACK_IMPORTED_MODULE_153__ = __webpack_require__(280);
/* harmony import */ var _player_stop_js__WEBPACK_IMPORTED_MODULE_154__ = __webpack_require__(284);
/* harmony import */ var _player_sound_source_create_base_note_js__WEBPACK_IMPORTED_MODULE_155__ = __webpack_require__(285);
/* harmony import */ var _player_sound_source_create_note_js__WEBPACK_IMPORTED_MODULE_156__ = __webpack_require__(286);
/* harmony import */ var _player_sound_source_create_percussion_note_js__WEBPACK_IMPORTED_MODULE_157__ = __webpack_require__(287);
/* harmony import */ var _player_sound_source_create_sampling_note_js__WEBPACK_IMPORTED_MODULE_158__ = __webpack_require__(299);
/* harmony import */ var _player_stop_manager_stop_audio_node_js__WEBPACK_IMPORTED_MODULE_159__ = __webpack_require__(288);
/* harmony import */ var _player_stop_manager_push_func_js__WEBPACK_IMPORTED_MODULE_160__ = __webpack_require__(289);
/* harmony import */ var _player_stop_manager_clear_func_js__WEBPACK_IMPORTED_MODULE_161__ = __webpack_require__(290);
/* harmony import */ var _player_time_get_time_js__WEBPACK_IMPORTED_MODULE_162__ = __webpack_require__(291);
/* harmony import */ var _player_time_get_timing_js__WEBPACK_IMPORTED_MODULE_163__ = __webpack_require__(292);
/* harmony import */ var _util_performance_util_js__WEBPACK_IMPORTED_MODULE_164__ = __webpack_require__(293);
/* harmony import */ var _smf_parse_smf_js__WEBPACK_IMPORTED_MODULE_165__ = __webpack_require__(294);
/* harmony import */ var _web_midi_start_web_midi_js__WEBPACK_IMPORTED_MODULE_166__ = __webpack_require__(298);






















































































































































function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




















/**
 * MIDIをブラウザで再生するためのライブラリ
 */

var PicoAudio =
/*#__PURE__*/
function () {
  /**
   * PicoAudioクラスのコンストラクタ
   * @param {AudioContext} audioContext 
   * @param {PicoAudio} picoAudio 
   */
  function PicoAudio(audioContext, picoAudio) {
    _classCallCheck(this, PicoAudio);

    _init_constructor_js__WEBPACK_IMPORTED_MODULE_149__["default"].call(this, audioContext, picoAudio);
  }
  /**
   * 初期化・準備
   * @param {AudioContext} audioContext 
   * @param {PicoAudio} picoAudio 
   */


  _createClass(PicoAudio, [{
    key: "init",
    value: function init(audioContext, picoAudio) {
      return _init_init_js__WEBPACK_IMPORTED_MODULE_150__["default"].call(this, audioContext, picoAudio);
    }
    /**
     * MIDIファイル(SMF)を解析する
     * @param {Uint8Array} smf MIDIファイルの内容が入ったUint8Arrayオブジェクト
     * @returns {Object} 再生用の情報が入ったオブジェクト
     */

  }, {
    key: "parseSMF",
    value: function parseSMF(smf) {
      return _smf_parse_smf_js__WEBPACK_IMPORTED_MODULE_165__["default"].call(this, smf);
    }
    /**
     * 再生用のデータをセットする
     * @param {Object} data PicoAudio.parseSMF()で返されたオブジェクト
     */

  }, {
    key: "setData",
    value: function setData(data) {
      return _player_set_data_js__WEBPACK_IMPORTED_MODULE_151__["default"].call(this, data);
    }
    /**
     * 再生
     * @param {boolean} _isSongLooping PicoAudio内部で使う引数
     */

  }, {
    key: "play",
    value: function play(_isSongLooping) {
      return _player_play_js__WEBPACK_IMPORTED_MODULE_153__["default"].call(this, _isSongLooping);
    }
    /**
     * 停止
     * @param {boolean} _isSongLooping PicoAudio内部で使う引数
     */

  }, {
    key: "stop",
    value: function stop(_isSongLooping) {
      return _player_stop_js__WEBPACK_IMPORTED_MODULE_154__["default"].call(this, _isSongLooping);
    }
    /**
     * リセット
     * @param {boolean} _isSongLooping PicoAudio内部で使う引数
     * @param {boolean} _isLight PicoAudio内部で使う引数
     */

  }, {
    key: "initStatus",
    value: function initStatus(_isSongLooping, _isLight) {
      return _player_init_status_js__WEBPACK_IMPORTED_MODULE_152__["default"].call(this, _isSongLooping, _isLight);
    } // 時関関係 //

    /**
     * tickからtime(秒)を求める
     * @param {number} tick
     * @returns {number} time(秒)
     */

  }, {
    key: "getTime",
    value: function getTime(tick) {
      return _player_time_get_time_js__WEBPACK_IMPORTED_MODULE_162__["default"].call(this, tick);
    }
    /**
     * time(秒)からtickを求める
     * @param {number} time
     * @returns {number} tick
     */

  }, {
    key: "getTiming",
    value: function getTiming(time) {
      return _player_time_get_timing_js__WEBPACK_IMPORTED_MODULE_163__["default"].call(this, time);
    } // 再生・音源関係 //

    /**
     * 再生処理（Web Audio API の oscillator等で音を鳴らす）
     * @param {Object} option 
     * @param {boolean} isDrum 
     * @param {boolean} isExpression 
     * @param {boolean} nonChannel 
     * @param {boolean} nonStop 
     * @returns {Object} AudioNodeやパラメータを返す
     */

  }, {
    key: "createBaseNote",
    value: function createBaseNote(option, isDrum, isExpression, nonChannel, nonStop) {
      return _player_sound_source_create_base_note_js__WEBPACK_IMPORTED_MODULE_155__["default"].call(this, option, isDrum, isExpression, nonChannel, nonStop);
    }
    /**
     * 音源（パーカッション以外）
     * @param {Object} option 
     * @returns {Object} 音をストップさせる関数を返す
     */

  }, {
    key: "createNote",
    value: function createNote(option) {
      return _player_sound_source_create_note_js__WEBPACK_IMPORTED_MODULE_156__["default"].call(this, option);
    }
    /**
     * パーカッション音源
     * @param {Object} option 
     * @returns {Object} 音をストップさせる関数を返す
     */

  }, {
    key: "createPercussionNote",
    value: function createPercussionNote(option) {
      return _player_sound_source_create_percussion_note_js__WEBPACK_IMPORTED_MODULE_157__["default"].call(this, option);
    }
  }, {
    key: "createSamplingNote",
    value: function createSamplingNote(option) {
      return _player_sound_source_create_sampling_note_js__WEBPACK_IMPORTED_MODULE_158__["default"].call(this, option);
    } // 停止管理関係 //

    /**
     * 各々のNoteの音停止処理
     * @param {Object} tar 
     * @param {number} time 
     * @param {Object} stopGainNode 
     * @param {boolean} isNoiseCut 
     */

  }, {
    key: "stopAudioNode",
    value: function stopAudioNode(tar, time, stopGainNode, isNoiseCut) {
      return _player_stop_manager_stop_audio_node_js__WEBPACK_IMPORTED_MODULE_159__["default"].call(this, tar, time, stopGainNode, isNoiseCut);
    }
    /**
     * stop()するときに実行するコールバック等を登録
     * @param {Object} tar 
     */

  }, {
    key: "pushFunc",
    value: function pushFunc(tar) {
      return _player_stop_manager_push_func_js__WEBPACK_IMPORTED_MODULE_160__["default"].call(this, tar);
    }
    /**
     * pushFunc()で予約したコールバック等を削除する
     * @param {Object} tar1 
     * @param {Object} tar2 
     */

  }, {
    key: "clearFunc",
    value: function clearFunc(tar1, tar2) {
      return _player_stop_manager_clear_func_js__WEBPACK_IMPORTED_MODULE_161__["default"].call(this, tar1, tar2);
    }
    /**
     * Web MIDI API
     */

  }, {
    key: "startWebMIDI",
    value: function startWebMIDI() {
      return _web_midi_start_web_midi_js__WEBPACK_IMPORTED_MODULE_166__["default"].call(this);
    }
    /**
     * パフォーマンス計測
     */

  }, {
    key: "measurePerformanceReverb",
    value: function measurePerformanceReverb() {
      return _util_performance_util_js__WEBPACK_IMPORTED_MODULE_164__["default"].measureReverb.call(this);
    } // インターフェース関係 //

  }, {
    key: "addEventListener",
    value: function addEventListener(type, func) {
      // type = EventName (play, stop, noteOn...)
      this.events.push({
        type: type,
        func: func
      });
    }
  }, {
    key: "fireEvent",
    value: function fireEvent(type, option) {
      this.events.forEach(function (event) {
        if (event.type == type) {
          try {
            event.func(option);
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
  }, {
    key: "getChannels",
    value: function getChannels() {
      return this.channels;
    }
  }, {
    key: "setChannels",
    value: function setChannels(channels) {
      var _this = this;

      channels.forEach(function (channel, idx) {
        _this.channels[idx] = channel;
      });
    }
  }, {
    key: "initChannels",
    value: function initChannels() {
      for (var i = 0; i < 16; i++) {
        this.channels[i] = [0, 0, 1];
      }
    }
  }, {
    key: "getMasterVolume",
    value: function getMasterVolume() {
      return this.settings.masterVolume;
    }
  }, {
    key: "setMasterVolume",
    value: function setMasterVolume(volume) {
      this.settings.masterVolume = volume;

      if (this.isStarted) {
        this.masterGainNode.gain.value = this.settings.masterVolume;
      }
    }
  }, {
    key: "isLoop",
    value: function isLoop() {
      return this.settings.loop;
    }
  }, {
    key: "setLoop",
    value: function setLoop(loop) {
      this.settings.loop = loop;
    }
  }, {
    key: "isWebMIDI",
    value: function isWebMIDI() {
      return this.settings.isWebMIDI;
    }
  }, {
    key: "setWebMIDI",
    value: function setWebMIDI(enable) {
      this.settings.isWebMIDI = enable;
    }
  }, {
    key: "isCC111",
    value: function isCC111() {
      return this.settings.isCC111;
    }
  }, {
    key: "setCC111",
    value: function setCC111(enable) {
      this.settings.isCC111 = enable;
    }
  }, {
    key: "setStartTime",
    value: function setStartTime(offset) {
      this.states.startTime -= offset;
    }
  }, {
    key: "setOnSongEndListener",
    value: function setOnSongEndListener(listener) {
      this.onSongEndListener = listener;
    }
  }, {
    key: "onSongEnd",
    value: function onSongEnd() {
      if (this.onSongEndListener) {
        var isStopFunc = this.onSongEndListener();
        if (isStopFunc) return;
      }

      if (this.settings.loop) {
        this.initStatus(true);

        if (this.settings.isCC111 && this.cc111Time != -1) {
          this.setStartTime(this.cc111Time);
        }

        this.play(true);
      }
    }
  }, {
    key: "isReverb",
    value: function isReverb() {
      return this.settings.isReverb;
    }
  }, {
    key: "setReverb",
    value: function setReverb(enable) {
      this.settings.isReverb = enable;
    }
  }, {
    key: "getReverbVolume",
    value: function getReverbVolume() {
      return this.settings.reverbVolume;
    }
  }, {
    key: "setReverbVolume",
    value: function setReverbVolume(volume) {
      this.settings.reverbVolume = volume;
    }
  }, {
    key: "isChorus",
    value: function isChorus() {
      return this.settings.isChorus;
    }
  }, {
    key: "setChorus",
    value: function setChorus(enable) {
      this.settings.isChorus = enable;
    }
  }, {
    key: "getChorusVolume",
    value: function getChorusVolume() {
      return this.settings.chorusVolume;
    }
  }, {
    key: "setChorusVolume",
    value: function setChorusVolume(volume) {
      this.settings.chorusVolume = volume;
    }
  }]);

  return PicoAudio;
}(); // PicoAudioをグローバル変数に登録


window.PicoAudio = PicoAudio;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(2);

$export($export.P, 'Array', {
  copyWithin: __webpack_require__(23)
});

__webpack_require__(29)('copyWithin');

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);

var core = __webpack_require__(4);

var hide = __webpack_require__(5);

var redefine = __webpack_require__(15);

var ctx = __webpack_require__(21);

var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;

  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined; // export native or passed

    out = (own ? target : source)[key]; // bind timers to global for call from export context

    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out; // extend global

    if (target) redefine(target, key, out, type & $export.U); // export

    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};

global.core = core; // type bitmap

$export.F = 1; // forced

$export.G = 2; // global

$export.S = 4; // static

$export.P = 8; // proto

$export.B = 16; // bind

$export.W = 32; // wrap

$export.U = 64; // safe

$export.R = 128; // real proto method for `library`

module.exports = $export;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = {
  version: '2.6.11'
};
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);

var createDesc = __webpack_require__(14);

module.exports = __webpack_require__(10) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);

var IE8_DOM_DEFINE = __webpack_require__(9);

var toPrimitive = __webpack_require__(13);

var dP = Object.defineProperty;
exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);

module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function (it) {
  return _typeof(it) === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(10) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(12)('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);

var document = __webpack_require__(3).document; // typeof document.createElement is 'object' in old IE


var is = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8); // instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string


module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);

var hide = __webpack_require__(5);

var has = __webpack_require__(16);

var SRC = __webpack_require__(17)('src');

var $toString = __webpack_require__(18);

var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(4).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));

  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  } // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative

})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();

module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19)('native-function-to-string', Function.toString);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(4);

var global = __webpack_require__(3);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(20) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(22);

module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


var toObject = __webpack_require__(24);

var toAbsoluteIndex = __webpack_require__(26);

var toLength = __webpack_require__(28);

module.exports = [].copyWithin || function copyWithin(target
/* = 0 */
, start
/* = 0, end = @length */
) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;

  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }

  while (count-- > 0) {
    if (from in O) O[to] = O[from];else delete O[to];
    to += inc;
    from += inc;
  }

  return O;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(25);

module.exports = function (it) {
  return Object(defined(it));
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(27);

var max = Math.max;
var min = Math.min;

module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;

module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(27);

var min = Math.min;

module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(30)('unscopables');

var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(5)(ArrayProto, UNSCOPABLES, {});

module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(19)('wks');

var uid = __webpack_require__(17);

var _Symbol = __webpack_require__(3).Symbol;

var USE_SYMBOL = typeof _Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var $every = __webpack_require__(32)(4);

$export($export.P + $export.F * !__webpack_require__(38)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn
  /* , thisArg */
  ) {
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(21);

var IObject = __webpack_require__(33);

var toObject = __webpack_require__(24);

var toLength = __webpack_require__(28);

var asc = __webpack_require__(35);

module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;

    for (; length > index; index++) {
      if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);

        if (TYPE) {
          if (IS_MAP) result[index] = res; // map
          else if (res) switch (TYPE) {
              case 3:
                return true;
              // some

              case 5:
                return val;
              // find

              case 6:
                return index;
              // findIndex

              case 2:
                result.push(val);
              // filter
            } else if (IS_EVERY) return false; // every
        }
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(34); // eslint-disable-next-line no-prototype-builtins


module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(36);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);

var isArray = __webpack_require__(37);

var SPECIES = __webpack_require__(30)('species');

module.exports = function (original) {
  var C;

  if (isArray(original)) {
    C = original.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;

    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? Array : C;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(34);

module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(11);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () {
      /* empty */
    }, 1) : method.call(null);
  });
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(2);

$export($export.P, 'Array', {
  fill: __webpack_require__(40)
});

__webpack_require__(29)('fill');

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


var toObject = __webpack_require__(24);

var toAbsoluteIndex = __webpack_require__(26);

var toLength = __webpack_require__(28);

module.exports = function fill(value
/* , start = 0, end = @length */
) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

  while (endPos > index) {
    O[index++] = value;
  }

  return O;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var $filter = __webpack_require__(32)(2);

$export($export.P + $export.F * !__webpack_require__(38)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $export = __webpack_require__(2);

var $find = __webpack_require__(32)(5);

var KEY = 'find';
var forced = true; // Shouldn't skip holes

if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn
  /* , that = undefined */
  ) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(29)(KEY);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

var $export = __webpack_require__(2);

var $find = __webpack_require__(32)(6);

var KEY = 'findIndex';
var forced = true; // Shouldn't skip holes

if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn
  /* , that = undefined */
  ) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(29)(KEY);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap

var $export = __webpack_require__(2);

var flattenIntoArray = __webpack_require__(45);

var toObject = __webpack_require__(24);

var toLength = __webpack_require__(28);

var aFunction = __webpack_require__(22);

var arraySpeciesCreate = __webpack_require__(35);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn
  /* , thisArg */
  ) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(29)('flatMap');

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray

var isArray = __webpack_require__(37);

var isObject = __webpack_require__(8);

var toLength = __webpack_require__(28);

var ctx = __webpack_require__(21);

var IS_CONCAT_SPREADABLE = __webpack_require__(30)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
      spreadable = false;

      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
}

module.exports = flattenIntoArray;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var $forEach = __webpack_require__(32)(0);

var STRICT = __webpack_require__(38)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn
  /* , thisArg */
  ) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(21);

var $export = __webpack_require__(2);

var toObject = __webpack_require__(24);

var call = __webpack_require__(48);

var isArrayIter = __webpack_require__(49);

var toLength = __webpack_require__(28);

var createProperty = __webpack_require__(51);

var getIterFn = __webpack_require__(52);

$export($export.S + $export.F * !__webpack_require__(54)(function (iter) {
  Array.from(iter);
}), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike
  /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); // if object isn't iterable or it's array with default iterator - use simple case

    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);

      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }

    result.length = index;
    return result;
  }
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);

module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(50);

var ITERATOR = __webpack_require__(30)('iterator');

var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $defineProperty = __webpack_require__(6);

var createDesc = __webpack_require__(14);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(53);

var ITERATOR = __webpack_require__(30)('iterator');

var Iterators = __webpack_require__(50);

module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(34);

var TAG = __webpack_require__(30)('toStringTag'); // ES3 wrong here


var ARG = cof(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {
    /* empty */
  }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T // builtinTag case
  : ARG ? cof(O) // ES3 arguments fallback
  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(30)('iterator');

var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();

  riter['return'] = function () {
    SAFE_CLOSING = true;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {
  /* empty */
}

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;

  try {
    var arr = [7];
    var iter = arr[ITERATOR]();

    iter.next = function () {
      return {
        done: safe = true
      };
    };

    arr[ITERATOR] = function () {
      return iter;
    };

    exec(arr);
  } catch (e) {
    /* empty */
  }

  return safe;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // https://github.com/tc39/Array.prototype.includes

var $export = __webpack_require__(2);

var $includes = __webpack_require__(56)(true);

$export($export.P, 'Array', {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(29)('includes');

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(57);

var toLength = __webpack_require__(28);

var toAbsoluteIndex = __webpack_require__(26);

module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }
    return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(33);

var defined = __webpack_require__(25);

module.exports = function (it) {
  return IObject(defined(it));
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var $indexOf = __webpack_require__(56)(false);

var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(38)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement
  /* , fromIndex = 0 */
  ) {
    return NEGATIVE_ZERO // convert -0 to +0
    ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(2);

$export($export.S, 'Array', {
  isArray: __webpack_require__(37)
});

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addToUnscopables = __webpack_require__(29);

var step = __webpack_require__(61);

var Iterators = __webpack_require__(50);

var toIObject = __webpack_require__(57); // 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()


module.exports = __webpack_require__(62)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target

  this._i = 0; // next index

  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;

  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }

  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)

Iterators.Arguments = Iterators.Array;
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return {
    value: value,
    done: !!done
  };
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(20);

var $export = __webpack_require__(2);

var redefine = __webpack_require__(15);

var hide = __webpack_require__(5);

var Iterators = __webpack_require__(50);

var $iterCreate = __webpack_require__(63);

var setToStringTag = __webpack_require__(71);

var getPrototypeOf = __webpack_require__(72);

var ITERATOR = __webpack_require__(30)('iterator');

var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);

  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];

    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };

      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }

    return function entries() {
      return new Constructor(this, kind);
    };
  };

  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype; // Fix native

  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));

    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines

      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;

    $default = function values() {
      return $native.call(this);
    };
  } // Define iterator


  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  } // Plug for library


  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;

  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }

  return methods;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = __webpack_require__(64);

var descriptor = __webpack_require__(14);

var setToStringTag = __webpack_require__(71);

var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

__webpack_require__(5)(IteratorPrototype, __webpack_require__(30)('iterator'), function () {
  return this;
});

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, {
    next: descriptor(1, next)
  });
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7);

var dPs = __webpack_require__(65);

var enumBugKeys = __webpack_require__(69);

var IE_PROTO = __webpack_require__(68)('IE_PROTO');

var Empty = function Empty() {
  /* empty */
};

var PROTOTYPE = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(12)('iframe');

  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';

  __webpack_require__(70).appendChild(iframe);

  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);

  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;

  while (i--) {
    delete _createDict[PROTOTYPE][enumBugKeys[i]];
  }

  return _createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = _createDict();

  return Properties === undefined ? result : dPs(result, Properties);
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);

var anObject = __webpack_require__(7);

var getKeys = __webpack_require__(66);

module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;

  while (length > i) {
    dP.f(O, P = keys[i++], Properties[P]);
  }

  return O;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(67);

var enumBugKeys = __webpack_require__(69);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(16);

var toIObject = __webpack_require__(57);

var arrayIndexOf = __webpack_require__(56)(false);

var IE_PROTO = __webpack_require__(68)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }

  return result;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(19)('keys');

var uid = __webpack_require__(17);

module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 69 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;

module.exports = document && document.documentElement;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;

var has = __webpack_require__(16);

var TAG = __webpack_require__(30)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
    configurable: true,
    value: tag
  });
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(16);

var toObject = __webpack_require__(24);

var IE_PROTO = __webpack_require__(68)('IE_PROTO');

var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var toIObject = __webpack_require__(57);

var toInteger = __webpack_require__(27);

var toLength = __webpack_require__(28);

var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;
$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(38)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement
  /* , fromIndex = @[*-1] */
  ) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;

    for (; index >= 0; index--) {
      if (index in O) if (O[index] === searchElement) return index || 0;
    }

    return -1;
  }
});

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var $map = __webpack_require__(32)(1);

$export($export.P + $export.F * !__webpack_require__(38)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var createProperty = __webpack_require__(51); // WebKit Array.of isn't generic


$export($export.S + $export.F * __webpack_require__(11)(function () {
  function F() {
    /* empty */
  }

  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of()
  /* ...args */
  {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);

    while (aLen > index) {
      createProperty(result, index, arguments[index++]);
    }

    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var $reduce = __webpack_require__(77);

$export($export.P + $export.F * !__webpack_require__(38)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(22);

var toObject = __webpack_require__(24);

var IObject = __webpack_require__(33);

var toLength = __webpack_require__(28);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }

    index += i;

    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }

  for (; isRight ? index >= 0 : length > index; index += i) {
    if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
  }

  return memo;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var $reduce = __webpack_require__(77);

$export($export.P + $export.F * !__webpack_require__(38)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn
  /* , initialValue */
  ) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var $some = __webpack_require__(32)(3);

$export($export.P + $export.F * !__webpack_require__(38)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn
  /* , thisArg */
  ) {
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var aFunction = __webpack_require__(22);

var toObject = __webpack_require__(24);

var fails = __webpack_require__(11);

var $sort = [].sort;
var test = [1, 2, 3];
$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null); // Old WebKit
}) || !__webpack_require__(38)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82)('Array');

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(3);

var dP = __webpack_require__(6);

var DESCRIPTORS = __webpack_require__(10);

var SPECIES = __webpack_require__(30)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(2);

$export($export.S, 'Date', {
  now: function now() {
    return new Date().getTime();
  }
});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(2);

var toISOString = __webpack_require__(85); // PhantomJS / old WebKit has a broken implementations


$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

var fails = __webpack_require__(11);

var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function lz(num) {
  return num > 9 ? num : '0' + num;
}; // PhantomJS / old WebKit has a broken implementations


module.exports = fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
}) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var toObject = __webpack_require__(24);

var toPrimitive = __webpack_require__(13);

$export($export.P + $export.F * __webpack_require__(11)(function () {
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({
    toISOString: function toISOString() {
      return 1;
    }
  }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(30)('toPrimitive');

var proto = Date.prototype;
if (!(TO_PRIMITIVE in proto)) __webpack_require__(5)(proto, TO_PRIMITIVE, __webpack_require__(88));

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(7);

var toPrimitive = __webpack_require__(13);

var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;

if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(15)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this); // eslint-disable-next-line no-self-compare

    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(2);

$export($export.P, 'Function', {
  bind: __webpack_require__(91)
});

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(22);

var isObject = __webpack_require__(8);

var invoke = __webpack_require__(92);

var arraySlice = [].slice;
var factories = {};

var construct = function construct(F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) {
      n[i] = 'a[' + i + ']';
    } // eslint-disable-next-line no-new-func


    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }

  return factories[len](F, args);
};

module.exports = Function.bind || function bind(that
/* , ...args */
) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);

  var bound = function bound()
  /* args... */
  {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };

  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 92 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;

  switch (args.length) {
    case 0:
      return un ? fn() : fn.call(that);

    case 1:
      return un ? fn(args[0]) : fn.call(that, args[0]);

    case 2:
      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);

    case 3:
      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);

    case 4:
      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
  }

  return fn.apply(that, args);
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(8);

var getPrototypeOf = __webpack_require__(72);

var HAS_INSTANCE = __webpack_require__(30)('hasInstance');

var FunctionProto = Function.prototype; // 19.2.3.6 Function.prototype[@@hasInstance](V)

if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(6).f(FunctionProto, HAS_INSTANCE, {
  value: function value(O) {
    if (typeof this != 'function' || !isObject(O)) return false;
    if (!isObject(this.prototype)) return O instanceof this; // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:

    while (O = getPrototypeOf(O)) {
      if (this.prototype === O) return true;
    }

    return false;
  }
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6).f;

var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // 19.2.4.2 name

NAME in FProto || __webpack_require__(10) && dP(FProto, NAME, {
  configurable: true,
  get: function get() {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strong = __webpack_require__(96);

var validate = __webpack_require__(101);

var MAP = 'Map'; // 23.1 Map Objects

module.exports = __webpack_require__(102)(MAP, function (get) {
  return function Map() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(6).f;

var create = __webpack_require__(64);

var redefineAll = __webpack_require__(97);

var ctx = __webpack_require__(21);

var anInstance = __webpack_require__(98);

var forOf = __webpack_require__(99);

var $iterDefine = __webpack_require__(62);

var step = __webpack_require__(61);

var setSpecies = __webpack_require__(82);

var DESCRIPTORS = __webpack_require__(10);

var fastKey = __webpack_require__(100).fastKey;

var validate = __webpack_require__(101);

var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function getEntry(that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index]; // frozen object case

  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type

      that._i = create(null); // index

      that._f = undefined; // first entry

      that._l = undefined; // last entry

      that[SIZE] = 0; // size

      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }

        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function _delete(key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);

        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        }

        return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn
      /* , that = undefined */
      ) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;

        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this); // revert to the last existing entry

          while (entry && entry.r) {
            entry = entry.p;
          }
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function get() {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var entry = getEntry(that, key);
    var prev, index; // change existing entry

    if (entry) {
      entry.v = value; // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true),
        // <- index
        k: key,
        // <- key
        v: value,
        // <- value
        p: prev = that._l,
        // <- previous entry
        n: undefined,
        // <- next entry
        r: false // <- removed

      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++; // add to index

      if (index !== 'F') that._i[index] = entry;
    }

    return that;
  },
  getEntry: getEntry,
  setStrong: function setStrong(C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target

      this._k = kind; // kind

      this._l = undefined; // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l; // revert to the last existing entry

      while (entry && entry.r) {
        entry = entry.p;
      } // get next entry


      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      } // return step by kind


      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

    setSpecies(NAME);
  }
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(15);

module.exports = function (target, src, safe) {
  for (var key in src) {
    redefine(target, key, src[key], safe);
  }

  return target;
};

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }

  return it;
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(21);

var call = __webpack_require__(48);

var isArrayIter = __webpack_require__(49);

var anObject = __webpack_require__(7);

var toLength = __webpack_require__(28);

var getIterFn = __webpack_require__(52);

var BREAK = {};
var RETURN = {};

var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () {
    return iterable;
  } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!'); // fast case for arrays with default iterator

  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};

exports.BREAK = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var META = __webpack_require__(17)('meta');

var isObject = __webpack_require__(8);

var has = __webpack_require__(16);

var setDesc = __webpack_require__(6).f;

var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});

var setMeta = function setMeta(it) {
  setDesc(it, META, {
    value: {
      i: 'O' + ++id,
      // object ID
      w: {} // weak collections IDs

    }
  });
};

var fastKey = function fastKey(it, create) {
  // return primitive with prefix
  if (!isObject(it)) return _typeof(it) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F'; // not necessary to add metadata

    if (!create) return 'E'; // add missing metadata

    setMeta(it); // return object ID
  }

  return it[META].i;
};

var getWeak = function getWeak(it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true; // not necessary to add metadata

    if (!create) return false; // add missing metadata

    setMeta(it); // return hash weak collections IDs
  }

  return it[META].w;
}; // add metadata on freeze-family methods calling


var onFreeze = function onFreeze(it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};

var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);

module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(3);

var $export = __webpack_require__(2);

var redefine = __webpack_require__(15);

var redefineAll = __webpack_require__(97);

var meta = __webpack_require__(100);

var forOf = __webpack_require__(99);

var anInstance = __webpack_require__(98);

var isObject = __webpack_require__(8);

var fails = __webpack_require__(11);

var $iterDetect = __webpack_require__(54);

var setToStringTag = __webpack_require__(71);

var inheritIfRequired = __webpack_require__(103);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};

  var fixMethod = function fixMethod(KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY, KEY == 'delete' ? function (a) {
      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'has' ? function has(a) {
      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'get' ? function get(a) {
      return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'add' ? function add(a) {
      fn.call(this, a === 0 ? 0 : a);
      return this;
    } : function set(a, b) {
      fn.call(this, a === 0 ? 0 : a, b);
      return this;
    });
  };

  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C(); // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    }); // most early implementations doesn't supports iterables, most modern - not close it correctly

    var ACCEPT_ITERABLES = $iterDetect(function (iter) {
      new C(iter);
    }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same

    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;

      while (index--) {
        $instance[ADDER](index, index);
      }

      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);
  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);
  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
  return C;
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);

var setPrototypeOf = __webpack_require__(104).set;

module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;

  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  }

  return that;
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */
var isObject = __webpack_require__(8);

var anObject = __webpack_require__(7);

var check = function check(O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};

module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
  function (test, buggy, set) {
    try {
      set = __webpack_require__(21)(Function.call, __webpack_require__(105).f(Object.prototype, '__proto__').set, 2);
      set(test, []);
      buggy = !(test instanceof Array);
    } catch (e) {
      buggy = true;
    }

    return function setPrototypeOf(O, proto) {
      check(O, proto);
      if (buggy) O.__proto__ = proto;else set(O, proto);
      return O;
    };
  }({}, false) : undefined),
  check: check
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(106);

var createDesc = __webpack_require__(14);

var toIObject = __webpack_require__(57);

var toPrimitive = __webpack_require__(13);

var has = __webpack_require__(16);

var IE8_DOM_DEFINE = __webpack_require__(9);

var gOPD = Object.getOwnPropertyDescriptor;
exports.f = __webpack_require__(10) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) {
    /* empty */
  }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 106 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(2);

var log1p = __webpack_require__(108);

var sqrt = Math.sqrt;
var $acosh = Math.acosh;
$export($export.S + $export.F * !($acosh // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
&& Math.floor($acosh(Number.MAX_VALUE)) == 710 // Tor Browser bug: Math.acosh(Infinity) -> NaN
&& $acosh(Infinity) == Infinity), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 108 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(2);

var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
} // Tor Browser bug: Math.asinh(0) -> -0


$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {
  asinh: asinh
});

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(2);

var $atanh = Math.atanh; // Tor Browser bug: Math.atanh(-0) -> 0

$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(2);

var sign = __webpack_require__(112);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 112 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(2);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(2);

var exp = Math.exp;
$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(2);

var $expm1 = __webpack_require__(116);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {
  expm1: $expm1
});

/***/ }),
/* 116 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = !$expm1 // Old FF bug
|| $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168 // Tor Browser bug
|| $expm1(-2e-17) != -2e-17 ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(2);

$export($export.S, 'Math', {
  fround: __webpack_require__(118)
});

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(112);

var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function roundTiesToEven(n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs); // eslint-disable-next-line no-self-compare

  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(2);

var abs = Math.abs;
$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) {
    // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;

    while (i < aLen) {
      arg = abs(arguments[i++]);

      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }

    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(2);

var $imul = Math.imul; // some WebKit versions fails with big numbers, some has wrong arity

$export($export.S + $export.F * __webpack_require__(11)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(2);

$export($export.S, 'Math', {
  log1p: __webpack_require__(108)
});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(2);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(2);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(2);

$export($export.S, 'Math', {
  sign: __webpack_require__(112)
});

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(2);

var expm1 = __webpack_require__(116);

var exp = Math.exp; // V8 near Chromium 38 has a problem with very small numbers

$export($export.S + $export.F * __webpack_require__(11)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(2);

var expm1 = __webpack_require__(116);

var exp = Math.exp;
$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(2);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(3);

var has = __webpack_require__(16);

var cof = __webpack_require__(34);

var inheritIfRequired = __webpack_require__(103);

var toPrimitive = __webpack_require__(13);

var fails = __webpack_require__(11);

var gOPN = __webpack_require__(129).f;

var gOPD = __webpack_require__(105).f;

var dP = __webpack_require__(6).f;

var $trim = __webpack_require__(130).trim;

var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype; // Opera ~12 has broken Object#toString

var BROKEN_COF = cof(__webpack_require__(64)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype; // 7.1.3 ToNumber(argument)

var toNumber = function toNumber(argument) {
  var it = toPrimitive(argument, false);

  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;

    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal /^0b[01]+$/i

        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        // fast equal /^0o[0-7]+$/i

        default:
          return +it;
      }

      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i); // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols

        if (code < 48 || code > maxCode) return NaN;
      }

      return parseInt(digits, radix);
    }
  }

  return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number // check on 1..constructor(foo) case
    && (BROKEN_COF ? fails(function () {
      proto.valueOf.call(that);
    }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };

  for (var keys = __webpack_require__(10) ? gOPN(Base) : ( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES6 (in case, if modules with ES6 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }

  $Number.prototype = proto;
  proto.constructor = $Number;

  __webpack_require__(15)(global, NUMBER, $Number);
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(67);

var hiddenKeys = __webpack_require__(69).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);

var defined = __webpack_require__(25);

var fails = __webpack_require__(11);

var spaces = __webpack_require__(131);

var space = '[' + spaces + ']';
var non = "\u200B\x85";
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function exporter(KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
}; // 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim


var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 131 */
/***/ (function(module, exports) {

module.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(2);

$export($export.S, 'Number', {
  EPSILON: Math.pow(2, -52)
});

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(2);

var _isFinite = __webpack_require__(3).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(2);

$export($export.S, 'Number', {
  isInteger: __webpack_require__(135)
});

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(8);

var floor = Math.floor;

module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(2);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(2);

var isInteger = __webpack_require__(135);

var abs = Math.abs;
$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(2);

$export($export.S, 'Number', {
  MAX_SAFE_INTEGER: 0x1fffffffffffff
});

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(2);

$export($export.S, 'Number', {
  MIN_SAFE_INTEGER: -0x1fffffffffffff
});

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);

var $parseFloat = __webpack_require__(141); // 20.1.2.12 Number.parseFloat(string)


$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {
  parseFloat: $parseFloat
});

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(3).parseFloat;

var $trim = __webpack_require__(130).trim;

module.exports = 1 / $parseFloat(__webpack_require__(131) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);

var $parseInt = __webpack_require__(143); // 20.1.2.13 Number.parseInt(string, radix)


$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {
  parseInt: $parseInt
});

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(3).parseInt;

var $trim = __webpack_require__(130).trim;

var ws = __webpack_require__(131);

var hex = /^[-+]?0[xX]/;
module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(2);

$export($export.S + $export.F, 'Object', {
  assign: __webpack_require__(145)
});

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 19.1.2.1 Object.assign(target, source, ...)

var DESCRIPTORS = __webpack_require__(10);

var getKeys = __webpack_require__(66);

var gOPS = __webpack_require__(146);

var pIE = __webpack_require__(106);

var toObject = __webpack_require__(24);

var IObject = __webpack_require__(33);

var $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)

module.exports = !$assign || __webpack_require__(11)(function () {
  var A = {};
  var B = {}; // eslint-disable-next-line no-undef

  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;

  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  }

  return T;
} : $assign;

/***/ }),
/* 146 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2); // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])


$export($export.S, 'Object', {
  create: __webpack_require__(64)
});

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var toObject = __webpack_require__(24);

var aFunction = __webpack_require__(22);

var $defineProperty = __webpack_require__(6); // B.2.2.2 Object.prototype.__defineGetter__(P, getter)


__webpack_require__(10) && $export($export.P + __webpack_require__(149), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, {
      get: aFunction(getter),
      enumerable: true,
      configurable: true
    });
  }
});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Forced replacement prototype accessors methods

module.exports = __webpack_require__(20) || !__webpack_require__(11)(function () {
  var K = Math.random(); // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call

  __defineSetter__.call(null, K, function () {
    /* empty */
  });

  delete __webpack_require__(3)[K];
});

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var toObject = __webpack_require__(24);

var aFunction = __webpack_require__(22);

var $defineProperty = __webpack_require__(6); // B.2.2.3 Object.prototype.__defineSetter__(P, setter)


__webpack_require__(10) && $export($export.P + __webpack_require__(149), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, {
      set: aFunction(setter),
      enumerable: true,
      configurable: true
    });
  }
});

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2); // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)


$export($export.S + $export.F * !__webpack_require__(10), 'Object', {
  defineProperty: __webpack_require__(6).f
});

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2); // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)


$export($export.S + $export.F * !__webpack_require__(10), 'Object', {
  defineProperties: __webpack_require__(65)
});

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(2);

var $entries = __webpack_require__(154)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(10);

var getKeys = __webpack_require__(66);

var toIObject = __webpack_require__(57);

var isEnum = __webpack_require__(106).f;

module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(8);

var meta = __webpack_require__(100).onFreeze;

__webpack_require__(156)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(2);

var core = __webpack_require__(4);

var fails = __webpack_require__(11);

module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () {
    fn(1);
  }), 'Object', exp);
};

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(57);

var $getOwnPropertyDescriptor = __webpack_require__(105).f;

__webpack_require__(156)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(2);

var ownKeys = __webpack_require__(159);

var toIObject = __webpack_require__(57);

var gOPD = __webpack_require__(105);

var createProperty = __webpack_require__(51);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;

    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }

    return result;
  }
});

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(129);

var gOPS = __webpack_require__(146);

var anObject = __webpack_require__(7);

var Reflect = __webpack_require__(3).Reflect;

module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(156)('getOwnPropertyNames', function () {
  return __webpack_require__(161).f;
});

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(57);

var gOPN = __webpack_require__(129).f;

var toString = {}.toString;
var windowNames = (typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function getWindowNames(it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(24);

var $getPrototypeOf = __webpack_require__(72);

__webpack_require__(156)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var toObject = __webpack_require__(24);

var toPrimitive = __webpack_require__(13);

var getPrototypeOf = __webpack_require__(72);

var getOwnPropertyDescriptor = __webpack_require__(105).f; // B.2.2.4 Object.prototype.__lookupGetter__(P)


__webpack_require__(10) && $export($export.P + __webpack_require__(149), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;

    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var toObject = __webpack_require__(24);

var toPrimitive = __webpack_require__(13);

var getPrototypeOf = __webpack_require__(72);

var getOwnPropertyDescriptor = __webpack_require__(105).f; // B.2.2.5 Object.prototype.__lookupSetter__(P)


__webpack_require__(10) && $export($export.P + __webpack_require__(149), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;

    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(8);

var meta = __webpack_require__(100).onFreeze;

__webpack_require__(156)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 19.1.3.6 Object.prototype.toString()

var classof = __webpack_require__(53);

var test = {};
test[__webpack_require__(30)('toStringTag')] = 'z';

if (test + '' != '[object z]') {
  __webpack_require__(15)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(2);

$export($export.S, 'Object', {
  is: __webpack_require__(168)
});

/***/ }),
/* 168 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(8);

__webpack_require__(156)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(8);

__webpack_require__(156)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(8);

__webpack_require__(156)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(24);

var $keys = __webpack_require__(66);

__webpack_require__(156)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(8);

var meta = __webpack_require__(100).onFreeze;

__webpack_require__(156)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(2);

$export($export.S, 'Object', {
  setPrototypeOf: __webpack_require__(104).set
});

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(2);

var $values = __webpack_require__(154)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(20);

var global = __webpack_require__(3);

var ctx = __webpack_require__(21);

var classof = __webpack_require__(53);

var $export = __webpack_require__(2);

var isObject = __webpack_require__(8);

var aFunction = __webpack_require__(22);

var anInstance = __webpack_require__(98);

var forOf = __webpack_require__(99);

var speciesConstructor = __webpack_require__(177);

var task = __webpack_require__(178).set;

var microtask = __webpack_require__(179)();

var newPromiseCapabilityModule = __webpack_require__(180);

var perform = __webpack_require__(181);

var userAgent = __webpack_require__(182);

var promiseResolve = __webpack_require__(183);

var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';

var empty = function empty() {
  /* empty */
};

var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;
var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);

    var FakePromise = (promise.constructor = {})[__webpack_require__(30)('species')] = function (exec) {
      exec(empty, empty);
    }; // unhandled rejections tracking support, NodeJS Promise without it fails @@species test


    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    && v8.indexOf('6.6') !== 0 && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) {
    /* empty */
  }
}(); // helpers

var isThenable = function isThenable(it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function notify(promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;

    var run = function run(reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;

      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }

          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value); // may throw

            if (domain) {
              domain.exit();
              exited = true;
            }
          }

          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };

    while (chain.length > i) {
      run(chain[i++]);
    } // variable length - can't use forEach


    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};

var onUnhandled = function onUnhandled(promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;

    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({
            promise: promise,
            reason: value
          });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    }

    promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};

var isUnhandled = function isUnhandled(promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};

var onHandleUnhandled = function onHandleUnhandled(promise) {
  task.call(global, function () {
    var handler;

    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({
        promise: promise,
        reason: promise._v
      });
    }
  });
};

var $reject = function $reject(value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap

  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};

var $resolve = function $resolve(value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap

  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");

    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = {
          _w: promise,
          _d: false
        }; // wrap

        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({
      _w: promise,
      _d: false
    }, e); // wrap
  }
}; // constructor polyfill


if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);

    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  }; // eslint-disable-next-line no-unused-vars


  Internal = function Promise(executor) {
    this._c = []; // <- awaiting reactions

    this._a = undefined; // <- checked in isUnhandled reactions

    this._s = 0; // <- state

    this._d = false; // <- done

    this._v = undefined; // <- value

    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled

    this._n = false; // <- notify
  };

  Internal.prototype = __webpack_require__(97)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;

      this._c.push(reaction);

      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  OwnPromiseCapability = function OwnPromiseCapability() {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {
  Promise: $Promise
});

__webpack_require__(71)($Promise, PROMISE);

__webpack_require__(82)(PROMISE);

Wrapper = __webpack_require__(4)[PROMISE]; // statics

$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(54)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(7);

var aFunction = __webpack_require__(22);

var SPECIES = __webpack_require__(30)('species');

module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(21);

var invoke = __webpack_require__(92);

var html = __webpack_require__(70);

var cel = __webpack_require__(12);

var global = __webpack_require__(3);

var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function run() {
  var id = +this; // eslint-disable-next-line no-prototype-builtins

  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var listener = function listener(event) {
  run.call(event.data);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;

    while (arguments.length > i) {
      args.push(arguments[i++]);
    }

    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };

    defer(counter);
    return counter;
  };

  clearTask = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (__webpack_require__(34)(process) == 'process') {
    defer = function defer(id) {
      process.nextTick(ctx(run, id, 1));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function defer(id) {
      Dispatch.now(ctx(run, id, 1));
    }; // Browsers with MessageChannel, includes WebWorkers

  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function defer(id) {
      global.postMessage(id + '', '*');
    };

    global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function defer(id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    }; // Rest old browsers

  } else {
    defer = function defer(id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}

module.exports = {
  set: setTask,
  clear: clearTask
};

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);

var macrotask = __webpack_require__(178).set;

var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(34)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function flush() {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();

    while (head) {
      fn = head.fn;
      head = head.next;

      try {
        fn();
      } catch (e) {
        if (head) notify();else last = undefined;
        throw e;
      }
    }

    last = undefined;
    if (parent) parent.enter();
  }; // Node.js


  if (isNode) {
    notify = function notify() {
      process.nextTick(flush);
    }; // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339

  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, {
      characterData: true
    }); // eslint-disable-line no-new

    notify = function notify() {
      node.data = toggle = !toggle;
    }; // environments with maybe non-completely correct, but existent Promise

  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);

    notify = function notify() {
      promise.then(flush);
    }; // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout

  } else {
    notify = function notify() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = {
      fn: fn,
      next: undefined
    };
    if (last) last.next = task;

    if (!head) {
      head = task;
      notify();
    }

    last = task;
  };
};

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 25.4.1.5 NewPromiseCapability(C)

var aFunction = __webpack_require__(22);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

/***/ }),
/* 181 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return {
      e: false,
      v: exec()
    };
  } catch (e) {
    return {
      e: true,
      v: e
    };
  }
};

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);

var navigator = global.navigator;
module.exports = navigator && navigator.userAgent || '';

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);

var isObject = __webpack_require__(8);

var newPromiseCapability = __webpack_require__(180);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally


var $export = __webpack_require__(2);

var core = __webpack_require__(4);

var global = __webpack_require__(3);

var speciesConstructor = __webpack_require__(177);

var promiseResolve = __webpack_require__(183);

$export($export.P + $export.R, 'Promise', {
  'finally': function _finally(onFinally) {
    var C = speciesConstructor(this, core.Promise || global.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () {
        return x;
      });
    } : onFinally, isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () {
        throw e;
      });
    } : onFinally);
  }
});

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(2);

var aFunction = __webpack_require__(22);

var anObject = __webpack_require__(7);

var rApply = (__webpack_require__(3).Reflect || {}).apply;
var fApply = Function.apply; // MS Edge argumentsList argument is optional

$export($export.S + $export.F * !__webpack_require__(11)(function () {
  rApply(function () {
    /* empty */
  });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(2);

var create = __webpack_require__(64);

var aFunction = __webpack_require__(22);

var anObject = __webpack_require__(7);

var isObject = __webpack_require__(8);

var fails = __webpack_require__(11);

var bind = __webpack_require__(91);

var rConstruct = (__webpack_require__(3).Reflect || {}).construct; // MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it

var NEW_TARGET_BUG = fails(function () {
  function F() {
    /* empty */
  }

  return !(rConstruct(function () {
    /* empty */
  }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () {
    /* empty */
  });
});
$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args
  /* , newTarget */
  ) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);

    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0:
          return new Target();

        case 1:
          return new Target(args[0]);

        case 2:
          return new Target(args[0], args[1]);

        case 3:
          return new Target(args[0], args[1], args[2]);

        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      } // w/o altered newTarget, lot of arguments case


      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    } // with altered newTarget, not support built-in constructors


    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(6);

var $export = __webpack_require__(2);

var anObject = __webpack_require__(7);

var toPrimitive = __webpack_require__(13); // MS Edge has broken Reflect.defineProperty - throwing instead of returning false


$export($export.S + $export.F * __webpack_require__(11)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, {
    value: 1
  }), 1, {
    value: 2
  });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);

    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(2);

var gOPD = __webpack_require__(105).f;

var anObject = __webpack_require__(7);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(105);

var getPrototypeOf = __webpack_require__(72);

var has = __webpack_require__(16);

var $export = __webpack_require__(2);

var isObject = __webpack_require__(8);

var anObject = __webpack_require__(7);

function get(target, propertyKey
/* , receiver */
) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {
  get: get
});

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(105);

var $export = __webpack_require__(2);

var anObject = __webpack_require__(7);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(2);

var getProto = __webpack_require__(72);

var anObject = __webpack_require__(7);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(2);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(2);

var anObject = __webpack_require__(7);

var $isExtensible = Object.isExtensible;
$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(2);

$export($export.S, 'Reflect', {
  ownKeys: __webpack_require__(159)
});

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(2);

var anObject = __webpack_require__(7);

var $preventExtensions = Object.preventExtensions;
$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);

    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(6);

var gOPD = __webpack_require__(105);

var getPrototypeOf = __webpack_require__(72);

var has = __webpack_require__(16);

var $export = __webpack_require__(2);

var createDesc = __webpack_require__(14);

var anObject = __webpack_require__(7);

var isObject = __webpack_require__(8);

function set(target, propertyKey, V
/* , receiver */
) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;

  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }

    ownDesc = createDesc(0);
  }

  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;

    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));

    return true;
  }

  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {
  set: set
});

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(2);

var setProto = __webpack_require__(104);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);

    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);

var inheritIfRequired = __webpack_require__(103);

var dP = __webpack_require__(6).f;

var gOPN = __webpack_require__(129).f;

var isRegExp = __webpack_require__(199);

var $flags = __webpack_require__(200);

var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g; // "new" creates a new object, old webkit buggy here

var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(10) && (!CORRECT_NEW || __webpack_require__(11)(function () {
  re2[__webpack_require__(30)('match')] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
  };

  var proxy = function proxy(key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function get() {
        return Base[key];
      },
      set: function set(it) {
        Base[key] = it;
      }
    });
  };

  for (var keys = gOPN(Base), i = 0; keys.length > i;) {
    proxy(keys[i++]);
  }

  proto.constructor = $RegExp;
  $RegExp.prototype = proto;

  __webpack_require__(15)(global, 'RegExp', $RegExp);
}

__webpack_require__(82)('RegExp');

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(8);

var cof = __webpack_require__(34);

var MATCH = __webpack_require__(30)('match');

module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 21.2.5.3 get RegExp.prototype.flags

var anObject = __webpack_require__(7);

module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(10) && /./g.flags != 'g') __webpack_require__(6).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(200)
});

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(7);

var toLength = __webpack_require__(28);

var advanceStringIndex = __webpack_require__(203);

var regExpExec = __webpack_require__(205); // @@match logic


__webpack_require__(206)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [// `String.prototype.match` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.match
  function match(regexp) {
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, // `RegExp.prototype[@@match]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
  function (regexp) {
    var res = maybeCallNative($match, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    if (!rx.global) return regExpExec(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;

    while ((result = regExpExec(rx, S)) !== null) {
      var matchStr = String(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      n++;
    }

    return n === 0 ? null : A;
  }];
});

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var at = __webpack_require__(204)(true); // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex


module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(27);

var defined = __webpack_require__(25); // true  -> String#at
// false -> String#codePointAt


module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var classof = __webpack_require__(53);

var builtinExec = RegExp.prototype.exec; // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec

module.exports = function (R, S) {
  var exec = R.exec;

  if (typeof exec === 'function') {
    var result = exec.call(R, S);

    if (_typeof(result) !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }

    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }

  return builtinExec.call(R, S);
};

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(207);

var redefine = __webpack_require__(15);

var hide = __webpack_require__(5);

var fails = __webpack_require__(11);

var defined = __webpack_require__(25);

var wks = __webpack_require__(30);

var regexpExec = __webpack_require__(208);

var SPECIES = wks('species');
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;

  re.exec = function () {
    var result = [];
    result.groups = {
      a: '7'
    };
    return result;
  };

  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;

  re.exec = function () {
    return originalExec.apply(this, arguments);
  };

  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
}();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};

    O[SYMBOL] = function () {
      return 7;
    };

    return ''[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    re.exec = function () {
      execCalled = true;
      return null;
    };

    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};

      re.constructor[SPECIES] = function () {
        return re;
      };
    }

    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(defined, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return {
            done: true,
            value: nativeRegExpMethod.call(regexp, str, arg2)
          };
        }

        return {
          done: true,
          value: nativeMethod.call(str, regexp, arg2)
        };
      }

      return {
        done: false
      };
    });
    var strfn = fns[0];
    var rxfn = fns[1];
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return rxfn.call(string, this, arg);
    } // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return rxfn.call(string, this);
    });
  }
};

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpExec = __webpack_require__(208);

__webpack_require__(2)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(200);

var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.

var nativeReplace = String.prototype.replace;
var patchedExec = nativeExec;
var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
}(); // nonparticipating capturing group, copied from es5-shim's String#split patch.


var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }

    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];
    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(7);

var toObject = __webpack_require__(24);

var toLength = __webpack_require__(28);

var toInteger = __webpack_require__(27);

var advanceStringIndex = __webpack_require__(203);

var regExpExec = __webpack_require__(205);

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function maybeToString(it) {
  return it === undefined ? it : String(it);
}; // @@replace logic


__webpack_require__(206)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [// `String.prototype.replace` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
  function replace(searchValue, replaceValue) {
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
  }, // `RegExp.prototype[@@replace]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
  function (regexp, replaceValue) {
    var res = maybeCallNative($replace, regexp, this, replaceValue);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var functionalReplace = typeof replaceValue === 'function';
    if (!functionalReplace) replaceValue = String(replaceValue);
    var global = rx.global;

    if (global) {
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
    }

    var results = [];

    while (true) {
      var result = regExpExec(rx, S);
      if (result === null) break;
      results.push(result);
      if (!global) break;
      var matchStr = String(result[0]);
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
    }

    var accumulatedResult = '';
    var nextSourcePosition = 0;

    for (var i = 0; i < results.length; i++) {
      result = results[i];
      var matched = String(result[0]);
      var position = max(min(toInteger(result.index), S.length), 0);
      var captures = []; // NOTE: This is equivalent to
      //   captures = result.slice(1).map(maybeToString)
      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

      for (var j = 1; j < result.length; j++) {
        captures.push(maybeToString(result[j]));
      }

      var namedCaptures = result.groups;

      if (functionalReplace) {
        var replacerArgs = [matched].concat(captures, position, S);
        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
        var replacement = String(replaceValue.apply(undefined, replacerArgs));
      } else {
        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
      }

      if (position >= nextSourcePosition) {
        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }

    return accumulatedResult + S.slice(nextSourcePosition);
  }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }

    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;

      switch (ch.charAt(0)) {
        case '$':
          return '$';

        case '&':
          return matched;

        case '`':
          return str.slice(0, position);

        case "'":
          return str.slice(tailPos);

        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;

        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;

          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }

          capture = captures[n - 1];
      }

      return capture === undefined ? '' : capture;
    });
  }
});

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(199);

var anObject = __webpack_require__(7);

var speciesConstructor = __webpack_require__(177);

var advanceStringIndex = __webpack_require__(203);

var toLength = __webpack_require__(28);

var callRegExpExec = __webpack_require__(205);

var regexpExec = __webpack_require__(208);

var fails = __webpack_require__(11);

var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

var SUPPORTS_Y = !fails(function () {
  RegExp(MAX_UINT32, 'y');
}); // @@split logic

__webpack_require__(206)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;

  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function internalSplit(separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return []; // If `separator` is not a regex, use native split

      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0; // Make `global` and avoid `lastIndex` issues by working with a copy

      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;

      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];

        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }

        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }

      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));

      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    }; // Chakra, V8

  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function internalSplit(separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [// `String.prototype.split` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.split
  function split(separator, limit) {
    var O = defined(this);
    var splitter = separator == undefined ? undefined : separator[SPLIT];
    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
  }, // `RegExp.prototype[@@split]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
  //
  // NOTE: This cannot be properly polyfilled in engines that don't support
  // the 'y' flag.
  function (regexp, limit) {
    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var C = speciesConstructor(rx, RegExp);
    var unicodeMatching = rx.unicode;
    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
    // simulate the 'y' flag.

    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
    if (lim === 0) return [];
    if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
    var p = 0;
    var q = 0;
    var A = [];

    while (q < S.length) {
      splitter.lastIndex = SUPPORTS_Y ? q : 0;
      var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
      var e;

      if (z === null || (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
        q = advanceStringIndex(S, q, unicodeMatching);
      } else {
        A.push(S.slice(p, q));
        if (A.length === lim) return A;

        for (var i = 1; i <= z.length - 1; i++) {
          A.push(z[i]);
          if (A.length === lim) return A;
        }

        q = p = e;
      }
    }

    A.push(S.slice(p));
    return A;
  }];
});

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(7);

var sameValue = __webpack_require__(168);

var regExpExec = __webpack_require__(205); // @@search logic


__webpack_require__(206)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [// `String.prototype.search` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.search
  function search(regexp) {
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, // `RegExp.prototype[@@search]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
  function (regexp) {
    var res = maybeCallNative($search, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var previousLastIndex = rx.lastIndex;
    if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
    var result = regExpExec(rx, S);
    if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
    return result === null ? -1 : result.index;
  }];
});

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(201);

var anObject = __webpack_require__(7);

var $flags = __webpack_require__(200);

var DESCRIPTORS = __webpack_require__(10);

var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function define(fn) {
  __webpack_require__(15)(RegExp.prototype, TO_STRING, fn, true);
}; // 21.2.5.14 RegExp.prototype.toString()


if (__webpack_require__(11)(function () {
  return $toString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
})) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  }); // FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strong = __webpack_require__(96);

var validate = __webpack_require__(101);

var SET = 'Set'; // 23.2 Set Objects

module.exports = __webpack_require__(102)(SET, function (get) {
  return function Set() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // ECMAScript 6 symbols shim

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var global = __webpack_require__(3);

var has = __webpack_require__(16);

var DESCRIPTORS = __webpack_require__(10);

var $export = __webpack_require__(2);

var redefine = __webpack_require__(15);

var META = __webpack_require__(100).KEY;

var $fails = __webpack_require__(11);

var shared = __webpack_require__(19);

var setToStringTag = __webpack_require__(71);

var uid = __webpack_require__(17);

var wks = __webpack_require__(30);

var wksExt = __webpack_require__(215);

var wksDefine = __webpack_require__(216);

var enumKeys = __webpack_require__(217);

var isArray = __webpack_require__(37);

var anObject = __webpack_require__(7);

var isObject = __webpack_require__(8);

var toObject = __webpack_require__(24);

var toIObject = __webpack_require__(57);

var toPrimitive = __webpack_require__(13);

var createDesc = __webpack_require__(14);

var _create = __webpack_require__(64);

var gOPNExt = __webpack_require__(161);

var $GOPD = __webpack_require__(105);

var $GOPS = __webpack_require__(146);

var $DP = __webpack_require__(6);

var $keys = __webpack_require__(66);

var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;

var _stringify = $JSON && $JSON.stringify;

var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function get() {
      return dP(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function wrap(tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);

  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
  return _typeof(it) == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);

  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, {
        enumerable: createDesc(0, false)
      });
    }

    return setSymbolDesc(it, key, D);
  }

  return dP(it, key, D);
};

var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;

  while (l > i) {
    $defineProperty(it, key = keys[i++], P[key]);
  }

  return it;
};

var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};

var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};

var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;

  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  }

  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;

  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  }

  return result;
}; // 19.4.1.1 Symbol([description])


if (!USE_NATIVE) {
  $Symbol = function _Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);

    var $set = function $set(value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };

    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: $set
    });
    return wrap(tag);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });
  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(129).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(106).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(20)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {
  Symbol: $Symbol
});

for (var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
  wks(es6Symbols[j++]);
}

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) {
  wksDefine(wellKnownSymbols[k++]);
}

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function _for(key) {
    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');

    for (var key in SymbolRegistry) {
      if (SymbolRegistry[key] === sym) return key;
    }
  },
  useSetter: function useSetter() {
    setter = true;
  },
  useSimple: function useSimple() {
    setter = false;
  }
});
$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

var FAILS_ON_PRIMITIVES = $fails(function () {
  $GOPS.f(1);
});
$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
}); // 24.3.2 JSON.stringify(value [, replacer [, space]])

$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol(); // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols

  return _stringify([S]) != '[null]' || _stringify({
    a: S
  }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;

    while (arguments.length > i) {
      args.push(arguments[i++]);
    }

    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

    if (!isArray(replacer)) replacer = function replacer(key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
}); // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)

$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(5)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf); // 19.4.3.5 Symbol.prototype[@@toStringTag]

setToStringTag($Symbol, 'Symbol'); // 20.2.1.9 Math[@@toStringTag]

setToStringTag(Math, 'Math', true); // 24.3.3 JSON[@@toStringTag]

setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(30);

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);

var core = __webpack_require__(4);

var LIBRARY = __webpack_require__(20);

var wksExt = __webpack_require__(215);

var defineProperty = __webpack_require__(6).f;

module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, {
    value: wksExt.f(name)
  });
};

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(66);

var gOPS = __webpack_require__(146);

var pIE = __webpack_require__(106);

module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;

  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;

    while (symbols.length > i) {
      if (isEnum.call(it, key = symbols[i++])) result.push(key);
    }
  }

  return result;
};

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(216)('asyncIterator');

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.2 String.prototype.anchor(name)

__webpack_require__(220)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);

var fails = __webpack_require__(11);

var defined = __webpack_require__(25);

var quot = /"/g; // B.2.3.2.1 CreateHTML(string, tag, attribute, value)

var createHTML = function createHTML(string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};

module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.3 String.prototype.big()

__webpack_require__(220)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.4 String.prototype.blink()

__webpack_require__(220)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.5 String.prototype.bold()

__webpack_require__(220)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var $at = __webpack_require__(204)(false);

$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])


var $export = __webpack_require__(2);

var toLength = __webpack_require__(28);

var context = __webpack_require__(226);

var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];
$export($export.P + $export.F * __webpack_require__(227)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString
  /* , endPosition = @length */
  ) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(199);

var defined = __webpack_require__(25);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(30)('match');

module.exports = function (KEY) {
  var re = /./;

  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) {
      /* empty */
    }
  }

  return true;
};

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.6 String.prototype.fixed()

__webpack_require__(220)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.7 String.prototype.fontcolor(color)

__webpack_require__(220)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.8 String.prototype.fontsize(size)

__webpack_require__(220)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);

var toAbsoluteIndex = __webpack_require__(26);

var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint; // length should be 1, old FF problem

$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) {
    // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;

    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
    }

    return res.join('');
  }
});

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)


var $export = __webpack_require__(2);

var context = __webpack_require__(226);

var INCLUDES = 'includes';
$export($export.P + $export.F * __webpack_require__(227)(INCLUDES), 'String', {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.9 String.prototype.italics()

__webpack_require__(220)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $at = __webpack_require__(204)(true); // 21.1.3.27 String.prototype[@@iterator]()


__webpack_require__(62)(String, 'String', function (iterated) {
  this._t = String(iterated); // target

  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return {
    value: undefined,
    done: true
  };
  point = $at(O, index);
  this._i += point.length;
  return {
    value: point,
    done: false
  };
});

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.10 String.prototype.link(url)

__webpack_require__(220)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // https://github.com/tc39/proposal-string-pad-start-end

var $export = __webpack_require__(2);

var $pad = __webpack_require__(237);

var userAgent = __webpack_require__(182); // https://github.com/zloirock/core-js/issues/280


var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);
$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength
  /* , fillString = ' ' */
  ) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(28);

var repeat = __webpack_require__(238);

var defined = __webpack_require__(25);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(27);

var defined = __webpack_require__(25);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");

  for (; n > 0; (n >>>= 1) && (str += str)) {
    if (n & 1) res += str;
  }

  return res;
};

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // https://github.com/tc39/proposal-string-pad-start-end

var $export = __webpack_require__(2);

var $pad = __webpack_require__(237);

var userAgent = __webpack_require__(182); // https://github.com/zloirock/core-js/issues/280


var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);
$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength
  /* , fillString = ' ' */
  ) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);

var toIObject = __webpack_require__(57);

var toLength = __webpack_require__(28);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;

    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    }

    return res.join('');
  }
});

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(238)
});

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.11 String.prototype.small()

__webpack_require__(220)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])


var $export = __webpack_require__(2);

var toLength = __webpack_require__(28);

var context = __webpack_require__(226);

var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];
$export($export.P + $export.F * __webpack_require__(227)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString
  /* , position = 0 */
  ) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.12 String.prototype.strike()

__webpack_require__(220)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.13 String.prototype.sub()

__webpack_require__(220)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.14 String.prototype.sup()

__webpack_require__(220)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 21.1.3.25 String.prototype.trim()

__webpack_require__(130)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // https://github.com/sebmarkbage/ecmascript-string-left-right-trim

__webpack_require__(130)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // https://github.com/sebmarkbage/ecmascript-string-left-right-trim

__webpack_require__(130)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(2);

var $typed = __webpack_require__(251);

var buffer = __webpack_require__(252);

var anObject = __webpack_require__(7);

var toAbsoluteIndex = __webpack_require__(26);

var toLength = __webpack_require__(28);

var isObject = __webpack_require__(8);

var ArrayBuffer = __webpack_require__(3).ArrayBuffer;

var speciesConstructor = __webpack_require__(177);

var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';
$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {
  ArrayBuffer: $ArrayBuffer
});
$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});
$export($export.P + $export.U + $export.F * __webpack_require__(11)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix

    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;

    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    }

    return result;
  }
});

__webpack_require__(82)(ARRAY_BUFFER);

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);

var hide = __webpack_require__(5);

var uid = __webpack_require__(17);

var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;
var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(3);

var DESCRIPTORS = __webpack_require__(10);

var LIBRARY = __webpack_require__(20);

var $typed = __webpack_require__(251);

var hide = __webpack_require__(5);

var redefineAll = __webpack_require__(97);

var fails = __webpack_require__(11);

var anInstance = __webpack_require__(98);

var toInteger = __webpack_require__(27);

var toLength = __webpack_require__(28);

var toIndex = __webpack_require__(253);

var gOPN = __webpack_require__(129).f;

var dP = __webpack_require__(6).f;

var arrayFill = __webpack_require__(40);

var setToStringTag = __webpack_require__(71);

var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError; // eslint-disable-next-line no-shadow-restricted-names

var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET; // IEEE754 conversions based on https://github.com/feross/ieee754

function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value); // eslint-disable-next-line no-self-compare

  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);

    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {
    ;
  }

  e = e << mLen | m;
  eLen += mLen;

  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {
    ;
  }

  buffer[--i] |= s * 128;
  return buffer;
}

function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;

  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {
    ;
  }

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {
    ;
  }

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}

function packI8(it) {
  return [it & 0xff];
}

function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}

function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}

function packF64(it) {
  return packIEEE754(it, 52, 8);
}

function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, {
    get: function get() {
      return this[internal];
    }
  });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}

function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);

  for (var i = 0; i < bytes; i++) {
    store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
  }
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset
    /* , littleEndian */
    ) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset
    /* , littleEndian */
    ) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset
    /* , littleEndian */
    ) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset
    /* , littleEndian */
    ) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset
    /* , littleEndian */
    ) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset
    /* , littleEndian */
    ) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new

    new $ArrayBuffer(1.5); // eslint-disable-line no-new

    new $ArrayBuffer(NaN); // eslint-disable-line no-new

    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };

    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];

    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }

    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  } // iOS Safari 7.x bug


  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(27);

var toLength = __webpack_require__(28);

module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);

$export($export.G + $export.W + $export.F * !__webpack_require__(251).ABV, {
  DataView: __webpack_require__(252).DataView
});

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(256)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if (__webpack_require__(10)) {
  var LIBRARY = __webpack_require__(20);

  var global = __webpack_require__(3);

  var fails = __webpack_require__(11);

  var $export = __webpack_require__(2);

  var $typed = __webpack_require__(251);

  var $buffer = __webpack_require__(252);

  var ctx = __webpack_require__(21);

  var anInstance = __webpack_require__(98);

  var propertyDesc = __webpack_require__(14);

  var hide = __webpack_require__(5);

  var redefineAll = __webpack_require__(97);

  var toInteger = __webpack_require__(27);

  var toLength = __webpack_require__(28);

  var toIndex = __webpack_require__(253);

  var toAbsoluteIndex = __webpack_require__(26);

  var toPrimitive = __webpack_require__(13);

  var has = __webpack_require__(16);

  var classof = __webpack_require__(53);

  var isObject = __webpack_require__(8);

  var toObject = __webpack_require__(24);

  var isArrayIter = __webpack_require__(49);

  var create = __webpack_require__(64);

  var getPrototypeOf = __webpack_require__(72);

  var gOPN = __webpack_require__(129).f;

  var getIterFn = __webpack_require__(52);

  var uid = __webpack_require__(17);

  var wks = __webpack_require__(30);

  var createArrayMethod = __webpack_require__(32);

  var createArrayIncludes = __webpack_require__(56);

  var speciesConstructor = __webpack_require__(177);

  var ArrayIterators = __webpack_require__(60);

  var Iterators = __webpack_require__(50);

  var $iterDetect = __webpack_require__(54);

  var setSpecies = __webpack_require__(82);

  var arrayFill = __webpack_require__(40);

  var arrayCopyWithin = __webpack_require__(23);

  var $DP = __webpack_require__(6);

  var $GOPD = __webpack_require__(105);

  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';
  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });
  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });
  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function toOffset(it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function validate(it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function allocate(C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    }

    return new C(length);
  };

  var speciesFromList = function speciesFromList(O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function fromList(C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);

    while (length > index) {
      result[index] = list[index++];
    }

    return result;
  };

  var addGetter = function addGetter(it, key, internal) {
    dP(it, key, {
      get: function get() {
        return this._d[internal];
      }
    });
  };

  var $from = function from(source
  /* , mapfn, thisArg */
  ) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;

    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      }

      O = values;
    }

    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);

    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }

    return result;
  };

  var $of = function of()
  /* ...items */
  {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);

    while (length > index) {
      result[index] = arguments[index++];
    }

    return result;
  }; // iOS Safari 6.x fails here


  var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
    arrayToLocaleString.call(new Uint8Array(1));
  });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start
    /* , end */
    ) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn
    /* , thisArg */
    ) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value
    /* , start, end */
    ) {
      // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn
    /* , thisArg */
    ) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate
    /* , thisArg */
    ) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate
    /* , thisArg */
    ) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn
    /* , thisArg */
    ) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement
    /* , fromIndex */
    ) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement
    /* , fromIndex */
    ) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) {
      // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement
    /* , fromIndex */
    ) {
      // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn
    /* , thisArg */
    ) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn
    /* , initialValue */
    ) {
      // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn
    /* , initialValue */
    ) {
      // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;

      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      }

      return that;
    },
    some: function some(callbackfn
    /* , thisArg */
    ) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin));
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike
  /* , offset */
  ) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);

    while (index < len) {
      this[offset + index] = src[index++];
    }
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function isTAIndex(target, key) {
    return isObject(target) && target[TYPED_ARRAY] && _typeof(key) != 'symbol' && key in target && String(+key) == String(key);
  };

  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
  };

  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set') // TODO: add validation descriptor w/o calling accessors
    && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
      target[key] = desc.value;
      return target;
    }

    return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () {
    arrayToString.call({});
  })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function constructor() {
      /* noop */
    },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function get() {
      return this[TYPED_ARRAY];
    }
  }); // eslint-disable-next-line max-statements

  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];

    var getter = function getter(that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };

    var setter = function setter(that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };

    var addElement = function addElement(that, index) {
      dP(that, index, {
        get: function get() {
          return getter(this, index);
        },
        set: function set(value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;

        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;

          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }

          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }

        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });

        while (index < length) {
          addElement(that, index++);
        }
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new

      new TypedArray(null); // eslint-disable-line no-new

      new TypedArray(1.5); // eslint-disable-line no-new

      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass; // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645

        if (!isObject(data)) return new Base(toIndex(data));

        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
        }

        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }

    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function get() {
          return NAME;
        }
      });
    }

    O[NAME] = TypedArray;
    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });
    $export($export.S + $export.F * fails(function () {
      Base.of.call(TypedArray, 1);
    }), NAME, {
      from: $from,
      of: $of
    });
    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
    $export($export.P, NAME, proto);
    setSpecies(NAME);
    $export($export.P + $export.F * FORCED_SET, NAME, {
      set: $set
    });
    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;
    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, {
      slice: $slice
    });
    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {
      toLocaleString: $toLocaleString
    });
    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () {
  /* empty */
};

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(256)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(256)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(256)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(256)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(256)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(256)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(256)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(256)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(3);

var each = __webpack_require__(32)(0);

var redefine = __webpack_require__(15);

var meta = __webpack_require__(100);

var assign = __webpack_require__(145);

var weak = __webpack_require__(266);

var isObject = __webpack_require__(8);

var validate = __webpack_require__(101);

var NATIVE_WEAK_MAP = __webpack_require__(101);

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function wrapper(get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
}; // 23.3 WeakMap Objects

var $WeakMap = module.exports = __webpack_require__(102)(WEAK_MAP, wrapper, methods, weak, true, true); // IE11 WeakMap frozen keys fix


if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();

        var result = this._f[key](a, b);

        return key == 'set' ? this : result; // store all the rest on native weakmap
      }

      return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefineAll = __webpack_require__(97);

var getWeak = __webpack_require__(100).getWeak;

var anObject = __webpack_require__(7);

var isObject = __webpack_require__(8);

var anInstance = __webpack_require__(98);

var forOf = __webpack_require__(99);

var createArrayMethod = __webpack_require__(32);

var $has = __webpack_require__(16);

var validate = __webpack_require__(101);

var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0; // fallback for uncaught frozen keys

var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function UncaughtFrozenStore() {
  this.a = [];
};

var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function get(key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function has(key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function set(key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;else this.a.push([key, value]);
  },
  'delete': function _delete(key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};
module.exports = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type

      that._i = id++; // collection id

      that._l = undefined; // leak store for uncaught frozen objects

      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function _delete(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var weak = __webpack_require__(266);

var validate = __webpack_require__(101);

var WEAK_SET = 'WeakSet'; // 23.4 WeakSet Objects

__webpack_require__(102)(WEAK_SET, function (get) {
  return function WeakSet() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(3);

var $export = __webpack_require__(2);

var userAgent = __webpack_require__(182);

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function wrap(set) {
  return function (fn, time
  /* , ...args */
  ) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};

$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);

var $task = __webpack_require__(178);

$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(60);

var getKeys = __webpack_require__(66);

var redefine = __webpack_require__(15);

var global = __webpack_require__(3);

var hide = __webpack_require__(5);

var Iterators = __webpack_require__(50);

var wks = __webpack_require__(30);

var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;
var DOMIterables = {
  CSSRuleList: true,
  // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true,
  // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true,
  // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;

  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) {
      if (!proto[key]) redefine(proto, key, $iterators[key], true);
    }
  }
}

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;

      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? undefined : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(272)(module)))

/***/ }),
/* 272 */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 273 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return picoAudioConstructor; });
function picoAudioConstructor(_audioContext, _picoAudio) {
  this.debug = false;
  this.isStarted = false;
  this.isPlayed = false;
  this.isTonyu2 = false;
  this.settings = {
    masterVolume: 1,
    generateVolume: 0.15,
    tempo: 120,
    basePitch: 440,
    resolution: 480,
    isWebMIDI: false,
    WebMIDIPortOutputs: null,
    WebMIDIPortOutput: null,
    WebMIDIPort: -1,
    // -1:auto
    WebMIDIPortSysEx: true,
    // MIDIデバイスのフルコントロールをするかどうか（SysExを使うかどうか）(httpsじゃないと使えない)
    isReverb: true,
    // リバーブONにするか
    reverbVolume: 1.5,
    isChorus: true,
    chorusVolume: 0.5,
    isCC111: true,
    loop: false,
    isSkipBeginning: this.isTonyu2,
    // 冒頭の余白をスキップ(Tonyu2はtrue)
    isSkipEnding: true,
    // 末尾の空白をスキップ
    holdOnValue: 64,
    maxPoly: -1,
    // 同時発音数 -1:infinity
    maxPercPoly: -1,
    // 同時発音数(パーカッション) -1:infinity
    isOfflineRendering: false,
    // TODO 演奏データを作成してから演奏する
    isSameDrumSoundOverlap: false // 同じドラムの音が重なることを許容するか

  };
  this.events = [];
  this.trigger = {
    isNoteTrigger: true,
    play: function play() {},
    stop: function stop() {},
    noteOn: function noteOn() {},
    noteOff: function noteOff() {},
    songEnd: function songEnd() {}
  };
  this.states = {
    isPlaying: false,
    startTime: 0,
    stopTime: 0,
    stopFuncs: [],
    webMIDIWaitState: null,
    webMIDIStopTime: 0,
    playIndices: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    updateBufTime: 100,
    updateBufMaxTime: 350,
    updateIntervalTime: 0,
    latencyLimitTime: 0
  };
  this.hashedDataList = [];
  this.hashedMessageList = [];
  this.playData = null;
  this.channels = [];
  this.tempoTrack = [{
    timing: 0,
    value: 120
  }, {
    timing: 0,
    value: 120
  }];
  this.cc111Time = -1;
  this.onSongEndListener = null; // チャンネルの設定値（音色, 減衰, 音量） //

  for (var i = 0; i < 17; i++) {
    this.channels.push([0, 0, 1]);
  } // AudioContextがある場合はそのまま初期化、なければAudioContextを用いる初期化をinit()で


  if (_audioContext) {
    this.init(_audioContext, _picoAudio);
  } // Fallback
  // Unsupport performance.now()


  if (typeof performance === "undefined") {
    window.performance = {};
  }

  if (!performance.now) {
    performance.now = function () {
      return Date.now();
    };
  } // Unsupport Number.MAX_SAFE_INTEGER


  if (!Number.MAX_SAFE_INTEGER) {
    Number.MAX_SAFE_INTEGER = 9007199254740991;
  }
}

/***/ }),
/* 274 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return init; });
/* harmony import */ var _util_random_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(275);
/* harmony import */ var _util_interpolation_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(276);
/* harmony import */ var _util_load_soundfont__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(277);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




function init(_x, _x2) {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_audioContext, _picoAudio) {
    var AudioContext, sampleRate, sampleRateVT, seLength, sampleLength, sampleLengthVT, vtBufs, ch, vtBuf, i, r, _seLength, _sampleLength, _sampleLengthVT, _vtBufs, _ch, _vtBuf, _i, v, s, d, sf;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.isStarted) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            this.isStarted = true; // AudioContextを生成 //

            AudioContext = window.AudioContext || window.webkitAudioContext;
            this.context = _audioContext ? _audioContext : new AudioContext(); // マスターボリューム //
            // リアルタイムで音量変更するためにdestination前にgainNodeを一つ噛ませる

            this.masterGainNode = this.context.createGain();
            this.masterGainNode.gain.value = this.settings.masterVolume; // 仮想サンプルレート //

            sampleRate = this.context.sampleRate;
            sampleRateVT = sampleRate >= 48000 ? 48000 : sampleRate; // ホワイトノイズ //

            if (_picoAudio && _picoAudio.whitenoise) {
              // 使いまわし
              this.whitenoise = _picoAudio.whitenoise;
            } else {
              _util_random_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].resetSeed(); // 乱数パターンを固定にする（Math.random()を使わない）
              // 再生環境のサンプルレートによって音が変わってしまうので //
              // 一旦仮想サンプルレートで音源を作成する //

              seLength = 1;
              sampleLength = sampleRate * seLength;
              sampleLengthVT = sampleRateVT * seLength;
              vtBufs = [];

              for (ch = 0; ch < 2; ch++) {
                vtBufs.push(new Float32Array(sampleLengthVT));
                vtBuf = vtBufs[ch];

                for (i = 0; i < sampleLengthVT; i++) {
                  r = _util_random_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].random();
                  vtBuf[i] = r * 2 - 1;
                }
              } // 仮想サンプルレート音源を本番音源に変換する //


              this.whitenoise = this.context.createBuffer(2, sampleLength, sampleRate);
              _util_interpolation_util_js__WEBPACK_IMPORTED_MODULE_1__["default"].lerpWave(this.whitenoise, vtBufs);
            } // リバーブ用のインパルス応答音声データ作成（てきとう） //


            if (_picoAudio && _picoAudio.impulseResponse) {
              // 使いまわし
              this.impulseResponse = _picoAudio.impulseResponse;
            } else {
              _util_random_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].resetSeed(); // 乱数パターンを固定にする（Math.random()を使わない）
              // 再生環境のサンプルレートによって音が変わってしまうので //
              // 一旦仮想サンプルレートで音源を作成する //

              _seLength = 3.5;
              _sampleLength = sampleRate * _seLength;
              _sampleLengthVT = sampleRateVT * _seLength;
              _vtBufs = [];

              for (_ch = 0; _ch < 2; _ch++) {
                _vtBufs.push(new Float32Array(_sampleLengthVT));

                _vtBuf = _vtBufs[_ch];

                for (_i = 0; _i < _sampleLengthVT; _i++) {
                  v = (_sampleLengthVT - _i) / _sampleLengthVT;
                  s = _i / sampleRateVT;
                  d = (s < 0.030 ? 0 : v) * (s >= 0.030 && s < 0.031 ? v * 2 : v) * (s >= 0.040 && s < 0.042 ? v * 1.5 : v) * (s >= 0.050 && s < 0.054 ? v * 1.25 : v) * _util_random_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].random() * 0.2 * Math.pow(v - 0.030, 4);
                  _vtBuf[_i] = d;
                }
              } // 仮想サンプルレート音源を本番音源に変換する //


              this.impulseResponse = this.context.createBuffer(2, _sampleLength, this.context.sampleRate);
              _util_interpolation_util_js__WEBPACK_IMPORTED_MODULE_1__["default"].lerpWave(this.impulseResponse, _vtBufs);
            } // リバーブ用のAudioNode作成・接続 //


            this.convolver = this.context.createConvolver();
            this.convolver.buffer = this.impulseResponse;
            this.convolver.normalize = true;
            this.convolverGainNode = this.context.createGain();
            this.convolverGainNode.gain.value = this.settings.reverbVolume;
            this.convolver.connect(this.convolverGainNode);
            this.convolverGainNode.connect(this.masterGainNode);
            this.masterGainNode.connect(this.context.destination); // コーラス用のAudioNode作成・接続 //

            this.chorusDelayNode = this.context.createDelay();
            this.chorusGainNode = this.context.createGain();
            this.chorusOscillator = this.context.createOscillator();
            this.chorusLfoGainNode = this.context.createGain();
            this.chorusDelayNode.delayTime.value = 0.025;
            this.chorusLfoGainNode.gain.value = 0.010;
            this.chorusOscillator.frequency.value = 0.05;
            this.chorusGainNode.gain.value = this.settings.chorusVolume;
            this.chorusOscillator.connect(this.chorusLfoGainNode);
            this.chorusLfoGainNode.connect(this.chorusDelayNode.delayTime);
            this.chorusDelayNode.connect(this.chorusGainNode);
            this.chorusGainNode.connect(this.masterGainNode);
            this.masterGainNode.connect(this.context.destination);
            this.chorusOscillator.start(0); // リバーブON/OFF設定を引き継ぐ。未設定ならパフォーマンス計測する(Tonyu2用)

            if (this.isTonyu2) {
              if (_picoAudio) {
                this.settings.isReverb = _picoAudio.settings.isReverb;
              } else {
                this.settings.isReverb = this.measurePerformanceReverb();
              }
            } // SoundFontのBuffer化


            if (typeof window.MIDI === 'undefined') window.MIDI = {};
            if (typeof window.MIDI.Soundfont === 'undefined') window.MIDI.Soundfont = {};
            if (typeof window.MIDI.SoundfontBuffer === 'undefined') window.MIDI.SoundfontBuffer = {};
            _context.t0 = regeneratorRuntime.keys(window.MIDI.Soundfont);

          case 38:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 46;
              break;
            }

            sf = _context.t1.value;

            if (sf in window.MIDI.SoundfontBuffer) {
              _context.next = 44;
              break;
            }

            _context.next = 43;
            return Object(_util_load_soundfont__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context, window.MIDI.Soundfont[sf]);

          case 43:
            window.MIDI.SoundfontBuffer[sf] = _context.sent;

          case 44:
            _context.next = 38;
            break;

          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _init.apply(this, arguments);
}

/***/ }),
/* 275 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RandomUtil; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 固定パターンの乱数を提供するクラス
 */
var RandomUtil =
/*#__PURE__*/
function () {
  function RandomUtil() {
    _classCallCheck(this, RandomUtil);
  }

  _createClass(RandomUtil, null, [{
    key: "resetSeed",

    /**
     * 乱数のシード値をリセットする
     */
    value: function resetSeed() {
      this.init = true;
      this.x = 123456789;
      this.y = 362436069;
      this.z = 521288629;
      this.w = 8867512;
    }
    /**
     * 乱数を返す
     * 
     *     Math.random() と違い、毎回固定パターンで乱数が返される
     * Xorshiftアルゴリズム
     * @returns {number} 乱数
     */

  }, {
    key: "random",
    value: function random() {
      if (!this.init) this.resetSeed();
      var t = this.x ^ this.x << 11;
      this.x = this.y;
      this.y = this.z;
      this.z = this.w;
      var r = this.w = this.w ^ this.w >>> 19 ^ (t ^ t >>> 8);
      r = Math.abs(r) / 2147483648 % 2;
      return r;
    }
  }]);

  return RandomUtil;
}();



/***/ }),
/* 276 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InterpolationUtil; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 補間を提供するクラス
 */
var InterpolationUtil =
/*#__PURE__*/
function () {
  function InterpolationUtil() {
    _classCallCheck(this, InterpolationUtil);
  }

  _createClass(InterpolationUtil, null, [{
    key: "lerpWave",

    /**
     * 波形を線形補間する
     * @param {AudioBuffer} buffer 補間結果を入れるAudioBuffer
     * @param {Array} vtBufs 仮想音源の配列([Float32Array, Float32Array])
     */
    value: function lerpWave(buffer, vtBufs) {
      // 仮想サンプルレート音源を本番音源に変換する //
      var bufferSize = buffer.getChannelData(0).length;
      var vtBufsSize = vtBufs[0].length;

      if (bufferSize == vtBufsSize) {
        // 線形補間の必要なし //
        for (var ch = 0; ch < 2; ch++) {
          var data = buffer.getChannelData(ch);
          var vtBuf = vtBufs[ch];

          for (var i = 0; i < bufferSize; i++) {
            data[i] = vtBuf[i];
          }
        }
      } else {
        // 線形補間 //
        var ratio = vtBufsSize / bufferSize;

        for (var _ch = 0; _ch < 2; _ch++) {
          var _data = buffer.getChannelData(_ch);

          var _vtBuf = vtBufs[_ch];

          for (var _i = 0; _i < bufferSize; _i++) {
            // 線形補間しながら波形を作成 //
            // TODO 音がまだ少し違和感あるので、スプライン補正に変更した方がいいかも //
            var idxF = _i * ratio;
            var idx1 = Math.trunc(idxF);
            var idx2 = (idx1 + 1) % vtBufsSize;
            var idxR = idxF - idx1;
            var w = _vtBuf[idx1] * (1 - idxR) + _vtBuf[idx2] * idxR;
            _data[_i] = w;
          }
        }
      }
    }
  }]);

  return InterpolationUtil;
}();



/***/ }),
/* 277 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadSoundfont; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var NoteNumber = {
  C: 0,
  Db: 1,
  D: 2,
  Eb: 3,
  E: 4,
  F: 5,
  Gb: 6,
  G: 7,
  Ab: 8,
  A: 9,
  Bb: 10,
  B: 11
};

function parseNoteNameToNumber(noteName) {
  var name = noteName.match(/^([A-Gb]+)/)[1];
  var height = parseInt(noteName.match(/([0-9]+)$/)[1]);
  return 12 + height * 12 + NoteNumber[name];
}

function decodeAudioData(context, data) {
  return new Promise(function (res, rej) {
    context.decodeAudioData(data, function (buffer) {
      res(buffer);
    }, function (err) {
      rej(err);
    });
  });
}

function loadSoundfont(_x, _x2) {
  return _loadSoundfont.apply(this, arguments);
}

function _loadSoundfont() {
  _loadSoundfont = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(context, soundfont) {
    var soundfontBuffers, key, binary, len, bytes, i, buffer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(soundfont);
            soundfontBuffers = [];
            _context.t0 = regeneratorRuntime.keys(soundfont);

          case 3:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 15;
              break;
            }

            key = _context.t1.value;
            binary = atob(soundfont[key].split(',')[1]);
            len = binary.length;
            bytes = new Uint8Array(len);

            for (i = 0; i < len; i++) {
              bytes[i] = binary.charCodeAt(i);
            }

            _context.next = 11;
            return decodeAudioData(context, bytes.buffer);

          case 11:
            buffer = _context.sent;
            soundfontBuffers[parseNoteNameToNumber(key)] = buffer;
            _context.next = 3;
            break;

          case 15:
            ;
            return _context.abrupt("return", soundfontBuffers);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadSoundfont.apply(this, arguments);
}

/***/ }),
/* 278 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setData; });
function setData(data) {
  if (this.debug) {
    var syoriTimeS = performance.now();
  }

  if (this.states.isPlaying) this.stop();
  this.playData = data;
  this.settings.resolution = data.header.resolution;
  this.settings.tempo = data.tempo || 120;
  this.tempoTrack = data.tempoTrack;
  this.cc111Time = data.cc111Time;
  this.firstNoteOnTiming = data.firstNoteOnTiming;
  this.lastNoteOffTiming = data.lastNoteOffTiming;
  this.firstNoteOnTime = data.firstNoteOnTime;
  this.lastNoteOffTime = data.lastNoteOffTime;
  this.initStatus();

  if (this.debug) {
    var syoriTimeE = performance.now();
    console.log("setData time", syoriTimeE - syoriTimeS);
  }

  return this;
}

/***/ }),
/* 279 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return initStatus; });
function initStatus(isSongLooping, isLight) {
  // WebMIDI使用中の場合、initStatus()連打の対策 //
  if (this.settings.isWebMIDI) {
    if (this.states.webMIDIWaitState != null) return;
  } // 演奏中の場合、停止する //


  this.stop(isSongLooping); // statesを初期化 //

  this.states = {
    isPlaying: false,
    startTime: 0,
    stopTime: 0,
    stopFuncs: [],
    webMIDIWaitState: null,
    webMIDIStopTime: this.states.webMIDIStopTime,
    playIndices: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    updateBufTime: this.states.updateBufTime,
    updateBufMaxTime: this.states.updateBufMaxTime,
    updateIntervalTime: this.states.updateIntervalTime,
    latencyLimitTime: this.states.latencyLimitTime,
    noteOnAry: [],
    noteOffAry: []
  }; // WebMIDIの初期化・リセットメッセージ送信 //

  if (this.settings.isWebMIDI && !isLight) {
    if (isSongLooping) return;

    if (this.settings.WebMIDIPortOutput == null) {
      this.startWebMIDI();
      return;
    }

    if (this.settings.WebMIDIPortSysEx) {
      // GM1システム・オン
      this.settings.WebMIDIPortOutput.send([0xF0, 0x7E, 0x7F, 0x09, 0x01, 0xF7]);
    } else {
      // SysExの使用が拒否されているので、できる限り設定値を初期値に戻す
      for (var t = 0; t < 16; t++) {
        this.settings.WebMIDIPortOutput.send([0xC0 + t, 0]);
        this.settings.WebMIDIPortOutput.send([0xE0 + t, 0, 64]); // ピッチあたりのずれがひどくなる場合がある よくわからない

        this.settings.WebMIDIPortOutput.send([0xB0 + t, 100, 0]);
        this.settings.WebMIDIPortOutput.send([0xB0 + t, 101, 0]);
        this.settings.WebMIDIPortOutput.send([0xB0 + t, 6, 2]); //pitchbend

        this.settings.WebMIDIPortOutput.send([0xB0 + t, 100, 1]);
        this.settings.WebMIDIPortOutput.send([0xB0 + t, 96, 0]);
        this.settings.WebMIDIPortOutput.send([0xB0 + t, 97, 64]); //tuning?

        this.settings.WebMIDIPortOutput.send([0xB0 + t, 7, 100]); // volume

        this.settings.WebMIDIPortOutput.send([0xB0 + t, 10, 64]); // pan

        this.settings.WebMIDIPortOutput.send([0xB0 + t, 11, 127]); // expression
        //this.settings.WebMIDIPortOutput.send([0xB0+t, 91, 40]); // リバーブ以外のエフェクトに設定される場合がありそうなのでコメントアウト
        //this.settings.WebMIDIPortOutput.send([0xB0+t, 93, 0]); // コーラス以外のエフェクトに設定されるのか音が出なくなる場合があるのでコメントアウト

        this.settings.WebMIDIPortOutput.send([0xB0 + t, 98, 0]);
        this.settings.WebMIDIPortOutput.send([0xB0 + t, 99, 0]); //this.settings.WebMIDIPortOutput.send([0xB0+t, 121, 0]);

        this.settings.WebMIDIPortOutput.send([0xB0 + t, 122, 0]);
      }
    }
  }
}

/***/ }),
/* 280 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return play; });
/* harmony import */ var _play_update_note_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(281);

function play(isSongLooping) {
  var _this = this;

  var context = this.context;
  var settings = this.settings;
  var trigger = this.trigger;
  var states = this.states; // 再生中の場合、処理しない //

  if (states.isPlaying) return; // WebMIDIの場合、少し待ってから再生する //

  if (settings.isWebMIDI && !isSongLooping) {
    // Web MIDI API使用時はstop()から800ms程待機すると音がバグりにくい
    if (states.webMIDIWaitState != "completed") {
      if (states.webMIDIWaitState != "waiting") {
        // play()連打の対策
        // stop()から1000ms後にplay()を実行
        states.webMIDIWaitState = "waiting";
        var waitTime = 1000 - (context.currentTime - states.webMIDIStopTime) * 1000;
        if (states.webMIDIStopTime == 0) waitTime = 1000; // MIDI Portをopenして最初に呼び出すときも少し待つ

        setTimeout(function () {
          states.webMIDIWaitState = "completed";
          states.isPlaying = false;

          _this.play();
        }, waitTime);
      }

      return;
    } else {
      states.webMIDIWaitState = null;
    }
  } // 変数を用意 //


  var currentTime = context.currentTime;
  this.isPlayed = true;
  states.isPlaying = true;
  states.startTime = !states.startTime && !states.stopTime ? currentTime : states.startTime + currentTime - states.stopTime;
  states.stopFuncs = []; // 冒頭の余白をスキップ //

  if (settings.isSkipBeginning) {
    var firstNoteOnTime = this.firstNoteOnTime;

    if (-states.startTime + currentTime < firstNoteOnTime) {
      this.setStartTime(firstNoteOnTime + states.startTime - currentTime);
    }
  } // 曲終了コールバックを予約 //


  var reserveSongEnd;

  var reserveSongEndFunc = function reserveSongEndFunc() {
    _this.clearFunc("rootTimeout", reserveSongEnd);

    var finishTime = settings.isCC111 && _this.cc111Time != -1 ? _this.lastNoteOffTime : _this.getTime(Number.MAX_SAFE_INTEGER);

    if (finishTime - context.currentTime + states.startTime <= 0) {
      // 予定の時間以降に曲終了
      trigger.songEnd();

      _this.onSongEnd();

      _this.fireEvent('songEnd');
    } else {
      // 処理落ちしたりしてまだ演奏中の場合、1ms後に曲終了コールバックを呼び出すよう予約
      reserveSongEnd = setTimeout(reserveSongEndFunc, 1);

      _this.pushFunc({
        rootTimeout: reserveSongEnd,
        stopFunc: function stopFunc() {
          clearTimeout(reserveSongEnd);
        }
      });
    }
  };

  var finishTime = settings.isCC111 && this.cc111Time != -1 ? this.lastNoteOffTime : this.getTime(Number.MAX_SAFE_INTEGER);
  var reserveSongEndTime = (finishTime - context.currentTime + states.startTime) * 1000;
  reserveSongEnd = setTimeout(reserveSongEndFunc, reserveSongEndTime);
  this.pushFunc({
    rootTimeout: reserveSongEnd,
    stopFunc: function stopFunc() {
      clearTimeout(reserveSongEnd);
    }
  }); // 再生開始をコールバックに通知 //

  trigger.play();
  this.fireEvent('play'); // 1ms毎コールバックの準備 //

  _play_update_note_js__WEBPACK_IMPORTED_MODULE_0__["default"].init(this, currentTime); // 1ms毎コールバックを開始 //

  var reserve = setInterval(function () {
    _play_update_note_js__WEBPACK_IMPORTED_MODULE_0__["default"].update(_this);
  }, 1);
  this.pushFunc({
    rootTimeout: reserve,
    stopFunc: function stopFunc() {
      clearInterval(reserve);
    }
  });
}

/***/ }),
/* 281 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UpdateNote; });
/* harmony import */ var _util_array_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(282);
/* harmony import */ var _util_parse_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(283);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var UpdateNote =
/*#__PURE__*/
function () {
  function UpdateNote() {
    _classCallCheck(this, UpdateNote);
  }

  _createClass(UpdateNote, null, [{
    key: "init",

    /**
     * 1ms毎処理用の変数を初期化
     */
    value: function init(picoAudio, currentTime) {
      this.updatePreTime = performance.now();
      this.pPreTime = performance.now();
      this.cPreTime = picoAudio.context.currentTime * 1000;
      this.pTimeSum = 0;
      this.cTimeSum = 0;
      this.cnt = 0;
      this.initCurrentTime = currentTime;
    }
    /**
     * 再生中、1ms毎に呼ばれるコールバック
     * （ブラウザの制限で実際は最短4ms毎に呼ばれる）
     * @returns {number} 現在の時間
     */

  }, {
    key: "update",
    value: function update(picoAudio) {
      var _this = this;

      var context = picoAudio.context;
      var settings = picoAudio.settings;
      var states = picoAudio.states;
      var updateNowTime = performance.now();
      var updatePreTime = this.updatePreTime;
      var pPreTime = this.pPreTime;
      var cPreTime = this.cPreTime;
      var pTimeSum = this.pTimeSum;
      var cTimeSum = this.cTimeSum;
      var cnt = this.cnt; // サウンドが重くないか監視（フリーズ対策） //
      //   performance.now()とAudioContext.currentTimeの時間差を計算し
      //   AudioContext.currentTimeが遅れていたら処理落ちしていると判断する

      var updateBufTime = updateNowTime - updatePreTime;
      var pTime = updateNowTime;
      var cTime = context.currentTime * 1000;
      pTimeSum += pTime - pPreTime;
      cTimeSum += cTime - cPreTime;
      pPreTime = pTime;
      cPreTime = cTime;
      var latencyTime = pTimeSum - cTimeSum;
      states.latencyTime = latencyTime; // サウンドが重い場合、負荷軽減処理を発動するリミットを上げていく //

      if (latencyTime >= 100) {
        // currentTimeが遅い（サウンドが重い）
        states.latencyLimitTime += latencyTime;
        cTimeSum += 100;
      } else if (latencyTime <= -100) {
        // currentTimeが速い（誤差）
        cTimeSum = pTimeSum;
      } else {
        if (states.latencyLimitTime > 0) {
          // currentTimeが丁度いい
          states.latencyLimitTime -= updateBufTime * 0.003;
          if (states.latencyLimitTime < 0) states.latencyLimitTime = 0;
        }
      } // ノートを先読み度合いを自動調整（予約しすぎると重くなる） //


      states.updateIntervalTime = updateBufTime;

      if (states.updateBufTime < updateBufTime) {
        // 先読み遅れている場合
        states.updateBufTime = updateBufTime;
      } else {
        // 先読み量に余裕がある場合
        // 先読み量を少しずつ減らす //
        if (states.updateBufMaxTime > 350) {
          states.updateBufMaxTime -= states.updateBufMaxTime * 0.002;
        } // 先読み量を少しずつ増やす //


        if (states.updateBufTime < 20) {
          states.updateBufTime += states.updateBufTime * 0.0005;
        }

        if (states.updateBufMaxTime >= 10 && states.updateBufMaxTime < 340) {
          states.updateBufMaxTime += states.updateBufMaxTime * 0.002;
        }
      } // 先読み量が足りなくなった場合


      if (states.updateBufTime > states.updateBufMaxTime) {
        if (updateBufTime >= 900 && states.latencyLimitTime <= 150) {
          // バックグラウンドっぽくて重くない場合、バックグラウンド再生
          states.updateBufMaxTime += updateBufTime;
        } else {
          // 通常
          var tempTime = updateBufTime - states.updateBufMaxTime;
          states.updateBufTime = states.updateBufMaxTime; // 先読み量が小さい場合大きくする

          if (states.updateBufMaxTime < 10) {
            states.updateBufTime = states.updateBufMaxTime;
            states.updateBufMaxTime *= 1.25;
          } else {
            states.updateBufMaxTime += tempTime / 2;
          }
        }

        if (states.updateBufMaxTime > 1100) states.updateBufMaxTime = 1100;
      } // サウンドが重すぎる場合、先読み度合いを小さくして負荷軽減 //


      if (states.latencyLimitTime > 150) {
        cTimeSum = pTimeSum;
        states.latencyLimitTime -= 5;
        if (states.latencyLimitTime > 1000) states.latencyLimitTime = 1000; // ノート先読みをかなり小さくする（フリーズ対策）

        states.updateBufMaxTime = 1;
        states.updateBufTime = 1;
        updateBufTime = 1;
      } // 再生処理 //


      for (var ch = 0; ch < 16; ch++) {
        var notes = picoAudio.playData.channels[ch].notes;
        var idx = states.playIndices[ch];

        var _loop2 = function _loop2() {
          var note = notes[idx];
          var curTime = cnt == 0 ? _this.initCurrentTime - states.startTime : context.currentTime - states.startTime; // 終わったノートは演奏せずにスキップ

          if (curTime >= note.stopTime) return "continue"; // （シークバーで途中から再生時）startTimeが過ぎたものは鳴らさない

          if (cnt == 0 && curTime > note.startTime + 0.05) return "continue"; // AudioParam.setValueAtTime()等でマイナスが入るとエラーになるので対策

          if (curTime + note.startTime < 0) return "continue"; // 演奏開始時間 - 先読み時間(ノート予約) になると演奏予約or演奏開始

          if (curTime < note.startTime - states.updateBufTime / 1000) return "break"; // PicoAudio音源の再生処理 //

          if (!settings.isWebMIDI) {
            // 予約ノート数が急激に増えそうな時、先読み量を小さくしておく //
            if (states.stopFuncs.length >= 350 && states.updateBufTime < 1000) {
              states.updateBufTime = 12;
              states.updateBufMaxTime = states.updateBufTime;
            } // レトロモード（和音制限モード） //


            if (settings.maxPoly != -1 || settings.maxPercPoly != -1) {
              var polyCnt = 0;
              var percCnt = 0;
              states.stopFuncs.forEach(function (tar) {
                if (!tar.note) return;

                if (tar.note.channel != 9) {
                  if (note.start >= tar.note.start && note.start < tar.note.stop) {
                    polyCnt++;
                  }
                } else {
                  if (note.start == tar.note.start) {
                    percCnt++;
                  }
                }
              });

              if (note.channel != 9 && polyCnt >= settings.maxPoly || note.channel == 9 && percCnt >= settings.maxPercPoly) {
                return "continue";
              }
            } // １ノート分の再生処理（WebAudioで再生） //


            var stopFunc = note.channel != 9 ? picoAudio.createSamplingNote(note) : null;
            if (!stopFunc) return "continue"; // 無音の場合、処理しない

            picoAudio.pushFunc({
              note: note,
              stopFunc: stopFunc
            });
          }

          states.noteOnAry.push(note);
        };

        _loop: for (; idx < notes.length; idx++) {
          var _ret = _loop2();

          switch (_ret) {
            case "continue":
              continue;

            case "break":
              break _loop;
          }
        } // notesのどこまで再生したかを記憶して、次回コールバック時にそこから処理を始める


        states.playIndices[ch] = idx;
      } // noteOnの時間になったか監視 //


      this.checkNoteOn(picoAudio); // noteOffの時間になったか監視 //

      this.checkNoteOff(picoAudio); // WebMIDIの再生処理 //

      if (settings.isWebMIDI && settings.WebMIDIPortOutput != null) {
        var messages = picoAudio.playData.messages;
        var smfData = picoAudio.playData.smfData;
        var _idx = states.playIndices[16]; // 17chはWebMIDI用

        for (; _idx < messages.length; _idx++) {
          var message = messages[_idx];
          var curTime = context.currentTime - states.startTime; // 終わったノートは演奏せずにスキップ

          if (curTime > message.time + 1) continue; // 演奏開始時間 - 先読み時間(ノート予約) になると演奏予約or演奏開始

          if (curTime < message.time - 1) break; // WebMIDIでMIDIメッセージを送信する処理 //

          var pLen = message.smfPtrLen;
          var p = message.smfPtr;
          var time = message.time;
          var state = smfData[p];

          if (state != 0xff) {
            try {
              if (state == 0xF0 || state == 0xF7) {
                // sysExのMIDIメッセージ
                if (settings.WebMIDIPortSysEx) {
                  // 長さ情報を取り除いて純粋なSysExメッセージにする
                  var lengthAry = _util_parse_util_js__WEBPACK_IMPORTED_MODULE_1__["default"].variableLengthToInt(smfData, p + 1, p + 1 + 4);
                  var sysExStartP = p + 1 + lengthAry[1];
                  var sysExEndP = sysExStartP + lengthAry[0];
                  var webMIDIMes = new Uint8Array(1 + lengthAry[0]);
                  webMIDIMes[0] = state;
                  var size = sysExEndP - sysExStartP;

                  for (var i = 0; i < size; i++) {
                    webMIDIMes[i + 1] = smfData[sysExStartP + i];
                  }

                  settings.WebMIDIPortOutput.send(webMIDIMes, (time - context.currentTime + window.performance.now() / 1000 + states.startTime) * 1000);
                }
              } else {
                // sysEx以外のMIDIメッセージ
                var sendMes = [];

                for (var _i = 0; _i < pLen; _i++) {
                  sendMes.push(smfData[p + _i]);
                }

                settings.WebMIDIPortOutput.send(sendMes, (time - context.currentTime + window.performance.now() / 1000 + states.startTime) * 1000);
              }
            } catch (e) {
              console.log(e, p, pLen, time, state);
            }
          }
        } // messagesのどこまで送信したかを記憶して、次回コールバック時にそこから処理を始める


        states.playIndices[16] = _idx;
      } // 1msコールバックが呼ばれた回数をカウント


      cnt++; // 変数を反映 //

      this.updatePreTime = updateNowTime;
      this.pPreTime = pPreTime;
      this.cPreTime = cPreTime;
      this.pTimeSum = pTimeSum;
      this.cTimeSum = cTimeSum;
      this.cnt = cnt;
    }
    /**
     * noteOnの時間になったか監視
     * @param {PicoAudio} picoAudio PicoAudioインスタンス
     */

  }, {
    key: "checkNoteOn",
    value: function checkNoteOn(picoAudio) {
      var context = picoAudio.context;
      var trigger = picoAudio.trigger;
      var states = picoAudio.states;
      var noteOnAry = picoAudio.states.noteOnAry;
      var noteOffAry = picoAudio.states.noteOffAry;

      for (var i = 0; i < noteOnAry.length; i++) {
        var tempNote = noteOnAry[i];
        var nowTime = context.currentTime - states.startTime;

        if (tempNote.startTime - nowTime <= 0) {
          _util_array_util_js__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"](noteOnAry, i); // noteOnAry.splice(i, 1); の高速化

          noteOffAry.push(tempNote); // イベント発火

          if (trigger.isNoteTrigger) trigger.noteOn(tempNote);
          picoAudio.fireEvent('noteOn', tempNote);
          i--;
        }
      }
    }
    /**
     * noteOffの時間になったか監視
     * @param {PicoAudio} picoAudio PicoAudioインスタンス
     */

  }, {
    key: "checkNoteOff",
    value: function checkNoteOff(picoAudio) {
      var context = picoAudio.context;
      var trigger = picoAudio.trigger;
      var states = picoAudio.states;
      var noteOffAry = picoAudio.states.noteOffAry;

      for (var i = 0; i < noteOffAry.length; i++) {
        var tempNote = noteOffAry[i];
        var nowTime = context.currentTime - states.startTime;

        if (tempNote.channel != 9 && tempNote.stopTime - nowTime <= 0 || tempNote.channel == 9 && tempNote.drumStopTime - nowTime <= 0) {
          _util_array_util_js__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"](noteOffAry, i); // noteOffAry.splice(i, 1); の高速化

          picoAudio.clearFunc("note", tempNote); // イベント発火

          if (trigger.isNoteTrigger) trigger.noteOff(tempNote);
          picoAudio.fireEvent('noteOff', tempNote);
          i--;
        }
      }
    }
  }]);

  return UpdateNote;
}();



/***/ }),
/* 282 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ArrayUtil; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ArrayUtil =
/*#__PURE__*/
function (_Array) {
  _inherits(ArrayUtil, _Array);

  function ArrayUtil() {
    _classCallCheck(this, ArrayUtil);

    return _possibleConstructorReturn(this, _getPrototypeOf(ArrayUtil).apply(this, arguments));
  }

  _createClass(ArrayUtil, null, [{
    key: "delete",

    /**
     * 配列から要素１つを削除する
     * 
     *     Array.splice(index, 1); を高速化する
     *     特に配列末尾、又は配列先頭を削除するときに高速処理が期待できる
     * @param {Array} array 配列
     * @param {number} index 添え字
     */
    value: function _delete(array, index) {
      if (index == array.length - 1) array.pop(); // 配列末尾をArray.pop()で削除すると高速化する
      else if (index == 0) array.shift(); // 配列先頭をArray.shift()で削除すると高速化する（あまり変わらない環境もある）
        else array.splice(index, 1); // 配列先頭・末尾以外を削除する場合はArray.splice()で削除する
    }
  }]);

  return ArrayUtil;
}(_wrapNativeSuper(Array));



/***/ }),
/* 283 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ParseUtil; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ParseUtil =
/*#__PURE__*/
function () {
  function ParseUtil() {
    _classCallCheck(this, ParseUtil);
  }

  _createClass(ParseUtil, null, [{
    key: "getInt",

    /**
     * バイト配列内に含まれる"データ長"を数値に変換する
     * @param {Uint8Array} arr バイト配列
     * @param {number} startIdx データ長の始点の場所(index)
     * @param {number} endIdx データ長の終点の場所(index) - 1
     * @returns {number} データ長
     */
    value: function getInt(arr, startIdx, endIdx) {
      var value = 0;

      for (var i = startIdx; i < endIdx; i++) {
        value = (value << 8) + arr[i];
      }

      return value;
    }
    /**
     * バイト配列内に含まれる"可変長のデータ長"を数値に変換する
     * @param {Uint8Array} arr バイト配列
     * @param {number} startIdx データ長の始点の場所(index)
     * @param {number} endIdx データ長の終点の場所(index) - 1 (終点の場所は多くてもかまわない)
     * @returns {Array} [データ長, "可変長のデータ長"のバイト数]
     */

  }, {
    key: "variableLengthToInt",
    value: function variableLengthToInt(arr, startIdx, endIdx) {
      var i = startIdx;
      var value = 0;

      while (i < endIdx - 1 && arr[i] >= 0x80) {
        if (i < startIdx + 4) value = (value << 7) + (arr[i] - 0x80);
        i++;
      }

      value = (value << 7) + arr[i];
      i++;
      return [value, i - startIdx];
    }
    /**
     * デルタタイムの順番になるように配列に挿入
     * @param {PicoAudio} that PicoAudioインスタンス
     * @param {number} ch チャンネル番号
     * @param {number} time デルタタイム
     * @param {number} p 対象のMIDIイベントの場所(SMFデータ内の位置)
     * @param {number} len MIDIイベントの長さ
     */

  }, {
    key: "chIndicesInsert",
    value: function chIndicesInsert(that, ch, time, p, len) {
      var indices = ch.indices; // デルタタイムの順番になるようにリスト配列に挿入 //

      if (ch.indicesLength >= 4 && time < indices[ch.indicesFoot]) {
        // Insert //
        while (ch.indicesCur != -1) {
          if (time < indices[ch.indicesCur]) {
            if (ch.indicesCur == ch.indicesHead) {
              ch.indicesHead = ch.indicesLength;
            } else {
              indices[ch.indicesPre + 3] = ch.indicesLength;
            }

            indices[ch.indicesLength] = time;
            indices[ch.indicesLength + 1] = len;
            indices[ch.indicesLength + 2] = p;
            indices[ch.indicesLength + 3] = ch.indicesCur;
            ch.indicesPre = ch.indicesLength;
            ch.indicesLength += 4;
            break;
          }

          ch.indicesPre = ch.indicesCur;
          ch.indicesCur = indices[ch.indicesCur + 3];
        }
      } else {
        // Push //
        if (ch.indicesLength >= 4) {
          indices[ch.indicesFoot + 3] = ch.indicesLength;
        } else {
          ch.indicesHead = 0;
        }

        ch.indicesFoot = ch.indicesLength;
        indices[ch.indicesLength] = time;
        indices[ch.indicesLength + 1] = len;
        indices[ch.indicesLength + 2] = p;
        indices[ch.indicesLength + 3] = -1;
        ch.indicesLength += 4;
      }
    }
  }]);

  return ParseUtil;
}();



/***/ }),
/* 284 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return stop; });
function stop(isSongLooping) {
  var _this = this;

  var states = this.states; // 再生していない場合、何もしない //

  if (states.isPlaying == false) return; // ステータスを停止状態にする・終了処理を呼ぶ //

  states.isPlaying = false;
  states.stopTime = this.context.currentTime;
  states.stopFuncs.forEach(function (n) {
    // 再生中の音の停止関数を呼ぶ
    n.stopFunc();
  });
  states.stopFuncs = [];
  states.playIndices.forEach(function (n, i, ary) {
    ary[i] = 0;
  });
  states.noteOnAry = [];
  states.noteOffAry = []; // WebMIDIで再生中の場合、停止メッセージを送信 //

  if (this.settings.isWebMIDI) {
    if (isSongLooping) return;
    if (this.settings.WebMIDIPortOutput == null) return;
    states.webMIDIStopTime = this.context.currentTime;
    setTimeout(function () {
      for (var t = 0; t < 16; t++) {
        _this.settings.WebMIDIPortOutput.send([0xB0 + t, 120, 0]);
      }
    }, 1000);
  } // 停止をコールバックに通知 //


  this.trigger.stop();
  this.fireEvent('stop');
}

/***/ }),
/* 285 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createBaseNote; });
function createBaseNote(option, isDrum, isExpression, nonChannel, nonStop) {
  var _this = this;

  // 最低限の変数を準備（無音の場合は処理終了するため） //
  var settings = this.settings;
  var context = this.context;
  var songStartTime = this.states.startTime;
  var channel = nonChannel ? 0 : option.channel || 0;
  var velocity = option.velocity * Number(nonChannel ? 1 : this.channels[channel][2] != null ? this.channels[channel][2] : 1) * settings.generateVolume;
  var isGainValueZero = true; // 無音の場合は処理終了 //

  if (velocity <= 0) return {
    isGainValueZero: true
  }; // 音量の変化を設定 //

  var expGainValue = velocity * ((option.expression ? option.expression[0].value : 100) / 127);
  var expGainNode = context.createGain();
  expGainNode.gain.value = expGainValue;

  if (isExpression) {
    option.expression ? option.expression.forEach(function (p) {
      var v = velocity * (p.value / 127);
      if (v > 0) isGainValueZero = false;
      expGainNode.gain.setValueAtTime(v, p.time + songStartTime);
    }) : false;
  } else {
    if (expGainValue > 0) {
      isGainValueZero = false;
    }
  } // 無音の場合は処理終了 //


  if (isGainValueZero) {
    // 音量が常に0なら音を鳴らさない
    return {
      isGainValueZero: true
    };
  } // 全ての変数を準備 //


  var start = option.startTime + songStartTime;
  var stop = option.stopTime + songStartTime;
  var pitch = settings.basePitch * Math.pow(Math.pow(2, 1 / 12), (option.pitch || 69) - 69);
  var oscillator = !isDrum ? context.createOscillator() : context.createBufferSource();
  var panNode = context.createStereoPanner ? context.createStereoPanner() : context.createPanner ? context.createPanner() : {
    pan: {
      setValueAtTime: function setValueAtTime() {}
    }
  };
  var gainNode = context.createGain();
  var stopGainNode = context.createGain(); // ドラムはホワイトノイズ、ドラム以外はoscillatorを設定 //
  // oscillatorはピッチ変動も設定 //

  if (!isDrum) {
    oscillator.type = option.type || "sine";
    oscillator.detune.value = 0;
    oscillator.frequency.value = pitch;
    option.pitchBend ? option.pitchBend.forEach(function (p) {
      oscillator.frequency.setValueAtTime(settings.basePitch * Math.pow(Math.pow(2, 1 / 12), option.pitch - 69 + p.value), p.time + songStartTime);
    }) : false;
  } else {
    oscillator.loop = true;
    oscillator.buffer = this.whitenoise;
  } // パンの初期値を設定 //


  var panValue = option.pan && option.pan[0].value != 64 ? option.pan[0].value / 127 * 2 - 1 : 0;
  initPanValue(context, panNode, panValue); // パンの変動を設定 //

  if (context.createStereoPanner || context.createPanner) {
    // StereoPannerNode or PannerNode がどちらかでも使える
    var firstNode = true;

    if (context.createStereoPanner) {
      // StereoPannerNode が使える
      option.pan ? option.pan.forEach(function (p) {
        if (firstNode) {
          firstNode = false;
          return;
        }

        var v = p.value == 64 ? 0 : p.value / 127 * 2 - 1;
        if (v > 1.0) v = 1.0;
        panNode.pan.setValueAtTime(v, p.time + songStartTime);
      }) : false;
    } else if (context.createPanner) {
      // StereoPannerNode が未サポート、PannerNode が使える
      if (panNode.positionX) {
        // setValueAtTimeが使える
        // Old Browser
        option.pan ? option.pan.forEach(function (p) {
          if (firstPan) {
            firstPan = false;
            return;
          }

          var v = p.value == 64 ? 0 : p.value / 127 * 2 - 1;
          var posObj = convPosition(v);
          panNode.positionX.setValueAtTime(posObj.x, p.time + songStartTime);
          panNode.positionY.setValueAtTime(posObj.y, p.time + songStartTime);
          panNode.positionZ.setValueAtTime(posObj.z, p.time + songStartTime);
        }) : false;
      } else {
        // iOS
        // setValueAtTimeが使えないためsetTimeoutでパンの動的変更
        option.pan ? option.pan.forEach(function (p) {
          if (firstNode) {
            firstNode = false;
            return;
          }

          var reservePan = setTimeout(function () {
            _this.clearFunc("pan", reservePan);

            var v = p.value == 64 ? 0 : p.value / 127 * 2 - 1;
            if (v > 1.0) v = 1.0;
            var posObj = convPosition(v);
            panNode.setPosition(posObj.x, posObj.y, posObj.z);
          }, (p.time + songStartTime - context.currentTime) * 1000);

          _this.pushFunc({
            pan: reservePan,
            stopFunc: function stopFunc() {
              clearTimeout(reservePan);
            }
          });
        }) : false;
      }
    }

    oscillator.connect(panNode);
    panNode.connect(expGainNode);
  } else {
    // StereoPannerNode、PannerNode が未サポート
    oscillator.connect(expGainNode);
  } // AudioNodeを接続 //


  expGainNode.connect(gainNode);
  gainNode.connect(stopGainNode);
  stopGainNode.connect(this.masterGainNode);
  this.masterGainNode.connect(context.destination); // モジュレーションの変動を設定 //

  var modulationOscillator;
  var modulationGainNode;

  if (!isDrum && option.modulation && (option.modulation.length >= 2 || option.modulation[0].value > 0)) {
    modulationOscillator = context.createOscillator();
    modulationGainNode = context.createGain();
    var _firstNode = true;
    option.modulation ? option.modulation.forEach(function (p) {
      if (_firstNode) {
        _firstNode = false;
        return;
      }

      var m = p.value / 127;
      if (m > 1.0) m = 1.0;
      modulationGainNode.gain.setValueAtTime(pitch * 10 / 440 * m, p.time + songStartTime);
    }) : false;
    var m = option.modulation ? option.modulation[0].value / 127 : 0;
    if (m > 1.0) m = 1.0;
    modulationGainNode.gain.value = pitch * 10 / 440 * m;
    modulationOscillator.frequency.value = 6;
    modulationOscillator.connect(modulationGainNode);
    modulationGainNode.connect(oscillator.frequency);
  } // リバーブの変動を設定 //


  if (this.settings.isReverb && option.reverb && (option.reverb.length >= 2 || option.reverb[0].value > 0)) {
    var convolver = this.convolver;
    var convolverGainNode = context.createGain();
    var _firstNode2 = true;
    option.reverb ? option.reverb.forEach(function (p) {
      if (_firstNode2) {
        _firstNode2 = false;
        return;
      }

      var r = p.value / 127;
      if (r > 1.0) r = 1.0;
      convolverGainNode.gain.setValueAtTime(r, p.time + songStartTime);
    }) : false;
    var r = option.reverb ? option.reverb[0].value / 127 : 0;
    if (r > 1.0) r = 1.0;
    convolverGainNode.gain.value = r;
    gainNode.connect(stopGainNode);
    stopGainNode.connect(convolverGainNode);
    convolverGainNode.connect(convolver);
  } // コーラスの変動を設定 //


  if (this.settings.isChorus && option.chorus && (option.chorus.length >= 2 || option.chorus[0].value > 0)) {
    var chorusDelayNode = this.chorusDelayNode;
    var chorusGainNode = context.createGain();
    var _firstNode3 = true;
    option.chorus ? option.chorus.forEach(function (p) {
      if (_firstNode3) {
        _firstNode3 = false;
        return;
      }

      var c = p.value / 127;
      if (c > 1.0) c = 1.0;
      chorusGainNode.gain.setValueAtTime(c, p.time + songStartTime);
    }) : false;
    var c = option.chorus ? option.chorus[0].value / 127 : 0;
    if (c > 1.0) c = 1.0;
    chorusGainNode.gain.value = c;
    gainNode.connect(stopGainNode);
    stopGainNode.connect(chorusGainNode);
    chorusGainNode.connect(chorusDelayNode);
  } // モジュレーションをスタート //


  if (modulationOscillator) {
    modulationOscillator.start(start);
    this.stopAudioNode(modulationOscillator, stop, modulationGainNode);
  } // oscillator又はホワイトノイズをスタート //


  oscillator.start(start);

  if (!isDrum && !nonChannel && !nonStop) {
    this.stopAudioNode(oscillator, stop, stopGainNode);
  } // AudioNodeやパラメータを返す //


  return {
    start: start,
    stop: stop,
    pitch: pitch,
    channel: channel,
    velocity: velocity,
    oscillator: oscillator,
    panNode: panNode,
    gainNode: gainNode,
    stopGainNode: stopGainNode,
    isGainValueZero: false
  };
}
/**
 * パンの初期値を設定
 * @param {PannerNode | StereoPannerNode} panNode 
 * @param {number} panValue 
 */

function initPanValue(context, panNode, panValue) {
  if (context.createStereoPanner) {
    if (panValue > 1.0) panValue = 1.0;
    panNode.pan.value = panValue;
  } else if (context.createPanner) {
    // iOS, Old Browser
    var posObj = convPosition(panValue);
    panNode.panningModel = "equalpower";
    panNode.setPosition(posObj.x, posObj.y, posObj.z);
  }
}
/**
 * pan値を基に、PannerNode用の値を{x, y, z}で返す
 * @param {number} panValue panの値
 * @returns Object{x, y, z}
 */


function convPosition(panValue) {
  if (panValue > 1.0) panValue = 1.0;
  var obj = {};
  var panAngle = panValue * 90;
  obj.x = Math.sin(panAngle * (Math.PI / 180));
  obj.y = 0;
  obj.z = -Math.cos(panAngle * (Math.PI / 180));
  return obj;
}

/***/ }),
/* 286 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createNote; });
function createNote(option) {
  var _this = this;

  var note = this.createBaseNote(option, false, true, false, true); // oscillatorのstopはこちらで実行するよう指定

  if (note.isGainValueZero) return null;
  var oscillator = note.oscillator;
  var gainNode = note.gainNode;
  var stopGainNode = note.stopGainNode;
  var isPizzicato = false;
  var isNoiseCut = false;
  var note2; // 音色の設定 //

  switch (this.channels[note.channel][0] * 1000 || option.instrument) {
    // Sine
    case 1000:
    case 6:
    case 15:
    case 24:
    case 26:
    case 46:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 82:
    case 85:
    case 86:
      {
        oscillator.type = "sine";
        gainNode.gain.value *= 1.5;
        break;
      }
    // Square

    case 2000:
    case 4:
    case 12:
    case 13:
    case 16:
    case 19:
    case 20:
    case 32:
    case 34:
    case 45:
    case 48:
    case 49:
    case 55:
    case 56:
    case 57:
    case 61:
    case 62:
    case 63:
    case 71:
    case 72:
    case 73:
    case 74:
    case 75:
    case 76:
    case 77:
    case 78:
    case 79:
    case 80:
    case 84:
      {
        oscillator.type = "square";
        gainNode.gain.value *= 0.8;
        break;
      }
    // Sawtooth

    case 3000:
    case 0:
    case 1:
    case 2:
    case 3:
    case 6:
    case 7:
    case 17:
    case 18:
    case 21:
    case 22:
    case 23:
    case 27:
    case 28:
    case 29:
    case 30:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 47:
    case 59:
    case 64:
    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
    case 71:
    case 82:
    case 87:
      {
        oscillator.type = "sawtooth";
        break;
      }
    // Triangle

    case 4000:
    case 8:
    case 9:
    case 10:
    case 11:
    case 14:
    case 25:
    case 31:
    case 33:
    case 35:
    case 58:
    case 60:
    case 83:
    case 88:
    case 89:
    case 90:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
      {
        oscillator.type = "triangle";
        gainNode.gain.value *= 1.5;
        break;
      }
    // Other - Square

    default:
      {
        oscillator.type = "square";
      }
  } // 音の終わりのプチプチノイズが気になるので、音の終わりに5ms減衰してノイズ軽減 //


  if ((oscillator.type == "sine" || oscillator.type == "triangle") && !isPizzicato && note.stop - note.start > 0.01) {
    isNoiseCut = true;
  } // 減衰の設定 //


  switch (this.channels[note.channel][1] / 10 || option.instrument) {
    // ピッチカート系減衰
    case 0.2:
    case 12:
    case 13:
    case 45:
    case 55:
      {
        isPizzicato = true;
        gainNode.gain.value *= 1.1;
        gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
        gainNode.gain.linearRampToValueAtTime(0.0, note.start + 0.2);
        this.stopAudioNode(oscillator, note.start + 0.2, stopGainNode);
        break;
      }
    // ピアノ程度に伸ばす系

    case 0.3:
    case 0:
    case 1:
    case 2:
    case 3:
    case 6:
    case 9:
    case 11:
    case 14:
    case 15:
    case 32:
    case 36:
    case 37:
    case 46:
    case 47:
      {
        gainNode.gain.value *= 1.1;
        var decay = (128 - option.pitch) / 128;
        gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
        gainNode.gain.linearRampToValueAtTime(gainNode.gain.value * 0.85, note.start + decay * decay / 8);
        gainNode.gain.linearRampToValueAtTime(gainNode.gain.value * 0.8, note.start + decay * decay / 4);
        gainNode.gain.setTargetAtTime(0, note.start + decay * decay / 4, 5 * decay * decay);
        this.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
        break;
      }
    // ギター系

    case 0.4:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
    case 34:
      {
        gainNode.gain.value *= 1.1;
        gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
        gainNode.gain.linearRampToValueAtTime(0.0, note.start + 1.0 + note.velocity * 4);
        this.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
        break;
      }
    // 減衰していくけど終わらない系

    case 0.5:
    case 4:
    case 5:
    case 7:
    case 8:
    case 10:
    case 33:
    case 35:
      {
        gainNode.gain.value *= 1.0;
        gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
        gainNode.gain.linearRampToValueAtTime(gainNode.gain.value * 0.95, note.start + 0.1);
        gainNode.gain.setValueAtTime(gainNode.gain.value * 0.95, note.start + 0.1);
        gainNode.gain.linearRampToValueAtTime(0.0, note.start + 2.0 + note.velocity * 10);
        this.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
        break;
      }

    case 119:
      // Reverse Cymbal
      {
        gainNode.gain.value = 0;
        this.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
        note2 = this.createBaseNote(option, true, true);
        if (note2.isGainValueZero) break;
        note2.oscillator.playbackRate.setValueAtTime((option.pitch + 1) / 128, note.start);
        note2.gainNode.gain.setValueAtTime(0, note.start);
        note2.gainNode.gain.linearRampToValueAtTime(1.3, note.start + 2);
        this.stopAudioNode(note2.oscillator, note.stop, note2.stopGainNode);
        break;
      }

    default:
      {
        gainNode.gain.value *= 1.1;
        gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
        this.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
      }
  } // 音をストップさせる関数を返す //


  return function () {
    _this.stopAudioNode(oscillator, 0, stopGainNode, true);

    if (note2 && note2.oscillator) _this.stopAudioNode(note2.oscillator, 0, note2.stopGainNode, true);
  };
}

/***/ }),
/* 287 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createPercussionNote; });
function createPercussionNote(option) {
  var _this = this;

  var note = this.createBaseNote(option, true, false);
  if (note.isGainValueZero) return null;
  var source = note.oscillator;
  var gainNode = note.gainNode;
  var stopGainNode = note.stopGainNode;
  var start = note.start;
  var velocity = 1; // ドラム全体の音量調整用

  var note2 = this.createBaseNote(option, false, false, true);
  var oscillator = note2.oscillator;
  var gainNode2 = note2.gainNode;
  var stopGainNode2 = note2.stopGainNode;
  var nextSameNoteOnInterval = option.nextSameNoteOnInterval; // oscillator.frequency.setValueAtTime()がcurrentTimeより遅れると周波数設定がされないので対策

  if (start < this.context.currentTime) start = this.context.currentTime;
  var stopAudioTime = 0;
  var stopAudioTime2 = 0;

  switch (option.pitch) {
    // 元々のパーカッション音源 //
    // Bass drum
    case 35:
    case 36:
      // w
      gainNode.gain.value = velocity * 0.6;
      source.playbackRate.value = 0.02;
      stopAudioTime = 0.07; // s

      gainNode2.gain.value = velocity * 1.1;
      oscillator.frequency.setValueAtTime(120, start);
      oscillator.frequency.linearRampToValueAtTime(50, start + 0.07);
      stopAudioTime2 = 0.07;
      break;
    // Snare

    case 38:
    case 40:
      // w
      source.playbackRate.value = 0.7;
      stopAudioTime = 0.05; // s

      gainNode2.gain.setValueAtTime(velocity * 0.8, start);
      gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.05);
      oscillator.frequency.setValueAtTime(300, start);
      oscillator.frequency.linearRampToValueAtTime(200, start + 0.05);
      stopAudioTime2 = 0.05;
      break;
    // Toms

    case 41:
    case 43:
    case 45:
    case 47:
    case 48:
    case 50:
      // w
      source.playbackRate.value = 0.01;
      stopAudioTime = 0.1; // s

      oscillator.type = "square";
      gainNode2.gain.setValueAtTime(velocity, start);
      gainNode2.gain.linearRampToValueAtTime(0.01, start + 0.1);
      oscillator.frequency.setValueAtTime(150 + 20 * (option.pitch - 40), start);
      oscillator.frequency.linearRampToValueAtTime(50 + 20 * (option.pitch - 40), start + 0.1);
      stopAudioTime2 = 0.1;
      break;
    // Close Hihat

    case 42:
    case 44:
      source.playbackRate.value = 1.5;
      stopAudioTime = 0.02;
      stopAudioTime2 = 0;
      break;
    // Open Hihat

    case 46:
      source.playbackRate.value = 1.5;
      stopAudioTime = 0.3;
      gainNode.gain.setValueAtTime(velocity * 0.9, start);
      gainNode.gain.linearRampToValueAtTime(0.0, start + 0.3);
      stopAudioTime2 = 0;
      break;
    // Cymbal

    case 49:
    case 51:
    case 52:
    case 53:
    case 55:
    case 57:
      source.playbackRate.value = 1.2;
      stopAudioTime = 0.5;
      gainNode.gain.setValueAtTime(velocity * 1, start);
      gainNode.gain.linearRampToValueAtTime(0.0, start + 0.5);
      stopAudioTime2 = 0;
      break;
    // Cymbal2

    case 51:
      source.playbackRate.value = 1.1;
      stopAudioTime = 0.4;
      gainNode.gain.setValueAtTime(velocity * 0.8, start);
      gainNode.gain.linearRampToValueAtTime(0.0, start + 0.4);
      stopAudioTime2 = 0;
      break;
    // Cymbal3

    case 59:
      source.playbackRate.value = 1.8;
      stopAudioTime = 0.3;
      gainNode.gain.setValueAtTime(velocity * 0.5, start);
      gainNode.gain.linearRampToValueAtTime(0.0, start + 0.3);
      stopAudioTime2 = 0;
      break;
    // Bongo

    case 60:
    case 61:
      // w
      source.playbackRate.value = 0.03;
      stopAudioTime = 0.03; // s

      gainNode2.gain.setValueAtTime(velocity * 0.8, start);
      gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.1);
      oscillator.frequency.setValueAtTime(400 - 40 * (option.pitch - 60), start);
      oscillator.frequency.linearRampToValueAtTime(450 - 40 * (option.pitch - 60), start + 0.1);
      stopAudioTime2 = 0.1;
      break;
    // mute Conga

    case 62:
      // w
      source.playbackRate.value = 0.03;
      stopAudioTime = 0.03; // s

      gainNode2.gain.setValueAtTime(velocity, start);
      gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.03);
      oscillator.frequency.setValueAtTime(200, start);
      oscillator.frequency.linearRampToValueAtTime(250, start + 0.03);
      stopAudioTime2 = 0.03;
      break;
    // open Conga

    case 63:
    case 64:
      // w
      source.playbackRate.value = 0.03;
      stopAudioTime = 0.03; // s

      gainNode2.gain.setValueAtTime(velocity, start);
      gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.1);
      oscillator.frequency.setValueAtTime(200 - 30 * (option.pitch - 63), start);
      oscillator.frequency.linearRampToValueAtTime(250 - 30 * (option.pitch - 63), start + 0.1);
      stopAudioTime2 = 0.1;
      break;
    // Cowbell, Claves

    case 56:
    case 75:
      // w
      source.playbackRate.value = 0.01;
      stopAudioTime = 0.1; // s

      gainNode2.gain.setValueAtTime(velocity, start);
      gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.1);
      oscillator.frequency.setValueAtTime(1000 + 48 * (option.pitch - 56), start);
      stopAudioTime2 = 0.1;
      break;
    // mute triangle

    case 80:
      // w
      source.playbackRate.value = 5;
      gainNode.gain.setValueAtTime(velocity * 0.5, start);
      gainNode.gain.linearRampToValueAtTime(0.0, start + 0.2);
      stopAudioTime = 0.05; // s

      oscillator.type = "triangle";
      gainNode2.gain.setValueAtTime(velocity * 0.7, start);
      gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.2);
      oscillator.frequency.setValueAtTime(6000, start);
      stopAudioTime2 = 0.05;
      break;
    // open triangle

    case 81:
      // w
      source.playbackRate.value = 5;
      gainNode.gain.setValueAtTime(velocity * 0.9, start);
      gainNode.gain.linearRampToValueAtTime(0.0, start + 0.5);
      stopAudioTime = 0.5; // s

      oscillator.type = "triangle";
      gainNode2.gain.setValueAtTime(velocity * 0.8, start);
      gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.3);
      oscillator.frequency.setValueAtTime(6000, start);
      stopAudioTime2 = 0.3;
      break;
    // 新しいパーカッション音源 //
    //     旧音源が優先で鳴る。上のソース
    //     旧音源で定義されていない場合は、新音源で鳴る。下のソース //
    // Bass Drum

    case 35: // Acoustic Bass Drum

    case 36:
      // Bass Drum
      {
        // w
        source.playbackRate.value = 0.25;
        gainNode.gain.setValueAtTime(0, start);
        gainNode.gain.linearRampToValueAtTime(velocity * 0.7, start + 0.004);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.008);
        stopAudioTime = 0.008; // s

        oscillator.frequency.setValueAtTime(option.pitch == 35 ? 90 : 160, start);
        oscillator.frequency.linearRampToValueAtTime(40, start + 0.08);
        gainNode2.gain.setValueAtTime(0, start);
        gainNode2.gain.linearRampToValueAtTime(velocity * 3, start + 0.02);
        gainNode2.gain.linearRampToValueAtTime(0, start + 0.08);
        stopAudioTime2 = 0.08;
        break;
      }
    // Snare Drum

    case 37:
      // Side Stick
      {
        // w
        source.playbackRate.value = 0.26;
        gainNode.gain.setValueAtTime(velocity * 1.5, start);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.041);
        stopAudioTime = 0.041; // s

        oscillator.frequency.setValueAtTime(330, start);
        oscillator.frequency.linearRampToValueAtTime(120, start + 0.02);
        gainNode2.gain.setValueAtTime(velocity, start);
        gainNode2.gain.linearRampToValueAtTime(0, start + 0.02);
        stopAudioTime2 = 0.02;
        break;
      }

    case 38: // Acoustic Snare

    case 40:
      // Electric Snare
      {
        var len = option.pitch == 38 ? 0.25 : 0.2; // w

        source.playbackRate.value = 0.7;
        gainNode.gain.setValueAtTime(velocity, start);
        gainNode.gain.linearRampToValueAtTime(0, start + len);
        stopAudioTime = len; // s

        oscillator.frequency.setValueAtTime(option.pitch == 38 ? 140 : 200, start);
        oscillator.frequency.linearRampToValueAtTime(option.pitch == 38 ? 100 : 160, start + 0.1);
        gainNode2.gain.setValueAtTime(velocity * 2, start);
        gainNode2.gain.linearRampToValueAtTime(0, start + 0.1);
        stopAudioTime2 = 0.1;
        break;
      }

    case 39:
      // Hand Clap
      {
        // w
        source.playbackRate.value = 0.5;
        gainNode.gain.setValueAtTime(velocity * 1.3, start);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.010);
        gainNode.gain.setValueAtTime(velocity * 1.3, start + 0.0101);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.020);
        gainNode.gain.setValueAtTime(velocity * 1.3, start + 0.0201);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.09);
        stopAudioTime = 0.09; // s

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(180, start);
        gainNode2.gain.setValueAtTime(velocity * 0.8, start);
        gainNode2.gain.linearRampToValueAtTime(0, start + 0.010);
        gainNode2.gain.setValueAtTime(velocity * 0.8, start + 0.0101);
        gainNode2.gain.linearRampToValueAtTime(0, start + 0.020);
        gainNode2.gain.setValueAtTime(velocity * 0.8, start + 0.0201);
        gainNode2.gain.linearRampToValueAtTime(0, start + 0.030);
        stopAudioTime2 = 0.11;
        break;
      }
    // Toms

    case 41: // Low Floor Tom

    case 43: // High Floor Tom

    case 45: // Low Tom

    case 47: // Low-Mid Tom

    case 48: // High-Mid Tom

    case 50:
      // High Tom
      {
        var _len = option.pitch - 41 + (option.pitch >= 48 ? 1 : 0); // w


        source.playbackRate.value = 0.3 + _len / 45;
        gainNode.gain.setValueAtTime(velocity * 1.5, start);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.02);
        stopAudioTime = 0.02; // s

        oscillator.frequency.setValueAtTime(90 + 15 * _len, start);
        oscillator.frequency.linearRampToValueAtTime(30 + 7.5 * _len, start + 0.5 - _len / 35);
        gainNode2.gain.setValueAtTime(velocity * 1.5, start);
        gainNode2.gain.linearRampToValueAtTime(0, start + 0.5 - _len / 35);
        stopAudioTime2 = 0.5 - _len / 35;
        break;
      }
    // Hi-hat

    case 42: // Closed High-Hat

    case 44:
      // Pedal High-Hat
      {
        // w
        source.playbackRate.value = 1;

        if (option.pitch == 42) {
          gainNode.gain.setValueAtTime(velocity * 0.8, start);
        } else {
          gainNode.gain.setValueAtTime(0, start);
          gainNode.gain.linearRampToValueAtTime(velocity * 0.8, start + 0.014);
        }

        gainNode.gain.linearRampToValueAtTime(0, start + 0.08);
        stopAudioTime = 0.08; // s

        gainNode2.gain.value = 0;
        stopAudioTime2 = 0;
        break;
      }

    case 46:
      // Open Hihat
      {
        // w
        source.playbackRate.setValueAtTime(0.35, start);
        source.playbackRate.linearRampToValueAtTime(0.6, start + 0.1);
        source.playbackRate.linearRampToValueAtTime(1, start + 0.3);
        gainNode.gain.setValueAtTime(velocity * 1.1, start);
        gainNode.gain.setTargetAtTime(0, start, 0.3);
        stopAudioTime = 1.5; // s

        gainNode2.gain.value = 0;
        stopAudioTime2 = 0;
        break;
      }
    // Cymbal

    case 49: // Crash Cymbal 1

    case 57:
      // Crash Cymbal 2
      {
        // w
        var r = option.pitch == 49 ? 0.3 : 0.5;
        var r2 = option.pitch == 49 ? 0.4 : 0.7;
        source.playbackRate.setValueAtTime(r, start);
        source.playbackRate.linearRampToValueAtTime(r2, start + 0.15);
        source.playbackRate.linearRampToValueAtTime(0.9, start + 0.4);
        gainNode.gain.setValueAtTime(velocity * 1.3, start);
        gainNode.gain.setTargetAtTime(0, start, 0.35);
        stopAudioTime = 2; // s

        gainNode2.gain.value = 0;
        stopAudioTime2 = 0;
        break;
      }

    case 51: // Ride Cymbal 1

    case 59:
      // Ride Cymbal 2
      {
        // w
        source.playbackRate.value = 1;
        gainNode.gain.setValueAtTime(velocity * 0.9, start);
        gainNode.gain.setTargetAtTime(0, start, 0.35);
        stopAudioTime = 2; // s

        oscillator.type = "triangle";
        var f = option.pitch == 51 ? 372 : 400;
        oscillator.frequency.setValueAtTime(f, start);
        gainNode2.gain.setValueAtTime(velocity * 0.4, start);
        gainNode2.gain.setTargetAtTime(0, start, 0.35);
        stopAudioTime2 = 2;
        break;
      }

    case 52:
      // Chinese Cymbal
      {
        // w
        source.playbackRate.setValueAtTime(0.17, start);
        source.playbackRate.linearRampToValueAtTime(0.25, start + 0.1);
        source.playbackRate.linearRampToValueAtTime(0.5, start + 0.6);
        gainNode.gain.setValueAtTime(velocity * 1.3, start);
        gainNode.gain.setTargetAtTime(0, start, 0.35);
        stopAudioTime = 2; // s

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(382, start);
        gainNode2.gain.setValueAtTime(velocity * 0.2, start);
        gainNode2.gain.setTargetAtTime(0, start, 0.35);
        stopAudioTime2 = 2;
        break;
      }

    case 53:
      // Ride Bell
      {
        // w
        source.playbackRate.setValueAtTime(0.6, start);
        gainNode.gain.setValueAtTime(velocity, start);
        gainNode.gain.setTargetAtTime(0, start, 0.3);
        stopAudioTime = 2; // s

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(377, start);
        gainNode2.gain.setValueAtTime(velocity * 0.5, start);
        gainNode2.gain.setTargetAtTime(0, start, 0.35);
        stopAudioTime2 = 2;
        break;
      }

    case 55:
      // Splash Cymbal
      {
        // w
        source.playbackRate.setValueAtTime(0.5, start);
        source.playbackRate.linearRampToValueAtTime(0.8, start + 0.1);
        source.playbackRate.linearRampToValueAtTime(1, start + 0.6);
        gainNode.gain.setValueAtTime(velocity * 1.5, start);
        gainNode.gain.setTargetAtTime(0, start, 0.3);
        stopAudioTime = 1.75; // s

        gainNode2.gain.value = 0;
        stopAudioTime2 = 0;
        break;
      }
    // Bell

    case 54: // Tambourine

    case 56:
      // Cowbell
      {
        // w
        source.playbackRate.setValueAtTime(1, start);
        var v = option.pitch == 54 ? 1 : 0.4;

        var _len2 = option.pitch == 54 ? 0.01 : 0;

        gainNode.gain.setValueAtTime(velocity * v / 2, start);
        gainNode.gain.linearRampToValueAtTime(velocity * v, start + _len2);
        gainNode.gain.setTargetAtTime(0, start + _len2, 0.05);
        stopAudioTime = 0.3; // s

        oscillator.frequency.setValueAtTime(option.pitch == 54 ? 6000 : 495, start);
        v = option.pitch == 54 ? 1 : 2;
        gainNode2.gain.setValueAtTime(velocity * v / 2, start);
        gainNode2.gain.linearRampToValueAtTime(velocity * v, start + _len2);
        gainNode2.gain.setTargetAtTime(0, start + _len2, 0.05);
        stopAudioTime2 = 0.3;
        break;
      }

    case 58:
      // Vibraslap
      {
        // w s
        source.playbackRate.setValueAtTime(0.6, start);
        source.playbackRate.linearRampToValueAtTime(1, start + 0.8);
        var _len3 = 40;
        gainNode.gain.setValueAtTime(velocity * 1.5, start);
        gainNode2.gain.setValueAtTime(velocity * 0.5, start);

        for (var i = 0; i < _len3; i++) {
          gainNode.gain.linearRampToValueAtTime(velocity * 0.1 * (_len3 - i) / _len3, start + i / _len3 * 0.8);
          gainNode.gain.linearRampToValueAtTime(velocity * 1.5 * (_len3 - (i + 1)) / _len3, start + (i + 0.99) / _len3 * 0.8);
          gainNode2.gain.linearRampToValueAtTime(velocity * 0.025 * (_len3 - i) / _len3, start + i / _len3 * 0.8);
          gainNode2.gain.linearRampToValueAtTime(velocity * 0.25 * (_len3 - (i + 1)) / _len3, start + (i + 0.99) / _len3 * 0.8);
        }

        gainNode.gain.linearRampToValueAtTime(0, start + 0.8);
        gainNode2.gain.linearRampToValueAtTime(0, start + 0.8);
        stopAudioTime = 0.8; // s

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(1000, start);
        stopAudioTime2 = 0.8;
        break;
      }

    case 80:
      // Mute Triangle
      {
        // w
        source.playbackRate.value = 1;
        gainNode.gain.setValueAtTime(velocity * 0.5, start);
        gainNode.gain.setTargetAtTime(0, start, 0.015);
        stopAudioTime = 0.2; // s

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(6000, start);
        gainNode2.gain.setValueAtTime(velocity * 2.5, start);
        gainNode2.gain.setTargetAtTime(0, start, 0.02);
        stopAudioTime2 = 0.3;
        break;
      }

    case 81:
      // Open Triangle
      {
        // w
        source.playbackRate.value = 5;
        gainNode.gain.setValueAtTime(velocity * 0.5, start);
        gainNode.gain.setTargetAtTime(0, start, 0.08);
        stopAudioTime = 0.75; // s

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(6000, start);
        gainNode2.gain.setValueAtTime(velocity * 2.5, start);
        gainNode2.gain.setTargetAtTime(0, start, 0.18);
        stopAudioTime2 = 1;
        break;
      }
    // Other Percussion

    case 60: // High Bongo

    case 61: // Low Bongo

    case 62: // Mute High Conga

    case 63: // Open High Conga

    case 64:
      // Low Conga
      {
        var p = option.pitch;

        var _r = p == 60 ? 700 : p == 61 ? 282 : p == 62 ? 385 : p == 63 ? 295 : 210;

        var _len4 = p == 60 ? 0.08 : p == 61 ? 0.1 : p == 62 ? 0.03 : p == 63 ? 0.12 : 0.15; // w


        source.playbackRate.value = 0.03;
        gainNode.gain.setValueAtTime(velocity * 1.2, start);
        stopAudioTime = 0.03; // s

        oscillator.frequency.setValueAtTime(_r * 0.97, start);
        oscillator.frequency.linearRampToValueAtTime(_r, start + _len4);
        gainNode2.gain.setValueAtTime(velocity * 1.8, start);
        gainNode2.gain.linearRampToValueAtTime(0, start + _len4);
        stopAudioTime2 = _len4;
        break;
      }

    case 65: // High Timbale

    case 66:
      // Low Timbale
      {
        var _len5 = option.pitch == 65 ? 0.22 : 0.25; // w


        source.playbackRate.setValueAtTime(option.pitch == 65 ? 0.25 : 0.22, start);
        source.playbackRate.linearRampToValueAtTime(option.pitch == 65 ? 0.2 : 0.18, start + _len5);
        gainNode.gain.setValueAtTime(velocity * 1.3, start);
        gainNode.gain.linearRampToValueAtTime(velocity * 0.2, start + _len5 / 3.5);
        gainNode.gain.linearRampToValueAtTime(0, start + _len5);
        stopAudioTime = _len5; // s

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(option.pitch == 65 ? 190 * 1.07 : 136 * 1.07, start);
        oscillator.frequency.linearRampToValueAtTime(option.pitch == 65 ? 190 : 136, start + 0.1);
        gainNode2.gain.setValueAtTime(velocity * 3.2, start);
        gainNode2.gain.setTargetAtTime(0, start, 0.08);
        stopAudioTime2 = 1;
        break;
      }

    case 67: // High Agogo

    case 68:
      // Low Agogo
      {
        // w
        source.playbackRate.value = 1;
        gainNode.gain.setValueAtTime(velocity * 0.5, start);
        gainNode.gain.linearRampToValueAtTime(velocity * 0.1, start + 0.02);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.08);
        stopAudioTime = 0.08; // s

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(option.pitch == 67 ? 1430 : 1055, start);
        gainNode2.gain.setValueAtTime(velocity * 2, start);
        gainNode2.gain.setTargetAtTime(0, start, 0.06);
        stopAudioTime2 = 0.75;
        break;
      }

    case 69:
      // Cabasa
      {
        // w
        source.playbackRate.value = 1;
        gainNode.gain.setValueAtTime(velocity * 0.3, start);
        gainNode.gain.linearRampToValueAtTime(velocity * 0.8, start + 0.03);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.08);
        stopAudioTime = 0.08; // s

        gainNode2.gain.value = 0;
        stopAudioTime2 = 0;
        break;
      }

    case 70:
      // Maracas
      {
        // w
        source.playbackRate.value = 1;
        gainNode.gain.setValueAtTime(velocity * 1.2, start);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.06);
        stopAudioTime = 0.06; // s

        gainNode2.gain.value = 0;
        stopAudioTime2 = 0;
        break;
      }

    case 71: // Short Whistle

    case 72:
      // Long Whistle
      {
        // w
        gainNode.gain.value = 0;
        stopAudioTime = 0; // s

        var _len6 = option.pitch == 71 ? 0.07 : 0.4;

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(option.pitch == 71 ? 2408 : 2105, start);
        gainNode2.gain.setValueAtTime(0, start);

        for (var _i = 0; _i < _len6 * 74; _i++) {
          gainNode2.gain.linearRampToValueAtTime(velocity * 2.5, start + (_i + 0.2) / 75);
          gainNode2.gain.linearRampToValueAtTime(velocity * 0.5, start + (_i + 0.9) / 75);
        }

        gainNode2.gain.linearRampToValueAtTime(0, start + _len6);
        stopAudioTime2 = _len6;
        break;
      }

    case 73: // Short Guiro

    case 74:
      // Long Guiro
      {
        // w
        var _len7 = option.pitch == 73 ? 0.05 : 0.35;

        source.playbackRate.setValueAtTime(option.pitch == 73 ? 0.2 : 0.2, start);
        source.playbackRate.linearRampToValueAtTime(option.pitch == 73 ? 0.7 : 0.5, start + _len7);
        gainNode.gain.value = velocity * 0.2;

        for (var _i2 = 0; _i2 < _len7 * 100; _i2++) {
          gainNode.gain.setValueAtTime(velocity * 0.4, start + _i2 / 100);
          gainNode.gain.setValueAtTime(velocity * 0.9, start + (_i2 + 0.7) / 100);
        }

        stopAudioTime = _len7; // s

        gainNode2.gain.value = 0;
        stopAudioTime2 = 0;
        break;
      }

    case 75:
      // Claves
      {
        // w
        gainNode.gain.value = 0;
        stopAudioTime = 0; // s

        oscillator.frequency.setValueAtTime(2181, start);
        gainNode2.gain.setValueAtTime(0, start);
        gainNode2.gain.setValueAtTime(velocity * 2, start + 0.005);
        gainNode2.gain.linearRampToValueAtTime(velocity * 1, start + 0.015);
        gainNode2.gain.linearRampToValueAtTime(velocity * 1.5, start + 0.025);
        gainNode2.gain.linearRampToValueAtTime(0, start + 0.08);
        stopAudioTime2 = 0.1;
        break;
      }

    case 76: // High Wood Block

    case 77:
      // Low Wood Block
      {
        // w
        source.playbackRate.value = 0.1;
        gainNode.gain.setValueAtTime(velocity * 1.2, start);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.015);
        stopAudioTime = 0.015; // s

        oscillator.frequency.setValueAtTime(option.pitch == 76 ? 800 : 600, start);
        gainNode2.gain.setValueAtTime(0, start);
        gainNode2.gain.linearRampToValueAtTime(velocity * 3, start + 0.005);
        gainNode2.gain.setTargetAtTime(0, start + 0.005, 0.02);
        stopAudioTime2 = 0.2;
        break;
      }

    case 78: // Close Cuica

    case 79:
      // Open Cuica
      {
        // w
        gainNode.gain.value = 0;
        stopAudioTime = 0; // s

        var _len8 = 0.18;

        var _f = option.pitch == 78 ? 750 : 270;

        oscillator.frequency.setValueAtTime(_f, start);
        oscillator.frequency.linearRampToValueAtTime(_f, start + _len8 / 3);
        if (option.pitch == 78) oscillator.frequency.linearRampToValueAtTime(_f * 0.9, start + _len8);
        gainNode2.gain.setValueAtTime(0, start);
        gainNode2.gain.linearRampToValueAtTime(velocity * 1.5, start + 0.005);
        gainNode2.gain.linearRampToValueAtTime(velocity * 0.5, start + 0.02);
        gainNode2.gain.linearRampToValueAtTime(velocity * 3, start + 0.04);
        gainNode2.gain.linearRampToValueAtTime(velocity * 2, start + _len8 / 4 * 3);
        gainNode2.gain.linearRampToValueAtTime(0, start + _len8);
        stopAudioTime2 = _len8;
        break;
      }
    // GS, GM2

    case 27:
      // High Q
      {
        // w
        source.playbackRate.value = 1;
        gainNode.gain.setValueAtTime(velocity * 1, start);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.002);
        stopAudioTime = 0.002; // s

        oscillator.frequency.setValueAtTime(1500, start);
        oscillator.frequency.linearRampToValueAtTime(280, start + 0.015);
        oscillator.frequency.linearRampToValueAtTime(0, start + 0.07);
        gainNode2.gain.setValueAtTime(velocity * 1.9, start);
        gainNode2.gain.linearRampToValueAtTime(0, start + 0.07);
        stopAudioTime2 = 0.07;
        break;
      }

    case 28:
      // Slap
      {
        // w
        source.playbackRate.value = 1;
        gainNode.gain.setValueAtTime(velocity * 1.3, start);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.010);
        gainNode.gain.setValueAtTime(velocity * 1.1, start + 0.0101);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.020);
        gainNode.gain.setValueAtTime(velocity * 0.9, start + 0.0201);
        gainNode.gain.setTargetAtTime(0, start + 0.0201, 0.03);
        stopAudioTime = 0.2; // s

        gainNode2.gain.value = 0;
        stopAudioTime2 = 0;
        break;
      }

    case 29: // Scratch Push

    case 30:
      // Scratch Pull
      {
        var t1 = option.pitch == 29 ? 0.05 : 0.07;
        var t2 = option.pitch == 29 ? 0.06 : 0.09;
        var t3 = option.pitch == 29 ? 0.07 : 0.11;
        var t4 = option.pitch == 29 ? 0.1 : 0.15;
        var t5 = option.pitch == 29 ? 0.25 : 0.4; // w

        var r1 = option.pitch == 29 ? 0.1 : 0.06;

        var _r2 = option.pitch == 29 ? 0.3 : 0.2;

        var r3 = option.pitch == 29 ? 0.18 : 0.12;
        source.playbackRate.setValueAtTime(r1, start);
        source.playbackRate.linearRampToValueAtTime(_r2, start + t1);
        source.playbackRate.linearRampToValueAtTime(0, start + t2);
        source.playbackRate.linearRampToValueAtTime(_r2, start + t3);
        source.playbackRate.linearRampToValueAtTime(r3, start + t4);
        source.playbackRate.linearRampToValueAtTime(0, start + t5);
        gainNode.gain.setValueAtTime(0, start);
        gainNode.gain.linearRampToValueAtTime(velocity * 0.4, start + t1);
        gainNode.gain.linearRampToValueAtTime(velocity * 0.1, start + t3);
        gainNode.gain.linearRampToValueAtTime(velocity * 0.3, start + t4);
        gainNode.gain.linearRampToValueAtTime(0, start + t5);
        stopAudioTime = t5; // s

        var r4 = option.pitch == 29 ? 500 : 400;
        var r5 = option.pitch == 29 ? 1950 : 1200;
        var r6 = option.pitch == 29 ? 430 : 250;
        oscillator.frequency.setValueAtTime(r4, start);
        oscillator.frequency.linearRampToValueAtTime(r5, start + t1);
        oscillator.frequency.linearRampToValueAtTime(0, start + t2);
        oscillator.frequency.linearRampToValueAtTime(r5, start + t3);
        oscillator.frequency.linearRampToValueAtTime(r6, start + t4);
        oscillator.frequency.linearRampToValueAtTime(0, start + t5);
        gainNode2.gain.setValueAtTime(0, start);
        gainNode2.gain.linearRampToValueAtTime(velocity * 0.7, start + t1);
        gainNode2.gain.linearRampToValueAtTime(velocity * 0.2, start + t3);
        gainNode2.gain.linearRampToValueAtTime(velocity * 0.6, start + t4);
        gainNode2.gain.linearRampToValueAtTime(0, start + t5);
        stopAudioTime2 = t5;
        break;
      }

    case 31:
      // Sticks
      {
        // w
        source.playbackRate.setValueAtTime(0.4, start);
        source.playbackRate.linearRampToValueAtTime(0.5, start + 0.015);
        gainNode.gain.setValueAtTime(velocity * 1.2, start);
        gainNode.gain.setTargetAtTime(0, start, 0.035);
        stopAudioTime = 0.3; // s

        oscillator.frequency.setValueAtTime(3140, start);
        gainNode2.gain.setValueAtTime(velocity * 1.2, start);
        gainNode2.gain.setTargetAtTime(0, start, 0.012);
        stopAudioTime2 = 0.3;
        break;
      }

    case 32:
      // Square Click
      {
        // w
        gainNode.gain.value = 0;
        stopAudioTime = 0; // s

        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(333, start);
        gainNode2.gain.setValueAtTime(0, start);
        gainNode2.gain.linearRampToValueAtTime(velocity * 4, start + 0.0016);
        gainNode2.gain.linearRampToValueAtTime(0, start + 0.0032);
        stopAudioTime2 = 0.0032;
        break;
      }

    case 33: // Metronome Click

    case 34:
      // Metronome Bell
      {
        // w
        source.playbackRate.setValueAtTime(0.17, start);
        source.playbackRate.linearRampToValueAtTime(0.22, start + 0.01);
        gainNode.gain.setValueAtTime(velocity * 1.5, start);
        gainNode.gain.setTargetAtTime(0, start, 0.015);
        stopAudioTime = 0.3; // s

        if (option.pitch == 34) {
          oscillator.frequency.setValueAtTime(2040, start);
          gainNode2.gain.setValueAtTime(velocity * 1, start);
          gainNode2.gain.setTargetAtTime(0, start, 0.12);
          stopAudioTime2 = 1.1;
        } else {
          gainNode2.gain.value = 0;
          stopAudioTime2 = 0;
        }

        break;
      }

    case 82:
      // Shaker
      {
        // w
        source.playbackRate.value = 1;
        gainNode.gain.setValueAtTime(velocity * 0.5, start);
        gainNode.gain.linearRampToValueAtTime(velocity, start + 0.02);
        gainNode.gain.linearRampToValueAtTime(0, start + 0.07);
        stopAudioTime = 0.07; // s

        gainNode2.gain.value = 0;
        stopAudioTime2 = 0;
        break;
      }

    case 83:
      // Jingle Bell
      {
        // w
        source.playbackRate.value = 1;
        gainNode.gain.setValueAtTime(0, start);
        gainNode.gain.linearRampToValueAtTime(velocity * 1.2, start + 0.015);
        gainNode.gain.setTargetAtTime(0, start + 0.015, 0.06);
        stopAudioTime = 0.5; // s

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(2709, start);
        oscillator.frequency.linearRampToValueAtTime(2657, start + 0.3);
        gainNode2.gain.setValueAtTime(0, start);
        gainNode2.gain.linearRampToValueAtTime(velocity * 0.7, start + 0.025);
        gainNode2.gain.setTargetAtTime(0, start + 0.025, 0.07);
        stopAudioTime2 = 0.5;
        break;
      }

    case 84:
      // Bell Tree
      {
        // w s
        var invert = false;
        source.playbackRate.value = 1;

        for (var _i3 = 0; _i3 < 28; _i3++) {
          gainNode.gain.setValueAtTime(velocity * 0.1, start + _i3 / 24 * 0.45);
          gainNode.gain.setTargetAtTime(0, start + _i3 / 24 * 0.45, 0.01);
          oscillator.frequency.setValueAtTime(1380 * (1 + (invert ? (24 - _i3) / 24 : _i3 / 24)), start + _i3 / 24 * 0.45);
          gainNode2.gain.setValueAtTime(velocity * (0.2 + _i3 / 24), start + _i3 / 24 * 0.45);
          gainNode2.gain.setTargetAtTime(0, start + _i3 / 24 * 0.45, _i3 == 27 ? 0.2 : 0.01);
        }

        stopAudioTime = 0.5;
        stopAudioTime2 = 1.5;
        break;
      }

    case 85:
      // Castanets
      {
        // w
        source.playbackRate.setValueAtTime(0.35, start);
        gainNode.gain.setValueAtTime(velocity * 1.3, start);
        gainNode.gain.setTargetAtTime(0, start, 0.01);
        stopAudioTime = 0.1; // s

        oscillator.frequency.setValueAtTime(1730, start);
        gainNode2.gain.setValueAtTime(velocity * 0.5, start);
        gainNode2.gain.setTargetAtTime(0, start, 0.01);
        stopAudioTime2 = 0.1;
        break;
      }

    case 86: // Mute Surdo

    case 87:
      // Open Surdo
      {
        // w
        source.playbackRate.setValueAtTime(0.020, start);
        source.playbackRate.linearRampToValueAtTime(0.015, start + 0.5);
        gainNode.gain.setValueAtTime(0, start);
        gainNode.gain.linearRampToValueAtTime(velocity * 2, start + 0.005);
        gainNode.gain.setTargetAtTime(0, start + 0.005, option.pitch == 86 ? 0.03 : 0.06);
        stopAudioTime = 0.5; // s

        oscillator.frequency.setValueAtTime(88, start);
        oscillator.frequency.linearRampToValueAtTime(86, start + 0.3);
        gainNode2.gain.setValueAtTime(velocity * 2.5, start);
        gainNode2.gain.setTargetAtTime(0, start, option.pitch == 86 ? 0.1 : 0.3);
        stopAudioTime2 = option.pitch == 86 ? 0.5 : 1.5;
        break;
      }

    default:
      {
        source.playbackRate.value = option.pitch / 69 * 2;
        stopAudioTime = 0.05;
        stopAudioTime2 = 0;
        break;
      }
  } // 同じドラムの音が重ならないようにする機能
  // ドラム再生中に次の同じドラムがすぐ鳴る場合、次が鳴る前に止めて音が重ならないようにする（同時発音数の増加を軽減する）


  if (!this.settings.isSameDrumSoundOverlap && nextSameNoteOnInterval != -1) {
    if (stopAudioTime > nextSameNoteOnInterval) {
      stopAudioTime = nextSameNoteOnInterval;
    }

    if (stopAudioTime2 > nextSameNoteOnInterval) {
      stopAudioTime2 = nextSameNoteOnInterval;
    }
  } // ドラム音停止時間を設定


  this.stopAudioNode(source, start + stopAudioTime, stopGainNode);
  this.stopAudioNode(oscillator, start + stopAudioTime2, stopGainNode2); // ドラム停止時間を設定

  option.drumStopTime = option.startTime + (stopAudioTime >= stopAudioTime2 ? stopAudioTime : stopAudioTime2); // 音をストップさせる関数を返す //

  return function () {
    _this.stopAudioNode(source, 0, stopGainNode, true);

    _this.stopAudioNode(oscillator, 0, stopGainNode2, true);
  };
}

/***/ }),
/* 288 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return stopAudioNode; });
function stopAudioNode(tar, time, stopGainNode, isNoiseCut) {
  var isImmed = time <= this.context.currentTime; // 即時ストップか？
  // 予約ストップ //

  var vol1Time = time - 0.005;
  var stopTime = time; // 時間設定 //

  if (isImmed) {
    // 即時ストップ
    if (!isNoiseCut) {
      stopTime = this.context.currentTime;
    } else {
      // ノイズカット
      vol1Time = this.context.currentTime;
      stopTime = this.context.currentTime + 0.005;
    }
  } // 音の停止 //


  try {
    // 通常の音停止処理
    if (!isNoiseCut) {
      tar.stop(stopTime);
    } else {
      // ノイズカット（音の終わりに短いフェードアウトを入れる）
      tar.stop(stopTime);
      stopGainNode.gain.cancelScheduledValues(0);
      stopGainNode.gain.setValueAtTime(1, vol1Time);
      stopGainNode.gain.linearRampToValueAtTime(0, stopTime);
    }
  } catch (e) {
    // iOS用 (stopが２回以上使えないので、代わりにstopGainNodeでミュートにする)
    stopGainNode.gain.cancelScheduledValues(0);

    if (!isNoiseCut) {
      stopGainNode.gain.setValueAtTime(0, stopTime);
    } else {
      // ノイズカット（音の終わりに短いフェードアウトを入れる）
      stopGainNode.gain.setValueAtTime(1, vol1Time);
      stopGainNode.gain.linearRampToValueAtTime(0, stopTime);
    }
  }
}

/***/ }),
/* 289 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return pushFunc; });
function pushFunc(tar) {
  if (!tar.note && !tar.rootTimeout && !tar.pan && !this.trigger.isNoteTrigger) {
    return;
  }

  this.states.stopFuncs.push(tar);
}

/***/ }),
/* 290 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return clearFunc; });
/* harmony import */ var _util_array_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(282);

function clearFunc(tar1, tar2) {
  if (tar1 != "note" && tar1 != "rootTimeout" && tar1 != "pan" && !this.trigger.isNoteTrigger) {
    return;
  }

  this.states.stopFuncs.some(function (n, i, ary) {
    if (n[tar1] == tar2) {
      _util_array_util_js__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"](ary, i); // ary.splice(i, 1); を高速化

      return true;
    }
  });
}

/***/ }),
/* 291 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getTime; });
/**
 * tickからtime(秒)を求める
 * @param {number} tick
 * @returns {number} time(秒)
 */
function getTime(tick) {
  var imid = -1; // tempo変更がある場合、tickを検索する //

  if (this.tempoTrack && this.tempoTrack.length >= 1) {
    // 最後のtickを超える場合、最後のtimeを返す //
    if (tick >= this.tempoTrack[this.tempoTrack.length - 1].timing) {
      return this.tempoTrack[this.tempoTrack.length - 1].time;
    } // 二分探索でtickを探す //


    var imin = 0;
    var imax = this.tempoTrack.length - 1;

    while (true) {
      imid = Math.floor(imin + (imax - imin) / 2);
      var tempTiming = this.tempoTrack[imid].timing;

      if (tick < tempTiming) {
        imax = imid - 1;
      } else if (tick > tempTiming) {
        imin = imid + 1;
      } else {
        break;
      }

      if (imin > imax) {
        if (tick < tempTiming) imid--;
        break;
      }
    }
  }

  var time = 0;
  var baseTiming = 0;
  var tempo = 120;

  if (imid >= 0) {
    // tickを探索して見つかった場合
    // 引数tickに一番近いtickを取得
    var tempoObj = this.tempoTrack[imid];
    time = tempoObj.time;
    baseTiming = tempoObj.timing;
    tempo = tempoObj.value;
  } // tickからtimeを算出する
  // 引数tickに一番近いtickのtime ＋ 引数tickから残りのtimeを算出 ＝ 現在のtime


  time += 60 / tempo / this.settings.resolution * (tick - baseTiming);
  return time;
}

/***/ }),
/* 292 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getTiming; });
/**
 * time(秒)からtickを求める
 * @param {number} time
 * @returns {number} tick
 */
function getTiming(time) {
  var imid = -1; // tempo変更がある場合、timeを検索する //

  if (this.tempoTrack && this.tempoTrack.length >= 1) {
    // 最後のtimeを超える場合、最後のtickを返す
    if (time >= this.tempoTrack[this.tempoTrack.length - 1].time) {
      return this.tempoTrack[this.tempoTrack.length - 1].timing;
    } // 二分探索でtimeを探す


    var imin = 0;
    var imax = this.tempoTrack.length - 1;

    while (true) {
      imid = Math.floor(imin + (imax - imin) / 2);
      var tempTime = this.tempoTrack[imid].time;

      if (time < tempTime) {
        imax = imid - 1;
      } else if (time > tempTime) {
        imin = imid + 1;
      } else {
        break;
      }

      if (imin > imax) {
        if (time < tempTime) imid--;
        break;
      }
    }
  }

  var baseTime = 0;
  var tick = 0;
  var tempo = 120;

  if (imid >= 0) {
    // timeを探索して見つかった場合
    // 引数timeに一番近いtimeを取得
    var tempoObj = this.tempoTrack[imid];
    baseTime = tempoObj.time;
    tick = tempoObj.timing;
    tempo = tempoObj.value;
  } // timeからtickを算出する
  // 引数timeに一番近いtimeのtick ＋ 現在timeから残りのtickを算出 ＝ 現在のtick


  tick += (time - baseTime) / (60 / tempo / this.settings.resolution);
  return tick;
}

/***/ }),
/* 293 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PerformanceUtil; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PerformanceUtil =
/*#__PURE__*/
function () {
  function PerformanceUtil() {
    _classCallCheck(this, PerformanceUtil);
  }

  _createClass(PerformanceUtil, null, [{
    key: "measureReverb",

    /**
     * 0.5秒パフォーマンス計測して、リバーブONで良さそうか判断する
     * @returns {boolean} リバーブONで良さそう
     */
    value: function measureReverb() {
      var max = 500000; // 0.5秒以内にここまで計算できればリバーブON

      var startTime = performance.now();
      var i = 0;

      for (; i < max; i++) {
        if (performance.now() - startTime >= 500) break;
      }

      if (this.debug) {
        console.log("measureReverb", i, performance.now() - startTime);
      }

      if (i < max) return false;
      return true;
    }
  }]);

  return PerformanceUtil;
}();



/***/ }),
/* 294 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseSMF; });
/* harmony import */ var _parse_smf_parse_header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(295);
/* harmony import */ var _parse_smf_parse_track_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(296);
/* harmony import */ var _parse_smf_parse_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(297);



function parseSMF(_smf) {
  if (this.debug) {
    console.log(_smf);
    var syoriTimeS1 = performance.now();
  } // smf配列はデータ上書きするので_smfをディープコピーする


  var smf = new Uint8Array(_smf); // SMFのフォーマットかどうかチェック //
  // "MThd"

  if (smf[0] != 77 || smf[1] != 84 || smf[2] != 104 || smf[3] != 100) return "Not Sandard MIDI File."; // 関数間でデータをやり取りするためのObject //

  var info = {};
  info.smf = smf; // ヘッダー解析 //

  _parse_smf_parse_header_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, info);

  if (this.debug) {
    var syoriTimeS2 = performance.now();
  } // トラック解析 //


  _parse_smf_parse_track_js__WEBPACK_IMPORTED_MODULE_1__["default"].call(this, info);

  if (this.debug) {
    var syoriTimeS3 = performance.now();
  } // MIDIイベント解析 //


  _parse_smf_parse_event_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(this, info); // return用のオブジェクトに情報を代入 //

  var data = {};
  data.header = info.header;
  data.tempoTrack = info.tempoTrack;
  data.beatTrack = info.beatTrack;
  data.channels = info.channels;
  data.songLength = info.songLength;
  data.cc111Tick = info.cc111Tick;
  data.cc111Time = info.cc111Time;
  data.firstNoteOnTiming = info.firstNoteOnTiming;
  data.firstNoteOnTime = info.firstNoteOnTime;
  data.lastNoteOffTiming = info.lastNoteOffTiming;
  data.lastNoteOffTime = info.lastNoteOffTime;

  if (this.settings.isWebMIDI) {
    data.messages = info.messages;
    data.smfData = new Uint8Array(smf); // lastStateを上書きしたsmfをコピー
  }

  if (this.debug) {
    var syoriTimeE = performance.now();
    console.log("parseSMF time", syoriTimeE - syoriTimeS1);
    console.log("parseSMF(0/2) time", syoriTimeS2 - syoriTimeS1);
    console.log("parseSMF(1/2) time", syoriTimeS3 - syoriTimeS2);
    console.log("parseSMF(2/2) time", syoriTimeE - syoriTimeS3);
    console.log(data);
  }

  return data;
}

/***/ }),
/* 295 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseHeader; });
/* harmony import */ var _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(283);

function parseHeader(info) {
  // 関数呼び出し元からデータをもらう //
  var smf = info.smf; // SMFのヘッダチャンクを解析 //

  var p = 4;
  var header = {};
  header.size = _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getInt(smf, 4, 8);
  header.format = smf[9];
  header.trackcount = _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getInt(smf, 10, 12);
  header.timemanage = smf[12];
  header.resolution = _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getInt(smf, 12, 14); // TODO 0除算防止。15bit目1のとき、https://sites.google.com/site/yyagisite/material/smfspec#ConductorTrack

  p += 4 + header.size; // 変数を用意 //

  var channels = [];
  var chSize = this.settings.isWebMIDI ? 17 : 16; // WebMIDI用に17chに全てのイベントを入れるため17ch分作る

  for (var i = 0; i < chSize; i++) {
    var channel = {};
    channels.push(channel); // smfを読む順番を記録した索引配列を作る //
    // 型付き配列をリスト構造の配列のように使う（リスト構造にすることで挿入処理を高速化する）
    // [tick, smfMesLength, smfPtr, nextIndicesPtr, ...]

    channel.indices = [];
    channel.indicesLength = 0;
    channel.indicesHead = -1; // 先頭のポインタ

    channel.indicesFoot = 0; // 末尾のポインタ

    channel.indicesCur = 0; // 現在のinsert用ポインタ

    channel.indicesPre = 0; // 前回のinsert用ポインタ

    channel.notes = [];
  } // 関数呼び出し元にデータを返す //


  info.p = p;
  info.header = header;
  info.channels = channels;
  return info;
}

/***/ }),
/* 296 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseTrack; });
/* harmony import */ var _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(283);

function parseTrack(info) {
  // 関数呼び出し元からデータをもらう //
  var smf = info.smf;
  var p = info.p;
  var header = info.header;
  var channels = info.channels; // SMFのトラックチャンクの解析・"SMF読み込み順序配列"を作成 //
  //   全トラックを解析しながら、SMFを読む順番を記録した配列を作成する
  //   読み込む順番は、この解析でデルタタイム順になるようソートしておく
  //   SMFのMIDIイベント解析時は、上記配列から「次はMIDIファイルの何バイト目を見るか」を取得して解析する
  //   上記配列はリスト構造の配列のように使う（リスト構造にすることで配列のinsert処理を高速化する）
  // 
  // ■配列イメージ（json風）■
  // [
  //     {
  //         tick : このMIDIイベントのTick,
  //         smfMesLength : １つのMIDIイベントの長さ,
  //         smfPtr : このMIDIイベントはMIDIファイルの何バイト目にあるか,
  //         nextIndicesPtr : 次のオブジェクトはリスト配列の何番目にあるか
  //     },
  //     ...
  // ]
  // 
  // ■実際の配列イメージ■
  // [tick, smfMesLength, smfPtr, nextIndicesPtr, ...]

  var tempoTrack = [];
  var beatTrack = [];
  var songLength = 0;

  for (var t = 0; t < header.trackcount; t++) {
    // "MTrk"
    if (smf[p] != 77 || smf[p + 1] != 84 || smf[p + 2] != 114 || smf[p + 3] != 107) return "Irregular SMF.";
    p += 4;
    var endPoint = p + 4 + _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getInt(smf, p, p + 4);
    p += 4;
    var tick = 0;
    var tempo = 120;
    var tempoCurTick = 0;
    var tempoCurTime = 0;
    var lastState = 1;
    var dt = void 0;

    while (p < endPoint) {
      // DeltaTime
      if (lastState != null) {
        var lengthAry = _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].variableLengthToInt(smf, p, p + 5);
        dt = lengthAry[0];
        tick += dt;
        p += lengthAry[1];
      }

      var cashP = p; // WebMIDI用
      // Events

      var mes0 = smf[p] >> 4; // Math.floor(smf[p] / 0x10)

      switch (mes0) {
        case 0x8: // Note OFF - 8[ch], Pitch, Velocity

        case 0x9: // Note ON - 9[ch], Pitch, Velocity

        case 0xA: // Polyfonic Key Pressure - A[ch], Pitch?, Velocity?

        case 0xB: // Control Change - B[ch],,

        case 0xE:
          // PitchBend Change - E[ch],,
          {
            // チャンネル毎に仕分けた後に解析する
            lastState = smf[p];
            var ch = channels[lastState & 0x0F];
            _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].chIndicesInsert(this, ch, tick, p, 3);
            p += 3;
            break;
          }

        case 0xC: // Program Change - C[ch],

        case 0xD:
          // Channel Pre - D[ch],
          {
            // チャンネル毎に仕分けた後に解析する
            lastState = smf[p];
            var _ch = channels[lastState & 0x0F];
            _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].chIndicesInsert(this, _ch, tick, p, 2);
            p += 2;
            break;
          }
        // SysEx Events or Meta Events - F[ch], ...

        case 0xF:
          {
            //lastState = smf[p]; <- ランニングステートは無い
            switch (smf[p]) {
              case 0xF0:
              case 0xF7:
                {
                  // SysEx Events
                  var _lengthAry = _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].variableLengthToInt(smf, p + 1, p + 1 + 4); // Master Volume
                  // 0xF0, size, 0x7f, 0x7f, 0x04, 0x01, 0xNN, volume, 0xF7


                  if (_lengthAry[0] >= 7 && smf[p + 2] == 0x7f && smf[p + 3] == 0x7f && smf[p + 4] == 0x04 && smf[p + 5] == 0x01) {
                    // 全チャンネルにMasterVolumeイベントを挿入する
                    for (var i = 0; i < 16; i++) {
                      var _ch2 = channels[i];
                      _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].chIndicesInsert(this, _ch2, tick, p, _lengthAry[0]);
                    }
                  }

                  p += 1 + _lengthAry[1] + _lengthAry[0];
                  break;
                }

              case 0xF1:
                p += 2;
                break;

              case 0xF2:
                p += 3;
                break;

              case 0xF3:
                p += 2;
                break;

              case 0xF6:
              case 0xF8:
              case 0xFA:
              case 0xFB:
              case 0xFC:
              case 0xFE:
                p += 1;
                break;

              case 0xFF:
                {
                  // Meta Events
                  switch (smf[p + 1]) {
                    case 0x00:
                    case 0x01:
                    case 0x02:
                    case 0x03:
                    case 0x04:
                    case 0x05:
                    case 0x06:
                    case 0x07:
                    case 0x20:
                      break;

                    case 0x2F:
                      tick += (this.settings.isSkipEnding ? 0 : header.resolution) - dt;
                      break;

                    case 0x51:
                      // Tempo
                      // 全チャンネルにTempoイベントを挿入する
                      for (var _i = 0; _i < 16; _i++) {
                        var _ch3 = channels[_i];
                        _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].chIndicesInsert(this, _ch3, tick, p, 6);
                      }

                      tempoCurTime += 60 / tempo / header.resolution * (tick - tempoCurTick);
                      tempoCurTick = tick;
                      tempo = 60000000 / (smf[p + 3] * 0x10000 + smf[p + 4] * 0x100 + smf[p + 5]);
                      tempoTrack.push({
                        timing: tick,
                        time: tempoCurTime,
                        value: tempo
                      });
                      break;

                    case 0x54:
                      break;

                    case 0x58:
                      // Beat
                      beatTrack.push({
                        timing: tick,
                        value: [smf[p + 3], Math.pow(2, smf[p + 4])]
                      });
                      break;

                    case 0x59:
                    case 0x7F:
                      break;
                  }

                  var _lengthAry2 = _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].variableLengthToInt(smf, p + 2, p + 2 + 4);

                  p += 2 + _lengthAry2[1] + _lengthAry2[0];
                  break;
                }
            }

            break;
          }

        default:
          {
            if (lastState == null) return "Irregular SMF. (" + p + " byte addr)";
            p--;
            smf[p] = lastState; // 上書き

            lastState = null;
          }
      } // WebMIDIAPI


      if (this.settings.isWebMIDI) {
        if (lastState != null) {
          // WebMIDI用に17chに全てのMIDIイベントを入れる
          _util_parse_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].chIndicesInsert(this, channels[16], tick, cashP, p - cashP);
        }
      }
    }

    if (!this.settings.isSkipEnding && songLength < tick) songLength = tick; // リスト配列のポインタを初期化

    for (var _i2 = 0; _i2 < channels.length; _i2++) {
      channels[_i2].indicesCur = channels[_i2].indicesHead;
      channels[_i2].indicesPre = channels[_i2].indicesHead;
    }
  } // 関数呼び出し元にデータを返す //


  info.p = p;
  info.tempoTrack = tempoTrack;
  info.beatTrack = beatTrack;
  info.songLength = songLength;
  return info;
}

/***/ }),
/* 297 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseEvent; });
/* harmony import */ var _util_array_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(282);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


function parseEvent(info) {
  var _this = this;

  // 関数呼び出し元からデータをもらう //
  var smf = info.smf;
  var header = info.header;
  var channels = info.channels;
  var tempoTrack = info.tempoTrack;
  var songLength = info.songLength; // SMFのMIDIイベント解析 //

  var tempo;
  var tempoCurTick;
  var tempoCurTime;
  var cc111Tick = -1;
  var cc111Time = -1;
  var firstNoteOnTiming = Number.MAX_SAFE_INTEGER; // 最初のノートオンのTick

  var firstNoteOnTime = Number.MAX_SAFE_INTEGER;
  var lastNoteOffTiming = 0; // 最後のノートオフのTick

  var lastNoteOffTime = 0; // Midi Events (0x8n - 0xEn) parse

  var _loop = function _loop(ch) {
    var channel = channels[ch];
    var dataEntry = 2;
    var pitchBend = 0;
    var pan = 64;
    var expression = 127;
    var velocity = 100;
    var modulation = 0;
    var hold = 0;
    var reverb = _this.isTonyu2 ? 0 : 10;
    var chorus = 0;
    var nrpnLsb = 127;
    var nrpnMsb = 127;
    var rpnLsb = 127;
    var rpnMsb = 127;
    var instrument = 0;
    var masterVolume = 127;
    tempo = 120;
    tempoCurTick = 0;
    tempoCurTime = 0;
    var nowNoteOnIdxAry = [];
    var indIdx = channel.indicesHead;
    var indices = channel.indices;
    var nextNoteOnAry = new Array(128);

    var _loop3 = function _loop3() {
      var tick = indices[indIdx];
      var p = indices[indIdx + 2];
      var nextIdx = indices[indIdx + 3];
      var time = 60 / tempo / header.resolution * (tick - tempoCurTick) + tempoCurTime; // Events

      var mes0 = smf[p] >> 4; // Math.floor(smf[p] / 0x10)

      switch (mes0) {
        case 0x8: // Note OFF - 8[ch], Pitch, Velocity

        case 0x9:
          // Note ON - 9[ch], Pitch, Velocity
          if (mes0 == 0x9 && smf[p + 2] != 0) {
            // ノートオン
            // ノート情報が入ったオブジェクトを作成 //
            var note = {
              start: tick,
              stop: null,
              startTime: time,
              stopTime: null,
              pitch: smf[p + 1],
              pitchBend: [{
                timing: tick,
                time: time,
                value: pitchBend
              }],
              pan: [{
                timing: tick,
                time: time,
                value: pan
              }],
              expression: [{
                timing: tick,
                time: time,
                value: expression * (masterVolume / 127)
              }],
              velocity: smf[p + 2] / 127 * (velocity / 127),
              modulation: [{
                timing: tick,
                time: time,
                value: modulation
              }],
              holdBeforeStop: null,
              reverb: [{
                timing: tick,
                time: time,
                value: reverb
              }],
              chorus: [{
                timing: tick,
                time: time,
                value: chorus
              }],
              instrument: instrument,
              channel: ch,
              nextSameNoteOnInterval: -1,
              drumStopTime: 2 // 再生時に使う

            }; // 前回鳴っていた同音ノートに次のノートオン時間を入れる //
            // 同音ノートを二重再生したくない場合のために記録する //

            var prevNote = nextNoteOnAry[smf[p + 1]];

            if (prevNote) {
              prevNote.nextSameNoteOnInterval = time - prevNote.startTime;
            }

            nextNoteOnAry[smf[p + 1]] = note; // 同音ノートがノートオン中の場合、ノートオフにする //

            nowNoteOnIdxAry.some(function (idx, i) {
              var note = channel.notes[idx];

              if (note.pitch == smf[p + 1] && note.stop == null) {
                note.stop = tick;
                note.stopTime = time;
                _util_array_util_js__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"](nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
              }
            }); // ノートオン中配列に入れる

            nowNoteOnIdxAry.push(channel.notes.length); // notes一覧にnoteオブジェクトを入れる

            channel.notes.push(note); // 最初のノートオン時間を記録 //

            if (tick < firstNoteOnTiming) {
              firstNoteOnTiming = tick;
              firstNoteOnTime = time;
            }
          } else {
            // ノートオフ
            // ノートオン中配列から該当ノートを探し、ノートオフ処理をする //
            nowNoteOnIdxAry.some(function (idx, i) {
              var note = channel.notes[idx];

              if (note.pitch == smf[p + 1] && note.stop == null) {
                if (hold >= _this.settings.holdOnValue) {
                  // ホールドが効いている場合
                  if (note.holdBeforeStop == null) {
                    note.holdBeforeStop = [{
                      timing: tick,
                      time: time,
                      value: hold
                    }];
                  }
                } else {
                  // ホールドしていない場合
                  note.stop = tick;
                  note.stopTime = time;
                  _util_array_util_js__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"](nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
                } // 最後のノートオフ時間を記録 //


                if (tick > lastNoteOffTiming) {
                  lastNoteOffTiming = tick;
                  lastNoteOffTime = time;
                }

                return true;
              }
            });
          }

          break;
        // Polyfonic Key Pressure - A[ch], Pitch?, Velocity?

        case 0xA:
          break;
        // Control Change - B[ch],,

        case 0xB:
          switch (smf[p + 1]) {
            case 1:
              // modulation
              modulation = smf[p + 2];
              nowNoteOnIdxAry.forEach(function (idx) {
                var note = channel.notes[idx];
                note.modulation.push({
                  timing: tick,
                  time: time,
                  value: modulation
                });
              });
              break;

            case 6:
              if (rpnLsb == 0 && rpnMsb == 0) {
                // RLSB=0 & RMSB=0 -> 6はピッチ
                dataEntry = smf[p + 2];

                if (dataEntry > 24) {
                  dataEntry = 24;
                }
              }

              if (nrpnLsb == 8 && nrpnMsb == 1) {// (保留)ビブラート・レイト(GM2/GS/XG)
                //console.log("CC  8 1 6 "+smf[p+2]+" tick:"+tick);
              } else if (nrpnLsb == 9 && nrpnMsb == 1) {// (保留)ビブラート・デプス(GM2/GS/XG)
                //console.log("CC  9 1 6 "+smf[p+2]+" tick:"+tick);
              } else if (nrpnLsb == 10 && nrpnMsb == 1) {// (保留)ビブラート・ディレイ(GM2/GS/XG)
                //console.log("CC 10 1 6 "+smf[p+2]+" tick:"+tick);
              }

              break;

            case 7:
              velocity = smf[p + 2];
              break;

            case 10:
              // Pan
              pan = smf[p + 2];
              nowNoteOnIdxAry.forEach(function (idx) {
                var note = channel.notes[idx];
                note.pan.push({
                  timing: tick,
                  time: time,
                  value: pan
                });
              });
              break;

            case 11:
              // Expression
              expression = smf[p + 2];
              nowNoteOnIdxAry.forEach(function (idx) {
                var note = channel.notes[idx];
                note.expression.push({
                  timing: tick,
                  time: time,
                  value: expression * (masterVolume / 127)
                });
              });
              break;

            case 64:
              // Hold1
              hold = smf[p + 2];

              if (hold < _this.settings.holdOnValue) {
                for (var _i = nowNoteOnIdxAry.length - 1; _i >= 0; _i--) {
                  var idx = nowNoteOnIdxAry[_i];
                  var _note = channel.notes[idx];

                  if (_note.stop == null && _note.holdBeforeStop != null) {
                    _note.stop = tick;
                    _note.stopTime = time;
                    _util_array_util_js__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"](nowNoteOnIdxAry, _i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
                  }
                }
              }

              break;

            case 91:
              // reverb
              reverb = smf[p + 2];
              nowNoteOnIdxAry.forEach(function (idx) {
                var note = channel.notes[idx];
                note.reverb.push({
                  timing: tick,
                  time: time,
                  value: reverb
                });
              });
              break;

            case 93:
              // chorus
              chorus = smf[p + 2];
              nowNoteOnIdxAry.forEach(function (idx) {
                var note = channel.notes[idx];
                note.chorus.push({
                  timing: tick,
                  time: time,
                  value: chorus
                });
              });
              break;

            case 98:
              nrpnLsb = smf[p + 2];
              break;

            case 99:
              nrpnMsb = smf[p + 2];
              break;

            case 100:
              rpnLsb = smf[p + 2];
              break;

            case 101:
              rpnMsb = smf[p + 2];
              break;

            case 111:
              // RPGツクール用ループ(CC111)
              if (cc111Tick == -1) {
                cc111Tick = tick;
                cc111Time = time;
              }

              break;
          }

          break;
        // Program Change - C[ch],

        case 0xC:
          instrument = smf[p + 1];
          break;
        // Channel Pre - D[ch],

        case 0xD:
          break;
        // PitchBend Change - E[ch],,

        case 0xE:
          pitchBend = (smf[p + 2] * 128 + smf[p + 1] - 8192) / 8192 * dataEntry;
          nowNoteOnIdxAry.forEach(function (idx) {
            var note = channel.notes[idx];
            note.pitchBend.push({
              timing: tick,
              time: time,
              value: pitchBend
            });
          });
          break;

        case 0xF:
          //lastState = smf[p]; <- ランニングステートは無い
          switch (smf[p]) {
            case 0xF0:
            case 0xF7:
              // Master Volume
              if (smf[p + 1] == 0x7f && smf[p + 2] == 0x7f && smf[p + 3] == 0x04 && smf[p + 4] == 0x01) {
                var vol = smf[p + 6];
                if (vol > 127) vol = 127;
                masterVolume = vol;
                nowNoteOnIdxAry.forEach(function (idx) {
                  var note = channel.notes[idx];
                  note.expression.push({
                    timing: tick,
                    time: time,
                    value: expression * (masterVolume / 127)
                  });
                });
              }

              break;

            case 0xFF:
              // Meta Events
              switch (smf[p + 1]) {
                case 0x51:
                  // Tempo
                  tempoCurTime += 60 / tempo / header.resolution * (tick - tempoCurTick);
                  tempoCurTick = tick;
                  tempo = 60000000 / (smf[p + 3] * 0x10000 + smf[p + 4] * 0x100 + smf[p + 5]);
                  break;
              }

              break;
          }

          break;

        default:
          {
            return {
              v: {
                v: "Error parseSMF. "
              }
            };
          }
      }

      indIdx = nextIdx;
    };

    while (indIdx != -1) {
      var _ret2 = _loop3();

      if (_typeof(_ret2) === "object") return _ret2.v;
    }

    channel.nowNoteOnIdxAry = nowNoteOnIdxAry;

    if (!_this.debug) {
      delete channel.indices;
    }
  };

  for (var ch = 0; ch < 16; ch++) {
    var _ret = _loop(ch);

    if (_typeof(_ret) === "object") return _ret.v;
  } // ホールドが効いてノートオンのままになったノートをノートオフする //


  for (var _ch = 0; _ch < 16; _ch++) {
    var channel = channels[_ch];
    var nowNoteOnIdxAry = channel.nowNoteOnIdxAry;

    var _loop2 = function _loop2(i) {
      var note = channel.notes[nowNoteOnIdxAry[i]];

      if (note.stop == null) {
        note.stop = lastNoteOffTiming;
        note.stopTime = lastNoteOffTime; // If (note.cc[x].timing > lastNoteOffTiming), delete note.cc[x]

        var nameAry = ["pitchBend", "pan", "expression", "modulation", "reverb", "chorus"];
        nameAry.forEach(function (name) {
          var ccAry = note[name];

          for (var i2 = ccAry.length - 1; i2 >= 1; i2--) {
            var obj = ccAry[i2];

            if (obj.timing > lastNoteOffTiming) {
              _util_array_util_js__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"](ccAry, i2); // ccAry.splice(i2, 1); を軽量化
            }
          }
        });
        _util_array_util_js__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"](nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
      }
    };

    for (var i = nowNoteOnIdxAry.length - 1; i >= 0; i--) {
      _loop2(i);
    }

    delete channel.nowNoteOnIdxAry;
  }

  if (this.settings.isSkipEnding) songLength = lastNoteOffTiming;
  tempoTrack.push({
    timing: songLength,
    time: 60 / tempo / header.resolution * (songLength - tempoCurTick) + tempoCurTime,
    value: 120
  }); // WebMIDI用のMIDIメッセージを作成 //

  var messages = [];

  if (this.settings.isWebMIDI) {
    var _channel = channels[16];
    var _tempo = 120;
    var _tempoCurTick = 0;
    var _tempoCurTime = 0;
    var indIdx = _channel.indicesHead;
    var indices = _channel.indices;

    while (indIdx != -1) {
      var tick = indices[indIdx];
      var pLen = indices[indIdx + 1];
      var p = indices[indIdx + 2];
      var nextIdx = indices[indIdx + 3];
      var time = 60 / _tempo / header.resolution * (tick - _tempoCurTick) + _tempoCurTime; // Events

      switch (smf[p]) {
        case 0xFF:
          // Meta Events
          switch (smf[p + 1]) {
            case 0x51:
              // Tempo
              _tempoCurTime += 60 / _tempo / header.resolution * (tick - _tempoCurTick);
              _tempoCurTick = tick;
              _tempo = 60000000 / (smf[p + 3] * 0x10000 + smf[p + 4] * 0x100 + smf[p + 5]);
              break;
          }

      }

      messages.push({
        time: time,
        tick: tick,
        smfPtr: p,
        smfPtrLen: pLen
      });
      indIdx = nextIdx;
    }
  } // 関数呼び出し元にデータを返す //


  info.songLength = songLength;
  info.cc111Tick = cc111Tick;
  info.cc111Time = cc111Time;
  info.firstNoteOnTiming = firstNoteOnTiming;
  info.firstNoteOnTime = firstNoteOnTime;
  info.lastNoteOffTiming = lastNoteOffTiming;
  info.lastNoteOffTime = lastNoteOffTime;

  if (this.settings.isWebMIDI) {
    info.messages = messages;
    info.smfData = new Uint8Array(smf); // lastStateを上書きしたsmfをコピー
  }

  return info;
}

/***/ }),
/* 298 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return startWebMIDI; });
function startWebMIDI() {
  var _this = this;

  var outputs;
  if (!navigator.requestMIDIAccess) return; // 1回目：ブラウザにMIDIデバイスのフルコントロールを要求する(SysExの使用を要求)
  // 2回目：MIDIデバイスのフルコントロールがブロックされたら、SysEx無しでMIDIアクセスを要求する

  var sysEx = this.settings.WebMIDIPortSysEx;

  var midiAccessSuccess = function midiAccessSuccess(midiAccess) {
    outputs = midiAccess.outputs;
    _this.settings.WebMIDIPortOutputs = outputs;
    var output;

    if (_this.settings.WebMIDIPort == -1) {
      _this.settings.WebMIDIPortOutputs.forEach(function (o) {
        if (!output) output = o;
      });
    } else {
      output = _this.settings.WebMIDIPortOutputs.get(settings.WebMIDIPort);
    }

    _this.settings.WebMIDIPortOutput = output;
    _this.settings.WebMIDIPortSysEx = sysEx;

    if (output) {
      output.open();

      _this.initStatus(); // リセットイベント（GMシステム・オン等）を送るため呼び出す

    }

    return outputs;
  };

  var midiAccessFailure = function midiAccessFailure(err) {
    console.log(err);

    if (sysEx) {
      sysEx = false;
      navigator.requestMIDIAccess({
        sysex: sysEx
      }).then(midiAccessSuccess)["catch"](midiAccessFailure);
    }
  };

  navigator.requestMIDIAccess({
    sysex: sysEx
  }).then(midiAccessSuccess)["catch"](midiAccessFailure); // 終了時に鳴らしている音を切る

  window.addEventListener('unload', function (e) {
    for (var t = 0; t < 16; t++) {
      _this.settings.WebMIDIPortOutput.send([0xB0 + t, 120, 0]);

      for (var i = 0; i < 128; i++) {
        _this.settings.WebMIDIPortOutput.send([0x80 + t, i, 0]);
      }
    }
  });
}

/***/ }),
/* 299 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createSamplingNote; });
function createSamplingNote(option, isDrum, isExpression, nonChannel, nonStop) {
  var _this = this;

  // 最低限の変数を準備（無音の場合は処理終了するため） //
  var settings = this.settings;
  var context = this.context;
  var songStartTime = this.states.startTime;
  var channel = nonChannel ? 0 : option.channel || 0;
  var velocity = option.velocity * Number(nonChannel ? 1 : this.channels[channel][2] != null ? this.channels[channel][2] : 1) * settings.generateVolume;
  var isGainValueZero = true; // 無音の場合は処理終了 //

  if (velocity <= 0) return {
    isGainValueZero: true
  }; // 音量の変化を設定 //

  var expGainValue = velocity * ((option.expression ? option.expression[0].value : 100) / 127);
  var expGainNode = context.createGain();
  expGainNode.gain.value = expGainValue;

  if (isExpression) {
    option.expression ? option.expression.forEach(function (p) {
      var v = velocity * (p.value / 127);
      if (v > 0) isGainValueZero = false;
      expGainNode.gain.setValueAtTime(v, p.time + songStartTime);
    }) : false;
  } else {
    if (expGainValue > 0) {
      isGainValueZero = false;
    }
  } // 無音の場合は処理終了 //


  if (isGainValueZero) {
    // 音量が常に0なら音を鳴らさない
    return {
      isGainValueZero: true
    };
  } // 全ての変数を準備 //


  var start = option.startTime + songStartTime;
  var stop = option.stopTime + songStartTime;
  var pitch = settings.basePitch * Math.pow(Math.pow(2, 1 / 12), (option.pitch || 69) - 69);
  var oscillator = context.createBufferSource();
  var panNode = context.createStereoPanner ? context.createStereoPanner() : context.createPanner ? context.createPanner() : {
    pan: {
      setValueAtTime: function setValueAtTime() {}
    }
  };
  var gainNode = context.createGain();
  var stopGainNode = context.createGain();
  oscillator.buffer = window.MIDI.SoundfontBuffer.acoustic_grand_piano[option.pitch]; // パンの初期値を設定 //

  var panValue = option.pan && option.pan[0].value != 64 ? option.pan[0].value / 127 * 2 - 1 : 0;
  initPanValue(context, panNode, panValue); // パンの変動を設定 //

  if (context.createStereoPanner || context.createPanner) {
    // StereoPannerNode or PannerNode がどちらかでも使える
    var firstNode = true;

    if (context.createStereoPanner) {
      // StereoPannerNode が使える
      option.pan ? option.pan.forEach(function (p) {
        if (firstNode) {
          firstNode = false;
          return;
        }

        var v = p.value == 64 ? 0 : p.value / 127 * 2 - 1;
        if (v > 1.0) v = 1.0;
        panNode.pan.setValueAtTime(v, p.time + songStartTime);
      }) : false;
    } else if (context.createPanner) {
      // StereoPannerNode が未サポート、PannerNode が使える
      if (panNode.positionX) {
        // setValueAtTimeが使える
        // Old Browser
        option.pan ? option.pan.forEach(function (p) {
          if (firstPan) {
            firstPan = false;
            return;
          }

          var v = p.value == 64 ? 0 : p.value / 127 * 2 - 1;
          var posObj = convPosition(v);
          panNode.positionX.setValueAtTime(posObj.x, p.time + songStartTime);
          panNode.positionY.setValueAtTime(posObj.y, p.time + songStartTime);
          panNode.positionZ.setValueAtTime(posObj.z, p.time + songStartTime);
        }) : false;
      } else {
        // iOS
        // setValueAtTimeが使えないためsetTimeoutでパンの動的変更
        option.pan ? option.pan.forEach(function (p) {
          if (firstNode) {
            firstNode = false;
            return;
          }

          var reservePan = setTimeout(function () {
            _this.clearFunc("pan", reservePan);

            var v = p.value == 64 ? 0 : p.value / 127 * 2 - 1;
            if (v > 1.0) v = 1.0;
            var posObj = convPosition(v);
            panNode.setPosition(posObj.x, posObj.y, posObj.z);
          }, (p.time + songStartTime - context.currentTime) * 1000);

          _this.pushFunc({
            pan: reservePan,
            stopFunc: function stopFunc() {
              clearTimeout(reservePan);
            }
          });
        }) : false;
      }
    }

    oscillator.connect(panNode);
    panNode.connect(expGainNode);
  } else {
    // StereoPannerNode、PannerNode が未サポート
    oscillator.connect(expGainNode);
  } // AudioNodeを接続 //


  expGainNode.connect(gainNode);
  gainNode.connect(stopGainNode);
  stopGainNode.connect(this.masterGainNode);
  this.masterGainNode.connect(context.destination); // リバーブの変動を設定 //

  if (this.settings.isReverb && option.reverb && (option.reverb.length >= 2 || option.reverb[0].value > 0)) {
    var convolver = this.convolver;
    var convolverGainNode = context.createGain();
    var _firstNode = true;
    option.reverb ? option.reverb.forEach(function (p) {
      if (_firstNode) {
        _firstNode = false;
        return;
      }

      var r = p.value / 127;
      if (r > 1.0) r = 1.0;
      convolverGainNode.gain.setValueAtTime(r, p.time + songStartTime);
    }) : false;
    var r = option.reverb ? option.reverb[0].value / 127 : 0;
    if (r > 1.0) r = 1.0;
    convolverGainNode.gain.value = r;
    gainNode.connect(stopGainNode);
    stopGainNode.connect(convolverGainNode);
    convolverGainNode.connect(convolver);
  } // コーラスの変動を設定 //


  if (this.settings.isChorus && option.chorus && (option.chorus.length >= 2 || option.chorus[0].value > 0)) {
    var chorusDelayNode = this.chorusDelayNode;
    var chorusGainNode = context.createGain();
    var _firstNode2 = true;
    option.chorus ? option.chorus.forEach(function (p) {
      if (_firstNode2) {
        _firstNode2 = false;
        return;
      }

      var c = p.value / 127;
      if (c > 1.0) c = 1.0;
      chorusGainNode.gain.setValueAtTime(c, p.time + songStartTime);
    }) : false;
    var c = option.chorus ? option.chorus[0].value / 127 : 0;
    if (c > 1.0) c = 1.0;
    chorusGainNode.gain.value = c;
    gainNode.connect(stopGainNode);
    stopGainNode.connect(chorusGainNode);
    chorusGainNode.connect(chorusDelayNode);
  } // oscillator又はホワイトノイズをスタート //


  oscillator.start(start);
  stopGainNode.gain.setValueAtTime(1, start);
  stopGainNode.gain.setValueAtTime(1, stop);
  stopGainNode.gain.linearRampToValueAtTime(0, stop + 0.2);
  this.stopAudioNode(oscillator, stop + 0.2, stopGainNode); // AudioNodeやパラメータを返す //
  // return {
  //     start: start,
  //     stop: stop,
  //     pitch: pitch,
  //     channel: channel,
  //     velocity: velocity,
  //     oscillator: oscillator,
  //     panNode: panNode,
  //     gainNode: gainNode,
  //     stopGainNode: stopGainNode,
  //     isGainValueZero: false
  // };

  return function () {
    _this.stopAudioNode(oscillator, 0, stopGainNode, true);
  };
}
/**
 * パンの初期値を設定
 * @param {PannerNode | StereoPannerNode} panNode 
 * @param {number} panValue 
 */

function initPanValue(context, panNode, panValue) {
  if (context.createStereoPanner) {
    if (panValue > 1.0) panValue = 1.0;
    panNode.pan.value = panValue;
  } else if (context.createPanner) {
    // iOS, Old Browser
    var posObj = convPosition(panValue);
    panNode.panningModel = "equalpower";
    panNode.setPosition(posObj.x, posObj.y, posObj.z);
  }
}
/**
 * pan値を基に、PannerNode用の値を{x, y, z}で返す
 * @param {number} panValue panの値
 * @returns Object{x, y, z}
 */


function convPosition(panValue) {
  if (panValue > 1.0) panValue = 1.0;
  var obj = {};
  var panAngle = panValue * 90;
  obj.x = Math.sin(panAngle * (Math.PI / 180));
  obj.y = 0;
  obj.z = -Math.cos(panAngle * (Math.PI / 180));
  return obj;
}

/***/ })
/******/ ]);
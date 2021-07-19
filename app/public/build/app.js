(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "./assets/css/app.css":
/*!****************************!*\
  !*** ./assets/css/app.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/css/bootstrap-tagsinput.scss":
/*!*********************************************!*\
  !*** ./assets/css/bootstrap-tagsinput.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/css/tailwind.css":
/*!*********************************!*\
  !*** ./assets/css/tailwind.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_app_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/app.css */ "./assets/css/app.css");
/* harmony import */ var _css_app_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_app_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_bootstrap_tagsinput_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/bootstrap-tagsinput.scss */ "./assets/css/bootstrap-tagsinput.scss");
/* harmony import */ var _css_bootstrap_tagsinput_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_bootstrap_tagsinput_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _css_tailwind_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/tailwind.css */ "./assets/css/tailwind.css");
/* harmony import */ var _css_tailwind_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_css_tailwind_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/main.js */ "./assets/js/main.js");
/* harmony import */ var _js_tinymce_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/tinymce.js */ "./assets/js/tinymce.js");
/* harmony import */ var bootstrap_tagsinput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap-tagsinput */ "./node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.js");
/* harmony import */ var bootstrap_tagsinput__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bootstrap_tagsinput__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var typeahead_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! typeahead.js */ "./node_modules/typeahead.js/dist/typeahead.bundle.js");
/* harmony import */ var typeahead_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(typeahead_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var bloodhound_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! bloodhound-js */ "./node_modules/bloodhound-js/index.js");
/* harmony import */ var bloodhound_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(bloodhound_js__WEBPACK_IMPORTED_MODULE_8__);









global.$ = global.jQuery = jquery__WEBPACK_IMPORTED_MODULE_0___default.a;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var bloodhound_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bloodhound-js */ "./node_modules/bloodhound-js/index.js");
/* harmony import */ var bloodhound_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bloodhound_js__WEBPACK_IMPORTED_MODULE_0__);


var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

global.$ = global.jQuery = $;
$(document).ready(function () {
  var firstNoteListItem = $('.note-item:first-child');
  var notebookDeleteButton = $('.notebooks .deleteBtn');
  var noteContent = $('.main-content .notes .note-container');
  $(firstNoteListItem).addClass('active').siblings().removeClass('active');
  $(".note-item").click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
  $("#submitFirstPassword").click(function () {
    $("#secondPassword").removeClass('hidden');
  }); // $(function highlightCurrentPageInSideNav(){
  // 	// this will get the full URL at the address bar
  // 	const url = window.location.href;
  //
  // 	// passes on every "a" tag
  // 	$(".nav-item a").each(function() {
  // 		// checks if its the same on the address bar
  // 		if(url === (this.href)) {
  // 			$(".nav-item").addClass("active");
  // 		}
  // 	});
  // });

  $.ajax({
    url: $(firstNoteListItem).data('url'),
    type: 'POST',
    dataType: 'json',
    async: true,
    success: function success(xhr, textStatus, data) {
      $(noteContent).html(data['responseJSON'].response);
    }
  });
  $(".note-link").on("click", function (event) {
    var path = $(this).data('url');
    $.ajax({
      url: path,
      type: 'POST',
      dataType: 'json',
      async: true,
      success: function success(xhr, textStatus, data) {
        $(noteContent).html(data['responseJSON'].response);
      }
    });
  });
  $(notebookDeleteButton).on('click', function (e) {
    var id = $(this).data('id');
    var deletePath = $(this).data('delete-path');

    if (confirm('WARNING! When deleting this notebook, all notes assigned to the notebook are also deleted!')) {
      $.ajax({
        url: deletePath,
        data: {
          'noteId': id
        },
        type: 'POST',
        success: function success(data, response) {
          location.reload();
        },
        error: function error(xhr, textStatus, errorThrown) {
          alert('It was not possible to delete the notebook.');
        }
      });
    }
  });
  var $input = $('input[data-toggle="tagsinput"]');

  if ($input.length) {
    var source = new bloodhound_js__WEBPACK_IMPORTED_MODULE_0___default.a({
      local: $input.data('tags'),
      queryTokenizer: bloodhound_js__WEBPACK_IMPORTED_MODULE_0___default.a.tokenizers.whitespace,
      datumTokenizer: bloodhound_js__WEBPACK_IMPORTED_MODULE_0___default.a.tokenizers.whitespace
    });
    source.initialize();
    $input.tagsinput({
      trimValue: true,
      focusClass: 'focus',
      typeaheadjs: {
        name: 'tags',
        source: source.ttAdapter()
      }
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./assets/js/tinymce.js":
/*!******************************!*\
  !*** ./assets/js/tinymce.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tinymce/tinymce */ "./node_modules/tinymce/tinymce.js");
/* harmony import */ var tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tinymce_themes_silver_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tinymce/themes/silver/theme */ "./node_modules/tinymce/themes/silver/theme.js");
/* harmony import */ var tinymce_themes_silver_theme__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tinymce_themes_silver_theme__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tinymce_plugins_paste__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tinymce/plugins/paste */ "./node_modules/tinymce/plugins/paste/index.js");
/* harmony import */ var tinymce_plugins_paste__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_paste__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tinymce_plugins_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tinymce/plugins/table */ "./node_modules/tinymce/plugins/table/index.js");
/* harmony import */ var tinymce_plugins_table__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_table__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tinymce_plugins_code__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tinymce/plugins/code */ "./node_modules/tinymce/plugins/code/index.js");
/* harmony import */ var tinymce_plugins_code__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_code__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tinymce_plugins_textpattern__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tinymce/plugins/textpattern */ "./node_modules/tinymce/plugins/textpattern/index.js");
/* harmony import */ var tinymce_plugins_textpattern__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_textpattern__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var tinymce_plugins_lists__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tinymce/plugins/lists */ "./node_modules/tinymce/plugins/lists/index.js");
/* harmony import */ var tinymce_plugins_lists__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_lists__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var tinymce_plugins_advlist__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tinymce/plugins/advlist */ "./node_modules/tinymce/plugins/advlist/index.js");
/* harmony import */ var tinymce_plugins_advlist__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_advlist__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var tinymce_plugins_preview__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tinymce/plugins/preview */ "./node_modules/tinymce/plugins/preview/index.js");
/* harmony import */ var tinymce_plugins_preview__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_preview__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var tinymce_plugins_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tinymce/plugins/link */ "./node_modules/tinymce/plugins/link/index.js");
/* harmony import */ var tinymce_plugins_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_link__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var tinymce_plugins_image__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tinymce/plugins/image */ "./node_modules/tinymce/plugins/image/index.js");
/* harmony import */ var tinymce_plugins_image__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_image__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var tinymce_plugins_anchor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tinymce/plugins/anchor */ "./node_modules/tinymce/plugins/anchor/index.js");
/* harmony import */ var tinymce_plugins_anchor__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_anchor__WEBPACK_IMPORTED_MODULE_11__);












var editorHeight = window.innerHeight - 250;
tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0___default.a.init({
  selector: 'textarea',
  height: editorHeight,
  plugins: "anchor lists table code link textpattern preview",
  menubar: 'file edit view format tools',
  toolbar: 'preview link lists image | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | table'
});

/***/ }),

/***/ 3:
/*!***********************!*\
  !*** vertx (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[["./assets/js/app.js","runtime","vendors~app"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2Nzcy9ib290c3RyYXAtdGFnc2lucHV0LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2Nzcy90YWlsd2luZC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGlueW1jZS5qcyIsIndlYnBhY2s6Ly8vdmVydHggKGlnbm9yZWQpIl0sIm5hbWVzIjpbImdsb2JhbCIsIiQiLCJqUXVlcnkiLCJyZXF1aXJlIiwiZG9jdW1lbnQiLCJyZWFkeSIsImZpcnN0Tm90ZUxpc3RJdGVtIiwibm90ZWJvb2tEZWxldGVCdXR0b24iLCJub3RlQ29udGVudCIsImFkZENsYXNzIiwic2libGluZ3MiLCJyZW1vdmVDbGFzcyIsImNsaWNrIiwiYWpheCIsInVybCIsImRhdGEiLCJ0eXBlIiwiZGF0YVR5cGUiLCJhc3luYyIsInN1Y2Nlc3MiLCJ4aHIiLCJ0ZXh0U3RhdHVzIiwiaHRtbCIsInJlc3BvbnNlIiwib24iLCJldmVudCIsInBhdGgiLCJlIiwiaWQiLCJkZWxldGVQYXRoIiwiY29uZmlybSIsImxvY2F0aW9uIiwicmVsb2FkIiwiZXJyb3IiLCJlcnJvclRocm93biIsImFsZXJ0IiwiJGlucHV0IiwibGVuZ3RoIiwic291cmNlIiwiQmxvb2Rob3VuZCIsImxvY2FsIiwicXVlcnlUb2tlbml6ZXIiLCJ0b2tlbml6ZXJzIiwid2hpdGVzcGFjZSIsImRhdHVtVG9rZW5pemVyIiwiaW5pdGlhbGl6ZSIsInRhZ3NpbnB1dCIsInRyaW1WYWx1ZSIsImZvY3VzQ2xhc3MiLCJ0eXBlYWhlYWRqcyIsIm5hbWUiLCJ0dEFkYXB0ZXIiLCJlZGl0b3JIZWlnaHQiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsInRpbnltY2UiLCJpbml0Iiwic2VsZWN0b3IiLCJoZWlnaHQiLCJwbHVnaW5zIiwibWVudWJhciIsInRvb2xiYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHVDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLE1BQU0sQ0FBQ0MsQ0FBUCxHQUFXRCxNQUFNLENBQUNFLE1BQVAsR0FBZ0JELDZDQUEzQixDOzs7Ozs7Ozs7Ozs7O0FDVkE7QUFBQTtBQUFBO0FBQUE7O0FBRUEsSUFBTUEsQ0FBQyxHQUFHRSxtQkFBTyxDQUFDLG9EQUFELENBQWpCOztBQUNBSCxNQUFNLENBQUNDLENBQVAsR0FBV0QsTUFBTSxDQUFDRSxNQUFQLEdBQWdCRCxDQUEzQjtBQUVBQSxDQUFDLENBQUNHLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQVk7QUFFMUIsTUFBTUMsaUJBQWlCLEdBQUdMLENBQUMsQ0FBQyx3QkFBRCxDQUEzQjtBQUNBLE1BQU1NLG9CQUFvQixHQUFHTixDQUFDLENBQUMsdUJBQUQsQ0FBOUI7QUFDQSxNQUFNTyxXQUFXLEdBQUdQLENBQUMsQ0FBQyxzQ0FBRCxDQUFyQjtBQUVBQSxHQUFDLENBQUNLLGlCQUFELENBQUQsQ0FBcUJHLFFBQXJCLENBQThCLFFBQTlCLEVBQXdDQyxRQUF4QyxHQUFtREMsV0FBbkQsQ0FBK0QsUUFBL0Q7QUFFQVYsR0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQlcsS0FBaEIsQ0FBc0IsWUFBWTtBQUM5QlgsS0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRUSxRQUFSLENBQWlCLFFBQWpCLEVBQTJCQyxRQUEzQixHQUFzQ0MsV0FBdEMsQ0FBa0QsUUFBbEQ7QUFDSCxHQUZEO0FBSUFWLEdBQUMsQ0FBQyxzQkFBRCxDQUFELENBQTBCVyxLQUExQixDQUFnQyxZQUFZO0FBQ3hDWCxLQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQlUsV0FBckIsQ0FBaUMsUUFBakM7QUFDSCxHQUZELEVBWjBCLENBZ0IxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFWLEdBQUMsQ0FBQ1ksSUFBRixDQUFPO0FBQ0hDLE9BQUcsRUFBRWIsQ0FBQyxDQUFDSyxpQkFBRCxDQUFELENBQXFCUyxJQUFyQixDQUEwQixLQUExQixDQURGO0FBRUhDLFFBQUksRUFBRSxNQUZIO0FBR0hDLFlBQVEsRUFBRSxNQUhQO0FBSUhDLFNBQUssRUFBRSxJQUpKO0FBS0hDLFdBQU8sRUFBRSxpQkFBVUMsR0FBVixFQUFlQyxVQUFmLEVBQTJCTixJQUEzQixFQUFpQztBQUN0Q2QsT0FBQyxDQUFDTyxXQUFELENBQUQsQ0FBZWMsSUFBZixDQUFvQlAsSUFBSSxDQUFDLGNBQUQsQ0FBSixDQUFxQlEsUUFBekM7QUFDSDtBQVBFLEdBQVA7QUFVQXRCLEdBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0J1QixFQUFoQixDQUFtQixPQUFuQixFQUE0QixVQUFVQyxLQUFWLEVBQWlCO0FBQ3pDLFFBQU1DLElBQUksR0FBR3pCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWMsSUFBUixDQUFhLEtBQWIsQ0FBYjtBQUNBZCxLQUFDLENBQUNZLElBQUYsQ0FBTztBQUNIQyxTQUFHLEVBQUVZLElBREY7QUFFSFYsVUFBSSxFQUFFLE1BRkg7QUFHSEMsY0FBUSxFQUFFLE1BSFA7QUFJSEMsV0FBSyxFQUFFLElBSko7QUFLSEMsYUFBTyxFQUFFLGlCQUFVQyxHQUFWLEVBQWVDLFVBQWYsRUFBMkJOLElBQTNCLEVBQWlDO0FBQ3RDZCxTQUFDLENBQUNPLFdBQUQsQ0FBRCxDQUFlYyxJQUFmLENBQW9CUCxJQUFJLENBQUMsY0FBRCxDQUFKLENBQXFCUSxRQUF6QztBQUNIO0FBUEUsS0FBUDtBQVNILEdBWEQ7QUFhQXRCLEdBQUMsQ0FBQ00sb0JBQUQsQ0FBRCxDQUF3QmlCLEVBQXhCLENBQTJCLE9BQTNCLEVBQW9DLFVBQVVHLENBQVYsRUFBYTtBQUM3QyxRQUFNQyxFQUFFLEdBQUczQixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFjLElBQVIsQ0FBYSxJQUFiLENBQVg7QUFDQSxRQUFNYyxVQUFVLEdBQUc1QixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFjLElBQVIsQ0FBYSxhQUFiLENBQW5COztBQUNBLFFBQUllLE9BQU8sQ0FBQyw0RkFBRCxDQUFYLEVBQTJHO0FBQ3ZHN0IsT0FBQyxDQUFDWSxJQUFGLENBQU87QUFDSEMsV0FBRyxFQUFFZSxVQURGO0FBRUhkLFlBQUksRUFBRTtBQUNGLG9CQUFVYTtBQURSLFNBRkg7QUFLSFosWUFBSSxFQUFFLE1BTEg7QUFNSEcsZUFBTyxFQUFFLGlCQUFVSixJQUFWLEVBQWdCUSxRQUFoQixFQUEwQjtBQUMvQlEsa0JBQVEsQ0FBQ0MsTUFBVDtBQUNILFNBUkU7QUFTSEMsYUFBSyxFQUFFLGVBQVViLEdBQVYsRUFBZUMsVUFBZixFQUEyQmEsV0FBM0IsRUFBd0M7QUFDM0NDLGVBQUssQ0FBQyw2Q0FBRCxDQUFMO0FBQ0g7QUFYRSxPQUFQO0FBYUg7QUFDSixHQWxCRDtBQW9CQSxNQUFNQyxNQUFNLEdBQUduQyxDQUFDLENBQUMsZ0NBQUQsQ0FBaEI7O0FBQ0EsTUFBSW1DLE1BQU0sQ0FBQ0MsTUFBWCxFQUFtQjtBQUNmLFFBQU1DLE1BQU0sR0FBRyxJQUFJQyxvREFBSixDQUFlO0FBQzFCQyxXQUFLLEVBQUVKLE1BQU0sQ0FBQ3JCLElBQVAsQ0FBWSxNQUFaLENBRG1CO0FBRTFCMEIsb0JBQWMsRUFBRUYsb0RBQVUsQ0FBQ0csVUFBWCxDQUFzQkMsVUFGWjtBQUcxQkMsb0JBQWMsRUFBRUwsb0RBQVUsQ0FBQ0csVUFBWCxDQUFzQkM7QUFIWixLQUFmLENBQWY7QUFLQUwsVUFBTSxDQUFDTyxVQUFQO0FBRUFULFVBQU0sQ0FBQ1UsU0FBUCxDQUFpQjtBQUNiQyxlQUFTLEVBQUUsSUFERTtBQUViQyxnQkFBVSxFQUFFLE9BRkM7QUFHYkMsaUJBQVcsRUFBRTtBQUNUQyxZQUFJLEVBQUUsTUFERztBQUVUWixjQUFNLEVBQUVBLE1BQU0sQ0FBQ2EsU0FBUDtBQUZDO0FBSEEsS0FBakI7QUFRSDtBQUVKLENBM0ZELEU7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1DLFlBQVksR0FBR0MsTUFBTSxDQUFDQyxXQUFQLEdBQXFCLEdBQTFDO0FBRUFDLHNEQUFPLENBQUNDLElBQVIsQ0FBYTtBQUNUQyxVQUFRLEVBQUUsVUFERDtBQUVUQyxRQUFNLEVBQUVOLFlBRkM7QUFHVE8sU0FBTyxFQUFFLGtEQUhBO0FBSVRDLFNBQU8sRUFBRSw2QkFKQTtBQUtUQyxTQUFPLEVBQUU7QUFMQSxDQUFiLEU7Ozs7Ozs7Ozs7O0FDaEJBLGUiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCAnLi4vY3NzL2FwcC5jc3MnO1xuaW1wb3J0ICcuLi9jc3MvYm9vdHN0cmFwLXRhZ3NpbnB1dC5zY3NzJztcbmltcG9ydCAnLi4vY3NzL3RhaWx3aW5kLmNzcyc7XG5pbXBvcnQgJy4uL2pzL21haW4uanMnO1xuaW1wb3J0ICcuLi9qcy90aW55bWNlLmpzJztcbmltcG9ydCAnYm9vdHN0cmFwLXRhZ3NpbnB1dCc7XG5pbXBvcnQgJ3R5cGVhaGVhZC5qcyc7XG5pbXBvcnQgXCJibG9vZGhvdW5kLWpzXCI7XG5cbmdsb2JhbC4kID0gZ2xvYmFsLmpRdWVyeSA9ICQ7XG4iLCJpbXBvcnQgQmxvb2Rob3VuZCBmcm9tICdibG9vZGhvdW5kLWpzJztcblxuY29uc3QgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuZ2xvYmFsLiQgPSBnbG9iYWwualF1ZXJ5ID0gJDtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgZmlyc3ROb3RlTGlzdEl0ZW0gPSAkKCcubm90ZS1pdGVtOmZpcnN0LWNoaWxkJyk7XG4gICAgY29uc3Qgbm90ZWJvb2tEZWxldGVCdXR0b24gPSAkKCcubm90ZWJvb2tzIC5kZWxldGVCdG4nKTtcbiAgICBjb25zdCBub3RlQ29udGVudCA9ICQoJy5tYWluLWNvbnRlbnQgLm5vdGVzIC5ub3RlLWNvbnRhaW5lcicpO1xuXG4gICAgJChmaXJzdE5vdGVMaXN0SXRlbSkuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgJChcIi5ub3RlLWl0ZW1cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuICAgICQoXCIjc3VibWl0Rmlyc3RQYXNzd29yZFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCIjc2Vjb25kUGFzc3dvcmRcIikucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH0pO1xuXG4gICAgLy8gJChmdW5jdGlvbiBoaWdobGlnaHRDdXJyZW50UGFnZUluU2lkZU5hdigpe1xuICAgIC8vIFx0Ly8gdGhpcyB3aWxsIGdldCB0aGUgZnVsbCBVUkwgYXQgdGhlIGFkZHJlc3MgYmFyXG4gICAgLy8gXHRjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAvL1xuICAgIC8vIFx0Ly8gcGFzc2VzIG9uIGV2ZXJ5IFwiYVwiIHRhZ1xuICAgIC8vIFx0JChcIi5uYXYtaXRlbSBhXCIpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgLy8gXHRcdC8vIGNoZWNrcyBpZiBpdHMgdGhlIHNhbWUgb24gdGhlIGFkZHJlc3MgYmFyXG4gICAgLy8gXHRcdGlmKHVybCA9PT0gKHRoaXMuaHJlZikpIHtcbiAgICAvLyBcdFx0XHQkKFwiLm5hdi1pdGVtXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIC8vIFx0XHR9XG4gICAgLy8gXHR9KTtcbiAgICAvLyB9KTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJChmaXJzdE5vdGVMaXN0SXRlbSkuZGF0YSgndXJsJyksXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICh4aHIsIHRleHRTdGF0dXMsIGRhdGEpIHtcbiAgICAgICAgICAgICQobm90ZUNvbnRlbnQpLmh0bWwoZGF0YVsncmVzcG9uc2VKU09OJ10ucmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKFwiLm5vdGUtbGlua1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zdCBwYXRoID0gJCh0aGlzKS5kYXRhKCd1cmwnKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogcGF0aCxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICh4aHIsIHRleHRTdGF0dXMsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkKG5vdGVDb250ZW50KS5odG1sKGRhdGFbJ3Jlc3BvbnNlSlNPTiddLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKG5vdGVib29rRGVsZXRlQnV0dG9uKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zdCBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcbiAgICAgICAgY29uc3QgZGVsZXRlUGF0aCA9ICQodGhpcykuZGF0YSgnZGVsZXRlLXBhdGgnKTtcbiAgICAgICAgaWYgKGNvbmZpcm0oJ1dBUk5JTkchIFdoZW4gZGVsZXRpbmcgdGhpcyBub3RlYm9vaywgYWxsIG5vdGVzIGFzc2lnbmVkIHRvIHRoZSBub3RlYm9vayBhcmUgYWxzbyBkZWxldGVkIScpKSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogZGVsZXRlUGF0aCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICdub3RlSWQnOiBpZFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCByZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnSXQgd2FzIG5vdCBwb3NzaWJsZSB0byBkZWxldGUgdGhlIG5vdGVib29rLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCAkaW5wdXQgPSAkKCdpbnB1dFtkYXRhLXRvZ2dsZT1cInRhZ3NpbnB1dFwiXScpO1xuICAgIGlmICgkaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IG5ldyBCbG9vZGhvdW5kKHtcbiAgICAgICAgICAgIGxvY2FsOiAkaW5wdXQuZGF0YSgndGFncycpLFxuICAgICAgICAgICAgcXVlcnlUb2tlbml6ZXI6IEJsb29kaG91bmQudG9rZW5pemVycy53aGl0ZXNwYWNlLFxuICAgICAgICAgICAgZGF0dW1Ub2tlbml6ZXI6IEJsb29kaG91bmQudG9rZW5pemVycy53aGl0ZXNwYWNlXG4gICAgICAgIH0pO1xuICAgICAgICBzb3VyY2UuaW5pdGlhbGl6ZSgpO1xuXG4gICAgICAgICRpbnB1dC50YWdzaW5wdXQoe1xuICAgICAgICAgICAgdHJpbVZhbHVlOiB0cnVlLFxuICAgICAgICAgICAgZm9jdXNDbGFzczogJ2ZvY3VzJyxcbiAgICAgICAgICAgIHR5cGVhaGVhZGpzOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3RhZ3MnLFxuICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlLnR0QWRhcHRlcigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG4iLCJpbXBvcnQgdGlueW1jZSBmcm9tICd0aW55bWNlL3RpbnltY2UnO1xuaW1wb3J0ICd0aW55bWNlL3RoZW1lcy9zaWx2ZXIvdGhlbWUnO1xuXG5pbXBvcnQgJ3RpbnltY2UvcGx1Z2lucy9wYXN0ZSc7XG5pbXBvcnQgJ3RpbnltY2UvcGx1Z2lucy90YWJsZSc7XG5pbXBvcnQgJ3RpbnltY2UvcGx1Z2lucy9jb2RlJztcbmltcG9ydCAndGlueW1jZS9wbHVnaW5zL3RleHRwYXR0ZXJuJztcbmltcG9ydCAndGlueW1jZS9wbHVnaW5zL2xpc3RzJztcbmltcG9ydCAndGlueW1jZS9wbHVnaW5zL2Fkdmxpc3QnO1xuaW1wb3J0ICd0aW55bWNlL3BsdWdpbnMvcHJldmlldyc7XG5pbXBvcnQgJ3RpbnltY2UvcGx1Z2lucy9saW5rJztcbmltcG9ydCAndGlueW1jZS9wbHVnaW5zL2ltYWdlJztcbmltcG9ydCAndGlueW1jZS9wbHVnaW5zL2FuY2hvcic7XG5cbmNvbnN0IGVkaXRvckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDI1MDtcblxudGlueW1jZS5pbml0KHtcbiAgICBzZWxlY3RvcjogJ3RleHRhcmVhJyxcbiAgICBoZWlnaHQ6IGVkaXRvckhlaWdodCxcbiAgICBwbHVnaW5zOiBcImFuY2hvciBsaXN0cyB0YWJsZSBjb2RlIGxpbmsgdGV4dHBhdHRlcm4gcHJldmlld1wiLFxuICAgIG1lbnViYXI6ICdmaWxlIGVkaXQgdmlldyBmb3JtYXQgdG9vbHMnLFxuICAgIHRvb2xiYXI6ICdwcmV2aWV3IGxpbmsgbGlzdHMgaW1hZ2UgfCBib2xkIGl0YWxpYyB8IGFsaWdubGVmdCBhbGlnbmNlbnRlciBhbGlnbnJpZ2h0IGFsaWduanVzdGlmeSB8IG91dGRlbnQgaW5kZW50IHwgdGFibGUnLFxufSk7XG4iLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9
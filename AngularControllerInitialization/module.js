$(function () {
	var app = angular.module("app", []);
	
	app.controller("TestController", function () {
		
		this.initialize = function (option1Range, option2Range) {
			this.options1 = Array.apply(null, { length: option1Range }).map(Number.call, Number);
			this.options2 = Array.apply(null, { length: option2Range }).map(Number.call, Number);
		};
	});
	
	app.directive("ngController", function () {
		return {
			require: "^ngController",
			link: function ($scope, $element, $attrs, $controller) {
				// sets
				for	(var key in $attrs) {
					var match = /^set(\w+)$/.exec(key);
					if (match != null)
						$controller[match[1].lowerFirstLetter()] = $attrs[key];
				}
				
				// initialize
				if ($controller.initialize == null)
					return;
				
				var parameters = getParamNames($controller.initialize);
				var parametersValues = []; 
				
				parameters.forEach(function (p) {
					parametersValues.push($attrs["init" + p.upperFirstLetter()]);
				});
				
				$controller.initialize.apply($controller, parametersValues);
			}
		};
	});
});

String.prototype.lowerFirstLetter = function () {
	return this.charAt(0).toLowerCase() + this.slice(1);
}
String.prototype.upperFirstLetter = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

function getParamNames(func) {
  var fnStr = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
  if(result === null)
     result = [];
  return result;
}
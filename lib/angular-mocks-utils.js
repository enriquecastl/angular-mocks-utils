/**
 * Provides a faster way to mock directives and filters
 */

(function(angular) {
    'use strict';

    function normalizeDirectiveName(directiveName) {
        var DIRECTIVE_SUFFIX = 'Directive';
        return directiveName + DIRECTIVE_SUFFIX;
    }

    function isValidName(directiveName) {
        return angular.isString(directiveName) &&
        directiveName.length > 0;
    }

    var angularMockUtils = {
        fakeFilters : function($filterProvider, filters) {
             var fakes = [];

            if(angular.isArray(filters)) {

                angular.forEach(filters, function(filter) {
                    fakes.push(this.fakeFilter($filterProvider, filter));
                }, this);
            }

            return fakes;
        },
        fakeFilter : function($filterProvider, filterName) {
            var fakeFilter = function() {
                return function(content) {
                    return content;
                };
            };

            if(angular.isObject($filterProvider) &&
                angular.isFunction($filterProvider.register) &&
                isValidName(filterName)) {

                $filterProvider.register(filterName, fakeFilter);
            }

            return fakeFilter;
        },
        fakeDirectives : function($provide, directives) {
            var fakes = [];

            if(angular.isArray(directives)) {

                angular.forEach(directives, function(directive) {
                    fakes.push(this.fakeDirective($provide, directive));
                }, this);
            }

            return fakes;
        },
        fakeDirective : function($provide, directiveName) {
            var fakeDirective = function() {};

            if(angular.isObject($provide) &&
                angular.isFunction($provide.constant) &&
                isValidName(directiveName)) {

                $provide.constant(normalizeDirectiveName(directiveName),
                    fakeDirective);
            }

            return fakeDirective;
        }
    };


    if(angular && angular.mock) {
        angular.extend(angular.mock, angularMockUtils);
    }

})(angular);

/**
 * Provides a faster way to mock directives and filters
 */

(function(angular) {
    'use strict';

    function normalizeDirectiveName(directiveName) {
        var DIRECTIVE_SUFFIX = 'Directive';
        return directiveName + DIRECTIVE_SUFFIX;
    }

    function registerFilter($filterProvider, filterName) {
        var fakeFilter = function() {
            return function(content) {
                return content;
            };
        };

        if(isValidName(filterName)) {
            $filterProvider.register(filterName, fakeFilter);
        }

        return fakeFilter;
    }

    function registerDirective($provide, directiveName) {
        if(isValidName(directiveName)) {
            $provide.constant(normalizeDirectiveName(directiveName),
                function() {});
        }
    }

    function isValidName(directiveName) {
        return angular.isString(directiveName) &&
        directiveName.length > 0;
    }

    var angularMockUtils = {
        fakeFilters : function(filters) {
            if(angular.isArray(filters)) {

                module(function($filterProvider) {
                    angular.forEach(filters, function(filter) {
                        registerFilter($filterProvider, filter);
                    });
                });
            }
        },
        fakeFilter : function(filterName) {
            module(function($filterProvider) {
                registerFilter($filterProvider, filterName);
            });
        },
        fakeDirectives : function(directives) {
            if(angular.isArray(directives)) {
                module(function($provide) {
                    angular.forEach(directives, function(directive) {
                        registerDirective($provide, directive);
                    });
                });
            }
        },
        fakeDirective : function(directiveName) {
            module(function($provide) {
                registerDirective($provide, directiveName);
            });
        }
    };


    if(angular && angular.mock) {
        angular.extend(angular.mock, angularMockUtils);
    }

})(angular);

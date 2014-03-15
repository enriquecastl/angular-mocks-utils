describe('angular mock utils', function() {

    var $filterProvider,
        $provide;

    beforeEach(module(function(_$filterProvider_, _$provide_) {
        $filterProvider = _$filterProvider_;
        $provide = _$provide_;

        spyOn($filterProvider, 'register').and.callThrough();
        spyOn($provide, 'constant').and.callThrough();
    }));

    it('extends angular.mock with angular mock utils api', function() {
        [
            'fakeFilters',
            'fakeFilter',
            'fakeDirective',
            'fakeDirectives'
        ].forEach(function(fn) {
            expect(angular.mock[fn] instanceof Function).toBeTruthy();
        });
    });

    it('registers a filter in the filterProvider', function() {
        angular.mock.fakeFilter('newFilter');

        testExpectations(function() {
            expect($filterProvider.register)
            .toHaveBeenCalledWith('newFilter', jasmine.any(Function));
        });
    });

    it('does not register a filter since it has an invalid name', function() {
        angular.mock.fakeFilter('');

        testExpectations(function() {
            expect($filterProvider.register).not.toHaveBeenCalled();
        });
    });

    it('registers a list of filters', function() {
        var filters = ['filter1', 'filter2'];

        angular.mock.fakeFilters(filters);

        testExpectations(function() {
            filters.forEach(function(filter){
                expect($filterProvider.register)
                .toHaveBeenCalledWith(filter, jasmine.any(Function));
            });
        });
    });

    it('registers a directive with the angular $provide', function() {
        angular.mock.fakeDirective('directive');

        testExpectations(function() {
            expect($provide.constant).toHaveBeenCalledWith('directiveDirective',
                jasmine.any(Function));
        });
    });

    it('does not register a directive since it has an invalid name', function() {
        angular.mock.fakeDirective(null);

        testExpectations(function() {
            expect($provide.constant).not.toHaveBeenCalled();
        });
    });

    it('registers a list of directives', function() {
        var directives = ['directive1', 'directive2'];

        angular.mock.fakeDirectives(directives);

        testExpectations(function() {
            directives.forEach(function(directive){
                expect($provide.constant).toHaveBeenCalledWith(directive+'Directive',
                    jasmine.any(Function));
            });
        });
    });

    function testExpectations(test) {
        inject(function(){
            test();
        });
    }
});

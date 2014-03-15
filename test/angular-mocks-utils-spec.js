describe('angular mock utils', function() {

    var filterProvider,
        provider;

    beforeEach(function(){
        filterProvider = jasmine.createSpyObj('filterProvider', ['register']);
        provider = jasmine.createSpyObj('provider', ['constant']);
    });

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

    it('registers a filter in the filter provider', function() {
        var fakeFilter = angular.mock.fakeFilter(filterProvider, 'newFilter');
        expect(filterProvider.register).toHaveBeenCalledWith('newFilter',
            fakeFilter);
    });

    it('does not register a filter since it has an invalid name', function() {
        angular.mock.fakeFilter(filterProvider, '');
        expect(filterProvider.register).not.toHaveBeenCalled();
    });

    it('registers a list of filters', function() {
        var filters = ['filter1', 'filter2'];

        angular.mock.fakeFilters(filterProvider, filters);

        filters.forEach(function(filter){
            expect(filterProvider.register)
            .toHaveBeenCalledWith(filter, jasmine.any(Function));
        });
    });

    it('registers a directive with the angular provider', function() {
        var fakeDirective = angular.mock.fakeDirective(provider, 'directive');
        expect(provider.constant).toHaveBeenCalledWith('directiveDirective',
            fakeDirective);
    });

    it('does not register a directive since it has an invalid name', function() {
        angular.mock.fakeDirective(provider, null);
        expect(provider.constant).not.toHaveBeenCalled();
    });

    it('registers a list of directives', function() {
        var directives = ['directive1', 'directive2'];

        angular.mock.fakeDirectives(provider, directives);

        directives.forEach(function(directive){
            expect(provider.constant)
            .toHaveBeenCalledWith(directive+'Directive', jasmine.any(Function));
        });
    });
});

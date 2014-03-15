angular-mocks-utils
===================

Provides a faster way to mock angular's directives and filters

## Installation

    $ bower install angular-mocks-utils


## Requirements

Since this library is supposed to work in conjunction with
angular and angular-mocks, they should be included in your project.


## Example

You create a directive that makes use of other custom directives and filters
like this

** Directive Template **

```html
<div>
    <my-custom-directive></my-custom-directive>
    <p>{{textProperty|customFormatterFilter}}
</div>
```

But you want to test your directive in isolation without the influence of
the other directives and filters implementations. angular-mock-utils allows
you to fake those filters and directives in an easy way in order
to achieve this goal.

```js
describe(function() {

    beforeEach(function() {
        angular.mock.fakeFilter('customFormatterFilter');
        angular.mock.fakeDirective('myCustomDirective');
    });

});

```

You can also fake a group of directives and filters in an easy way


```js
describe(function() {

    beforeEach(function() {
        angular.mock.fakeFilters(['filter1', 'filter2']);
        angular.mock.fakeDirective(['directive1', 'directive2']);
    });

});
```

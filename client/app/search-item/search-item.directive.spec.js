'use strict';

describe('Directive: searchItem', function () {

  // load the directive's module and view
  beforeEach(module('brumhackApp'));
  beforeEach(module('app/search-item/search-item.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<search-item></search-item>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the searchItem directive');
  }));
});
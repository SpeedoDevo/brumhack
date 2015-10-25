'use strict';

describe('Directive: playlistItem', function () {

  // load the directive's module and view
  beforeEach(module('brumhackApp'));
  beforeEach(module('app/playlist-item/playlist-item.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<playlist-item></playlist-item>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the playlistItem directive');
  }));
});
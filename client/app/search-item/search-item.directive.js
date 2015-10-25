'use strict';

angular.module('brumhackApp')
  .directive('searchItem', function () {
    return {
      templateUrl: 'app/search-item/search-item.html',
      restrict: 'EA',
      scope: {
        item: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });

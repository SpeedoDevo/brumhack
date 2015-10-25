'use strict';

angular.module('brumhackApp')
  .directive('playlistItem', function () {
    return {
      templateUrl: 'app/playlist-item/playlist-item.html',
      restrict: 'E',
      scope: {
        item: '=',
        nowPlaying: '=',
        index: '='
      },
      link: function (scope, element, attrs) {
        // console.log(element);
        // console.log(attrs);
        scope.hideVote = attrs.hasOwnProperty('hideVote');

        scope.up = function () {
          console.log('up', scope.item.id);
        };
        scope.down = function () {
          console.log('down', scope.item.id);
        };
        scope.delete = function () {
          console.log('delete', scope.item.id);
        };
      }
    };
  });

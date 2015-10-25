'use strict';

angular.module('brumhackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('room.search', {
        url: '/s',
        // templateUrl: 'app/room/room.html',
        // parent: 'room',
        // controller: 'RoomCtrl'
      });
  });

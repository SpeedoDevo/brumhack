'use strict';

angular.module('brumhackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('room', {
        url: '/room/:code',
        templateUrl: 'app/room/room.html',
        controller: 'RoomCtrl'
      });
  });

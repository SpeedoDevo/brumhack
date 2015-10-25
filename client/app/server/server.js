'use strict';

angular.module('brumhackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('server', {
        url: '/room/:code/server',
        templateUrl: 'app/server/server.html',
        controller: 'ServerCtrl'
      });
  });

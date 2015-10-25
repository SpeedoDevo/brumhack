'use strict';

angular.module('brumhackApp')
  .controller('ServerCtrl', function ($scope) {
    $scope.room = {}
    $scope.room.code = 'ABCD';
    $scope.room.playlist = [
      {id: 'asd1', title: 'some music video', votesCnt:10},
      {id: 'asd2', title: 'some music video', votesCnt:10},
      {id: 'asd3', title: 'some music video', votesCnt:10},
      {id: 'asd4', title: 'some music video', votesCnt:10},
      {id: 'asd5', title: 'some music video', votesCnt:10},
      {id: 'asd6', title: 'some music video', votesCnt:10}
    ];

    $scope.nowPlaying = 3;
  });

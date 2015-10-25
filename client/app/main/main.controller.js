'use strict';

angular.module('brumhackApp')
  .controller('MainCtrl', function ($scope, $mdDialog, $state) {
    // $scope.awesomeThings = [];
    // 
    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });
    // 
    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };
    // 
    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };
    // 
    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });

    // $scope.room = {};
    $scope.go = function () {
      console.log('wat', $scope.roomCode);
      $state.go('room', {code:$scope.roomCode});
    }
    $scope.roomCode = "ABCD";

    $scope.newRoom = function ($event) {
      $mdDialog.show({
        targetEvent: $event,
        templateUrl: '/app/main/dialog.html',
        controller: 'DialogCtrl'
      });
    }
  })
  .controller('DialogCtrl', function ($scope, $mdDialog, $http, $state) {
    $scope.cancel = function () {
      $mdDialog.cancel();
    }

    $scope.create = function () {
      console.log('mk');
      $state.go('server',{code:'ABCD'});
      $mdDialog.cancel();
    }
  });

'use strict';

angular.module('brumhackApp')
  .controller('RoomCtrl', function ($scope, $http, $log, $state, $mdMedia) {
    console.log('room');
    $scope.playlist = [
      {id: 'asd1', title: 'some music video', votesCnt:10},
      {id: 'asd2', title: 'some music video', votesCnt:10},
      {id: 'asd3', title: 'some music video', votesCnt:10},
      {id: 'asd4', title: 'some music video', votesCnt:10},
      {id: 'asd5', title: 'some music video', votesCnt:10},
      {id: 'asd6', title: 'some music video', votesCnt:10}
    ];
    
    $scope.nowPlaying = 3;
    console.log($scope.nowPlaying);
    $scope.switch = function () {
      if ($scope.stateCheck()) {
        $state.go('room.search');
      } else {
        $state.go('room');
      }
    }
    
    $scope.sizeCheck = function () {
      return $mdMedia('gt-md');
    }
    
    $scope.stateCheck = function () {
      // return true;
      return $state.is('room');
    }
    
    $scope.search = function () {
      console.log($scope.searchForm);
      $http.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyBLbwcQnWAm7zjPvUvgG5boIcliOq2V5G8',
          type: 'video',
          maxResults: '10',
          part: 'id,snippet',
          fields: 'items/id/videoId,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default',
          q: $scope.query
        }
      })
      .success(function (data) {
        // VideosService.listResults(data);
        $log.info(data);
        var ids = "";
        for (var vid of data.items) {
          ids += vid.id.videoId + ",";
        }
        $http.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            key: 'AIzaSyBLbwcQnWAm7zjPvUvgG5boIcliOq2V5G8',
            part: 'contentDetails',
            id: ids,
            fields: 'items/contentDetails/duration',
          }
        })
        .success(function (dataTimes) {
          // VideosService.listResults(data);
          $log.info(dataTimes);
          for (var i = 0; i < data.items.length; i++) {
            var dur = moment.duration(dataTimes.items[i].contentDetails.duration);
            data.items[i].length = "" + Math.floor(dur.asMinutes()) + ":" + (dur.seconds() < 10 ? "0" : "") + dur.seconds();
          }
          $scope.results = data.items;
        })
      })
      .error( function () {
        $log.info('Search error');
      });
    
    }
  });

  'use strict';

  var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  var roomSocket = require('./room.socket');

  var RoomSchema = new Schema({
    owner: String,
    code: String,
    familyfilter: Boolean,
    playlist: [{
      url: String,
      urlID: Number,
      porn_checked: Boolean,
      offset: Number,
      votes: [{
        sessionID: String,
        isUp: Boolean
      }]
    }]
  });

  // RoomSchema.methods.upvote = function(sessionId, urlID){
  //   room.votes.push({
  //     sessionID: sessionId,
  //     isUp: true
  //   })};

  RoomSchema.method({
    upvote: function(sessionId, urlId){
      var occurances = 0;
      for (var i = 0; i < this.playlist.length; i++) {


        if(this.playlist[i].urlID==urlId){
          for (var vote of this.playlist[i].votes) {
            var current = sessionId;

            if(current == vote.sessionID){
              occurances +=1;
            }

          }
          if (occurances <1) {
            console.log("lol");
            this.playlist[i].votes.push({
              sessionID: sessionId,
              isUp: true
            });
          }

        }
      }
    },

    downvote: function(sessionId, urlId){
      var occurances = 0;
      for (var i = 0; i < this.playlist.length; i++) {


        if(this.playlist[i].urlID==urlId){
          for (var vote of this.playlist[i].votes) {
            var current = sessionId;

            if(current == vote.sessionID){
              occurances +=1;
            }

          }
          if (occurances <1) {
            this.playlist[i].votes.push({
              sessionID: sessionId,
              isUp: false
            });
          }

        }
      }},

      countvotes: function () {
        for(var i =0; i< this.playlist.length; i++){
        var votesCnt = 0;
        for (var b= 0; b < this.playlist[i].votes.length-1; b++) {

          if (this.playlist[i].votes[b].isUp==true) {
            votesCnt++;
          } else {
            votesCnt--;
          }
      
        }
        console.log(votesCnt);
      }
        return votesCnt + this.offset
      }
    });

    module.exports = mongoose.model('Room', RoomSchema);

  'use strict';

  var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  var db = mongoose.connection;
  var socket = require('./room.socket');

  var RoomSchema = new Schema({
    userID: String,
    code: String,
    familyfilter: Boolean,
    playlist: [{
      url: String,
      urlID: Number,
      pornChecked: Boolean,
      isPorn: Boolean,
      offset: Number,
      kappa: String,
      countVote: Number,
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
    addSong: function(song){
      var newSong = {
        url: song.url,
        urlID: newId(),
        pornChecked: false,
        isPorn: undefined,
        offset: calcOffset(song.length),
        votes: []
      }
      this.playlist.push(newSong);
      this.save();
    },
    removeSong: function(urlId, userId){
      for(var i = 0; i < this.playlist.length; i++){

        if(urlId == this.playlist[i].urlID && this.userID == userId ){
          this.playlist.splice(i, 1);
          console.log(this.playlist);

        }
      }
    },
    upvote: function(sessionId, urlId){
      var occurances = 0;
      for (var i = 0; i < this.playlist.length; i++) {



        if(this.playlist[i].urlID==urlId){
          for (var vote of this.playlist[i].votes) {
            var current = sessionId;

            if(current == vote.sessionID && vote.isUp == true){
              occurances +=1;

            }

          }
          if(occurances == 1 && vote.isUp == false){
            this.playlist[i].countVote+=2;
            this.playlist[i].votes.push({
              sessionID: sessionId,
              isUp: true
            });
          }
          if (occurances < 1) {
            this.playlist[i].countVote +=1;
            this.playlist[i].votes.push({
              sessionID: sessionId,
              isUp: true
            });




            //  socket.up(this.playlist[i].countvotes);

          }

          this.markModified('playlist[i]')
          this.save(function(err, res){
            console.log(res);
            if (err) {
              console.log("crash");
            }else{
              console.log("nope");
            }

          });


        }
      }



    },

    sortPlaylist: function(){


      var swap = true;
      var tmp;
      var i=0;
      while(swap){
        swap = false;
        i++
        for (var j = 0; j < this.playlist.length-i; j++) {

          if(this.playlist[j].countVote < this.playlist[j+1].countVote){
            tmp = this.playlist[j];

            this.playlist[j] = this.playlist[j+1];

            this.playlist[j+1] = tmp;
            swap = true
          }
      }
      }
  console.log(this.playlist);
    },
    downvote: function(sessionId, urlId){
      var occurances = 0;
      for (var i = 0; i < this.playlist.length; i++) {


        if(this.playlist[i].urlID==urlId){
          for (var vote of this.playlist[i].votes) {
            var current = sessionId;

            if(current == vote.sessionID && vote.isUp == false){
              occurances +=1;
            }

          }
          if (occurances == 1 && vote.isUp == true){
            this.playlist[i].countVote-=2;
            this.playlist[i].votes.push({
              sessionID: sessionId,
              isUp: false,

            })
          }
          if (occurances <1) {
            this.playlist[i].countVote-=1;
            this.playlist[i].votes.push({
              sessionID: sessionId,
              isUp: false
            });
          }

        }
      }},


    });

    module.exports = mongoose.model('Room', RoomSchema);

'use strict';

var _ = require('lodash');
var Room = require('./room.model');


// Get a single room
exports.show = function(req, res) {
  Room.find({code: req.params.id}, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.status(404).send('Not Found'); }
    return res.json(room);
  });
};

// Creates a new room in the DB.
exports.create = function(req, res) {
  Room.create(req.body, function(err, room) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(room);
  });
};

// upvotes a song in the list
exports.upvote = function(req, res){
  Room.findOne({code: req.params.id}, function (err, room) {
    //console.log(req.params);
  //  console.log(req.body);
  //  console.log(req.sessionID);
  //  console.log(room);
  //  console.log(err);
    if (err) { return handleError(res, err); }
    if(!room) { return res.status(404).send('Not Found'); }
    
    room.createRoom(req.body.userID, req.body.familyFilter);
    //room.sortPlaylist();
  //  room.removeSong(req.body.urlID,req.body.userID);
  //  room.countvotes();
    return res.status(200).end();
  })
}
exports.downvote = function(req, res){
  Room.find({code: req.params.id}, function (err, room) {
    if (err) { return handleError(res, err); }
    if(!room) { return res.status(404).send('Not Found'); }
    room.downvote(req.user.userId,req.playlist.urlID);
    return res.status(200).end();
  })
}
// Updates an existing room in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Room.find({code: req.params.id}, function (err, room) {
    if (err) { return handleError(res, err); }
    if(!room) { return res.status(404).send('Not Found'); }
    var updated = _.merge(room, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(room);
    });
  });
};

// Deletes a room from the DB.
exports.destroy = function(req, res) {
  Room.find({code: req.params.id}, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.status(404).send('Not Found'); }
    room.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

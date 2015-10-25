/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var socketServer;

exports.register = function(socket) {
  // Room.schema.post('save', function (doc) {
  //   onSave(socket, doc);
  // });
  // console.log(Room);
  // Room.schema.post('upvote', function(doc){
  //   console.log("log it bitch");
  //   onUpvote(socket,doc);
  // })
  // Room.schema.post('downvote', function(doc){
  //   onDownvote(socket,doc);
  // })
  //
  // Room.schema.post('remove', function (doc) {
  //   onRemove(socket, doc);
  // });
    
  socketServer =  socket;

}

exports.up = function(doc){
  console.log("kappa");
  socketServer.emit('room:save', doc);
}

function onUpvote(socket, doc, cb){
  socket.emit('room:playlist:like', doc);
}

function onUpvote(socket, doc, cb){
  socket.emit('room:playlist:dislike', doc);
}
function onRemove(socket, doc, cb) {
  socket.emit('room:remove', doc);
}

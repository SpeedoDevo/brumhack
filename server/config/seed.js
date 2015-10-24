/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var Room = require('../api/room/room.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

Room.find({}).remove(function() {
  Room.create({
      owner: "Mike",
      code: "qwer",
      familyFilter: false,
      playlist:[{
        url: "www.youtube.com",
        urlID: 1,
        porn_checked: true,
        offset: 10,
        votes: [{
          sessionID: 25,
          isUp: true
        },{
        sessionID: 10,
        isUp: true}]
      },{
        url: "www.youtube.lol",
        urlID: 3,
        porn_checked: true,
        offset: 10,
        votes: [{
          userID: 25,
          isUp: true
        }]
      }]


  }, {
    owner: "Tim",
    code: "abcd",
    familyFilter: false,
    playlist:[{
      url: "www.overclock.net",
      urlID:4,
      porn_checked: true,
      offset: 10,
      votes: [{
        userID: 20,
        isUp: true
      }]
    }]
  }, function() {
      console.log('finished populating users');
    }
  );
});

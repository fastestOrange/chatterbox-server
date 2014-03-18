// YOUR CODE HERE:
/* global $ */
var app = window.app;
app = {

  init : function() {

      this.username = (window.location.search).split('').slice(10).join('');
      this.roomname = 'lobby';
      this.friends = {};

      //selectors
      this.$main = $('#main');
      this.$chatMessages = $('#chat');
      this.$chatHolder = $('#chats');
      this.$roomHolder = $('#roomSelect');
      this.$send =  $('#sendchat');

      //add listeners
      //append class username
      //app.$main.on('click', '.username', app.addFriend);
      app.$send.on('submit', app.handleSubmit);
      //app.$roomSelect.on('change', app.saveRoom);

      //fetch messages
      app.fetch();
    },

    send : function(message) {
    $.ajax({
      url: 'http://127.0.0.1:3000',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function () {
        $chatMessages.val(''),
        app.refresh();
      },
      error: function () {
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  handleSubmit : function(event) {
    var message = {
      username: app.username,
      text: $chatMessages.val(),
      roomname: app.roomname
    };
    app.send(message);
    event.preventDefault();
  },

  fetch : function() {
  $.ajax({
      url: 'http://127.0.0.1:3000',
      type: 'GET',
      dataType: 'json',
      data: {
        //limit: 10,
        order: '-createdAt'
      },
      success: function(data) {
        if (!data.results || !data.results.length) {
          return;
        }
        app.populateMessages(data.results);
        //testData = data.results;
        //app.clearMessages();
        // for (var i=0; i<11; i++) {
        //   var message = data.results[i];
        //   app.addMessage(message);
        // }
        // for (var j=0; j<data.results.length; j++) {
        //   var message = data.results[j];
        //   app.users[message.username] = true;
        //   app.rooms[message.roomname] = true;
        // }
        // callback(app.users, app.rooms, data.results);
        //$('#roomSelect li').click(function(){app.showRooms(testData, $(this).attr('class'));});
      },
      error: function () {
        console.error('chatterbox: Failed to get messages');
      }
    });
  },

  populateMessages : function(results) {
    app.clearMessages();
    _.each(results, function(chat) {
      app.addMessage(chat);
    });
  },

  clearMessages : function() {
    app.$chatHolder.empty();
  },

  addMessage : function(message) {
    var username = message.username;
    var text = message.text;
    var roomname = message.roomname;
    $('<li></li>').text('<a>'+ username + '</a>: '+ text + '<a>'+ roomname + '</a>').appendTo(app.$chatHolder);
    // $('#chats li').addClass('roomname');
  },

  refresh : function() {
    app.fetch();
  }

};

app.init();

// // clear all chats
// app.clearMessages = function() {
//   $chatHolder.empty();
// };

// // get new chats
// app.refresh = function() {
//   app.fetch();
// };

// app.addRoom = function() {

// };

// app.addFriend = function() {

// };


// //app.init = function(obj3,obj4, obj5) {
//   $('document').ready(function() {
//     app.setLists = function(obj1, obj2, data) {
//       for (var key in obj1) {
//         $('<option></option>').text(key).appendTo('#users').val(key);
//       }
//       for (var key in obj2) {
//         $('<li></li>').text(key).appendTo($roomHolder).addClass(key);
//       }
//     };

//     app.setLists(obj3,obj4, obj5);

//     var username = username || (window.location.search).split('').slice(10).join('');
//     //$('#usernamedisplay').text(username);
//     $send.click(function(){
//       handleSubmit();
//       // var message = {
//       //   username: username,
//       //   text: $chatMessages.val(),
//       //   roomname: 'space!!!!!'
//       // };

//     });

//     $('#refresh').click(function(event){
//       event.preventDefault();
//       app.refresh();
//     });

//     // set username
//     $('#setname').click(function(event){
//       event.preventDefault();
//       username = $('#name').val();
//       $('#name').val('');
//       $('#usernamedisplay').text(username);
//     });

//     // add room
//     $('#addRoom').click(function(event){
//       event.preventDefault();
//       app.rooms[$('#newRoom').val('')] = true;
//     });

//     //change selected user on dropdown
//     $('#users').change(function(event){
//       event.preventDefault();
//       $('#users option').removeClass('selected');
//       $('#users option[value=' + $('#users').val() + ']').toggleClass('selected');
//       $('#addFriend').click(function() {
//         app.friends[$('.selected').val()] = true;
//       });
//     });


//   });
// };
// app.showRooms = function(data, roomClass){
//   //console.log(app.data);

//   app.clearMessages();
//   for (var i = 0; i < data.length; i++) {
//       if (roomClass === data[i].roomname) {
//         app.addMessage(data[i]);
//       }
//   }
// //};
// //app.init([], [], []);
// // app.fetch(app.init);


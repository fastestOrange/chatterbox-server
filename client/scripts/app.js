// YOUR CODE HERE:
/* global $ */
var app = {};

app.users = {};
app.rooms = {};
app.friends = {};
var testData;

app.fetch = function(callback) {
  $.ajax({
      url: 'http://127.0.0.1:3000',
      type: 'GET',
      dataType: 'json',
      data: {
        //limit: 10,
        order: '-createdAt'
      },
      success: function(data) {
        testData = data.results;
        app.clearMessages();
        for (var i=0; i<11; i++) {
          var message = data.results[i];
          app.addMessage(message);
        }
        for (var j=0; j<data.results.length; j++) {
          var message = data.results[j];
          app.users[message.username] = true;
          app.rooms[message.roomname] = true;
        }
        callback(app.users, app.rooms, data.results);
        $('#roomSelect li').click(function(){app.showRooms(testData, $(this).attr('class'));});
      },
      error: function () {
        console.error('chatterbox: Failed to get messages');
      }
    });
};

app.send = function(message) {
    $.ajax({
      url: 'http://127.0.0.1:3000',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function () {
        app.refresh();
      },
      error: function () {
        console.error('chatterbox: Failed to send message');
      }
    });
  };

app.addMessage = function(message) {
  var username = message.username;
  var text = message.text;
  var roomname = message.roomname;
  for (var key in app.friends) {
    if (key === username) {
    }
  }
  $('<li></li>').text(username + ': '+ text + ' ' + roomname).appendTo('#chats');
  $('#chats li').data('roomname', roomname);
};

// clear all chats
app.clearMessages = function() {
  $('#chats').empty();
};

// get new chats
app.refresh = function() {
  app.fetch(function(){

  });
};

app.addRoom = function() {

};

app.addFriend = function() {

};


app.init = function(obj3,obj4, obj5) {
  $('document').ready(function() {
    app.setLists = function(obj1, obj2, data) {
      for (var key in obj1) {
        $('<option></option>').text(key).appendTo('#users').val(key);
      }
      for (var key in obj2) {
        $('<li></li>').text(key).appendTo('#roomSelect').addClass(key);
      }
    };

    app.setLists(obj3,obj4, obj5);

    var username = username || (window.location.search).split('').slice(10).join('');
    $('#usernamedisplay').text(username);
    $('#sendchat').click(function(e){
      console.log("YOU TOO BRUTUS");
      var message = {
        username: username,
        text: $('#chat').val(),
        roomname: 'space!!!!!'
      };
      app.send(message);
      $('#chat').val('');
    });

    $('#refresh').click(function(event){
      event.preventDefault();
      app.refresh();
    });

    // set username
    $('#setname').click(function(event){
      event.preventDefault();
      username = $('#name').val();
      $('#name').val('');
      $('#usernamedisplay').text(username);
    });

    // add room
    $('#addRoom').click(function(event){
      event.preventDefault();
      app.rooms[$('#newRoom').val('')] = true;
    });

    //change selected user on dropdown
    $('#users').change(function(event){
      event.preventDefault();
      $('#users option').removeClass('selected');
      $('#users option[value=' + $('#users').val() + ']').toggleClass('selected');
      $('#addFriend').click(function() {
        app.friends[$('.selected').val()] = true;
      });
    });


  });
};
app.showRooms = function(data, roomClass){
  //console.log(app.data);

  app.clearMessages();
  for (var i = 0; i < data.length; i++) {
      if (roomClass === data[i].roomname) {
        app.addMessage(data[i]);
      }
  }
};
app.init([], [], []);
// app.fetch(app.init);


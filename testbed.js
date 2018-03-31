$( document ).ready(function() {

  //game iframe
  var frame = $('#game-frame');

  //message output div
  var output = $("#message-output");

  //data.json content
  var json = $('body script[type="application/json"]').text();
  var loadData;
  try {
      //console.log('json element content:', json);
      loadData = JSON.parse(json);
    } catch (e) {
      var span = $('<span/>').addClass('message').css('color', 'red').html(
        'The format of load data is invalid or the element is empty! Cannot parse data.');
      output.append(span);
    }

  $(window).on('message', function(e) {

    //sent message
    var data = e.originalEvent.data;
    var message = JSON.stringify(data);
    var span = $('<span/>').addClass('message').html(message);
    output.append(span);

    if (data.messageType == "SETTING") {
      if (data.options) {
        var options = data.options;
        if (options.width) {
          frame.width(options.width);
        }
        if (options.height) {
          frame.height(options.height);
        }
      }
    }
  });

  $('#clear-output-button').click(function() {
    output.empty();
  });

  $('#load-data-button').click(function() {
    var message = {
      messageType: "LOAD",
      gameState: loadData
    };
    frame[0].contentWindow.postMessage(message, "*");
  });
});

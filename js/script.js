$(document).ready(function () {

  // search 
  $('#search').keyup(function () {
    search();
  });

  //change microphone icon to arrow
  $('.write input').keyup(function () {
    var input = $('.write input').val();
    if (input.length !== 0) {
      $('.arrow').removeClass('not_display').addClass('display_inline_block');
      $('.microphone').removeClass('display_inline_block').addClass('not_display');
    } else {
      $('.arrow').removeClass('display_inline_block').addClass('not_display');
      $('.microphone').removeClass('not_display').addClass('display_inline_block');
    }
  });

  // send message and get random reply after seconds
  $('#send').click(function () {
    send();
  });

  // send message but enter
  $('.write input').keydown(function () {
    if (event.which === 13) {
      send();
    }
  });

  // click on a user select, change chat and messages
  $('.user').click(function () {
    changeChat($(this));
  });

  // show options of message
  $(document).on('click', '.bubble i', function () {
    toggleOption($(this));
  });

  // delete message
  $(document).on('click', '.delete', function () {
    deleteBubble($(this));
  });

});


// function search
function search() {
  var search = $('#search').val().toLowerCase();
  // search a contact
  $('.user').each(function () {
    var user = $(this).find('h2').text().toLowerCase();
    if (user.includes(search)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}

function send() {
  var text = $('.write input').val();
  var chat = $('.chat_user.display_flex');
  var bubble = $('.template .bubble').clone();
  var contact = $('.user.select');
  var info = $('.info_user.display_flex');
  var date = new Date;
  var time = addZero(date.getHours()) + ':' + addZero(date.getMinutes());
  if (text !== '') {
    bubble.addClass('send');
    bubble.children('p').text(text);
    bubble.children('span').text(time);
    chat.append(bubble);
    contact.prependTo('.contact ul');
    scrollBottom();
    if (text.length > 14) {
      contact.find('h3').text(text.substring(0, 14) + ' [...]');
    } else {
      contact.find('h3').text(text);
    }
    contact.children('span').text(time);
    info.find('span').text(time);
    $('.write input').val('');

    messageAudio("./audio/sent.wav");
    setTimeout(receive, 3000);
  }
}

function receive() {
  var text = ['Si seguro.', '¡Estoy de camino!', 'Nos vemos.', '¿De qué estás hablando?', '¡Esto es increíble!', 'Lo siento, estoy ocupado mañana...', 'No me importa.'];
  var textIndex = text[getRandomIntInclusive(0, text.length - 1)];
  var chat = $('.chat_user.display_flex');
  var bubble = $('.template .bubble').clone();
  var contact = $('.user.select');
  var date = new Date;
  var time = addZero(date.getHours()) + ':' + addZero(date.getMinutes());
  bubble.addClass('receive');
  bubble.children('p').text(textIndex);
  bubble.children('span').text(time);
  chat.append(bubble);
  scrollBottom();
  if (textIndex.length > 14) {
    contact.find('h3').text(textIndex.substring(0, 14) + ' [...]');
  } else {
    contact.find('h3').text(textIndex);
  }
  messageAudio("./audio/recived.wav");
}

function addZero(number) {
  if (number < 10) {
    number = '0' + number;
  }
  return number;
}

function scrollBottom() {
  var chatHeight = $('.chat_user.display_flex').height();
  $('.chat').scrollTop(chatHeight);
}

function changeChat(userSelect) {
  var contactSelect = $('.user.select');
  var dataElement = userSelect.attr('data-element');
  var info = $(".info_user[data-element='" + dataElement + "']");
  var infoSelect = $('.info_user.display_flex');
  var chat = $(".chat_user[data-element='" + dataElement + "']");
  var chatSelect = $('.chat_user.display_flex');
  if (!userSelect.hasClass('select')) {
    userSelect.removeClass('not_select').addClass('select');
    contactSelect.removeClass('select').addClass('not_select');
    info.removeClass('not_display').addClass('display_flex');
    infoSelect.removeClass('display_flex').addClass('not_display');
    chat.removeClass('not_display').addClass('display_flex');
    chatSelect.removeClass('display_flex').addClass('not_display');
  }
}

function toggleOption(userSelect) {
  var optionTemplate = $('.template .option').clone();
  var optionBubble = $('.bubble .option');
  optionBubble.remove();
  // console.log(userSelect.siblings().hasClass('option'));
  if (!userSelect.siblings().hasClass('option')) {
    userSelect.parent().append(optionTemplate);
    console.log('if');
  } else {
    // userSelect.siblings('.option').remove();
    optionBubble.remove();
    console.log('else');
  }
}

function deleteBubble(userSelect) {
  var message = userSelect.closest('.bubble');
  message.remove();
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function messageAudio(sent) {
  const snd = new Audio(sent);
  return snd.play();
}
'use strict';

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  switch (request.action) {
    case 'add_gender':
      addText('gender.male', request.message.male);
      addText('gender.female', request.message.female);
      break;
    case 'add_sentiment':
      addText('sentiment.positive', request.message.positive);
      addText('sentiment.negative', request.message.negative);
      break;
    case 'add_age':
      addText('age.13-17', request.message['13-17']);
      addText('age.18-25', request.message['18-25']);
      addText('age.26-35', request.message['26-35']);
      addText('age.36-50', request.message['36-50']);
      addText('age.51-64', request.message['51-65']);
      addText('age.65-100', request.message['65-100']);
      break;
    case 'add_myers_briggs_attitude':
      addText('myers_briggs_attitude.Extraversion', request.message.Extraversion);
      addText('myers_briggs_attitude.Introversion', request.message.Introversion);
      break;
    case 'add_tonality':
      addText('tonality.Corporate', request.message.Corporate);
      addText('tonality.Personal', request.message.Personal);
      break;
  }
});


function addText(label, text) {
  var $div = $('body').find('.uclassify-content')
  if ($div.length == 0) {
    $div = $('<div>')
      .addClass('uclassify-content')
      .css({
        background: '#fffee8',
        position: 'fixed',
        top: 0,
        right: 0,
        padding: '10px',
        zIndex: 100000,
      })
    $div.appendTo('body');
  }

  $('<div>').html(label + ': <b>' + text + '</b>').appendTo($div);

}

'use strict';

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  addGraph(request.classifier, request.message);
  return;

  // code below is probably to be deleted
  switch (request.classifier) {
    case 'uclassify/genderanalyzer_v5':
      addText('gender.male', request.message.male);
      addText('gender.female', request.message.female);
      break;
    case 'uclassify/sentiment':
      addText('sentiment.positive', request.message.positive);
      addText('sentiment.negative', request.message.negative);
      break;
    case 'uclassify/ageanalyzer':
      addText('age.13-17', request.message['13-17']);
      addText('age.18-25', request.message['18-25']);
      addText('age.26-35', request.message['26-35']);
      addText('age.36-50', request.message['36-50']);
      addText('age.51-64', request.message['51-65']);
      addText('age.65-100', request.message['65-100']);
      break;
    case 'prfekt/myers-briggs-attitude':
      addText('myers_briggs_attitude.Extraversion', request.message.Extraversion);
      addText('myers_briggs_attitude.Introversion', request.message.Introversion);
      break;
    case 'prfekt/myers-briggs-judging-function':
      addText('myers_briggs_attitude.Feeling', request.message.Feeling);
      addText('myers_briggs_attitude.Thinking', request.message.Thinking);
      break;
    case 'prfekt/myers-briggs-lifestyle':
      addText('myers_briggs_attitude.Judging', request.message.Judging);
      addText('myers_briggs_attitude.Perceiving', request.message.Perceiving);
      break;
    case 'prfekt/myers-briggs-perceiving-function':
      addText('myers_briggs_attitude.Sensing', request.message.Sensing);
      addText('myers_briggs_attitude.Intuition', request.message.iNtuition);
      break;
    case 'prfekt/tonality':
      addText('tonality.Corporate', request.message.Corporate);
      addText('tonality.Personal', request.message.Personal);
      break;
  }
});

function addGraph(name, values) {

  // Wrapper
  const width = 500;
  let $div = $('body').find('.uclassify-content');

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
      });
    $div.appendTo('body');
  }

  // adding a graph
  let $graph = $('<div>')
    .css({
      width: width + 10,
      position: 'relative',
      padding: 3
    });

  for (var key in values) {
    var item = values[key];
    let $bar = $('<div>')
      .css({
        height: 30,
        backgroundColor: getRandomColor(),
        width: Math.round(item * width) + 'px',
        display: 'inline-block',
        overflow: 'hidden',
        fontSize: '11px'
      })
      .text('(' + Math.round(item * 100) + '%) ' + key);
    $bar.appendTo($graph);
  }

  $graph.appendTo($div);
}

function addText(label, text) {
  let $div = $('body').find('.uclassify-content');
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
      });
    $div.appendTo('body');
  }

  $('<div>').html(`${label}: <b>${text}</b>`).appendTo($div);
}


function getRandomColor() {
  var letters = '9ABCDE';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * ( letters.length))];
  }
  return color;
}

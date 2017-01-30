'use strict';

// Saves options to chrome.storage
function save_options() {

  var items =[]
  var chk_arr = document.getElementsByName('classifier[]');

  for (var i = 0; i < chk_arr.length; i++) {
    if (chk_arr[i].checked) {
      items.push(chk_arr[i].value)
    }
  }

  chrome.storage.sync.set({
    classifiers: items
  }, function () {
    var status = document.getElementById('status');
    status.textContent = 'Classifiers saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    classifiers: ''
  }, function (items) {

    var elements = null;

    for (var i = 0; i < items.classifiers.length; i++) {
      elements = document.querySelectorAll(
        'input[type=\'checkbox\'][value=\''
        + items.classifiers[i]
        + '\']');

      if (elements && elements[0] && typeof elements[0] !== undefined) {
        elements[0].checked = true
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

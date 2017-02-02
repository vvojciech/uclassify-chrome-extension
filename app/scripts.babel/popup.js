'use strict';

// Saves options to chrome.storage
function save_options() {

  const items = [];
  const chk_arr = document.getElementsByName('classifier[]');

  for (let i = 0; i < chk_arr.length; i++) {
    if (chk_arr[i].checked) {
      items.push(chk_arr[i].value)
    }
  }

  chrome.storage.sync.set({
    classifiers: items
  }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Classifiers saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    classifiers: ''
  }, items => {

    let elements = null;

    for (let i = 0; i < items.classifiers.length; i++) {
      elements = document.querySelectorAll(
        `input[type='checkbox'][value='${items.classifiers[i]}']`);

      if (elements && elements[0] && typeof elements[0] !== undefined) {
        elements[0].checked = true
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

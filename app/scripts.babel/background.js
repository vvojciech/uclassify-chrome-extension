'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

function getUrl(url, callback) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      callback(JSON.parse(request.responseText));
    }
  };
  request.open('GET', url);
  request.send();
}

function getClassification(classifier, key, text) {
  getUrl(`https://api.uclassify.com/v1/${classifier}/classify/?readKey=${key}&text=${encodeURI(text)}`,
    result => {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
          classifier: classifier,
          message: result
        }, response => {
        });
      });
    }
  );
}

function uclassifyHandler(info) {
  const text = info.selectionText;
  chrome.storage.sync.get({
    key: '',
    classifiers: []
  }, items => {
    items.classifiers.forEach((element) => {
      getClassification(element, items.key, text)
    });
  });
}

chrome.contextMenus.create({
  'title': 'Text Classification',
  'contexts': ['selection'],
  'onclick': uclassifyHandler
});


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


function gender(text, key) {
  getUrl(`https://api.uclassify.com/v1/uclassify/genderanalyzer_v5/classify/?readKey=${key}&text=${encodeURI(text)}`,
    result => {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'add_gender', message: result
        }, response => {
        });
      });
    })
}


function sentiment(text, key) {
  getUrl(`https://api.uclassify.com/v1/uclassify/sentiment/classify/?readKey=${key}&text=${encodeURI(text)}`,
    result => {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'add_sentiment', message: result
        }, response => {
        });
      });
    })
}

function age(text, key) {
  getUrl(`https://api.uclassify.com/v1/uclassify/ageanalyzer/classify/?readKey=${key}&text=${encodeURI(text)}`,
    result => {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'add_age', message: result
        }, response => {
        });
      });
    })
}

function myers_briggs_attitude(text, key) {
  getUrl(`https://api.uclassify.com/v1/prfekt/myers-briggs-attitude/classify/?readKey=${key}&text=${encodeURI(text)}`,
    result => {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'add_myers_briggs_attitude', message: result
        }, response => {
        });
      });
    })
}

function tonality(text, key) {
  getUrl(`https://api.uclassify.com/v1/prfekt/tonality/classify/?readKey=${key}&text=${encodeURI(text)}`,
    result => {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'add_tonality', message: result
        }, response => {
        });
      });
    })
}

function getClassification(classifier, key, text) {

}

function uclassifyHandler(info) {
  const text = info.selectionText;

  chrome.storage.sync.get({
    key: ''
  }, items => {

    // TODO: add some validation for key

    gender(text, items.key);
    sentiment(text, items.key)
    age(text, items.key)
    myers_briggs_attitude(text, items.key)
    tonality(text, items.key)
  });
}

chrome.contextMenus.create({
  'title': 'Text Classification',
  'contexts': ['selection'],
  'onclick': uclassifyHandler
});


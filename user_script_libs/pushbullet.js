/**
 * pushbullet.js
 * version: 20200429
 */

/**
 * 使用Pushbullet API發送訊息，參考 - https://docs.pushbullet.com/#push
 * API - https://api.pushbullet.com/v2/pushes
 * 免費帳號每月可發送500則 - https://docs.pushbullet.com/#ratelimiting
 * @param {*} token 從這裡取得 https://www.pushbullet.com/#settings/account
 * @param {*} title
 * @param {*} body
 */

let PUSHBULLET = {};

PUSHBULLET.push = (token, title, body) => {
  var param = {
    "method": "POST",
    "url": "https://api.pushbullet.com/v2/pushes",
    "token": token,
    "data": JSON.stringify({
      "type": "note",
      "title": title,
      "body": body
    })
  };
  PUSHBULLET.httpRequest(param);
};

PUSHBULLET.deleteAllPushes = (token) => {
  var param = {
    "method": "DELETE",
    "url": "https://api.pushbullet.com/v2/pushes",
    "token": token
  };
  PUSHBULLET.httpRequest(param);
};

PUSHBULLET.httpRequest = (param) => {
  var xhr = new XMLHttpRequest();
  xhr.open(param.method, param.url, true);
  xhr.setRequestHeader("Access-Token", param.token);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    PUSHBULLET.httpResponse(xhr);
  };
  if (param.data !== null) {
    xhr.send(param.data);
  } else {
    xhr.send();
  }
};

PUSHBULLET.httpResponse = (xhr) => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var json = JSON.parse(xhr.responseText);
    console.log("XMLHttpRequest success");
    console.log(json);
  } else {
    console.log("XMLHttpRequest failed");
    console.log(xhr.status);
    debugger;
  }
};

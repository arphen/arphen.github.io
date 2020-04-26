/**
 * pushbullet.js
 * version: 20200426v1
 */

/**
 * 使用Pushbullet API發送訊息，參考 - https://docs.pushbullet.com/#push
 * API - https://api.pushbullet.com/v2/pushes
 * @param {*} title
 * @param {*} body
 */

let PUSHBULLET = {};

PUSHBULLET.push = (token, title, body) {
  var xhr = new XMLHttpRequest();
  var url = "https://api.pushbullet.com/v2/pushes";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Access-Token", token);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      console.log(json);
      debugger;
    }
  };
  var data = JSON.stringify({
    "title": title,
    "body": body
  });
  xhr.send(data);
};

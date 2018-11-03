// version: 20171019-2

// ----------------------------------------------------------------
// 傳送端 ----------------------------------------------------------
// ----------------------------------------------------------------

APLTOOL.MsgSender = {
  isKeepConnection: true,
  targetWin: null,
  sendTimer: null,
  sendCounter: 0,
  messageInfo: {}
};

/**
 * 
 * @param {*} url : 傳送目標
 * @param {*} waitTime : 等多久
 * @param {*} callback : 回呼
 */
APLTOOL.MsgSender.init = function (url, targetUrl, callback) {
  APLTOOL.MsgSender.stop();

  // set message info
  APLTOOL.MsgSender.messageInfo = {
    url: url,
    targetUrl: targetUrl,
    callback: callback
  };

  // open url
  APLTOOL.MsgSender.targetWin = window.open(APLTOOL.MsgSender.messageInfo.url);

  // start waiting for ack
  window.addEventListener('message', APLTOOL.MsgSender.recv, false);

};


/**
 * @param {*} [data] : 傳送訊息, 如果沒有傳值，預設傳送 APLTOOL.MsgSender.messageInfo.data
 */
APLTOOL.MsgSender.send = function (data) {
  if (data !== undefined) {
    APLTOOL.MsgSender.messageInfo.data = data;
  }

  // 間隔2秒送一次, 直到收到ack為止
  APLTOOL.MsgSender.stop();
  APLTOOL.MsgSender.sendTimer = setTimeout(APLTOOL.MsgSender.send, 2000);

  // 試3次
  if (APLTOOL.MsgSender.sendCounter >= 3) {
    // close ole win
    try {
      APLTOOL.MsgSender.targetWin.close();
    } catch (e) {
      log(e);
    }
    // open new win
    APLTOOL.MsgSender.targetWin = window.open(APLTOOL.MsgSender.messageInfo.url);
    APLTOOL.MsgSender.sendCounter = 0;
  }

  try {
    // 檢查接收端window是否還存在？如果不在會exception
    log(APLTOOL.MsgSender.targetWin.location);

    // targetWin.postMessage(data, '*') // 利用postMessage傳
    APLTOOL.MsgSender.targetWin.postMessage(
      APLTOOL.MsgSender.messageInfo.data,
      APLTOOL.MsgSender.messageInfo.targetUrl); // 利用postMessage傳至targetUrl
    log('send message: data= ' + APLTOOL.MsgSender.messageInfo.data +
      '; target= ' + APLTOOL.MsgSender.messageInfo.targetUrl);
    APLTOOL.MsgSender.sendCounter++;

  } catch (e) {
    log(e);
    if (e.message.indexOf("Cannot read property" >= 0)) { // "Cannot read property 'location' of null"
      // open url
      APLTOOL.MsgSender.targetWin = window.open(APLTOOL.MsgSender.messageInfo.url);
      APLTOOL.MsgSender.sendCounter = 0;
    }
  }
};

APLTOOL.MsgSender.stop = function (isResetCounter) {
  try {
    // 停止Timer，避免一直重送
    clearTimeout(APLTOOL.MsgSender.sendTimer);
    APLTOOL.MsgSender.sendTimer = null;
    if (isResetCounter) {
      APLTOOL.MsgSender.sendCounter = 0;
    }
    if (!APLTOOL.MsgSender.isKeepConnection) { // 不保留連線，清理資料
      window.removeEventListener('message', APLTOOL.MsgSender.recv, false);
      APLTOOL.MsgSender.messageInfo = {}; // stop object
    }
  } catch (e) {
    log(e);
  }
};

APLTOOL.MsgSender.recv = function (event) {
  log('recv message: data= ' + event.data + '; origin= ' + event.origin);
  // 判斷來源
  if (event.origin === APLTOOL.MsgSender.messageInfo.targetUrl) {
    // return data is event.data
    APLTOOL.MsgSender.messageInfo.callback(event);
    APLTOOL.MsgSender.stop(true); // todo: 會清掉messageInfo
  }
};

// ----------------------------------------------------------------
// 接收端 ----------------------------------------------------------
// ----------------------------------------------------------------
APLTOOL.MsgReceiver = {
  messageInfo: {}
};

APLTOOL.MsgReceiver.init = function (sourceUrl, callback) {
  APLTOOL.MsgReceiver.messageInfo.sourceUrl = sourceUrl;
  APLTOOL.MsgReceiver.messageInfo.callback = callback;
  window.addEventListener('message', APLTOOL.MsgReceiver.recv);
};

APLTOOL.MsgReceiver.recv = function (event) {
  log('recv message: data= ' + event.data + '; origin= ' + event.origin);

  // 判斷是否從指定來源送出
  if (event.origin === APLTOOL.MsgReceiver.messageInfo.sourceUrl) {
    APLTOOL.MsgReceiver.messageInfo.event = event;
    APLTOOL.MsgReceiver.send(event.data, event.origin); // 回送data給來源
    APLTOOL.MsgReceiver.messageInfo.callback(event);
  }
};

APLTOOL.MsgReceiver.send = function (data, target) {
  try {
    log('send message: data= ' + data + '; target= ' + target);
    // use postMessage to ack
    // window.opener.postMessage(data, '*') // 成功！
    window.opener.postMessage(data, target);
  } catch (e) {
    log(e);
  }
};

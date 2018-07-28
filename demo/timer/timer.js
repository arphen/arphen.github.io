// var gIntervalThreeSeconds = 3000;
var gInterv1 = 60;
var gInterv2 = 10;
var gTimer;
var gStage = 0; // 1 - 第一個timer, 2 - 第二個timer
var gNotify;
var gDtStart;

// 程式進入點
$(document)
  .ready(function () {
    main();
  });

/**
 * 精準計時器
 * How to create an accurate timer in javascript? - https://goo.gl/hKPcWQ
 */
function setIntervalAccurate() {
  gDtStart = Date.now();
  gTimer = setInterval(function () {
    var delta = Date.now() - gDtStart; // milliseconds elapsed since gDtStart
    var elapsed = Math.floor(delta / 1000); // convert to seconds
    // what to do here
    countDown(elapsed);
  }, 500); // update every 200ms
}


function StartTimer() {
  $('#btnTimer')
    .html('Stop');

  // gTimer = setInterval(countDown.bind(null, '#timer1'), 1000);
  // gTimer = setInterval(countDown, 1000);
  setIntervalAccurate();
  gStage = 1;
}

function StopTimer() {
  $('#btnTimer')
    .html('Start');

  clearInterval(gTimer);
  gTimer = null;
  gStage = 0;
  // timer 1
  $('#spanTimer1')
    .html(gInterv1)
    .attr('interval', gInterv1);
  // timer 2
  $('#spanTimer2')
    .html(gInterv2)
    .attr('interval', gInterv2);
}


/**
 * 倒數
 *
 * @param {*} elapsed
 */
function countDown(elapsed) {
  var timerId = '#spanTimer' + gStage;
  // 計算剩餘秒數s
  var s = parseInt($(timerId)
    .attr('interval'), 10) - elapsed;
  $(timerId)
    .html(s);

  if (s <= 0) {
    clearInterval(gTimer);
    gTimer = null;

    if (gStage === 1) {
      chromeNotify('時間到', '進廣告囉！');
      showOverlay('#ok1');
    } else { // gStage === 2
      chromeNotify('時間到', '廣告播畢！');
      showOverlay('#ok2');
    }
  }
}

function showOverlay(showButtonId) {
  $('#overlay')
    .show();
  $('#overlay button')
    .hide();

  $(showButtonId)
    .show()
    .focus();

}


/**
 * 使用 Web Notifications - https://goo.gl/e1m2BP
 * @param {any} title
 * @param {any} body
 */
function chromeNotify(title, body) {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  } else {
    // options - https://goo.gl/W8Wr6r    
    gNotify = new Notification(title, {
      body: body,
      requireInteraction: true // Notify不會自動關閉
    });

    debugger;

    // 以下設定自動關閉Notify
    /*    
        n.onshow = function () {
          setTimeout(function () {
            n.close();
          }, gIntervalThreeSeconds); // close after 3 sec;
        };
    */

    // 點了Notify的動作
    gNotify.onclick = function () {
      // window.open('http://stackoverflow.com/a/13328397/1269037')
      // switch to email tab
      // chrome.tabs - Google Chrome - https://goo.gl/ykUrga

      // 以下可切回原視窗
      // window.focus();

      // 判斷stage
      switch (gStage) {
      case 1:
        $('#ok1')
          .click();
        break;
      case 2:
        $('#ok2')
          .click();
        break;
      default:
        break;
      }

      // 關閉Notify
      gNotify.close();

    };

  }
}

function main() {
  StopTimer();

  $('#btnTimer')
    .on('click', function () {
      if ($(this)
        .html() === 'Start') {
        StartTimer();
      } else {
        StopTimer();
      }
    })
    .focus();

  $('#ok1')
    .on('click', function () {
      $('#overlay')
        .hide();
      $('#btnTimer')
        .focus();
      //gTimer = setInterval(countDown.bind(null, '#timer2'), 1000);
      //gTimer = setInterval(countDown, 1000);
      setIntervalAccurate();
      gStage = 2;
      // 關閉Notify
      gNotify.close();
    });

  $('#ok2')
    .on('click', function () {
      $('#overlay')
        .hide();
      $('#btnTimer')
        .focus();
      StopTimer();
      StartTimer();
      // 關閉Notify
      gNotify.close();
    });

}

var gIntervalThreeSeconds = 3000;
var gInterv1 = 5;
var gInterv2 = 3;
var gTimer;

function StartTimer() {
  $('#btnTimer')
    .html('Stop');

  gTimer = setInterval(countDown.bind(null, '#timer1'), 1000);
}

function StopTimer() {
  $('#btnTimer')
    .html('Start');

  clearInterval(gTimer);
  gTimer = null;
  $('#timer1')
    .html(gInterv1);
  $('#timer2')
    .html(gInterv2);
}

function countDown(timerId) {
  var s = parseInt($(timerId)
    .text(), 10);
  if (s > 0) {
    $(timerId)
      .html(s - 1);
  } else { // s===0
    clearInterval(gTimer);
    gTimer = null;

    if (timerId === '#timer1') {
      //alert('Timer1 Out');
      chromeNotify('Timer, Timer1 Out');
      showOverlay('#ok1');
    } else {
      //alert('Timer2 Out');
      chromeNotify('Timer, Timer2 Out');
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
 * 使用 Web Notifications - Web APIs | MDN - https://goo.gl/e1m2BP
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
    var n = new Notification(title, {
      body: body,
      requireInteraction: true // Notify不會自動關閉
    });

    // 以下設定自動關閉Notify
    /*    
        n.onshow = function () {
          setTimeout(function () {
            n.close();
          }, gIntervalThreeSeconds); // close after 3 sec;
        };
    */

    // 點了Notify的動作
    n.onclick = function () {
      // window.open('http://stackoverflow.com/a/13328397/1269037')
      // switch to email tab
      // chrome.tabs - Google Chrome - https://goo.gl/ykUrga

      // 以下二行可切回原視窗
      window.focus();
      this.cancel();

      // 關閉
      n.close();
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
      gTimer = setInterval(countDown.bind(null, '#timer2'), 1000);
    });

  $('#ok2')
    .on('click', function () {
      $('#overlay')
        .hide();
      $('#btnTimer')
        .focus();
      StopTimer();
      StartTimer();
    });

}

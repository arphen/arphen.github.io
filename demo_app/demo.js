var currentPageId = 'page_portal';
const pages = {
  page_portal: '用戶入口',
  page_taskmgmt: '勤務管理',
  page_taskmonitor: '勤務監控'
};

function init() {
  // show default page
  switchPage('page_portal', false);

  $("#logout_icon").on("click", function() {
    // alert('clicked');
    logout();
  });
}

function logout() {
  switchPage('page_portal', false);
}

function toggleMenu() {
  menuOnOff();
  maskOnOff();
}

function switchPage(pageId, isToggleMenu = true) {
  console.log("isToggleMenu=" + isToggleMenu);

  $('#header').html(pages[pageId]);

  if (isToggleMenu) {
    toggleMenu();
  }
  // change order
  $('#' + pageId).insertBefore($('#' + currentPageId));
  $('.page').css('visibility', 'hidden');
  $('#' + pageId).css('visibility', 'visible');
  currentPageId = pageId;
}

function maskOnOff() {
  if ($('#mask').css('visibility') == 'hidden') {
    $('#mask').css('visibility', 'visible');
    $('#mask').css('z-index', '100');
  } else {
    $('#mask').css('visibility', 'hidden');
    $('#mask').css('z-index', '0');
  }
}

function menuOnOff() {
  if ($('#menu').css('visibility') == 'hidden') {
    $('#menu').css('visibility', 'visible');
    $('#menu').css('z-index', '101');
  } else {
    $('#menu').css('visibility', 'hidden');
    $('#menu').css('z-index', '0');
  }
}
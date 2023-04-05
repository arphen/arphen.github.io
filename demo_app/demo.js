function init() {
    $("#logout_icon").on("click", function() {
      alert('clicked');
      toggleMenu();
    });
  }
  
  function toggleMenu() {
    menuOnOff();
    maskOnOff();
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
$(document).ready(function () {
  // When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar; When it passed the anchor, add background
  const $navbar = $('.navbar');
  const $navAnchor = $('#nav_anchor');
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos >= $navAnchor.offset().top) {
      $navbar.addClass('active');
      if (prevScrollpos > currentScrollPos) {
        $navbar.css("top", 0);
      } else {
        $navbar.css("top", "-50px");
      }
    } else {
      $navbar.removeClass('active');
      $navbar.css("top", 0);
    }
    prevScrollpos = currentScrollPos;
  }
});
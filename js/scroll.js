$(document).ready(function () {
  const $navbar = $('.navbar'); // used in updateNavColor and autoHideNav
  const $navAnchor = $('#nav_anchor'); // used in updateNavColor
  const hls = $('.highlight-content'); // used in highlight
  const fadeins = $('.fadein'); // used in fadein
  const back = $('#back');
  // const videos = $('video');
  // let played = Array.apply(null, Array(5)).map(function () {return false;});

  function scrollHandler() {
    const yPosition = window.pageYOffset;
    updateNavColor($navAnchor, $navbar, yPosition);
    autoHideNav($navbar, yPosition);
    highlight(hls, yPosition);
    fadein(fadeins, yPosition);
  }

  $(window).scroll(scrollHandler);
  scrollHandler();

});

// add bg color to navbar after anchor
function updateNavColor($anchor, $navbar, yPosition) {
  if (yPosition >= $anchor.offset().top) {
    $navbar.addClass('active');
  } else {
    $navbar.removeClass('active');
  }
}

// scroll down to hide navbar
let prev_yPosition = window.pageYOffset;

function autoHideNav($navbar, yPosition) {
  if (prev_yPosition >= yPosition) {
    $navbar.css("top", 0);
    $navbar.css("opacity", 1);
  } else {
    $navbar.css("top", "-50px");
    $navbar.css("opacity", 0);
  }
  prev_yPosition = yPosition;
}

// reveal effect to highlight text
function highlight(hls, yPosition) {
  for (let i = 0; i < hls.length; i++) {
    var positionFromTop = hls.eq(i).offset().top;
    if (positionFromTop < yPosition + window.innerHeight - 200) {
      hls.eq(i).css('background-size', '100%');
    }
  }
}

// fade in from bottom
function fadein(fadeins, yPosition) {
  for (let i = 0; i < fadeins.length; i++) {
    var positionFromTop = fadeins.eq(i).offset().top;
    if (positionFromTop < yPosition + window.innerHeight - 50) {
      fadeins.eq(i).css({'transform': 'translateY(0)', 'opacity': 1});
    }
  }
}

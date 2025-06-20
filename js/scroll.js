$(document).ready(function () {
  const hls = $('.highlight-content'); // used in highlight
  const fadeins = $('.fadein'); // used in fadein

  function scrollHandler() {
    const yPosition = window.pageYOffset;
    highlight(hls, yPosition);
    fadein(fadeins, yPosition);
  }

  $(window).scroll(scrollHandler);
  scrollHandler();

});

function highlight(hls, yPosition) {
  for (let i = 0; i < hls.length; i++) {
    var positionFromTop = hls.eq(i).offset().top;
    if (positionFromTop < yPosition + window.innerHeight - 200) {
      hls.eq(i).css('background-size', '100%');
    }
  }
}

function fadein(fadeins, yPosition) {
  for (let i = 0; i < fadeins.length; i++) {
    var positionFromTop = fadeins.eq(i).offset().top;
    if (positionFromTop < yPosition + window.innerHeight - 50) {
      fadeins.eq(i).css({'transform': 'translateY(0)', 'opacity': 1});
    }
  }
}

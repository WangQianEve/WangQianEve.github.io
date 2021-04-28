function getSections($links) {
  return $(
    $links
      .map((i, el) => $(el).attr('href'))
      .toArray()
      .filter(href => href.charAt(0) === '#')
      .join(','),
  );
}

function updateNav($sections, $links, $inpageNav, yPosition) {
  if ($sections.length === 0) {
    return;
  }
  for (let i = $sections.length - 1; i >= 0; i -= 1) {
    let $section = $sections.eq(i);
    if (yPosition + 300 >= $section.offset().top) {
      $inpageNav.removeClass('invisible');
      return $links
        .removeClass('active')
        .filter(`[href="#${$section.attr('id')}"]`)
        .addClass('active');
    }
  }
  $inpageNav.addClass('invisible');
  $links.removeClass('active');
}

$(document).ready(function () {
  // project page update slider
  const $links = $('#menu > a');
  const $inpageNav = $('#menu');
  const $sections = getSections($links);

  // about & process & project page
  function scrollHandler () {
    const yPosition = window.pageYOffset;
    updateNav($sections, $links, $inpageNav, yPosition);
  }
  $(window).scroll(scrollHandler);
  scrollHandler();
});

function showImage(src, theme = 'dark') {
  $('#image-modal > img')[0].src = src;
  $('#image-modal').css('display', 'flex');
}
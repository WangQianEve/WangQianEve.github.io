function getSections($links) {
  return $(
    $links
      .map((i, el) => $(el).attr('href'))
      .toArray()
      .filter(href => href.charAt(0) === '#')
      .join(','),
  );
}

function updateNav($sections, $links, $inpageNav, anchorPos, yPosition) {

  if (yPosition >= anchorPos) {
    $inpageNav.addClass('stick');
  } else {
    $inpageNav.removeClass('stick');
  }

  for (let i = $sections.length - 1; i >= 0; i -= 1) {
    let $section = $sections.eq(i);
    if (yPosition + 300 >= $section.offset().top) {
      return $links
        .removeClass('active')
        .filter(`[href="#${$section.attr('id')}"]`)
        .addClass('active');
    }
  }
}

$(document).ready(function () {
  // project page update slider
  const $links = $('#menu a');
  const $inpageNav = $('#menu');
  const $sections = getSections($links);
  const anchorPos = $('#menu').offset().top;

  // about & process & project page
  function scrollHandler() {
    const yPosition = window.pageYOffset;
    updateNav($sections, $links, $inpageNav, anchorPos, yPosition);
  }

  $(window).scroll(scrollHandler);
  scrollHandler();
});

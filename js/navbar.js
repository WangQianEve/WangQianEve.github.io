function getSections($links) {
    return $(
        $links
            .map((i, el) => $(el).attr('href'))
            .toArray()
            .filter(href => href.charAt(0) === '#')
            .join(','),
    );
}

function updateNavColor($anchor, $navbar) {
    const yPosition = window.pageYOffset;
    if (yPosition >= $anchor.offset().top) {
        $navbar.addClass('active');
    } else {
        $navbar.removeClass('active');
    }
}

function updateNav($sections, $links, $highlighter, $inpageNav) {
    if ($sections.length === 0) {
        return;
    }
    const yPosition = window.pageYOffset + 300;
    // in page
    for (let i = $sections.length - 1; i >= 0; i -= 1) {
        let $section = $sections.eq(i);
        if (yPosition >= $section.offset().top) {
            $inpageNav.addClass('visible');
            $highlighter.css({'left': i * 45 + 210});
            return $links
                .removeClass('active')
                .filter(`[href="#${$section.attr('id')}"]`)
                .addClass('active');
        }
    }
    $inpageNav.removeClass('visible');
    $links.removeClass('active');
}

function highlight(hls) {
    const yPosition = window.pageYOffset;
    for (let i = 0; i < hls.length; i++) {
        var positionFromTop = hls.eq(i).offset().top;
        if (positionFromTop < yPosition + window.innerHeight - 200) {
            hls.eq(i).css('background-size', '100%');
        }
    }
}

$highlighterShow = false;

$(document).ready(function () {
    const $links = $('#inpageNav > a');
    const $inpageNav = $('#inpageNav');
    const $sections = getSections($links);
    const $highlighter = $('#highlighter');
    const $navbar = $('.navbar');
    const $navAnchor = $('#nav_anchor');
    const hls = $('.highlight-content');
    $('.parallax').scroll(function () {
        updateNav($sections, $links, $highlighter, $inpageNav);
        updateNavColor($navAnchor, $navbar);
        highlight(hls);
    });
    $(window).scroll(function () {
        updateNav($sections, $links, $highlighter, $inpageNav);
        updateNavColor($navAnchor, $navbar);
    });
    updateNav($sections, $links, $highlighter, $inpageNav);
});

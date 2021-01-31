function getSections($links) {
    return $(
        $links
            .map((i, el) => $(el).attr('href'))
            .toArray()
            .filter(href => href.charAt(0) === '#')
            .join(','),
    );
}

function updateNavColor($anchor, $navbar, yPosition) {
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
            $highlighter.css({'left': i * 40 + 260});
            return $links
                .removeClass('active')
                .filter(`[href="#${$section.attr('id')}"]`)
                .addClass('active');
        }
    }
    $inpageNav.removeClass('visible');
    $links.removeClass('active');
}

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
        if (positionFromTop < yPosition + window.innerHeight - 300) {
            fadeins.eq(i).css({'transform': 'translateY(0)', 'opacity': 1});
        }
    }
}

$(document).ready(function () {
    // project page
    const $links = $('#inpageNav > a');
    const $inpageNav = $('#inpageNav');
    const $sections = getSections($links);
    const $highlighter = $('#highlighter');
    const $navbar = $('.navbar');
    const $navAnchor = $('#nav_anchor');
    const hls = $('.highlight-content');
    const fadeins = $('.fadein');
    // about & process & project page
    function scrollHandler () {
        const yPosition = window.pageYOffset;
        highlight(hls, yPosition);
        updateNav($sections, $links, $highlighter, $inpageNav);
        updateNavColor($navAnchor, $navbar, yPosition);
        fadein(fadeins, yPosition);
    }
    $(window).scroll(scrollHandler);
    $('.parallax').scroll(scrollHandler);
    scrollHandler();

});
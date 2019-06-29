function setColor() {
    var prevScrollpos = window.pageYOffset;
    var showNavBgTh = 0.26 * window.innerWidth;
    var currentScrollPos = window.pageYOffset;
    prevScrollpos = currentScrollPos;
    // change color
    var navbarBtns = $('.navList a');
    var navbar = $('#navbar');
    if (currentScrollPos > showNavBgTh) {
        navbarBtns.css({ 'color': 'grey'});
        navbar.css({ 'background-color': '#ffffffdd' });
    } else if (currentScrollPos < showNavBgTh) {
        navbarBtns.css({ 'color': 'white'});
        navbar.css({ 'background-color': '#ffffff00' });
    }
}

function getSections($links) {
    return $(
        $links
            .map((i, el) => $(el).attr('href'))
            .toArray()
            .filter(href => href.charAt(0) === '#')
            .join(','),
    );
}

function updateNavColor($anchor, $navbar, $pgBtns) {
    yPosition = window.pageYOffset;
    console.log( yPosition, $anchor.offset().top);
    if (yPosition >= $anchor.offset().top) {
        $navbar.css({ 'background-color': '#ffffffee', 'box-shadow': '0px 0px 5px #00000022'});
        $pgBtns.css({ 'color': '#888'});
    } else {
        $navbar.css({ 'background-color': '#ffffff00', 'box-shadow': 'none'});
        $pgBtns.css({ 'color': 'white'});
    }
}

function updateNav($sections, $links, $highlighter) {
    yPosition = window.pageYOffset+300;
    if (yPosition >= $sections.eq(0).offset().top) {
        if (!$highlighterShow) {
            $highlighter.css({'width':110});
            $highlighterShow = true;
        }
    } else {
        if ($highlighterShow) {
            $highlighter.css({'width':0});
            $highlighterShow = false;
        }
    }
    // in page
    for (let i = $sections.length - 1; i >= 0; i -= 1) {
        $section = $sections.eq(i);
        if (yPosition >= $section.offset().top) {
            $highlighter.css({'left':i*30+104});
            return $links
                .removeClass('active')
                .filter(`[href="#${$section.attr('id')}"]`)
                .addClass('active');
        }
    }
    $links.removeClass('active');
}

$highlighterShow = false;

$(document).ready(function() {
    const $links = $('.roundedNav > a');
    const $sections = getSections($links);
    const $highlighter = $('#highlighter');
    const $navbar = $('#navbar');
    const $nav_anchor = $('#nav_anchor');
    const $pgBtns = $('.pg-btn');
    window.onscroll = function() {
        // updateNav($sections, $links, $highlighter, $navbar);
        updateNavColor($nav_anchor, $navbar, $pgBtns);
    };
    // updateNav($sections, $links, $highlighter, $navbar);
});

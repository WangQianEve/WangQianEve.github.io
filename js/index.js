function updateNavColor($anchor, $navbar, yPosition) {
    if (yPosition >= $anchor.offset().top) {
        $navbar.addClass('active');
    } else {
        $navbar.removeClass('active');
    }
}

function filterSelection(c) {
    let x, i;
    x = document.getElementsByClassName("filterDiv");
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        removeClass(x[i], "visible");
        if (x[i].className.split(' ').indexOf(c) > -1) {
            addClass(x[i], "show");
            setTimeout(function (param1) {
                addClass(param1, "visible");
            }, 200, x[i]);
        }
    }
}

function addClass(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) === -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function removeClass(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

function createFilter() {
    let btnContainer = document.getElementById("filter");
    let btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            let current = btnContainer.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}

function showAllCodeWork() {
    $('.code.noshow').removeClass('noshow');
    $('.code-more').addClass('noshow');
}

function turnOnDesign() {
    $('#filter').removeClass('noshow');
    $('.container.design').removeClass('noshow');
    $('.container.code').addClass('noshow');
    $('.title.design').addClass('active');
    $('.title.code').removeClass('active');
}

function turnOnCode() {
    $('#filter').addClass('noshow');
    $('.container.design').addClass('noshow');
    $('.container.code').removeClass('noshow');
    $('.title.design').removeClass('active');
    $('.title.code').addClass('active');
}

$highlighterShow = false;
first_time_scroll = true;

$(document).ready(function () {
    $(this).scrollTop(0);
    filterSelection("filterDiv");
    createFilter();
    // landing page
    const $landingAnchor = $("#landing_anchor");
    const $landing = $("#landing");
    const $content = $(".content");
    const $zoomAnchor = $("#zoom_anchor");

    const contentScale = .5;
    //nav bar
    const $navbar = $(".navbar");
    const $navAnchor = $("#nav_anchor");
    const $bannerImg = $(".banner img");
    const $scrollDown = $(".scroll_down");
    const $slogan = $(".slogan");

    $landing.on("transitionend", function () {
        $landing.css("display", "none");
    });

    const bezierFn = cubicBezierGenerator(.44, .01, .82, .47);
    const finalScale = 20;

    let $landingImg = $("#landing img");
    let topOffset = 0;


    function handleResize() {
        topOffset = Math.min(0, ($window.height() - $landingImg.height()) / 2);
        $landingImg.css("margin-top", topOffset);
        toggleLandingAndNavbar();
    }

    function toggleLandingAndNavbar() {
        const yPosition = window.pageYOffset;
        const maxYPos = $landingAnchor.offset().top;
        const zoomCenter = $zoomAnchor.offset();

        if (yPosition <= maxYPos) {
            if (first_time_scroll) {
                // Visible.
                $landing.css("display", "");
                requestAnimationFrame(function () {
                    // Start transition after the element is displayed.
                    $landing.removeClass('hidden');
                });
                $content.addClass('static');
                $scrollDown.removeClass('scroll-hidden');
                $slogan.addClass('hidden');

                const landingScale = 1 + (finalScale - 1) * bezierFn(yPosition / maxYPos);
                $landing.css({
                    "transform": "scale(" + landingScale + ")",
                    "transform-origin": zoomCenter.left + "px " + zoomCenter.top + "px",
                });
                const bannerScale = 1 + contentScale * (1 - yPosition / maxYPos);
                $bannerImg.css({
                    "transform": "scale(" + bannerScale + ")",
                });
            }
        } else {
            $content.removeClass('static');
            if (first_time_scroll) {
                first_time_scroll = false;
                window.scrollTo(0, 0);
            }
            // Not visible.
            $landing.addClass('hidden');
            $scrollDown.addClass('scroll-hidden');
            $slogan.removeClass('hidden');
            const url = window.location.href;
            if (url.endsWith("#landing_space2")) {
                // Remove in-page links so we can jump back to where we left off when navigating back.
                window.history.replaceState(null, "", url.substr(0, url.length - 15));
            }
        }
        updateNavColor($navAnchor, $navbar, yPosition);
    }

    let $window = $(window);

    $window.scroll(toggleLandingAndNavbar);
    $window.resize(handleResize);

    turnOnDesign();
});

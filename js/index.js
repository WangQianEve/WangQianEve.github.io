function updateNavColor($anchor, $navbar, yPosition) {
    if (yPosition >= $anchor.offset().top) {
        $navbar.addClass('active');
    } else {
        $navbar.removeClass('active');
    }
}

function filterSelection(klass) {
    let $projects = $(".filterDiv");
    let $shownProject = $projects.filter(".show").eq(0);

    let displayFiltered = function () {
        $projects.removeClass("show");
        requestAnimationFrame(function () {
            $projects.filter("." + klass).addClass("show");
            if ($shownProject.length > 0) {
                $shownProject.unbind("transitionend");
            }
            requestAnimationFrame(function () {
                // if not called inside here, previously hidden elements
                // would just appear without transform
                $projects.addClass("visible");
            });
        });
    };

    if ($shownProject.length > 0) {
        $shownProject.on("transitionend", displayFiltered);
        $projects.removeClass("visible");
    } else {
        $projects.removeClass("visible");
        displayFiltered();
    }
}

function createFilter() {
    let $btnContainer = $("#filter");
    let $btns = $btnContainer.find(".btn");
    $btns.each(function (index) {
        let $this = $(this);
        $this.click(function () {
            let $current = $btnContainer.find(".active");
            $current.removeClass("active");
            $this.addClass("active");
        })
    });
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
    window.history.replaceState(null, null, ' ');
}

function turnOnCode() {
    $('#filter').addClass('noshow');
    $('.container.design').addClass('noshow');
    $('.container.code').removeClass('noshow');
    $('.title.design').removeClass('active');
    $('.title.code').addClass('active');
    window.location.hash = "#code";
}

$(document).ready(function () {
    document.querySelector('.banner-video').playbackRate = 1;
    $(this).scrollTop(0);
    filterSelection("featured");
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

    const bezierFn = cubicBezierGenerator(.5, .0, .5, 1);
    const finalScale = 20;

    let $window = $(window);
    let $landingImg = $("#landing img");
    let topOffset = 0;
    let zoomCenter = $zoomAnchor.offset();
    const maxYPos = $landingAnchor.offset().top;
    const maxYPos2 = maxYPos + $landingAnchor.height();
    let window_width = $window.width();

    function handleResize() {
        window_width = $window.width();
        zoomCenter = $zoomAnchor.offset();
        topOffset = Math.min(0, ($window.height() - $landingImg.height()) / 2);
        $landingImg.css("margin-top", topOffset);
        toggleLandingAndNavbar();
    }

    let firstTimeScroll = true;

    function toggleLandingAndNavbar() {
        const yPosition = window.pageYOffset;
        if (window_width >= 768) {
            if (yPosition <= maxYPos) {
                if (firstTimeScroll) {
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
                if (yPosition >= maxYPos2) {
                    $content.removeClass('static');
                    if (firstTimeScroll) {
                        firstTimeScroll = false;
                        window.scrollTo(0, 0);
                    }
                }
                // Not visible.
                $landing.addClass('hidden');
                $scrollDown.addClass('scroll-hidden');
                $slogan.removeClass('hidden');
            }
        }
        updateNavColor($navAnchor, $navbar, yPosition);
    }

    $window.scroll(toggleLandingAndNavbar);
    $window.resize(handleResize);

    if (window.location.hash === "#code") {
        turnOnCode();
    } else {
        turnOnDesign();
    }
});

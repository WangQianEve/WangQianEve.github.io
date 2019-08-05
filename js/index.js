function updateNavColor($anchor, $navbar, yPosition) {
    if (yPosition >= $anchor.offset().top) {
        $navbar.addClass('active');
    } else {
        $navbar.removeClass('active');
    }
}

function fadeChange($from, $to, enabled = true) {
    let display = function () {
        $from.removeClass("show");
        $to.addClass("show");
        requestAnimationFrame(function () {
            if ($from.length > 0) {
                $from.unbind("transitionend");
            }
            requestAnimationFrame(function () {
                // if not called inside here, previously hidden elements
                // would just appear without transform
                $to.addClass("visible");
            });
        });
    };

    if (enabled) {
        let $fromVisible = $from.filter(".visible");
        if ($fromVisible.length > 0) $fromVisible.eq(0).on("transitionend", display);
        $from.removeClass("visible");
        $to.removeClass("visible");
        if ($fromVisible.length === 0) display();
    } else {
        $from.removeClass("show").removeClass("visible");
        $to.addClass("visible").addClass("show");
    }
}

function filterSelection(klass) {
    let $projects = $(".filterDiv");
    let $shownProjects = $projects.filter(".show");
    fadeChange($shownProjects, $projects.filter("." + klass));
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

function turnOnDesign(initial = false) {
    $('.title.design').addClass('active');
    $('.title.code').removeClass('active');
    const $design = $("#filter, .container.design");
    const $code = $(".container.code");
    fadeChange($code, $design, !initial);
    if (!initial) window.location.hash = "#design";
}

function turnOnCode(initial = false) {
    $('.title.design').removeClass('active');
    $('.title.code').addClass('active');
    const $design = $("#filter, .container.design");
    const $code = $(".container.code");
    fadeChange($design, $code, !initial);
    if (!initial) window.location.hash = "#code";
}

$(document).ready(function () {
    document.querySelector('.banner-video').playbackRate = 1;
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

    const bezierFn = cubicBezierGenerator(.5, .0, 1, .5);
    const finalScale = 20;

    let $window = $(window);
    let $landingImg = $("#landing img");
    let imgAspectRatio;
    let topOffset = 0;
    let zoomCenter = $zoomAnchor.offset();
    const maxYPos = $landingAnchor.offset().top;
    const maxYPos2 = maxYPos + $landingAnchor.height();
    let windowWidth = $window.width();

    function handleResize() {
        imgAspectRatio = $landingImg[0].naturalHeight / $landingImg[0].naturalWidth;
        windowWidth = $window.width();
        zoomCenter = $zoomAnchor.offset();
        const imageHeight = $landingImg.width() * imgAspectRatio;
        topOffset = Math.min(0, ($window.height() - imageHeight) / 2);
        // console.log(imageHeight, topOffset, zoomCenter);
        // alert([$landingImg.height(), $landingImg.width() * imgAspectRatio, topOffset].join(" "));
        // alert([topOffset, zoomCenter.left, zoomCenter.top, $window.width(), $window.height(), $landingImg.height()].join(" "));
        // alert([$landingImg.height(), imgAspectRatio].join(" "));
        $landingImg.css("margin-top", topOffset);
        toggleLandingAndNavbar();
    }

    let firstTimeScroll = window.location.hash === "";
    $window.on('beforeunload', function () {
        // If during landing page animation, scroll to top when reloading so we don't confuse
        // the user.
        // Scroll to top before refreshing to make sure we start at the top after refresh.
        $window.unbind("scroll");
        if (firstTimeScroll) $window.scrollTop(0);
    });
    if (!firstTimeScroll) {
        $content.removeClass('static');
        $landing.css("display", "none");
        $landing.addClass('hidden');
        $scrollDown.addClass('scroll-hidden');
        $slogan.removeClass('hidden');
    }

    $landing.on("transitionend", function () {
        if (!firstTimeScroll || window.pageYOffset > maxYPos)
            $landing.css("display", "none");
    });

    function toggleLandingAndNavbar() {
        const yPosition = window.pageYOffset;
        if (windowWidth >= 768 && firstTimeScroll) {
            if (yPosition <= maxYPos) {
                // Visible.
                $landing.css("display", "");
                requestAnimationFrame(function () {
                    // Start transition after the element is displayed.
                    $landing.removeClass('hidden');
                });
                $content.addClass('static');
                $scrollDown.removeClass('scroll-hidden');
                $slogan.addClass('hidden');

                const progress = yPosition / maxYPos;
                const landingScale = 1 + (finalScale - 1) * bezierFn(progress);
                $landing.css({
                    "transform": "scale(" + landingScale + ")",
                    "transform-origin": zoomCenter.left + "px " + (zoomCenter.top + topOffset) + "px",
                });
                const bannerScale = 1 + contentScale * (1 - progress);
                $bannerImg.css({
                    "transform": "scale(" + bannerScale + ")",
                });
            } else {
                if (yPosition >= maxYPos2) {
                    $content.removeClass('static');
                    if (firstTimeScroll) {
                        firstTimeScroll = false;
                        if (window.location.hash === "")
                            window.location.hash = "#design";
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
        turnOnCode(true);
    } else {
        turnOnDesign(true);
    }

    $landingImg.on("load", handleResize);
    handleResize();
});

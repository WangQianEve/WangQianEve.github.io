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
                console.log('hey', param1);
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

$highlighterShow = false;

$(document).ready(function () {
    filterSelection("featured");
    createFilter();
    // landing page
    const $landingAnchor = $("#landing_anchor");
    const $landing = $("#landing");
    const $content = $(".content");
    const $zoomAnchor = $("#zoom_anchor");

    const contentScale = 1.5;
    //nav bar
    const $navbar = $(".navbar");
    const $navAnchor = $("#nav_anchor");
    const $bannerImg = $(".banner img");
    const $scrollDown = $(".scroll_down");
    const $slogan = $(".slogan");

    $landing.on("transitionend", function () {
        if (window.pageYOffset >= $landingAnchor.offset().top) {
            $landing.css("display", "none");
        }
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
            // Visible.
            $landing.css("display", "");
            $landing.removeClass('hidden');
            $content.addClass('static');
            $scrollDown.removeClass('scroll-hidden');
            $slogan.addClass('hidden');

            const landingScale = 1 + (finalScale - 1) * bezierFn(yPosition / maxYPos);
            $landing.css({
                "transform": "scale(" + landingScale + ")",
                "transform-origin": zoomCenter.left + "px " + (zoomCenter.top) + "px"
            });
            const bannerScale = Math.max(1, (contentScale - yPosition * 0.001));
            $bannerImg.css({
                "transform": "scale(" + bannerScale + ")"
            });

        } else {
            // Not visible.
            $landing.addClass('hidden');
            $content.removeClass('static');
            $scrollDown.addClass('scroll-hidden');
            $slogan.removeClass('hidden');
        }

        updateNavColor($navAnchor, $navbar, yPosition);
    }

    let $window = $(window);

    let lastScrollTop = $window.scrollTop();

    function scrollTrigger() {
        const scrollTop = $window.scrollTop();
        // if (lastScrollTop !== scrollTop) {
        //     lastScrollTop = scrollTop;
        toggleLandingAndNavbar();
        // }
        window.requestAnimationFrame(scrollTrigger);
    }

    // scrollTrigger();
    $window.scroll(toggleLandingAndNavbar);

    $window.resize(handleResize);
    handleResize();

    // const $landingImg = $("#landing img");
    // $.get($landingImg.attr("src"), function (data) {
    //     // console.log($(data).find("svg"));
    //     let $svgElem = $(data).find("svg");
    //     $svgElem.removeAttr("width").removeAttr("height");
    //     $landingImg.replaceWith($svgElem);
    //     handleResize();
    // });
});

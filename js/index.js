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

function checkVisibility($landingAnchor, $landing, $content, yPosition) {
    if (yPosition >= $landingAnchor.offset().top) {
        $landing.addClass('hidden');
        $content.removeClass('static');
        return false;
    } else {
        $landing.removeClass('hidden');
        $content.addClass('static');
        return true;
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

    function toggleLandingAndNavbar() {
        const yPosition = window.pageYOffset;
        const visible = checkVisibility($landingAnchor, $landing, $content, yPosition);
        const zoomCenter = $zoomAnchor.offset();
        if (visible) {
            $landing.css({
                "transform": "scale(" + (1 + yPosition * 0.1) + ")",
                "transform-origin": zoomCenter.left + "px " + zoomCenter.top + "px"
            });
            const scale = Math.max(1, (contentScale - yPosition * 0.001));
            $bannerImg.css({
                "transform": "scale(" + scale + ")"
            })
        }
        if (yPosition > 100) {
            $('.scroll_down').addClass('hidden');
        }
        updateNavColor($navAnchor, $navbar, yPosition);
    }

    $(window).scroll(toggleLandingAndNavbar).resize(toggleLandingAndNavbar);
    toggleLandingAndNavbar();
});

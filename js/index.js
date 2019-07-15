function updateNavColor($anchor, $navbar, yPosition) {
    if (yPosition >= $anchor.offset().top) {
        $navbar.addClass('active');
    } else {
        $navbar.removeClass('active');
    }
}

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if (x[i].className.split(' ').indexOf(c) > -1) addClass(x[i], "show");
    }
}

function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function removeClass(element, name) {
    var i, arr1, arr2;
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
    var btnContainer = document.getElementById("filter");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = btnContainer.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}

function checkVisibility ($landing_anchor, $landing, $content, yPosition) {
    if (yPosition >= $landing_anchor.offset().top) {
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

$(document).ready(function() {
    yPosition = window.pageYOffset;
    filterSelection("featured");
    createFilter();
    // landing page
    const $landing_anchor = $('#landing_anchor');
    const $landing = $('#landing');
    const $content = $('.content');
    const $zoom_anchor = $('#zoom_anchor');
    let zoom_center = $zoom_anchor.offset();
    const content_scale = 1.5;
    //initial
    visible = checkVisibility($landing_anchor, $landing, $content, yPosition);
    if (visible) {
        $('#landing').css({
            "transform":"scale("+ (1 + yPosition * 0.1) +")",
            "transform-origin":zoom_center.left+"px "+zoom_center.top+"px"
        });
        $('.banner img').css({
            "transform" : "scale(" + content_scale + ")"
        })
    }
    //nav bar
    const $navbar = $('.navbar');
    const $nav_anchor = $('#nav_anchor');
    //initial
    window.onscroll = function () {
        yPosition = window.pageYOffset;
        visible = checkVisibility($landing_anchor, $landing, $content, yPosition);
        if (visible) {
            $('#landing').css({
                "transform":"scale("+ (1 + yPosition * 0.1) +")",
                "transform-origin":zoom_center.left+"px "+zoom_center.top+"px"
            });
            scale = Math.max(1, (content_scale - yPosition * 0.001));
            $('.banner img').css({
                "transform" : "scale(" + scale + ")"
            })
        }
        updateNavColor($nav_anchor, $navbar, yPosition);
    }
});

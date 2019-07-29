function currentDiv(elem, n) {
    let slides = $(elem).parents('.slides');
    slides.children('.slide.active').removeClass('active');
    slides.children('.slide').eq(n).addClass('active');
    $(elem).siblings('.active').removeClass('active');
    $(elem).addClass('active');
}

function carousel() {
    $(".slides.run").each( function (index) {
        slides = $(this).children('.slide');
        demos = $(this).children('.demo').eq(0).children();
        let l = slides.length;
        for (let i = 0; i < l; i++) {
            let slide = slides.eq(i);
            if (slide.hasClass('active')) {
                slide.removeClass('active');
                demos.eq(i).removeClass('active');
                i = (i + 1) % l;
                slides.eq(i).addClass('active');
                demos.eq(i).addClass('active');
                break;
            }
        }

    });
}

function initCarousels() {
    $(".slides").on('mouseenter', function () {
        $(this).removeClass('run');
    }).on('mouseleave', function () {
        $(this).addClass('run');
    })
}

function slideshow(elem, n) {
    let slideshow = $(elem).parents('.slideshow-sec');
    slideshow.find('.active').removeClass('active');
    slideshow.find('.slideshow-item').eq(n).addClass('active');
    slideshow.find('.slideshow-dots').eq(n).addClass('active');
}

function changeSlide(elem, n) {
    let slides = $(elem).parents('.slideshow-sec').find('.slideshow-item');
    let max_index = slides.length - 1;
    let target_index = slides.index(slides.filter('.active')) + n;
    if (target_index < 0) {
        target_index = max_index;
    } else if (target_index > max_index) {
        target_index = 0;
    }
    slideshow(elem, target_index);
}

$(document).ready(function() {
    initCarousels();
    // setInterval(carousel, 3000);
});

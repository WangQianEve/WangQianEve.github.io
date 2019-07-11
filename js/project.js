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
};

$(document).ready(function() {
    initCarousels();
    setInterval(carousel, 3000);
});

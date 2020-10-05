'use strict';

const $header = $('.header');

class NavMenu {
    constructor() {
        const that = this;
        this.navElem = document.querySelector('.nav');
        this.toggleElem = document.querySelector('.nav-toggle');
        this.active = false;

        $(this.toggleElem).on('click', () => {
            if(this.active) that.close();
            else that.open();
        });
    }
    open() {
        const $nav = $(this.navElem);

        $nav.addClass('nav_active');
        $('.nav-list').addClass('nav_active');
        $nav.css('top', $('.header').outerHeight());
        $('body').css('overflow', 'hidden');

        this.active = true;
    }

    close() {
        const $nav = $(this.navElem);
        
        $nav.removeClass('nav_active');
        $('.nav-list').removeClass('nav_active');
        $nav.css('top', $('.header').outerHeight());
        $('body').css('overflow', '');

        this.active = false;
    }
}

const nav = new NavMenu();

$(window).on('scroll', function(){
    const scrollTop = $('html, body').scrollTop();
    const offset = $('.promotion').offset().top;

    if(scrollTop >= offset) $header.addClass('sticky');
    else if(scrollTop <= 0) $header.removeClass('sticky');
});

$('[href^="#anchor"]').on('click', function(event){
    event.preventDefault();

    const $link = $(this);
    const selector = $link.attr('href');

    const $target = $(selector);
    const offset = $target.offset().top;

    $('html, body').animate({scrollTop: offset - $header.outerHeight()}, 500);
    nav.close();
});

$('.features-grid').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
        {
            breakpoint: 981,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 481,
            settings: {
                slidesToShow: 1
            }
        },
    ]
});

$('.quotes-grid').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
        {
            breakpoint: 1201,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 641,
            settings: {
                slidesToShow: 1
            }
        },
    ]
});
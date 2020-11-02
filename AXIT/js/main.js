'use strict';

const slickConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
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
};

$('.showcase__cards').slick(slickConfig);
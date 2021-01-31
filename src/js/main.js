jQuery("document").ready(function () {
    /*Храним в локальной сессии какой таб открыт*/
    if (sessionStorage.getItem('tabs') !== null) {
        let curTab = sessionStorage.getItem('tabs');
        jQuery(".tabs_label .tab_label").removeClass("active");
        jQuery(".tabs_label .tab_label").eq(curTab).addClass("active");
        jQuery(".tabform .tab_content").removeClass("active");
        jQuery(".tabform .tab_content").eq(curTab).addClass("active");
        if(curTab == 0){
            jQuery(".tabs_label").removeClass("first");
            jQuery(".tabs_label").removeClass("second");
            jQuery(".tabs_label").addClass("first");
        } else {
            jQuery(".tabs_label").removeClass("first");
            jQuery(".tabs_label").removeClass("second");
            jQuery(".tabs_label").addClass("second");
        }

    } else {
        sessionStorage.setItem('tabs','0');
    }

    /*клик по табам*/
    jQuery(".tabs_label .tab_label").on("click", function () {
        let liIndex = jQuery(this).index();
        jQuery(this).parent().find(".tab_label").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(this).parent().parent().find(".tab_content").removeClass("active");
        jQuery(this).parent().parent().find(".tab_content").eq(liIndex).addClass("active");
        if(liIndex === 0){
            jQuery(".tabs_label").removeClass("first");
            jQuery(".tabs_label").removeClass("second");
            jQuery(".tabs_label").addClass("first");
        } else {
            jQuery(".tabs_label").removeClass("first");
            jQuery(".tabs_label").removeClass("second");
            jQuery(".tabs_label").addClass("second");
        }
        sessionStorage.setItem('tabs',liIndex);
    });


    /*https://kvlsrg.github.io/jquery-custom-select/*/
    jQuery('#radioels-type').customSelect({
        placeholder: '<span style="color: darkgray;">Что продаёте?</span>',
        search: true
    });

    jQuery('#radioels-name').customSelect({
        placeholder: '<span style="color: darkgray;">Укажите элемент</span>',
        search: true
    });
    jQuery('#radioprib-type').customSelect({
        placeholder: '<span style="color: darkgray;">Что продаёте?</span>',
        search: true
    });

    jQuery('#radioprib-name').customSelect({
        placeholder: '<span style="color: darkgray;">Укажите элемент</span>',
        search: true
    });


    let bannersSwiper = new Swiper('#slider .swiper-container', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        // Optional parameters
        slidesPerView: 1,
        spaceBetween: 0,
        // Responsive breakpoints
        loop: true,
        breakpoints: {
            // when window width is >= 320px
            320: {

            },
            1180: {

            }
        },
        autoplay: {
            delay: 3000,
        },
        disableOnInteraction: false,
    });

    let cardsSwiper = new Swiper('.mod_categories_slider .swiper-container', {
        // Optional parameters
        slidesPerView: 4,
        spaceBetween: 30,
       /* autoplay: {
            delay: 4000,
        },*/
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1120: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        },
        loop: true,

        // Navigation arrows
        navigation: {
            nextEl: '.arrows_w .swiper-button-next',
            prevEl: '.arrows_w .swiper-button-prev',
        },
    });


});/*main wrap*/


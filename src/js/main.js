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
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        breakpoints: {
            // when window width is >= 320px
            320: {

            },
            1180: {

            }
        },
        autoplay: {
            delay: 6000,
        },
        disableOnInteraction: false,
    });

    let cardsSwiper = new Swiper('.mod_categories_slider .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 30,
        autoplay: {
            delay: 4000,
        },
        speed: 1000,
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
        navigation: {
            nextEl: '.arrows_w .swiper-button-next',
            prevEl: '.arrows_w .swiper-button-prev',
        },
        on: {
            transitionStart: function () {
                //( mySwiper.previousIndex - mySwiper.activeIndex ) < 0.
                jQuery('.mod_categories_slider').css("animation-play-state", "running");
            },
            transitionEnd: function () {
                jQuery('.mod_categories_slider').css("animation-play-state", "paused");
            },
        },
    });


    /*spoiler*/
    jQuery(".spoiler_title").on("click", function () {
        jQuery(this).parent().siblings().removeClass("active");
        jQuery(this).parent().toggleClass("active");
    });

    jQuery('.map_bubble').on('click', '.close', function () {
        jQuery(this).parent().removeClass("open").find(".wrapper").html("");
    });

    jQuery(".left-menu .title").on('click', function () {
       // jQuery(".left-menu ul li").removeClass("active");
        jQuery(this).parent().toggleClass("active");
        jQuery(this).parent().find("ul").slideToggle(function () {
            if(jQuery(".left-menu>ul>li").hasClass("active")){
                jQuery(".left-menu").addClass("active");
            } else {
                jQuery(".left-menu").removeClass("active");
            }
        });
    });




    let GOLD_DISCOUNT = 0.6;
    let SILVER_DISCOUNT = 0.7;
    let PLATINUM_DISCOUNT = 0.7;
    let PALLADIUM_DISCOUNT = 0.7;

    let categoriesAPI = {}; // объект где храним список категорий
    let categoriesName = [];
    let productsAPI = {}; // объект где храним список продуктов
    let rowsCount = 1; // изначальное кол-во строк
    let $parentEl = jQuery('.calculator'); // ссылка на родительскую обертку
    let totalPrice = 0; // начальное значение итоговой цены

    let GOLD = stock_gold / 31.1; // здесь будут курсы драгметаллов и доллара делим на 31,1 для перевода из унций в кг
    let SILVER = stock_silver / 31.1;
    let PLATINUM = stock_platinum / 31.1;
    let PALLADIUM = stock_palladium / 31.1;
    let USD = stock_rub;
    let EUR = 1 / stock_eur * stock_rub;
    let STOCK_DATE = stock_date.toString();
    const TYPES = ["кг", "шт", "г", "кольцо", "секция", "2 секции", "контакт", "гр"];
    const CONST_HOST = "https://priemkm.ru";
    // const CONST_HOST = window.location.origin;
    console.log(CONST_HOST);
    const CONST_CK = 'ck_1a2af9ee2ad6e3ac6a0f9237cebfcc62ad4a88a5';
    const CONST_CS = 'cs_fc757c4e40772bd4cb6b5f36c8a81bf33504395f';
    const $dropdown = jQuery(".el-type-1"); // начальные ссылки на селекты
    const $dropdownChild = jQuery(".el-name-1");





});/*main wrap*/


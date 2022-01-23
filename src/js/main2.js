jQuery("document").ready(function () {

    /*селектор выбора города*/
    let flag = 0;
    function hideList() {
        $(".dd-list").animate({opacity: "0"}, 100).css({
            "display": "none",
            "marginLeft": "4px",
        });
        flag = 0;
    }

    $(".dd").on("click", ".dd-label", function (event) {
        event.stopPropagation();
        if (flag === 0) {
            $(this).next().css({"display": "block"}).animate({
                opacity: "1",
                width: "auto",
                marginLeft: "0px"
            }, 150);
            flag = 1;
        } else {
            hideList()
        }
    });
    $('html').click(function () {
        hideList()
    });

    function getSubdomain(hostname) {
        var regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
        var urlParts = regexParse.exec(hostname);
        return hostname.replace(urlParts[0],'').slice(0, -1);
    }

    $('.dd-list li').each(function (e){
        if($(this).data('sub') === getSubdomain(window.location.hostname)){
            $(this).addClass('active');
            $('.dd-label').text($(this).find('a').text());
        }
    })

    /*mobile category menu*/
    jQuery("#cat_popup_menu .name").on("click", function () {
        let liIndex = jQuery(this).attr("data-menuid");
        jQuery("#cat_popup_menu").find("div[data-menuidcontent]").removeClass("active");
        jQuery("#cat_popup_menu").find(".name").removeClass("active");
        jQuery("#cat_popup_menu").find("div[data-menuidcontent='" + liIndex + "']").addClass("active");
        jQuery(this).addClass("active");

        sessionStorage.setItem('mobtabs', liIndex);
    });
    if (sessionStorage.getItem('mobtabs') !== null) {
        let curTab = sessionStorage.getItem('mobtabs');
        jQuery("#cat_popup_menu").find("div[data-menuidcontent]").removeClass("active");
        jQuery("#cat_popup_menu").find(".name").removeClass("active");
        jQuery("#cat_popup_menu").find("div[data-menuidcontent='" + curTab + "']").addClass("active");
        jQuery("#cat_popup_menu").find(".name[data-menuid='" + curTab + "']").addClass("active");

    } else {
        jQuery("#cat_popup_menu").find("div[data-menuidcontent]").removeClass("active");
        jQuery("#cat_popup_menu").find(".name").removeClass("active");
        jQuery("#cat_popup_menu").find("div[data-menuidcontent='1']").addClass("active");
        jQuery("#cat_popup_menu").find(".name[data-menuid='1']").addClass("active");
        sessionStorage.setItem('mobtabs', '1');
    }

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
            320: {},
            1180: {}
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
        speed: 500,
        mousewheel: {
            invert: false,
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is >= 640px
            769: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1180: {
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


    /*Левое меню каталога*/
    jQuery(".left-menu .title").on('click', function () {
        // jQuery(".left-menu ul li").removeClass("active");
        jQuery(this).parent().toggleClass("active");
        jQuery(this).parent().find("ul").slideToggle(function () {
            if (jQuery(".left-menu>ul>li").hasClass("active")) {
                jQuery(".left-menu").addClass("active");
            } else {
                jQuery(".left-menu").removeClass("active");
            }
        });
    });
    if (jQuery(".left-menu.descktoplm").length) {

        jQuery(".left-menu.descktoplm ul ul li").each(function () {
            if (jQuery(this).find("a").attr("href") === window.location.pathname) {
                jQuery(this).addClass("active");
                if (deviceType !== "mobile") {
                    console.log(deviceType);
                    jQuery(".left-menu ul ul").removeClass("active");
                    jQuery(this).parent().parent().addClass("active");
                    jQuery(this).parent().addClass("active");
                    /* jQuery(this).parent().slideToggle(function () {
                         if (jQuery(".left-menu>ul>li").hasClass("active")) {
                             jQuery(".left-menu").addClass("active");
                         } else {
                             jQuery(".left-menu").removeClass("active");
                         }
                     });*/
                }
            }
        });

    }

    function CheckMainMenuItem() {
        jQuery("#cat_popup_menu li, #main_popup_menu li").each(function () {
            if (jQuery(this).find("a").attr("href") === window.location.pathname) {
                jQuery(this).addClass("active");
            }
        });
    }

    CheckMainMenuItem();

    let date = new Date(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        hourElt = document.getElementsByClassName("hour")[0],
        minElt = document.getElementsByClassName("min")[0];

    if (jQuery("section.clock").length) {
        moveTime();
    }

    function moveTime() {
        moveMin();
        moveHour();
    }

    function moveMin() {
        var turnMin = min * 6;
        minElt.style.transform = "rotate(" + turnMin + "deg)";
        minElt.style.webkitTransform = "rotate(" + turnMin + "deg)";

        setTimeout(function () {
            turnMin += 6;
            minElt.style.transform = "rotate(" + turnMin + "deg)";
            minElt.style.webkitTransform = "rotate(" + turnMin + "deg)";
            // for each min after first
            var eachMin = setInterval(function () {
                turnMin += 6;
                minElt.style.transform = "rotate(" + turnMin + "deg)";
                minElt.style.webkitTransform = "rotate(" + turnMin + "deg)";
                // display digit on hover; short condition to keep 00:00 format
            }, 60000);
        }, (60 - sec) * 1000);
    }

    function moveHour() {
        if (hour > 11) {
            hour -= 12;
        }
        var turnHour = hour * 30;
        hourElt.style.transform = "rotate(" + turnHour + "deg)";
        hourElt.style.webkitTransform = "rotate(" + turnHour + "deg)";
        // after first hour leftovers
        setTimeout(function () {
            turnHour += 30;
            hourElt.style.transform = "rotate(" + turnHour + "deg)";
            hourElt.style.webkitTransform = "rotate(" + turnHour + "deg)";
            // for each hour after first
            var eachHour = setInterval(function () {
                turnHour += 30;
                hourElt.style.transform = "rotate(" + turnHour + "deg)";
                hourElt.style.webkitTransform = "rotate(" + turnHour + "deg)";
            }, 3600000);
        }, (60 - min) * 60000);
    }


    jQuery("body").on("click", ".open-popup-cat", function (e) {
        e.preventDefault();
        jQuery("#cat_popup_menu").addClass("open");
        jQuery("body").addClass("body_menuOpened");
    });

    jQuery("#cat_popup_menu .close_btn").on("click", function () {
        jQuery("#cat_popup_menu").removeClass("open");
        jQuery("body").removeClass("body_menuOpened");
    });

    jQuery(".btn-burger").click(function (e) {
        e.preventDefault();
        jQuery("#main_popup_menu").addClass("open");
        jQuery("body").addClass("body_menuOpened");
    });

    jQuery("#main_popup_menu .close_btn").on("click", function () {
        jQuery("#main_popup_menu").removeClass("open");
        jQuery("body").removeClass("body_menuOpened");
    });
    jQuery("#main_popup_menu ul li a").on("click", function () {
        jQuery("#main_popup_menu").removeClass("open");
        jQuery("body").removeClass("body_menuOpened");
    });

    jQuery(document).on('click', function (e) {
        let div = $("#cat_popup_menu, .open-popup-cat");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            jQuery("#cat_popup_menu").removeClass("open");
            jQuery("body").removeClass("body_menuOpened");
        }
    });

    if (sessionStorage.getItem('tabs') !== null) {
        let curTab = sessionStorage.getItem('tabs');
        jQuery('.mobile_tabs').find('li').removeClass("active");
        jQuery('.mobile_tabs').find('li').eq(curTab).addClass("active");
        jQuery(".tab_content").removeClass("active");
        jQuery(".tab_content").eq(curTab).addClass("active");
    } else {
        sessionStorage.setItem('tabs', '0');
    }


    /* Add fancybox to product img */
    if (jQuery(".catalog-cards").length > 0) {
        jQuery(".catalog-cards .card img.attachment-woocommerce_thumbnail").on('click', function (e) {

            jQuery.fancybox.open({
                src: jQuery(this).attr('src'),
                type: 'image',
                toolbar: false,
                beforeShow: function (instance, current) {
                    jQuery(".fancybox-toolbar").css("display", "none");
                },
                afterShow: function (instance, current) {
                    jQuery(".fancybox-content").prepend("<div class='fancy_close'><svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1\" viewBox=\"0 0 24 24\"><path d=\"M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z\"></path></svg></div>");
                    jQuery(".fancy_close").on('click', function () {
                        instance.close();
                    })
                },
                clickContent: 'close',
                clickSlide: "close",
                buttons: ['close'],
                touch: false
                //fancybox-content
            });

        });

        //Высчитываем цену товара, данные для цены выводим с помощью php и ACF
        jQuery(".catalog-cards .card").each(function () {
            let item_gold = jQuery(this).find(".item--gold").text();
            let item_silver = jQuery(this).find(".item--silver").text();
            let item_platinum = jQuery(this).find(".item--platinum").text();
            let item_palladium = jQuery(this).find(".item--palladium").text();
            let item_typecount = jQuery(this).find(".item--typeofcount").text();
            let item_fixprice = jQuery(this).find(".item--fixprice").text();
            let item_price;
            // Основная формула для каждого города и металла есть поправочный кэф
            if (item_fixprice > 0) {
                if (item_fixprice == "999999") {
                    jQuery(this).find(".price .price_value").text("По запросу").addClass("priceastext");
                    jQuery(this).find(".price b").css("display", "none");
                    jQuery(this).find(".card-add-to-list").css("display", "none");
                    jQuery(this).find(".btn-put-to-storage").css("display", "none");
                    jQuery(this).find(".product--input-w").css("display", "none");
                } else {
                    jQuery(this).find(".price .price_value").text(item_fixprice);
                    jQuery(this).find(".row-total span").text(item_fixprice);
                }
            } else {
                item_price = (item_gold * GOLD * GOLD_DISCOUNT + item_silver * SILVER * SILVER_DISCOUNT + item_platinum * PLATINUM * PLATINUM_DISCOUNT + item_palladium * PALLADIUM * PALLADIUM_DISCOUNT) * USD;
                jQuery(this).find(".price .price_value").text((Math.round(item_price + Number.EPSILON) * 1));
                jQuery(this).find(".row-total span").text((Math.round(item_price + Number.EPSILON) * 1));
            }
            jQuery(this).find(".itemcount").text(TYPES[item_typecount - 1]);
        })
    }

    if (jQuery(".print--ul").length > 0) {
        jQuery(".print--ul").each(function () {
            let item_gold = jQuery(this).find(".item--gold").text();
            let item_silver = jQuery(this).find(".item--silver").text();
            let item_platinum = jQuery(this).find(".item--platinum").text();
            let item_palladium = jQuery(this).find(".item--palladium").text();
            let item_typecount = jQuery(this).find(".item--typeofcount").text();
            let item_fixprice = jQuery(this).find(".item--fixprice").text();
            let item_price;
            // Основная формула для каждого города и металла есть поправочный кэф
            if (item_fixprice > 0) {
                if (item_fixprice == "999999") {
                    jQuery(this).find(".price").text("по запросу");
                } else {
                    jQuery(this).find(".price .price_value").text(item_fixprice);
                }
            } else {

                item_price = (item_gold * GOLD * GOLD_DISCOUNT + item_silver * SILVER * SILVER_DISCOUNT + item_platinum * PLATINUM * PLATINUM_DISCOUNT + item_palladium * PALLADIUM * PALLADIUM_DISCOUNT) * USD;

                jQuery(this).find(".price .price_value").text(Math.round((item_price + Number.EPSILON) * 1));
            }
            jQuery(this).find(".itemcount").text(TYPES[item_typecount - 1]);

        })
    }


    /*******************/
    /*****Notifier*******/
    /*******************/
    //Собственный модуль уведомлений
    const notify = function (message, type = "default", html = "") { // type может быть success (по умолчанию) или error
        let rnd = "alert-" + Math.floor(Math.random() * 10000); //
        jQuery("body").append(`<div class='alert ${type} ${rnd}'>${message} ${html}<span class="closebtn"></span></div>`) // вставляем алерт в дом
        setTimeout(function () {
            jQuery("body").find("." + rnd + "").remove();
        }, 5000);
    }
    jQuery(document).on('click', '.closebtn', function () { // кнопка закрытия алерта
        let $alert = jQuery(this).parent();
        $alert.css({"opacity": "0"});
        setTimeout(function () {
            $alert.css("display", "none")
        }, 100);
    })
    const delete_notify = function (input) { // функция "мягкого" скрытия алертов (с анимацией). В качестве input передаем ссылку на элемент, у которого надо убрать класс input-error
        jQuery('.alert').each(function () {
            let $alert = jQuery(this);
            $alert.css({"opacity": "0", "height": "1px"});
            setTimeout(function () {
                $alert.remove();
            }, 600);
        })
        if (input) {
            input.removeClass("input-error");
        }
    }
    const harddelete_notify = function (input) { // тоже самое, только скрытие всех алертов без анимации (например, сркыть все алерты перед проверкой и в случае необходимости отобразить новый)
        jQuery('.alert').each(function () {
            jQuery(this).remove();
        })
        if (input) {
            input.removeClass("input-error");
        }
    }
    /****************/
    /****************/
    /****************/

    let pageTitle = document.title;


    //Обновляет цифру общего кол-ва элементов в списке
    let countItems = 0;
    const updateCountItems = function () {
        jQuery(".mobile-top-list").removeClass("jump");
        if (sessionStorage.getItem('order') !== null) {
            let orderArr = JSON.parse(sessionStorage.getItem('order'));
            if (orderArr !== []) {
                countItems = orderArr.length;
            }
        }
        jQuery(".mobile-top-list b").text(countItems);
        let newTitle = '(' + countItems + ') ' + pageTitle;
        document.title = newTitle;
        if (countItems === 0) {
            jQuery(".mobile-top-list").removeClass("is-active jump");
            document.title = pageTitle;
        } else {
            jQuery(".mobile-top-list").addClass("is-active");
            setTimeout(function () {
                jQuery(".mobile-top-list").addClass("jump");
            }, 100);
            document.title = newTitle;
        }
        return countItems;
    };

    updateCountItems();

    //закрываем попап алерт СF7
    jQuery('body').on("click", ".wpcf7-response-output", function () {
        jQuery(this).css("display", "none");
    })

    document.addEventListener('wpcf7mailsent', function (event) {
        $.fancybox.close('true');
        notify("Ваше сообщение успешно отправлено! Менеджер перезвонит Вам в течение 15 минут", "success");
    }, false);
    document.addEventListener('wpcf7invalid', function (event) {
        notify("Проверьте все поля!", "error");
    }, false);
    document.addEventListener('wpcf7spam', function (event) {
        notify("Сообщение выглядит как спам!", "error");
    }, false);
    document.addEventListener('wpcf7mailfailed', function (event) {
        notify("Не удалось отправить сообщение! Попробуйте позднее!", "error");
    }, false);


    jQuery('.card .sellnow').on('click', function (e) {
        e.preventDefault();
        jQuery("textarea#mytext").text("Здравствуйте! Я хочу продать: " + jQuery(this).parent().parent().find(".woocommerce-loop-product__title").text() + " " + jQuery(this).parent().parent().find(".desc").text());
        delete_notify();
        jQuery.fancybox.open({
            src: '#sendMSG',
            type: 'inline',
            toolbar: true,
            allowTouchMove: false,
            opts: {
                afterShow: function (instance, current) {
                },
            }
        });
    });

    jQuery('.getCallback').on('click', function (e) {
        e.preventDefault();
        delete_notify();
        jQuery.fancybox.open({
            src: '#getCallback',
            type: 'inline',
            toolbar: true,
            allowTouchMove: false
        });
    });
    jQuery('#calc-sell-now').on('click', function (e) {
        e.preventDefault();
        if ((jQuery(".tab_content.active .el-name option:selected").attr('value') !== undefined) && (jQuery(".tab_content.active .el-name option:selected").attr('value') !== '9999')) {
            let lsArr = JSON.parse(sessionStorage.getItem('order'));
            jQuery.fancybox.open({
                src: '#calcpopupform',
                type: 'inline',
                toolbar: true,
                opts: {
                    afterShow: function (instance, current) {
                        jQuery("textarea#mytext2").text("Здравствуйте! Я хочу продать: "
                            + jQuery(".tab_content.active .el-type option:selected").text()
                            + " "
                            + jQuery(".tab_content.active .el-name option:selected").text()
                            + " по цене: "
                            + jQuery(".tabform-footer .sum_num").text()
                            + " за "
                            + jQuery(".tabform-footer .count_num").text()
                        );
                    },
                }
            });
        } else {
            notify("Сначала выберите что-нибудь", "error");
        }
    });

    jQuery(document).on('click', '.card .btn-wt', function (e) {
        e.preventDefault();

        let phone = wt_phone;
        let message = "Здравствуйте, я хочу продать: " + jQuery(this).parent().parent().find('.woocommerce-loop-product__title').text();
        let link = 'https://wa.me/' + encodeURIComponent(phone) + '?text=' + encodeURIComponent(message);

        window.open(link, '_blank');
    });

    jQuery("#scroll-up").click(function () {
        window.scrollTo({top: 0, behavior: 'smooth'});
        return false;
    });

    jQuery(document).on('scroll', function () {
        if (jQuery(this).scrollTop() > 1000) {
            jQuery("#scroll-up").addClass('visible');
        } else {
            jQuery("#scroll-up").removeClass('visible');
        }
    });

})


$('.card-add-to-list').on('click', function (e){
    e.preventDefault()

    /* добавление в список*/
    let curSS = JSON.parse(sessionStorage.getItem('order'));
    let temp = [];

    let lsType = $('.category--header').text(); //Название категории
    let lsName = $(this).parent().parent().parent().find('.woocommerce-loop-product__title').text(); //Название самой радиодетали
    let lsId = $(this).parent().parent().parent().find('.item--id').text(); //ID самой радиодетали
    let lsCount = "1"; //Кол-во радиодеталей
    let lsTypeOf = $(this).parent().parent().parent().find('.itemcount').text(); //Мера исчисления (1 - кг, 2 - штуки)
    let lsRowSum = $(this).parent().parent().parent().find('.price_value').text(); //Сумма
    let lsImgSrc = $(this).parent().parent().parent().find('img').attr("src");

    if (curSS) {
        // temp = [lsId, lsType, lsName, lsCount, lsTypeOf, lsRowSum, lsImgSrc];
        temp = [lsId, lsType, lsName, lsCount, lsTypeOf, lsRowSum, lsRowSum, lsImgSrc];
        curSS.forEach((element, index) => {
            if(element[0] === lsId){
                curSS.splice(index,1);

            }
        });

        curSS.push(temp);
        sessionStorage.setItem('order', JSON.stringify(curSS));
        $(this).parent().parent().parent().parent().find(".alertwindow").addClass("active");
        updateCountItems();
    } else {
        //temp[0] = [lsId, lsType, lsName, lsCount, lsTypeOf, lsRowSum, lsImgSrc];
        temp[0] = [lsId, lsType, lsName, lsCount, lsTypeOf, lsRowSum, lsRowSum, lsImgSrc];
        sessionStorage.setItem('order', JSON.stringify(temp));
        $(this).parent().parent().parent().parent().find(".alertwindow").addClass("active");
        updateCountItems();
    }
    setTimeout(function () {
        $(".alertwindow").removeClass("active");
    }, 2000);
    updateList();

    notify("Добавлено в список: " + lsType + " - " + lsName + "", "default", `<div><a href="${maindomain_sub}/list" class="go-to-list">Весь список</a></div>`);
})



$('.product-add-to-list').on('click', function (e){
    e.preventDefault()
    let containerX = $('.open-list').offset().left
    let containerY = $('.open-list').offset().top
    let objectX = $(this).parent().offset().left + $(this).parent().width() / 2 - 13;
    let objectY = $(this).parent().offset().top + $(this).parent().height() / 2 - 13;
    let rnd = "sn-" + Math.floor(Math.random() * 10000);
    $('body').append(`<div class="static-notifier ${rnd}"></div>`)
    let target = $(`.${rnd}`);
    let tlAdd = gsap.timeline({repeat:0, yoyo:false});

    tlAdd.fromTo(target, {x: objectX, y: objectY}, {duration: 0.3, scale:2})
        .to(target, {duration: .5, x: containerX, y: containerY, rotate: 360})
        .to(target, {duration:.2,scale:0, onComplete: ()=>{$('body').find(target).remove()}})

    /* добавление в список*/
    let curSS = JSON.parse(sessionStorage.getItem('order'));
    let temp = [];

    let lsType = $('.item--category a').text(); //Название категории
    let lsName = $('.product-wrap h1').text(); //Название самой радиодетали
    let lsId = $(this).parent().parent().find('.item--id').text(); //ID самой радиодетали
    let lsCount = "1"; //Кол-во радиодеталей
    let lsTypeOf = $(this).parent().parent().find('.itemcount').text(); //Мера исчисления (1 - кг, 2 - штуки)
    let lsRowSum = $(this).parent().parent().find('.price_value').text(); //Сумма
    let lsImgSrc = $('.product-img-wrap img').attr("src");

    if (curSS) {
        // temp = [lsId, lsType, lsName, lsCount, lsTypeOf, lsRowSum, lsImgSrc];
        temp = [lsId, lsType, lsName, lsCount, lsTypeOf, lsRowSum, lsRowSum, lsImgSrc];
        curSS.forEach((element, index) => {
            if(element[0] === lsId){
                curSS.splice(index,1);

            }
        });

        curSS.push(temp);
        sessionStorage.setItem('order', JSON.stringify(curSS));
        $(this).parent().parent().parent().parent().find(".alertwindow").addClass("active");
        updateCountItems();
    } else {
        //temp[0] = [lsId, lsType, lsName, lsCount, lsTypeOf, lsRowSum, lsImgSrc];
        temp[0] = [lsId, lsType, lsName, lsCount, lsTypeOf, lsRowSum, lsRowSum, lsImgSrc];
        sessionStorage.setItem('order', JSON.stringify(temp));
        $(this).parent().parent().parent().parent().find(".alertwindow").addClass("active");
        updateCountItems();
    }
    setTimeout(function () {
        $(".alertwindow").removeClass("active");
    }, 2000);
    updateList();



    notify("Добавлено в список: " + lsType + " - " + lsName + "", "default", `<div><a href="${maindomain_sub}/list" class="go-to-list">Весь список</a></div>`);


})




//ToDo сделать класс актив и неактив при анимации

let categoriesAPI = {}; // объект где храним список категорий
let categoriesName = [];
let productsAPI = {}; // объект где храним список продуктов
let rowsCount = 1; // изначальное кол-во строк
let $parentEl = $('.calculator'); // ссылка на родительскую обертку
let totalPrice = 0; // начальное значение итоговой цены

let GOLD = stock_gold / 31.1; // здесь будут курсы драгметаллов и доллара делим на 31,1 для перевода из унций в кг
let SILVER = stock_silver / 31.1;
let PLATINUM = stock_platinum / 31.1;
let PALLADIUM = stock_palladium / 31.1;
let USD = stock_rub;
let EUR = 1 / stock_eur * stock_rub;
let STOCK_DATE = stock_date.toString();
const TYPES = ["кг", "шт", "г", "кольцо", "секция", "2 секции", "контакт", "гр"];
const CONST_HOST = "https://pokupaemradiodetali.ru/";
// const CONST_HOST = window.location.origin;
console.log(CONST_HOST);
const CONST_CK = 'ck_c4e4a8065b654fbb8d04f3d74d46673894b0d479';
const CONST_CS = 'cs_081907c0f0c1df9408352dffc35fa361ebf4dfb6';
const $dropdown = $(".el-type-1"); // начальные ссылки на селекты
const $dropdownChild = $(".el-name-1");


let lsArr = JSON.parse(sessionStorage.getItem('order'));
if (lsArr) {
    $("#print").addClass("active");
}



$dropdown.prop('disabled', 'disabled'); // отключаем селекты, пока в них не подгрузятся данные
$dropdownChild.prop('disabled', 'disabled');


/*******************/
/*****Notifier*******/
/*******************/
//Собственный модуль уведомлений
const notify = function (message, type = "default", html = "") { // type может быть success (по умолчанию) или error
    let rnd = "alert-" + Math.floor(Math.random() * 10000); //
    $("body").append(`<div class='alert ${type} ${rnd}'>${message} ${html}<span class="closebtn"></span></div>`) // вставляем алерт в дом
    setTimeout(function () {
        $("body").find("." + rnd + "").remove();
    }, 5000);
}
$(document).on('click', '.closebtn', function () { // кнопка закрытия алерта
    let $alert = $(this).parent();
    $alert.css({"opacity": "0"});
    setTimeout(function () {
        $alert.css("display", "none")
    }, 100);
})
const delete_notify = function (input) { // функция "мягкого" скрытия алертов (с анимацией). В качестве input передаем ссылку на элемент, у которого надо убрать класс input-error
    $('.alert').each(function () {
        let $alert = $(this);
        $alert.css({"opacity": "0", "height": "1px"});
        setTimeout(function () {
            $alert.remove();
        }, 600);
    })
    if (input) {
        input.removeClass("input-error");
    }
}
const harddelete_notify = function (input) { // тоже самое, только скрытие всех алертов без анимации (например, сркыть все алерты перед проверкой и в случае необходимости отобразить новый)
    $('.alert').each(function () {
        $(this).remove();
    })
    if (input) {
        input.removeClass("input-error");
    }
}
/****************/
/****************/
/****************/

// небольшая функция скрывающая или показывающая анимированный лоадер
const isLoading = (cond) => {
    if (cond === 1) {
        $(".loader").css("opacity", "1");
        $(".els-body").addClass("disabled");
    } else {
        $(".loader").css("opacity", "0");
        $(".els-body").removeClass("disabled");
    }
}

if ($(".calculator").length) {

    // первоначальный запрос при загрузке страницы, чтобы заполнить первый селект данными
    fetch(`${CONST_HOST}/wp-json/wc/v3/products/categories?consumer_key=${CONST_CK}&consumer_secret=${CONST_CS}&exclude=15&per_page=100`)
        .then(
            function (response) {
                isLoading(1);
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    notify("Возникла ошибка при получении данных! Попробуйте перезагрузить страницу или зайти позже.", "error");
                    return;
                }

                // Examine the text in the response
                response.json().then(function (data) {
                    categoriesAPI = data;
                    $dropdown.empty();

                    $.each(categoriesAPI, function () {
                        $dropdown.append($("<option />").val(this.id).text(this.name));
                    });
                    $dropdown.append($("<option disabled hidden selected value='9999'></option>").text("Выберите тип элемента"));
                    $dropdown.prop('disabled', false);

                    CheckProjects(null,1);
                    let lsArr = [];
                    if (sessionStorage.getItem('order') !== null) {
                        lsArr = JSON.parse(sessionStorage.getItem('order'));
                        getFromLs(lsArr).then(r => console.log('Data loaded from local storage!'));
                    } else {
                        CheckProjects(null,1);
                        //
                    }
                    isLoading(0);
                });

                /*Fill fields from localstorage*/
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
            notify("Возникла ошибка при получении данных! Попробуйте перезагрузить страницу или зайти позже.", "error");
        });
} else {
    isLoading(0);
}


/*******************************/
/*******************************/
/*******************************/
/*******************************/
function uniqueBy(arr, prop){
    return arr.reduce((a, d) => {
        if (!a.includes(d[prop])) { a.push(d[prop]); }
        return a;
    }, []);
}
/*******************************/
/*******************************/
/*******************************/

// заполняем дочерний селект при выборе опции в родительском
const fillChildSelect = function (id, catId = 0) {
    isLoading(1); //Отображаем лоадер
    $("#print").addClass("active");
    let thiscatID = 0;
    let $row = $('.els-row-' + id);

    if (catId > 0) {
        thiscatID = catId;
        $row.find('.el-type').val(catId);
    } else {
        thiscatID = $row.find('.el-type').val(); // получаем ID категории
    }

    let $childDD = $row.find('.el-name'); // получаем ссылку на дочерний селект
    $childDD.prop('disabled', 'disabled'); // блокируем дочерний селект пока идет загрузка
    delete_notify($childDD); // удаляем все сообщения об ошибках и красную обводку с поля


    if (sessionStorage.getItem('category' + thiscatID) !== null) {

        let lsArr = [];
        lsArr = JSON.parse(sessionStorage.getItem('category' + thiscatID));

        $childDD.empty(); // очищаем селект
        $childDD.append($("<option hidden disabled selected value='9999'></option>").text("Выберите наименование"));
        for (const [i, arr] of lsArr.entries()) {
            if (arr[8] !== '999999') {
                $childDD.append($("<option />")
                    .val(arr[0])
                    .text(arr[2])
                    .attr({
                        'data-g': arr[3],
                        'data-s': arr[4],
                        'data-pt': arr[5],
                        'data-pd': arr[6],
                        'data-counttype': arr[7],
                        'data-fixprice': arr[8],
                        'data-imgsrc':  arr[9],
                        //}).prop('selected', true));
                    }));
            }
        }

        $childDD.prop('disabled', false);
        getPrice(id);
        isLoading(0);
    } else {
        // запрос на АПИ
        fetch(`${CONST_HOST}/wp-json/wc/v3/products?consumer_key=${CONST_CK}&consumer_secret=${CONST_CS}&category=${thiscatID}&per_page=100&status=publish`)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        notify("Возникла ошибка при получении данных! Попробуйте перезагрузить страницу или зайти позже.", "error");
                        return;
                    }

                    /**/
                    response.json().then(function (data) {
                        productsAPI = data;
                        let temp = [];
                        if (data.length) {
                            $childDD.empty(); // очищаем селект
                            $childDD.append($("<option hidden disabled selected value='9999'></option>").text("Выберите наименование"));
                            let i = 0;
                            for (let key in productsAPI) {
                                // заполняем селект данными
                                if (productsAPI.hasOwnProperty(key)) {
                                    if (productsAPI[key].meta_data[10].value !== '999999') {
                                        let imgSrc = "/wp-content/uploads/blank.jpg";
                                        let meta_gold = productsAPI[key].meta_data.find(obj => { return obj.key === 'gold' });
                                        let meta_silver = productsAPI[key].meta_data.find(obj => { return obj.key === 'silver' });
                                        let meta_platinum = productsAPI[key].meta_data.find(obj => { return obj.key === 'platinum' });
                                        let meta_palladium = productsAPI[key].meta_data.find(obj => { return obj.key === 'palladium' });
                                        let meta_type = productsAPI[key].meta_data.find(obj => { return obj.key === 'typecount' });
                                        let meta_fixprice = productsAPI[key].meta_data.find(obj => { return obj.key === 'fixprice' });

                                        if (productsAPI[key].images[0] !== undefined) {
                                            imgSrc = productsAPI[key].images[0].src;
                                        }
                                        $childDD.append($("<option />")
                                            .val(productsAPI[key].id)
                                            .text(productsAPI[key].name)
                                            .attr({
                                                'data-g': meta_gold.value,
                                                'data-s': meta_silver.value,
                                                'data-pt': meta_platinum.value,
                                                'data-pd': meta_palladium.value,
                                                'data-counttype': meta_type.value,
                                                'data-fixprice': meta_fixprice.value,
                                                'data-imgsrc': imgSrc,
                                                //}).prop('selected', true));
                                            }));

                                        //заполняем локальное хранилище

                                        let lsId = productsAPI[key].id; //ID самой радиодетали
                                        let lsCatId = productsAPI[key].categories[0].id; //Id категории
                                        let lsName = productsAPI[key].name; //Имя детали
                                        let lsMeta0 = meta_gold.value; //Gold
                                        let lsMeta2 = meta_silver.value; //Silver
                                        let lsMeta4 = meta_platinum.value; //Platinum
                                        let lsMeta6 = meta_palladium.value; //Palladium
                                        let lsMeta8 = meta_type.value; //Мера измерения (кг,  шт и т.д.)
                                        let lsMeta10 = meta_fixprice.value; //Мера измерения (кг,  шт и т.д.)
                                        let lsImgSrc = imgSrc; //картинка
                                        temp[i] = [lsId, lsCatId, lsName, lsMeta0, lsMeta2, lsMeta4, lsMeta6, lsMeta8, lsMeta10, lsImgSrc];
                                        i++;
                                    }
                                }
                            }

                            if (sessionStorage.getItem('category' + thiscatID) === null) {
                                sessionStorage.setItem('category' + thiscatID, JSON.stringify(temp));
                            }

                            $childDD.prop('disabled', false);
                            if ($childDD.find('option:selected').attr('value').toString() !== '9999') {
                                getPrice(id);
                            }

                        } else {
                            $childDD.empty(); // очищаем селект
                            $childDD.append($("<option />")
                                .val('')
                                .text('Нет данных!')
                            );
                        }

                        isLoading(0);
                    });
                    /**/

                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
                notify("Возникла ошибка при получении данных! Попробуйте перезагрузить страницу или зайти позже.", "error");
            });
    }
};

//run function on dynamic els
$parentEl.on('change', '.el-type', function () {
    let id = $(this).parent().parent().attr("data-id");
    fillChildSelect(id);
});

$parentEl.on('change', '.el-name', function () {
    let id = $(this).parent().parent().attr("data-id");
    getPrice(id);
});

$parentEl.on('input', '.inputCount', function () {
    let id = $(this).parent().parent().parent().parent().attr("data-id");
    let $errorInput = $('.inputCount-' + id);
    harddelete_notify($errorInput);
    getPrice(id);
});


// calculate total price
const getTotalPrice = function () {
    totalPrice = 0;
    $parentEl.find('.row-total').each(function () {
        let temp = parseFloat($(this).find('span').text());
        totalPrice += temp;
    });
    if (totalPrice > 0) {
        $(".els-total-price-num span").text(totalPrice.toFixed(0));
    } else {
        $(".els-total-price-num span").text("0");
    }

    saveToLS();
};

// сохраняем данные в локальное хранилище
const saveToLS = function () {

    let temp = [];
    let rowsLength = $(".els-row").length;

    let lsRowSum;

    for (let i = 1; i <= rowsLength; i++) {
        let $row = $('.els-row-' + i);
        let lsType = $row.find('.el-type option:selected').text(); //Название категории
        let lsName = $row.find('.el-name option:selected').text(); //Название самой радиодетали
        let lsId = $row.find('.el-name option:selected').attr('value').toString(); //ID самой радиодетали
        let lsCount = $row.find('.inputCount').val().toString(); //Кол-во радиодеталей
        let lsTypeOf = $row.find('.typeOfCount').text(); //Мера исчисления (1 - кг, 2 - штуки)
        lsRowSum = $row.find('.row-total span').text(); //Сумма как (кол-во * меру исчесления)
        let lsPrice = lsRowSum / lsCount;
        let lsImgSrc = $row.find('.el-name option:selected').attr('data-imgsrc') ? $row.find('.el-name option:selected').attr('data-imgsrc').toString() : 'undefined'; //картинка
        if (lsId !== '9999') {
            temp[i - 1] = [lsId, lsType, lsName, lsCount, lsTypeOf, lsPrice, lsRowSum, lsImgSrc];
        }
    }
    if(lsRowSum>0) {
        sessionStorage.setItem('order', JSON.stringify(temp)); //превращаем все данные в строку и сохраняем в локальное хранилище
        updateCountItems();
    }
};

//Удаление строки из локального хранилища
const removeFromLS = function (rowID) {
    let items = JSON.parse(sessionStorage.getItem('order'));
    const filteredItems = items.slice(0, rowID - 1).concat(items.slice(rowID, items.length))
    sessionStorage.setItem('order', JSON.stringify(filteredItems));
    updateCountItems();
    console.log(rowID);
}

const removeFromLSList = function (rowID) {
    let items = JSON.parse(sessionStorage.getItem('order'));
    for (let i = 0, itemsLength = items.length; i < itemsLength; i++) {
        if (items[i][0] === rowID) {
            items.splice(i, 1);
            break;
        }
    }
    sessionStorage.setItem('order', JSON.stringify(items));
    updateCountItems();
}

const removeAllFromLs = function(){
    sessionStorage.removeItem('order');
    updateCountItems();
}


//в эту функцию передаем объект из локального хранилища, где из него создаются и заполняются данными строки
async function getFromLs(lsArr) {
    isLoading(1);
    $(".els-body").addClass("disabled");
    for (const [i, arr] of lsArr.entries()) {
        //вызываем асинхронную функцию создания строки
        $(".loading_text").text("Загружено " + (i + 1) + " из " + lsArr.length);
        await buildRow(arr[0], i + 1, arr[3]);
    }
    //пересчитываем итоговую цену
    await getTotalPrice();
    $(".loading_text").text('');
    $(".els-body").removeClass("disabled");
    isLoading(0);
}

//Кнопка ОФОРМИТЬ ЗАЯВКУ. Отсылает все данные на почту (через форму CF7)
$(".send-btn-wrapper a").on('click', function (e) {
    e.stopPropagation();
})

/*Построение строки с данными из локального хранилища*/
async function buildRow(id, rowCol, col) { //id элемента, rowCol порядковый номер создаваемой строки, col кол-во элементов данного типа
    isLoading(1);
    let $row;
    let catId = 0;
    rowsCount = rowCol

    if (rowCol) {

        if (rowCol > 1) {
            await createRow(rowCol);
            $row = $(".els-row-" + rowCol);
        } else {
            $row = $(".els-row-1");
        }

        await getItemById(id).then(item => {
            $row.find(".el-type").val(item.categories[0].id);
            catId = item.categories[0].id;
        });

        //тут await заполнения второго селекта
        // Проверяем, был ли такой запрос, есть ли объект с данными уже в локальном хранилище
        if (sessionStorage.getItem('category' + catId) !== null) {
            let lsArr = [];

            lsArr = JSON.parse(sessionStorage.getItem('category' + catId));
            $row.find('.el-name').empty();
            for (const [i, arr] of lsArr.entries()) {
                if (arr[8] !== '999999') {
                    $row.find('.el-name').append($("<option />")
                        .val(arr[0])
                        .text(arr[2])
                        .attr({
                            'data-g': arr[3],
                            'data-s': arr[4],
                            'data-pt': arr[5],
                            'data-pd': arr[6],
                            'data-counttype': arr[7],
                            'data-fixprice': arr[8],
                            'data-imgsrc': arr[9]
                        }));
                }
            }
            $row.find('.el-type').val(catId);
            $row.find('.el-name').val(id).prop('disabled', false).prop('selected', true);
            $row.find('.inputCount').val(col);
        } else {
            await fillChildSelectById(rowCol, catId).then(res => {
                $row.find('.el-name').val(id).prop('selected', true);
                $row.find('.inputCount').val(col);
            });
        }

        await getPrice(rowCol);
    }
}

async function getItemById(id) {
    try {
        let response = await fetch(`${CONST_HOST}/wp-json/wc/v3/products/${id}?consumer_key=${CONST_CK}&consumer_secret=${CONST_CS}`);
        let item = await response.json();
        isLoading(0);
        return item;
    } catch (err) {
        // перехватит любую ошибку в блоке try: и в fetch, и в response.json
        notify("При получении данных возникла ошибка! (" + err + ")", "error")
    }
}

async function fillChildSelectById(rowCol, catId = 0) {
    isLoading(1); //Отображаем лоадер
    let thiscatID = 0;
    let $row = $('.els-row-' + rowCol);
    if (catId > 0) {
        thiscatID = catId;
        $row.find('.el-type').val(catId);
    } else {
        thiscatID = $row.find('.el-type').val(); // получаем ID категории
    }

    let $childDD = $row.find('.el-name'); // получаем ссылку на дочерний селект
    $childDD.prop('disabled', 'disabled'); // блокируем дочерний селект пока идет загрузка
    delete_notify($childDD); // удаляем все сообщения об ошибках и красную обводку с поля

    // запрос на АПИ
    try {
        let response = await fetch(`${CONST_HOST}/wp-json/wc/v3/products?consumer_key=${CONST_CK}&consumer_secret=${CONST_CS}&category=${thiscatID}&per_page=100&status=publish`);
        let item = await response.json();

        isLoading(0);
        $childDD.empty(); // очищаем селект
        for (let key in item) {
            // заполняем селект данными
            if (item.hasOwnProperty(key)) {
                if (item[key].meta_data[11].value !== '999999') {
                    let imgSrc = "/wp-content/uploads/blank.jpg";
                    if (item[key].images[0] !== undefined) {
                        imgSrc = item[key].images[0].src;
                    }
                    let meta_gold = item[key].meta_data.find(obj => { return obj.key === 'gold' });
                    let meta_silver = item[key].meta_data.find(obj => { return obj.key === 'silver' });
                    let meta_platinum = item[key].meta_data.find(obj => { return obj.key === 'platinum' });
                    let meta_palladium = item[key].meta_data.find(obj => { return obj.key === 'palladium' });
                    let meta_type = item[key].meta_data.find(obj => { return obj.key === 'typecount' });
                    let meta_fixprice = item[key].meta_data.find(obj => { return obj.key === 'fixprice' });
                    $childDD.append($("<option />")
                        .val(item[key].id)
                        .text(item[key].name)
                        .attr({
                            'data-g': meta_gold.value,
                            'data-s': meta_silver.value,
                            'data-pt': meta_platinum.value,
                            'data-pd': meta_palladium.value,
                            'data-counttype': meta_type.value, // 1 это килограммы, 2 это штуки
                            'data-fixprice': meta_fixprice.value,
                            'data-imgsrc': imgSrc,
                        }));
                }
            }
        }
        $childDD.prop('disabled', false);
        // getPrice(id);
    } catch (err) {
        notify("При получении данных возникла ошибка! (" + err + ")", "error")
    }

}

//простая функция добавления строки и заполнения первого селекта
async function createRow(rowId) {
    delete_notify();

    $(".els-body").append('<div class="els-row els-row-' + rowId + ' collapsed" data-id="' + rowId + '">\n' +
        '        <div class="els-del"></div><div class="el-wrap ew1 sel-wrap">\n' +
        '          <select class="el-type" name="el-type" disabled>\n' +
        '            <option disabled hidden selected value="">Выберите тип элемента</option>\n' +
        '          </select>\n' +
        '        </div>\n' +
        '        <div class="el-wrap ew2 sel-wrap">\n' +
        '          <select class="el-name" name="el-name" disabled>\n' +
        '            <option disabled hidden selected value="">Выберите наименование</option>\n' +
        '          </select>\n' +
        '        </div>\n' +
        '        <div class="el-wrap labeled-input ew3">\n' +
        '          <label>Кол-во (<span class="typeOfCount">*</span>)\n' +
        '            <div class="inputCountWrap"><input  type="number" min="1" value="1" class="inputCount"/><span class="stepper-step up"></span>\n' +
        '<span class="stepper-step down"></span>\n' +
        '</div> \n' +
        '          </label>\n' +
        '        </div>\n' +
        '        <div class="el-wrap ew4 labeled-input input-dark">\n' +
        '          <label>Сумма</label>\n' +
        '          <div class="row-total"><span>0</span> ₽</div>\n' +
        '        </div>\n' +
        '      </div>');
    // заполнение родительского селекта уже полученными данными о категориях
    let currentDD = $(".els-row-" + rowId).find(".el-type");
    isLoading(1);
    $.each(categoriesAPI, function () {
        currentDD.append($("<option />").val(this.id).text(this.name));
        currentDD.find("option:eq(0)").prop('selected',true);
    });
    currentDD.prop('disabled', false);

    isLoading(0);
    setTimeout(function () {
        $('.els-row-' + rowId).removeClass("collapsed");
    }, 100);

}

//Высчитывание цены
const getPrice = function (id, countTotal) { //id - номер строки
    let item_price = 0;
    let $row = $('.els-row-' + id);
    let $inputText = $row.find('.inputCount');
    let $childDD = $row.find('.el-name');
    let item_gold = $('option:selected', $childDD).data('g');
    let item_silver = $('option:selected', $childDD).data('s');
    let item_platinum = $('option:selected', $childDD).data('pt');
    let item_palladium = $('option:selected', $childDD).data('pd');
    let ItemTypeOf = $('option:selected', $childDD).data('counttype');
    let FixPrice = $('option:selected', $childDD).data('fixprice');
    let $childTypeOf = $row.find('.typeOfCount'); // получаем ссылку на дочерний селект
    let weight;

    $childTypeOf.text(TYPES[ItemTypeOf - 1]);

    if ($inputText.val()) {
        let tempVal = $inputText.val()
        weight = tempVal.replace(/,/g, '.');
    } else {
        notify("Не указано количество!", "error");
        $inputText.addClass('input-error');
    }
    if (FixPrice > 0) {
        item_price = FixPrice * weight;
    } else {
        item_price = Math.round((item_gold * GOLD * GOLD_DISCOUNT + item_silver * SILVER * SILVER_DISCOUNT + item_platinum * PLATINUM * PLATINUM_DISCOUNT + item_palladium * PALLADIUM * PALLADIUM_DISCOUNT) * USD) * weight;
    }

    if (item_price > 0) {
        //$row.find('.row-total span').text(Math.round((item_price + Number.EPSILON) * 100) / 100);
        $row.find('.row-total span').text(Math.round(item_price));
    } else {
        $row.find('.row-total span').text("0");
    }

    getTotalPrice();

}

// Добавление новой строки (тут проверка, заполнена ли предыдущая строка)
const addNewRow = function (selectVal = null) {
    if (($('.els-row-' + rowsCount).find(".el-name").attr("disabled")) || ($('.els-row-' + rowsCount).find(".el-name option:selected").attr('value').toString() == '9999')) {
        harddelete_notify();
        notify("Заполните все поля!", "error");
        $('.els-row-' + rowsCount).find(".el-name").addClass('input-error');

    } else {
        if (!($('.els-row-' + rowsCount).find('.inputCount').val())) {
            harddelete_notify();
            notify("Заполните все поля!", "error");
            $('.inputCount-' + rowsCount).find(".el-name").addClass('input-error');
        } else {
            let $errorInput = $('.els-row-' + rowsCount).find(".el-name");
            delete_notify($errorInput);
            rowsCount += 1;
            $(".els-body").append('<div class="els-row els-row-' + rowsCount + ' collapsed" data-id="' + rowsCount + '">\n' +
                '        <div class="els-del"></div><div class="el-wrap ew1 sel-wrap">\n' +
                '          <select class="el-type" name="el-type" disabled>\n' +
                '            <option disabled hidden selected value="">Выберите тип элемента</option>\n' +
                '          </select>\n' +
                '        </div>\n' +
                '        <div class="el-wrap ew2 sel-wrap">\n' +
                '          <select class="el-name" name="el-name" disabled>\n' +
                '            <option disabled hidden selected value="">Выберите наименование</option>\n' +
                '          </select>\n' +
                '        </div>\n' +
                '        <div class="el-wrap ew3 labeled-input">\n' +
                '          <label>Кол-во (<span class="typeOfCount">*</span>)\n' +
                '            <div class="inputCountWrap"><input  type="number" min="1" value="1" class="inputCount"/><span class="stepper-step up"></span>\n' +
                '<span class="stepper-step down"></span>\n' +
                '</div> \n' +
                '          </label>\n' +
                '        </div>\n' +
                '        <div class="el-wrap ew4 labeled-input input-dark">\n' +
                '          <label>Сумма</label>\n' +
                '          <div class="row-total"><span>0</span> ₽</div>\n' +
                '        </div>\n' +
                '      </div>');
            // заполнение родительского селекта уже полученными данными о категориях
            let currentDD = $('.els-row-' + rowsCount).find('.el-type');
            isLoading(1);
            $.each(categoriesAPI, function () {
                currentDD.append($("<option />").val(this.id).text(this.name));
            });

            if(selectVal){
                CheckProjects(selectVal);
                $('.els-row-' + rowsCount).find("select.el-name").addClass("glow");
                function sayHi() {
                    $('.els-row-' + rowsCount).find("select.el-name").removeClass("glow");
                }
                setTimeout(sayHi, 4000);
            } else {
                CheckProjects(null,1);
            }

            currentDD.prop('disabled', false);
            isLoading(0);
            setTimeout(function () {
                $('.els-row-' + rowsCount).removeClass("collapsed");
            }, 100);

        }
    }
}

$(".el-add-row-btn").on('click', function () {
    addNewRow();
});

// Удаление строки
$parentEl.on('click', '.els-del', function () {
    delete_notify();
    let rowId = $(this).parent().attr("data-id");
    let visibleRowsCount = $('.els-body .els-row').length;

    // Удаление строки
    $(this).parent().remove();

    //Переписывание классов els-row-N, чтобы шли по порядку
    $('.els-body .els-row').each(function (index) {
        $(this).removeClass();
        $(this).addClass("els-row els-row-" + (index + 1));
        $(this).attr('data-id', index + 1);
    })

    removeFromLS(rowId);

    if (visibleRowsCount > 1) {
        $('.els-row:last-child').prepend('<div class="els-del"></div>');
    }
    rowsCount = rowsCount - 1;

    getTotalPrice(); // пересчет итоговой цены
});


// Очищение калькулятора
$parentEl.on('click', '.els-clear', function () {
    delete_notify();
    rowsCount = 1;
    let visibleRowsCount = $('.els-body .els-row').length;

    $('.els-body .els-row').remove();

    $(".els-body").append('<div class="els-row els-row-' + rowsCount + ' collapsed" data-id="' + rowsCount + '">\n' +
        '        <div class="els-del"></div><div class="el-wrap ew1 sel-wrap">\n' +
        '          <select class="el-type" name="el-type" disabled>\n' +
        '            <option disabled hidden selected value="">Выберите тип элемента</option>\n' +
        '          </select>\n' +
        '        </div>\n' +
        '        <div class="el-wrap ew2 sel-wrap">\n' +
        '          <select class="el-name" name="el-name" disabled>\n' +
        '            <option disabled hidden selected value="">Наименование</option>\n' +
        '          </select>\n' +
        '        </div>\n' +
        '        <div class="el-wrap ew3 labeled-input">\n' +
        '          <label>Кол-во (<span class="typeOfCount">*</span>)\n' +
        '            <div class="inputCountWrap"><input  type="number" min="1" value="1" class="inputCount"/><span class="stepper-step up"></span>\n' +
        '<span class="stepper-step down"></span>\n' +
        '</div> \n' +
        '          </label>\n' +
        '        </div>\n' +
        '        <div class="el-wrap ew4 labeled-input input-dark to-right">\n' +
        '          <label>Сумма</label>\n' +
        '          <div class="row-total"><span>0</span> ₽</div>\n' +
        '        </div>\n' +
        '      </div>');

    // заполнение родительского селекта уже полученными данными о категориях
    let currentDD = $('.els-row-' + rowsCount).find('.el-type');
    isLoading(1);
    $.each(categoriesAPI, function () {
        currentDD.append($("<option />").val(this.id).text(this.name));
    });
    currentDD.prepend($("<option disabled hidden selected />").val("").text("Выберите тип элемента"));
    currentDD.prop('disabled', false);
    isLoading(0);
    setTimeout(function () {
        $('.els-row-' + rowsCount).removeClass("collapsed");
    }, 100);

    removeAllFromLs();

    CheckProjects(null,1); // вот эта штука выбирает первый элемент списка

    getTotalPrice(); // пересчет итоговой цены
});




$("body").on("click", ".alertwindow", function () {
    $(this).removeClass("active");
});

$(".alertwindow .btn-close").click(function () {
    $(".alertwindow").removeClass("active");
});

//Заполняем скрытые поля в форме ContactForm7 данными из локального хранилища
$('.send-btn-wrapper a.btn-yellow, .cart-lists .btn-yellow').on('click', function (e) {
    e.preventDefault();
    let lsArr = JSON.parse(sessionStorage.getItem('order'));
    if (lsArr) {
        $.fancybox.open({
            src: '#popupform',
            type: 'inline',
            opts: {
                beforeShow: function (instance, current) {
                    let totalSum = 0;
                    $("#restable table").html("");
                    $("#z1").val("");
                    $("#z2").val("");
                    $("#z3").val("");
                    $("#z4").val("");
                    $("#z5").val("");
                    for (const [i, arr] of lsArr.entries()) {
                        $("#z1").val($("#z1").val() + "_" + arr[1]);
                        $("#z2").val($("#z2").val() + "_" + arr[2]);
                        $("#z3").val($("#z3").val() + "_" + arr[3]);
                        $("#z4").val($("#z4").val() + "_" + arr[4]);
                        $("#z5").val($("#z5").val() + "_" + arr[5]);
                        $("#restable table").append("<tr><td class='col1'>" + arr[1] + "</td><td class='col2'>" + arr[2] + "</td><td class='col3'>" + arr[3] + " <span class='izm'>" + arr[4] + "</span></td><td class='col4'><span class='sum'>Сумма </span>" + arr[6] + " ₽</td></tr>");
                        totalSum += Math.round(arr[6]);
                    }
                    $("#restable table").append("<tr><td colspan='4' class='totalsum'><div><span class='yellow-rounded'>Итого</span> " + totalSum + " ₽</div></td></tr>");
                }
            }
        });
    } else {
        return false;
    }
});


$(".btn-uniq-cat-desc").on('click touch', function () {
    $(".calculator").addClass("yellow-glow");
    function sayHi() {
        $(".calculator").removeClass("yellow-glow");
    }
    setTimeout(sayHi, 5000);
});

/*степпер для калькулятора*/
$("body").on('click', ".stepper-step", function (e) {
    let curval = parseFloat($(this).parent().find("input").val());

    if(e.target.classList[1] === "up"){
        if (curval) {
            $(this).parent().find("input").val(curval + 1).trigger("input");
        } else {
            $(this).parent().find("input").val(1).trigger("input");
        }
    } else {
        if (curval) {
            if (curval > 1) {
                $(this).parent().find("input").val(curval - 1).trigger("input");
            }
        } else {
            $(this).parent().find("input").val(1).trigger("input");
        }
    }
    delete_notify($(this).parent().find("input"));
});

/*фильтр селекта*/
$(".els-filter .opt").on('click', function () {
    $(this).parent().find(".opt").removeClass("active");
    $(this).addClass("active");
    let $curElsRow = $('.els-row-' + rowsCount);
    // console.log(rowsCount);
    if(($curElsRow.find(".el-name option:selected").attr('value')) && ($curElsRow.find(".el-name option:selected").attr('value').toString() != '9999')){
        $(".el-add-row-btn").trigger('click');
    } else {
        CheckProjects(null,1);
    }
});

function CheckProjects(selectVal=null, empty=null) { // добавить параметр, при котором первый элемент списка не выбирался бы

    let $curElsRow = $('.els-row-' + rowsCount);
    let arrVals = JSON.parse($('.opt.active').attr('data-vals'));

    $curElsRow.find("select.el-type").empty();
    let lastId = 0;
    let firstId = 0;

    $.each(categoriesAPI, function (index) {
        if ($.inArray(categoriesAPI[index].id, arrVals) > -1) { //If current project ID is in array of projects
            $curElsRow.find("select.el-type").append($("<option />").val(categoriesAPI[index].id).text(categoriesAPI[index].name));
            lastId = categoriesAPI[index].id;
            firstId = arrVals[0];
        }
    });
    if(!empty) {
        $curElsRow.find("select.el-type").find("option:eq(0)").attr('selected', 'selected')
        $curElsRow.find("select.el-type").val(firstId).trigger('change');
    } else {
        $curElsRow.find("select.el-type").prepend($("<option disabled hidden selected />").val("").text("Выберите тип элемента"));
        $curElsRow.find("select.el-name").prop('disabled',true)
    }
    if(selectVal){
        $curElsRow.find("select.el-type").val(selectVal).prop('selected', true).trigger('change');
    }
}


function updateList(){
    let lsArr = [];
    let totalCount = 0;
    let totalPrice = 0;
    if (sessionStorage.getItem('order') !== null) {
        lsArr = JSON.parse(sessionStorage.getItem('order'));
        for (const [i, arr] of lsArr.entries()) {
            totalCount += 1;
            totalPrice += Math.round(arr[5]);
        }
    }
    $(".list_total_count").text(totalCount);
    $(".list_total_sum").text(totalPrice);
}


if (sessionStorage.getItem('tabs') !== null) {
    let curTab = sessionStorage.getItem('tabs');
    $('.mobile_tabs').find('li').removeClass("active");
    $('.mobile_tabs').find('li').eq(curTab).addClass("active");
    $(".tab_content").removeClass("active");
    $(".tab_content").eq(curTab).addClass("active");
} else {
    sessionStorage.setItem('tabs','0');
}

let pageTitle = document.title;
//Обновляет цифру общего кол-ва элементов в списке
let countItems = 0;
const updateCountItems = function () {

    if (sessionStorage.getItem('order') !== null) {
        let orderArr = JSON.parse(sessionStorage.getItem('order'));
        if (orderArr !== []) {
            countItems = orderArr.length;
        }
    }
    jQuery(".open-list .notifier").text(countItems);
    let newTitle = '(' + countItems + ') ' + pageTitle;
    document.title = newTitle;
    if (countItems === 0) {
        document.title = pageTitle;
    } else {
        document.title = newTitle;
    }
    return countItems;
};

updateCountItems();


$('document').ready(function (){
    //Добавить в список из модуля популярных товаров на главной

    if ($(".cart-lists").length) {
        let lsArr = [];
        if (sessionStorage.getItem('order') !== null) {
            lsArr = JSON.parse(sessionStorage.getItem('order'));
            if (lsArr.length > 0) {
                getFromLs(lsArr).then(r => console.log('Data loaded from local storage!'));
                $(".list-total").addClass("active");
            } else {
                $(".cart-lists").html("<div class='empty-list'><h3>В вашем списке еще ничего нет</h3><a href='javascript:;' class='btn btn-purple  open-catalog'><span class=\"ico ico-list ico-left\"></span> Открыть каталог</a></div>")
            }
        } else {
            $(".cart-lists").html("<div class='empty-list'><h3>В вашем списке еще ничего нет</h3><a href='javascript:;' class='btn btn-purple open-catalog'><span class=\"ico ico-list ico-left\"></span> Открыть каталог</a></div>")
        }
    }

    $(".open-catalog").on("click", function () {
        $("#cat_popup_menu").fadeIn();
        $(".popup_layout").addClass("active");
    });

    const getTotalPrice = function () {

        totalPrice = 0;
        $(".cart-lists").find('.list').each(function () {
            let temp = parseFloat(jQuery(this).find('.total_price').text());
            totalPrice += temp;
        });
        if (totalPrice > 0) {
            $(".list-total .price span").text(totalPrice.toFixed(0));
        } else {
            $(".list-total .price span").text("0");
        }

    };
    //в эту функцию передаем объект из локального хранилища, где из него создаются и заполняются данными строки
    async function getFromLs(lsArr) {
        isLoading(1);

        for (const [i, arr] of lsArr.entries()) {
            //вызываем асинхронную функцию создания строки
            $(".loading_text").text("Загружено " + (i + 1) + " из " + lsArr.length);

            await buildRow(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7]);
            getTotalPrice();
        }

        isLoading(0);
    }
    /*Построение строки с данными из локального хранилища*/
    async function buildRow(
        lsId,
        lsType,
        lsName,
        lsCount,
        lsTypeOf,
        lsRowPrice,
        lsRowSum,
        lsImgSrc
    ) {
        $(".cart-lists").prepend('<div class="list list-' + lsId + '" data-id="' + lsId + '"><div class="img"><img src="' + lsImgSrc + '" alt="" /></div><div class="center"><div class="name"><b>' + lsName + '</b></div><div class="price"><span>' + lsRowPrice + '</span> <b>₽</b></div><div class="type">за <span class="izm">' + lsTypeOf + '</span></div></div><div class="cart_block"><div class="inputCountWrap"><span class="stepper-step down">-</span><input type="number" min="1" value="' + lsCount + '" class="inputCount inputCount-1"/><span class="stepper-step up">+</span></div><div class="total_price"><span>' + lsRowSum + '</span><b> ₽</b></div><div class="ico-del"><span class="ico ico-clear" data-rowid="' + lsId + '"></span></div></div></div>');
    }

    function cuteHide(el) {
        el.animate({opacity: '0'}, 250, function () {
            el.animate({height: '0px'}, 250, function () {
                el.remove();
                getTotalPrice();
            });
        });
    }

    const deleteRow = function (rowId) {
        cuteHide($(".list-" + rowId));
        removeFromLSList(rowId);
    }

    $("body").on("click", ".cart_block .ico-clear", function () {
        let rowId = $(this).attr("data-rowid");
        deleteRow(rowId);
    })

    $(".cart-lists").on('input', '.inputCount', function () {
        let id = $(this).parent().parent().parent().attr("data-id");
        //let $errorInput = jQuery('.inputCount-' + id);
        //harddelete_notify($errorInput);
        getPriceInCart(id);
    });

    const getPriceInCart = function (id) { //id = row index
        let $row = $(".list-" + id);
        let col = $row.find('.inputCount').val();
        let price = parseInt($row.find(".price span").text());
        $row.find(".total_price span").text(Math.round(col * price));
        let oldArr = [];
        oldArr = JSON.parse(sessionStorage.getItem('order')) || [];
        for (const [i, arr] of oldArr.entries()) {
            if (arr[0] === id) {
                arr[3] = col;
                arr[6] = Math.round(col * price);
            }
        }

        sessionStorage.setItem('order', JSON.stringify(oldArr));
        getTotalPrice();
        updateCountItems();
    }











    if ($(".print--ul").length > 0) {
        $(".print--ul").each(function () {
            let item_gold = $(this).find(".item--gold").text();
            let item_silver = $(this).find(".item--silver").text();
            let item_platinum = $(this).find(".item--platinum").text();
            let item_palladium = $(this).find(".item--palladium").text();
            let item_typecount = $(this).find(".item--typeofcount").text();
            let item_fixprice = $(this).find(".item--fixprice").text();
            let item_price;
            // Основная формула для каждого города и металла есть поправочный кэф
            if (item_fixprice > 0) {
                if (item_fixprice == "999999") {
                    $(this).find(".price").text("по запросу");
                } else {
                    $(this).find(".price .price_value").text(item_fixprice);
                }
            } else {

                item_price = (item_gold * GOLD * GOLD_DISCOUNT + item_silver * SILVER * SILVER_DISCOUNT + item_platinum * PLATINUM * PLATINUM_DISCOUNT + item_palladium * PALLADIUM * PALLADIUM_DISCOUNT) * USD;

                $(this).find(".price .price_value").text(Math.round((item_price + Number.EPSILON) * 1));
            }
            $(this).find(".itemcount").text(TYPES[item_typecount - 1]);

        })
    }






});










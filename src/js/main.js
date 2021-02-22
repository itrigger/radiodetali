jQuery("document").ready(function () {

    let GOLD_DISCOUNT = 0.6;
    let SILVER_DISCOUNT = 0.7;
    let PLATINUM_DISCOUNT = 0.7;
    let PALLADIUM_DISCOUNT = 0.7;

    let categoriesRDAPI = {}; // объект где храним список категорий
    let categoriesRPAPI = {}; // объект где храним список категорий
    let categoriesName = [];
    let productsAPI = {}; // объект где храним список продуктов
    let rowsCount = 1; // изначальное кол-во строк
    let $parentEl = jQuery('#calcform'); // ссылка на родительскую обертку
    let totalPrice = 0; // начальное значение итоговой цены

    let GOLD = stock_gold / 31.1;
    let SILVER = stock_silver / 31.1;
    let PLATINUM = stock_platinum / 31.1;
    let PALLADIUM = stock_palladium / 31.1;
    let USD = stock_rub;
    let EUR = 1 / stock_eur * stock_rub;
    let STOCK_DATE = stock_date.toString();
    const TYPES = ["кг", "шт", "г", "кольцо", "секция", "2 секции", "контакт", "гр"];
    //const CONST_HOST = "https://priemkm.ru";
    const CONST_HOST = window.location.origin;
    console.log(CONST_HOST);
    const CONST_CK = 'ck_1a2af9ee2ad6e3ac6a0f9237cebfcc62ad4a88a5';
    const CONST_CS = 'cs_fc757c4e40772bd4cb6b5f36c8a81bf33504395f';
    const $dropdown = jQuery("#radioels-type");
    const $dropdown2 = jQuery("#radioprib-type");
    const $dropdownChild = jQuery("#radioels-name");
    const $dropdownChild2 = jQuery("#radioprib-name");
    const R_DETAILS = [17, 16, 18, 24, 25, 26, 30, 28, 19, 29, 23, 22, 21, 20];
    const R_PRIBORS = [37, 38, 49, 39, 41, 42, 43, 46, 44, 45, 48, 47];


    const isLoading = (cond) => {
        if (cond === 1) {
            jQuery(".loader").addClass("active");
        } else {
            jQuery(".loader").removeClass("active");
        }
    }
    isLoading(1);


    /*Храним в локальной сессии какой таб открыт*/
    if (sessionStorage.getItem('tabs') !== null) {
        let curTab = sessionStorage.getItem('tabs');
        jQuery(".tabs_label .tab_label").removeClass("active");
        jQuery(".tabs_label .tab_label").eq(curTab).addClass("active");
        jQuery(".tabform .tab_content").removeClass("active");
        jQuery(".tabform .tab_content").eq(curTab).addClass("active");
        let $tabsLabel = jQuery(".tabs_label");
        if (curTab == 0) {
            $tabsLabel.removeClass("first second").addClass("first");
        } else {
            $tabsLabel.removeClass("first second").addClass("second");
        }
    } else {
        sessionStorage.setItem('tabs', '0');
    }

    /*клик по табам*/
    jQuery(".tabs_label .tab_label").on("click", function () {
        let liIndex = jQuery(this).index();
        jQuery(".sum_num b").text("-");
        jQuery(".count_num").text("-");

        let element = jQuery("#calcform .btn");

        element.removeClass("animation");

        jQuery(this).parent().find(".tab_label").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(this).parent().parent().find(".tab_content").removeClass("active");
        jQuery(this).parent().parent().find(".tab_content").eq(liIndex).addClass("active");
        let $tabsLabel = jQuery(".tabs_label");
        if (liIndex === 0) {
            $tabsLabel.removeClass("first second").addClass("first");
            $dropdownChild.val("9999").prop('selected', true);
            $dropdownChild.customSelect('reset');
        } else {
            $tabsLabel.removeClass("first second").addClass("second");
            $dropdownChild2.val("9999").prop('selected', true);
            $dropdownChild2.customSelect('reset');
        }
        sessionStorage.setItem('tabs', liIndex);
        setTimeout(function () {
            element.addClass("animation");
        }, 200);

    });


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

    function CheckCategoryMenuItem() {

    }

    function CheckMainMenuItem() {
        jQuery("#cat_popup_menu li, #main_popup_menu li").each(function () {
            if (jQuery(this).find("a").attr("href") === window.location.pathname) {
                jQuery(this).addClass("active");
            }
        });
    }

    CheckMainMenuItem();

    /*степпер для калькулятора*/
    jQuery("body").on('click', ".stepper-step", function (e) {
        let curval = parseFloat(jQuery(this).parent().find("input").val());

        if (e.target.classList[1] === "up") {
            jQuery(this).parent().find("input").val(curval + 1).trigger("input");
        } else {
            if (curval > 1) {
                jQuery(this).parent().find("input").val(curval - 1).trigger("input");
            }
        }
    });

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

    $dropdown.prop('disabled', 'disabled'); // отключаем селекты, пока в них не подгрузятся данные
    $dropdownChild.prop('disabled', 'disabled');


    if (jQuery("#calcform").length) {
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
                        /*разделяем категории по двум массивам*/

                        jQuery.each(data, function (index) {
                            if (jQuery.inArray(data[index].id, R_DETAILS) > -1) {
                                let temp = {};
                                temp.id = data[index].id;
                                temp.name = data[index].name;
                                categoriesRDAPI[index] = temp;
                            } else {
                                let temp = {};
                                temp.id = data[index].id;
                                temp.name = data[index].name;
                                categoriesRPAPI[index] = temp;
                            }
                        });


                        $dropdown.empty();
                        jQuery.each(categoriesRDAPI, function () {
                            $dropdown.append(jQuery("<option />").val(this.id).text(this.name));
                        });
                        $dropdown.append(jQuery("<option disabled hidden selected value='9999'></option>").text("Выберите тип элемента"));
                        $dropdown.prop('disabled', false);
                        $dropdown.customSelect('reset');

                        $dropdown2.empty();
                        jQuery.each(categoriesRPAPI, function () {
                            $dropdown2.append(jQuery("<option />").val(this.id).text(this.name));
                        });
                        $dropdown2.prop('disabled', false);
                        $dropdown2.customSelect('reset');


                        isLoading(0);
                    });

                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
                notify("Возникла ошибка при получении данных! Попробуйте перезагрузить страницу или зайти позже.", "error");
            });
    } else {
        isLoading(0);
    }


    // заполняем дочерний селект при выборе опции в родительском
    const fillChildSelect = function (id, catId = 0) {
        isLoading(1); //Отображаем лоадер

        let thiscatID = 0;
        let $parentDD;
        let $childDD;

        if (id === 1) {
            $parentDD = $dropdown;
            $childDD = $dropdownChild;
        } else {
            $parentDD = $dropdown2;
            $childDD = $dropdownChild2;
        }
        if (catId > 0) {
            thiscatID = catId;
            $parentDD.val(catId);
        } else {
            thiscatID = $parentDD.val(); // получаем ID категории
        }
        jQuery(".sum_num b").text("-");
        jQuery(".count_num").text("-");

        $dropdownChild.prop('disabled', 'disabled'); // блокируем дочерний селект пока идет загрузка
        //delete_notify($childDD); // удаляем все сообщения об ошибках и красную обводку с поля


        if (sessionStorage.getItem('category' + thiscatID) !== null) {

            let lsArr = [];
            lsArr = JSON.parse(sessionStorage.getItem('category' + thiscatID));

            $childDD.empty(); // очищаем селект
            $childDD.append(jQuery("<option hidden disabled selected value='9999'></option>").text("Выберите наименование"));
            for (const [i, arr] of lsArr.entries()) {
                if (arr[8] !== '999999') {
                    $childDD.append(jQuery("<option />")
                        .val(arr[0])
                        .text(arr[2])
                        .attr({
                            'data-g': arr[3],
                            'data-s': arr[4],
                            'data-pt': arr[5],
                            'data-pd': arr[6],
                            'data-counttype': arr[7],
                            'data-fixprice': arr[8],
                            'data-imgsrc': arr[9],
                            //}).prop('selected', true));
                        }));
                }
            }

            $childDD.prop('disabled', false);
            getPrice(id);
            isLoading(0);
            $childDD.customSelect('reset');
        } else {
            // запрос на АПИ
            fetch(`${CONST_HOST}/wp-json/wc/v3/products?consumer_key=${CONST_CK}&consumer_secret=${CONST_CS}&category=${thiscatID}&per_page=100&status=publish&order=asc`)
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
                                $childDD.append(jQuery("<option hidden disabled selected value='9999'></option>").text("Выберите наименование"));
                                let i = 0;
                                for (let key in productsAPI) {
                                    // заполняем селект данными
                                    if (productsAPI.hasOwnProperty(key)) {
                                        if (productsAPI[key].meta_data[10].value !== '999999') {
                                            let imgSrc = "https://priemkm.ru/wp-content/uploads/blank.jpg";
                                            if (productsAPI[key].images[0] !== undefined) {
                                                imgSrc = productsAPI[key].images[0].src;
                                            }
                                            $childDD.append(jQuery("<option />")
                                                .val(productsAPI[key].id)
                                                .text(productsAPI[key].name)
                                                .attr({
                                                    'data-g': productsAPI[key].meta_data[0].value,
                                                    'data-s': productsAPI[key].meta_data[2].value,
                                                    'data-pt': productsAPI[key].meta_data[4].value,
                                                    'data-pd': productsAPI[key].meta_data[6].value,
                                                    'data-counttype': productsAPI[key].meta_data[8].value,
                                                    'data-fixprice': productsAPI[key].meta_data[10].value,
                                                    'data-imgsrc': imgSrc,
                                                    //}).prop('selected', true));
                                                }));

                                            //заполняем локальное хранилище

                                            let lsId = productsAPI[key].id; //ID самой радиодетали
                                            let lsCatId = productsAPI[key].categories[0].id; //Id категории
                                            let lsName = productsAPI[key].name; //Имя детали
                                            let lsMeta0 = productsAPI[key].meta_data[0].value; //Gold
                                            let lsMeta2 = productsAPI[key].meta_data[2].value; //Silver
                                            let lsMeta4 = productsAPI[key].meta_data[4].value; //Platinum
                                            let lsMeta6 = productsAPI[key].meta_data[6].value; //Palladium
                                            let lsMeta8 = productsAPI[key].meta_data[8].value; //Мера измерения (кг,  шт и т.д.)
                                            let lsMeta10 = productsAPI[key].meta_data[10].value; //Мера измерения (кг,  шт и т.д.)
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
                                $childDD.append(jQuery("<option />")
                                    .val('')
                                    .text('Нет данных!')
                                );
                            }

                            isLoading(0);
                            //$childDD.customSelect('reset');
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
    $dropdown.on('change', function () {
        fillChildSelect(1);
    });
    $dropdown2.on('change', function () {
        fillChildSelect(2);
    });
    $dropdownChild.on('change', function () {
        getPrice(1);
    });
    $dropdownChild2.on('change', function () {
        getPrice(2);
    });

    //Высчитывание цены
    const getPrice = function (id) { //id - номер строки
        let item_price = 0;
        let $childDD;
        if (id === 1) {
            $childDD = $dropdownChild;
        } else {
            $childDD = $dropdownChild2;
        }

        let item_gold = jQuery('option:selected', $childDD).data('g');
        let item_silver = jQuery('option:selected', $childDD).data('s');
        let item_platinum = jQuery('option:selected', $childDD).data('pt');
        let item_palladium = jQuery('option:selected', $childDD).data('pd');
        let ItemTypeOf = jQuery('option:selected', $childDD).data('counttype');
        let FixPrice = jQuery('option:selected', $childDD).data('fixprice');
        let $childTypeOf = jQuery('.tabform-footer .count_num');


        $childTypeOf.text(TYPES[ItemTypeOf - 1]);


        if (FixPrice > 0) {
            item_price = FixPrice;
        } else {
            item_price = Math.round((item_gold * GOLD * GOLD_DISCOUNT + item_silver * SILVER * SILVER_DISCOUNT + item_platinum * PLATINUM * PLATINUM_DISCOUNT + item_palladium * PALLADIUM * PALLADIUM_DISCOUNT) * USD);
        }

        if (item_price > 0) {
            jQuery('.sum_num b').text(Math.round(item_price));
        } else {
            jQuery('.sum_num b').text("0");
        }

        //getTotalPrice();

    }


    // сохраняем данные в локальное хранилище
    const saveToLSFromCalc = function () {
        let oldArr = [];
        let temp = [];
        let lsRowSum, lsRowPrice;
        let $row = jQuery(".tab_content.active");

        if (sessionStorage.getItem('order') !== null) {
            oldArr = JSON.parse(sessionStorage.getItem('order')) || [];
        }
        let lsType = $row.find('.el-type option:selected').text(); //Название категории
        let lsName = $row.find('.el-name option:selected').text(); //Название самой радиодетали
        let lsId = $row.find('.el-name option:selected').attr('value').toString(); //ID самой радиодетали
        let lsImgSrc = $row.find('.el-name option:selected').attr('data-imgsrc').toString(); //картинка
        let lsCount = 1;
        let lsTypeOf = jQuery(".tabform-footer .count_num").text(); //Мера исчисления (1 - кг, 2 - штуки)
        lsRowPrice = jQuery(".tabform-footer .sum_num b").text(); //Сумма как (кол-во * меру исчесления)
        lsRowSum = lsRowPrice;
        if (lsId !== '9999') {
            temp = [lsId, lsType, lsName, lsCount, lsTypeOf, lsRowPrice, lsRowSum, lsImgSrc];
        }
        let flag = 0;

        for (const [i, arr] of oldArr.entries()) {
            if (arr[0] === lsId) {
                flag = 1;
            }
        }
        if (flag !== 1) {
            oldArr.push(temp);
            if (lsRowSum > 0) {
                sessionStorage.setItem('order', JSON.stringify(oldArr)); //превращаем все данные в строку и сохраняем в локальное хранилище
                harddelete_notify();
                notify("Добавлено в список: " + lsType + " - " + lsName + "", "default", "<div><a href='/my-list' class='go-to-list'>Весь список</a></div>");
                $dropdownChild.val("9999").prop('selected', true);
                //$dropdownChild.customSelect('reset');
                $dropdownChild2.val("9999").prop('selected', true);
                //$dropdownChild2.customSelect('reset');
                updateCountItems();
            }
        } else {
            harddelete_notify();
            notify(lsName + " уже есть в списке", "error")
        }

    };


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

    jQuery(".btn-add-to-list").click(function () {
        if (jQuery(".tab_content.active .el-name option:selected").attr('value') !== undefined) {
            if (jQuery(".tab_content.active .el-name option:selected").attr('value').toString() !== '9999') {
                saveToLSFromCalc();
            } else {
                notify("Не указан элемент", "error");
            }
        } else {
            notify("Не выбран элемент", "error");
        }
    });

    //в эту функцию передаем объект из локального хранилища, где из него создаются и заполняются данными строки
    async function getFromLs(lsArr) {
        isLoading(1);

        for (const [i, arr] of lsArr.entries()) {
            //вызываем асинхронную функцию создания строки
            jQuery(".loading_text").text("Загружено " + (i + 1) + " из " + lsArr.length);

            await buildRow(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7]);
            getTotalPrice();
        }

        isLoading(0);
    }

    if (jQuery(".cart-lists").length) {
        let lsArr = [];
        if (sessionStorage.getItem('order') !== null) {
            lsArr = JSON.parse(sessionStorage.getItem('order'));
            if (lsArr.length > 0) {
                getFromLs(lsArr).then(r => console.log('Data loaded from local storage!'));
                jQuery(".list-total").addClass("active");
            } else {
                jQuery(".cart-lists").html("<div class='empty-list'><h3>В вашем списке еще ничего нет</h3><a href='#' class='btn btn-orange btn-animated open-popup-cat'><span class=\"ico ico-category ico-left\"></span> Открыть каталог</a></div>")
            }
        } else {
            jQuery(".cart-lists").html("<div class='empty-list'><h3>В вашем списке еще ничего нет</h3><a href='#' class='btn btn-orange btn-animated open-popup-cat'><span class=\"ico ico-category ico-left\"></span> Открыть каталог</a></div>")
        }
    }

    const getTotalPrice = function () {

        totalPrice = 0;
        jQuery(".cart-lists").find('.list').each(function () {
            let temp = parseFloat(jQuery(this).find('.total_price').text());
            totalPrice += temp;
        });
        if (totalPrice > 0) {
            jQuery(".list-total .price span").text(totalPrice.toFixed(0));
        } else {
            jQuery(".list-total .price span").text("0");
        }

    };

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
        jQuery(".cart-lists").prepend('<div class="list list-' + lsId + '" data-id="' + lsId + '"><div class="img"><img src="' + lsImgSrc + '" alt="" /></div><div class="center"><div class="name"><b>' + lsName + '</b></div><div class="price"><span>' + lsRowPrice + '</span> <b>р.</b></div><div class="type">за <span class="izm">' + lsTypeOf + '</span></div></div><div class="cart_block"><div class="inputCountWrap"><span class="stepper-step down">-</span><input type="number" min="1" value="' + lsCount + '" class="inputCount inputCount-1"/><span class="stepper-step up">+</span></div><div class="ico-del"><span class="ico ico-delete-list" data-rowid="' + lsId + '"></span></div><div class="total_price"><span>' + lsRowSum + '</span><b>р.</b></div></div></div>');
    }


    jQuery(".cart-lists").on('input', '.inputCount', function () {
        let id = jQuery(this).parent().parent().parent().attr("data-id");
        //let $errorInput = jQuery('.inputCount-' + id);
        //harddelete_notify($errorInput);
        getPriceInCart(id);
    });

    const getPriceInCart = function (id) { //id = row index
        let $row = jQuery(".list-" + id);
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

    function cuteHide(el) {
        el.animate({opacity: '0'}, 250, function () {
            el.animate({height: '0px'}, 250, function () {
                el.remove();
                getTotalPrice();
            });
        });
    }

    const deleteRow = function (rowId) {
        cuteHide(jQuery(".list-" + rowId));
        removeFromLS(rowId);
    }

    //Удаление строки из локального хранилища
    const removeFromLS = function (rowID) {
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

    jQuery("body").on("click", ".ico-delete-list", function () {
        let rowId = jQuery(this).attr("data-rowid");
        deleteRow(rowId);
    })

    jQuery(".card-add-to-list").on("click", function (e) {
        e.preventDefault();
        let oldArr = [];
        if (sessionStorage.getItem('order') !== null) {
            oldArr = JSON.parse(sessionStorage.getItem('order')) || [];
        }
        let temp = [];
        let lsId = jQuery(this).parent().parent().find('.item--id').text(); //ID самой радиодетали
        let lsType = jQuery('.cat_header--header h1').text(); //Название категории
        let lsName = jQuery(this).parent().parent().find('.name').text() + jQuery(this).parent().parent().find('.desc').text(); //Название самой радиодетали
        let lsCount = 1; //Кол-во радиодеталей
        let lsTypeOf = parseInt(jQuery(this).parent().parent().find('.item--typeofcount').text()); //Мера исчисления (1 - кг, 2 - штуки)
        let lsRowPrice = jQuery(this).parent().parent().find('.price_value').text(); //Сумма
        let lsRowSum = lsRowPrice;
        let lsImgSrc = jQuery(this).parent().parent().find('img').attr("src");

        lsTypeOf = TYPES[lsTypeOf - 1];
        temp = [lsId, lsType, lsName, lsCount, lsTypeOf, lsRowPrice, lsRowSum, lsImgSrc];

        let flag = 0;

        for (const [i, arr] of oldArr.entries()) {
            if (arr[0] === lsId) {
                flag = 1;
            }
        }
        if (flag !== 1) {
            oldArr.push(temp);
            if (lsRowSum > 0) {
                sessionStorage.setItem('order', JSON.stringify(oldArr)); //превращаем все данные в строку и сохраняем в локальное хранилище
                notify("Добавлено в список: " + lsType + " - " + lsName + "", "default", "<div><a href='/my-list' class='go-to-list'>Весь список</a></div>");
                updateCountItems();
            }
        } else {
            notify(lsName + " уже есть в списке", "error")
        }
    });


    //Заполняем скрытые поля в форме ContactForm7 данными из локального хранилища
    jQuery('.list-total .btn-orange').on('click', function (e) {
        e.preventDefault();
        let lsArr = JSON.parse(sessionStorage.getItem('order'));
        if (lsArr) {
            jQuery.fancybox.open({
                src: '#popupform',
                type: 'inline',
                toolbar: false,
                opts: {
                    beforeShow: function (instance, current) {
                        let totalSum = 0;
                        jQuery("#restable table").html("");
                        jQuery("#z1").val("");
                        jQuery("#z2").val("");
                        jQuery("#z3").val("");
                        jQuery("#z4").val("");
                        jQuery("#z5").val("");
                        for (const [i, arr] of lsArr.entries()) {
                            jQuery("#z1").val(jQuery("#z1").val() + "_" + arr[1]);
                            jQuery("#z2").val(jQuery("#z2").val() + "_" + arr[2]);
                            jQuery("#z3").val(jQuery("#z3").val() + "_" + arr[3]);
                            jQuery("#z4").val(jQuery("#z4").val() + "_" + arr[5]);
                            jQuery("#z5").val(jQuery("#z5").val() + "_" + arr[6]);
                            jQuery("#restable table").append("<tr><td class='col1'><div class='img-w'><img src='" + arr[7] + "' alt='" + arr[2] + "'/></div></td><td class='col2'><div class='cat-name'>" + arr[1] + "</div>" + arr[2] + "</td><td class='col3'>" + arr[3] + " <span class='izm'>" + arr[4] + "</span></td><td class='col4'><span class='sum'>на</span>" + arr[6] + " ₽</td></tr>");
                            totalSum += Math.round(arr[6]);
                        }
                        jQuery("#restable table").append("<tr><td colspan='4' class='totalsum'><div><span class='yellow-rounded'>Итого</span> " + totalSum + " ₽</div></td></tr>");
                        jQuery(".fancybox-toolbar").css("display", "none");
                    },
                    afterShow: function (instance, current) {
                        jQuery(".fancybox-content").prepend("<div class='fancy_close'><svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1\" viewBox=\"0 0 24 24\"><path d=\"M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z\"></path></svg></div>");
                        jQuery(".fancy_close").on('click', function () {
                            instance.close();
                        })
                    },
                    afterClose: function (instance, current) {
                        jQuery(".wpcf7-response-output").css("display", "none");
                    }
                }
            });
        } else {
            return false;
        }
    });

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


    jQuery(".sellnow").click(function () {

    });

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
                   /* jQuery(".fancybox-content").append("<div class='fancy_close'><svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1\" viewBox=\"0 0 24 24\"><path d=\"M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z\"></path></svg></div>");
                    jQuery(".fancy_close").on('click', function () {
                        instance.close();
                    })*/
                },
            }
        });
    });

    jQuery('#calc-sell-now').on('click', function (e) {
        e.preventDefault();
        if ((jQuery(".tab_content.active .el-name option:selected").attr('value') !== undefined) && (jQuery(".tab_content.active .el-name option:selected").attr('value') !== '9999')) {
            let lsArr = JSON.parse(sessionStorage.getItem('order'));
            /* if (lsArr) {*/
            jQuery.fancybox.open({
                src: '#calcpopupform',
                type: 'inline',
                toolbar: true,
                opts: {
                    afterShow: function (instance, current) {
                       /* jQuery(".fancybox-content").append("<div class='fancy_close'><svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1\" viewBox=\"0 0 24 24\"><path d=\"M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z\"></path></svg></div>");
                        jQuery(".fancy_close").on('click', function () {
                            instance.close();
                        });*/
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
        /*
    */
    });


    jQuery(document).on('click', '.card .btn-wt', function (e) {
        e.preventDefault();

        let phone = "79013317104";
        let message = "Здравствуйте, я хочу продать: " + jQuery(this).parent().parent().find('.woocommerce-loop-product__title').text();
        let link = 'https://wa.me/' + encodeURIComponent(phone) + '?text=' + encodeURIComponent(message);

        window.open(link, '_blank');
    });

});/*main wrap*/

/*
* ToDo
*  Скачет левое меню в десктоп версии
*  Страница Скачать Прайс?
*  Баг. Не закрывается модалка в мобильной
*
* */
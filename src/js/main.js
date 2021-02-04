jQuery("document").ready(function () {

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
        if (curTab == 0) {
            jQuery(".tabs_label").removeClass("first");
            jQuery(".tabs_label").removeClass("second");
            jQuery(".tabs_label").addClass("first");
        } else {
            jQuery(".tabs_label").removeClass("first");
            jQuery(".tabs_label").removeClass("second");
            jQuery(".tabs_label").addClass("second");
        }

    } else {
        sessionStorage.setItem('tabs', '0');
    }

    /*клик по табам*/
    jQuery(".tabs_label .tab_label").on("click", function () {
        let liIndex = jQuery(this).index();
        jQuery(this).parent().find(".tab_label").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(this).parent().parent().find(".tab_content").removeClass("active");
        jQuery(this).parent().parent().find(".tab_content").eq(liIndex).addClass("active");
        if (liIndex === 0) {
            jQuery(".tabs_label").removeClass("first");
            jQuery(".tabs_label").removeClass("second");
            jQuery(".tabs_label").addClass("first");
        } else {
            jQuery(".tabs_label").removeClass("first");
            jQuery(".tabs_label").removeClass("second");
            jQuery(".tabs_label").addClass("second");
        }
        sessionStorage.setItem('tabs', liIndex);
    });


    /*https://kvlsrg.github.io/jquery-custom-select/*/
    jQuery('#radioels-type').customSelect({
        placeholder: '<span style="color: darkgray;">Что продаёте?</span>',
        search: true,
        includeValue: true
    });

    jQuery('#radioels-name').customSelect({
        placeholder: '<span style="color: darkgray;">Укажите элемент</span>',
        search: true,
        includeValue: true
    });
    jQuery('#radioprib-type').customSelect({
        placeholder: '<span style="color: darkgray;">Что продаёте?</span>',
        search: true,
        includeValue: true
    });

    jQuery('#radioprib-name').customSelect({
        placeholder: '<span style="color: darkgray;">Укажите элемент</span>',
        search: true,
        includeValue: true
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
    if (jQuery(".left-menu").length) {
        CheckCategoryMenuItem()
    }

    function CheckCategoryMenuItem() {
        jQuery(".left-menu ul ul li").each(function () {
            if (jQuery(this).find("a").attr("href") === window.location.pathname) {
                jQuery(this).addClass("active");
                jQuery(this).parent().parent().addClass("active");
                jQuery(this).parent().slideToggle(function () {
                    if (jQuery(".left-menu>ul>li").hasClass("active")) {
                        jQuery(".left-menu").addClass("active");
                    } else {
                        jQuery(".left-menu").removeClass("active");
                    }
                });
            }
        });
    }

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

    var date = new Date(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        hourElt = document.getElementsByClassName("hour")[0],
        minElt = document.getElementsByClassName("min")[0];

    moveTime();

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


    jQuery(".open-popup-cat").click(function (e) {
        e.preventDefault();
        jQuery("#cat_popup_menu").addClass("open");
    });

    jQuery("#cat_popup_menu .close_btn").on("click", function () {
        jQuery("#cat_popup_menu").removeClass("open");
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


    let GOLD_DISCOUNT = 0.6;
    let SILVER_DISCOUNT = 0.7;
    let PLATINUM_DISCOUNT = 0.7;
    let PALLADIUM_DISCOUNT = 0.7;

    let categoriesRDAPI = {}; // объект где храним список категорий
    let categoriesRPAPI = {}; // объект где храним список категорий
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
    const $dropdown = jQuery("#radioels-type"); // начальные ссылки на селекты
    const $dropdown2 = jQuery("#radioprib-type"); // начальные ссылки на селекты
    const $dropdownChild = jQuery("#radioels-name");
    const $dropdownChild2 = jQuery("#radioprib-name");
    const R_DETAILS = [17, 16, 18, 24, 25, 26, 30, 28, 19, 29, 23, 22, 21, 20];
    const R_PRIBORS = [37, 38, 49, 39, 41, 42, 43, 46, 44, 45, 48, 47];

    /* Add fancybox to product img */
    if (jQuery(".catalog-cards").length > 0) {
        jQuery(".catalog-cards .card img.attachment-woocommerce_thumbnail").on('click', function (e) {
            if (jQuery(window).width() <= 600) {
                if (e.target.offsetParent.classList.contains('active')) {
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
                }
            } else {
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
            }


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
                    jQuery(this).find(".title").text("Цена договорная");
                    jQuery(this).find(".price").css("display", "none");
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


    /*******************/
    /*****Notifier*******/
    /*******************/
    //Собственный модуль уведомлений
    const notify = function (message, type = "success") { // type может быть success (по умолчанию) или error
        $parentEl.append(`<div class='flex alert ${type}'>${message} <span class="closebtn">×</span></div>`) // вставляем алерт в дом
        if (type === "success") { // если алерт об успешной операции, то автоматически прячем через 3 секунды
            setTimeout(function () {
                $parentEl.find(".alert").remove();
            }, 3000);
        }
    }
    jQuery(document).on('click', '.closebtn', function () { // кнопка закрытия алерта
        let $alert = jQuery(this).parent();
        $alert.css({"opacity": "0", "height": "1px"});
        setTimeout(function () {
            $alert.css("display", "none")
        }, 600);
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


                        /**/


                        $dropdown.empty();

                        jQuery.each(categoriesRDAPI, function () {
                            $dropdown.append(jQuery("<option />").val(this.id).text(this.name));
                        });
                        //$dropdown.append(jQuery("<option disabled hidden selected value='9999'></option>").text("Что продаёте?"));
                        $dropdown.prop('disabled', false);

                        $dropdown.customSelect('reset');


                        $dropdown2.empty();

                        jQuery.each(categoriesRPAPI, function () {
                            $dropdown2.append(jQuery("<option />").val(this.id).text(this.name));
                        });
                        //$dropdown.append(jQuery("<option disabled hidden selected value='9999'></option>").text("Что продаёте?"));
                        $dropdown2.prop('disabled', false);

                        $dropdown2.customSelect('reset');


                        //CheckProjects();
                        let lsArr = [];
                        /* if (sessionStorage.getItem('order') !== null) {
                             lsArr = JSON.parse(sessionStorage.getItem('order'));
                             getFromLs(lsArr).then(r => console.log('Data loaded from local storage!'));
                         } else {
                             CheckProjects();
                         }*/
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


    // заполняем дочерний селект при выборе опции в родительском
    const fillChildSelect = function (id, catId = 0) {
        isLoading(1); //Отображаем лоадер
        //jQuery("#print").addClass("active");
        let thiscatID = 0;
        let $parentDD;
        let $childDD;
        // let $row = jQuery('.els-row-' + id);
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
                                let i = 0;
                                for (let key in productsAPI) {
                                    // заполняем селект данными
                                    if (productsAPI.hasOwnProperty(key)) {
                                        if (productsAPI[key].meta_data[10].value !== '999999') {
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
                                            temp[i] = [lsId, lsCatId, lsName, lsMeta0, lsMeta2, lsMeta4, lsMeta6, lsMeta8, lsMeta10];
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
                            $childDD.customSelect('reset');
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

        console.log(ItemTypeOf);

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


    function CheckProjects(selectVal = null) {

        let $curElsRow = jQuery('.els-row-' + rowsCount);
        let arrVals = JSON.parse(jQuery('.opt.active').attr('data-vals'));

        $curElsRow.find("select.el-type").empty();
        let lastId = 0;
        jQuery.each(categoriesAPI, function (index) {

            if (jQuery.inArray(categoriesAPI[index].id, arrVals) > -1) { //If current project ID is in array of projects
                $curElsRow.find("select.el-type").append(jQuery("<option />").val(categoriesAPI[index].id).text(categoriesAPI[index].name));
                lastId = categoriesAPI[index].id;
            }
        });
        $curElsRow.find("select.el-type").val(lastId).trigger('change');
        //console.log(selectVal);
        if (selectVal) {
            $curElsRow.find("select.el-type").val(selectVal).prop('selected', true).trigger('change');
        }
    }


});/*main wrap*/


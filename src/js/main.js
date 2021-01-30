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






});/*main wrap*/


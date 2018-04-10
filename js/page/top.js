define(["jquery"], function ($) {

    let localStorage = window.localStorage;
    //省份ID
    let lpid = "";
    //若已存在当地省份缓存则取出，不存在则使用后台传输的
    if (localStorage.getItem("lpid")) {
        lpid = localStorage.getItem("lpid");
    } else {
        lpid = $(".local-region:first").attr("value");
    }

    loadRegionInfo(lpid);
    //根据省份ID获取省份信息
    function loadRegionInfo(lpid) {
        $.ajax({
            url: 'http://122.204.161.106:8081/dsj/api/v1/region/' + lpid,
            type: 'GET',
            //GET
            async: true,
            //或false,是否异步
            // data: JSON.stringify({"pageno": 1, }),
            timeout: 5000,
            //超时时间
            contentType: "application/json",
            dataType: 'json',
            //返回的数据格式：json/xml/html/script/jsonp/text
            success: function success(data, textStatus, jqXHR) {
                $(".local-region:first").text(data.name);
            }
        });
    }


    loadRegionList();

    //获取省份列表
    function loadRegionList() {
        $.ajax({
            url: 'http://122.204.161.106:8081/dsj/api/v1/regions?parent_id=1',
            type: 'GET',
            //GET
            async: true,
            //或false,是否异步
            // data: JSON.stringify({"pageno": 1, }),
            timeout: 5000,
            //超时时间
            contentType: "application/json",
            dataType: 'json',
            //返回的数据格式：json/xml/html/script/jsonp/text
            success: function success(data, textStatus, jqXHR) {
                initRegion(data.items);
            }
        });
    }

    function initRegion(data) {
        for (let i = 0; i < data.length; i++) {
            $("label.lpid:last").after($("label.lpid:last").clone());
            //需要显示的相关数据
            $("label.lpid:last").show();
            $("label.lpid span:last").text(data[i].name);
            $("label.lpid input:last").attr("value", data[i].id);
            $("label.lpid input:last").text(data[i].name);
        }
        $("input[name='lpid']").each(function () {
            $(this).click(function () {
                $("input[name='lpid']").parent("label").removeClass("active");
                $(this).parent("label").addClass("active");
                //设置text为省份名称
                $(".local-region:first").text($(this).text());
                //设置value为省份ID
                $(".local-region:first").attr("value", $(this).attr("value"))
                //本地存储选择的省份ID
                localStorage.setItem("lpid", $(this).attr("value"));
            })
        });
    }

    //省份选择弹框的显示与否
    $(".dialog-close").click(function () {
        //关闭dialog
        $(".dialog").hide();
    })
    $(".dialog-open").click(function () {
        //打开dialog
        $(".dialog").show();
    })


})

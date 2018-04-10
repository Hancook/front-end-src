define(["jquery", 'page/public/common'], function ($, common) {

    //通过URL获取筛选集合
    var filter = common.getUrlParam(window.location.href);
    //公共api头部
    var apiHeader = "http://122.204.161.106:8080/gaokao/api/v1";
    //页面数
    var pageno = 2;


    //加载更多按钮点击事件
    $("#loadMoreBtn:last").click(function () {
        loadMore();
    });

    $(".btn-group .btn input").each(function () {
        $(this).click(function () {
            starFilter($(this).attr("name"), $(this).attr("value"))
        })
    })

    //初始化收藏按钮点击事件，传参为需要调用的接口
    common.initFavClick("fav-major/");
    //页面第一次打开时，获取收藏列表
    common.loadFav("fav-majors");

    //获取数据列表
    function loadMore() {
        var urlParamString = "isoriginal=1&iscategory=0&";
        if ("pid" in filter) urlParamString = urlParamString + "parentmajorid=" + filter["pid"] + "&"
        if ("lv" in filter) urlParamString = urlParamString + "level=" + filter["lv"] + "&"
         urlParamString = urlParamString + "pageno=" + pageno

        $.ajax({
            url: apiHeader + '/majors?' + urlParamString,
            type: 'GET', //GET
            async: true,    //或false,是否异步
            // data: JSON.stringify({"pageno": 1, }),
            timeout: 5000,    //超时时间
            contentType: "application/json",
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data, textStatus, jqXHR) {
                //显示条目数目
                $(".list-count").text(data.count)
                //判断是够已全部加载 （条目总数,第几页,每页数目）
                common.isFinishLoad(data.count ,pageno ,10);
                //处理获取的列表数据
                initData(data.items);
                //加载过后页数+1
                pageno++;
            }
        })
    }

    //处理获取的列表数据
    function initData(data) {
        for (var i = 0; i < data.length; i++) {
            $(".ab-list:last").after($(".ab-list:last").clone());
            //需要显示的相关数据
            $(".ab-list .name:last").text(data[i].name);
            //需要处理的点击事件
            $(".ab-list:last").attr('id', data[i].id);
            $(".ab-list .name:last").attr('href', "/major/" + data[i].id);
            $(".ab-list .parentMajorName:last").text(data[i].parentMajorName);
            $(".ab-list .rank:last").text(data[i].rank);
            $(".ab-list .favCount:last").text(data[i].favCount);

            $(".ab-list .add-fav:last").show();
            $(".ab-list .remove-fav:last").hide();
            $(".ab-list .add-fav:last").attr('value', data[i].id);
            $(".ab-list .remove-fav:last").attr('value', data[i].id);
        }
        common.initFavClick("fav-major/");
        common.initFavState();
    }

    //处理筛选条件
    function starFilter(key, value) {

        if (key == "pid") {
            filter.pid = value
        }

        if (key == "lv") {
            filter.lv = value
        }


        var urlParamString = "";
        // //初始化筛选按钮的class
        for (var key in filter) {
            if (filter[key]) urlParamString = urlParamString + key + "=" + filter[key] + "&";
        }
        var url = "/major?" + urlParamString
        window.location.href = url
    }


})
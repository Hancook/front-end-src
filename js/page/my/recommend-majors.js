define(["jquery"], function ($) {
    //筛选条件
    var filter; //公共api头部

    var apiHeader = "http://122.204.161.106:8080/gaokao/api/v1"; //页面数

    var pageno = 2;

    $("#loadMoreBtn:last").click(function () {
        loadMore();
    }); //获取数据列表

    function loadMore() {
        $.ajax({
            url: apiHeader + '/majors?pageno=' + pageno,
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
                // //显示条目数目
                // $(".list-count").text(data.count)
                //判断是够已全部加载
                isFinishLoad(data.count); //处理获取的列表数据

                initData(data.items); //加载过后页数+1

                pageno++;
            }
        });
    } //处理获取的列表数据

    function initData(data) {
        for (var i = 0; i < data.length; i++) {
            $(".ab-list:last").after($(".ab-list:last").clone());
            //需要显示的相关数据
            $(".ab-list .name:last").text(data[i].name);
            //需要处理的点击事件
            $(".ab-list .name:last").attr('href', "/major/" + data[i].id);
            $(".ab-list .parentMajorName:last").text(data[i].parentMajorName);
            $(".ab-list .rank:last").text(data[i].rank);
            $(".ab-list .favCount:last").text(data[i].favCount);
        }
    } //判断是够已全部加载


    function isFinishLoad(count) {
        if (count > pageno * 10) {
            $(".ab-bottom-loading").show();
        } else {
            $(".ab-bottom-loading").hide();
        }
    }
});
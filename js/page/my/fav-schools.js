define(["jquery", 'page/public/common'], function ($, common) {
    //筛选条件
    var filter; //公共api头部

    var apiHeader = "http://122.204.161.106:8080/gaokao/api/v1"; //页面数

    var pageno = 2;
    $("#loadMoreBtn:last").click(function () {
        loadMore();
    }); //获取数据列表

    //加载更多按钮点击事件
    common.initFavClick("fav-school/");

    function loadMore() {
        $.ajax({
            url: 'http://127.0.0.1:8080/api/v1' + '/fav-schools?pageno=' + pageno,
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
                //判断是够已全部加载 （条目总数,第几页,每页数目）
                common.isFinishLoad(data.count ,pageno ,10);
                //处理获取的列表数据
                initData(data.items); //加载过后页数+1

                pageno++;
            }
        });
    } //处理获取的列表数据

    function initData(data) {
        for (var i = 0; i < data.length; i++) {
            $(".ab-list:last").after($(".ab-list:last").clone());
            //需要显示的相关数据
            $(".ab-list:last").attr('id', data[i].id);
            $(".ab-list .name:last").text(data[i].name);
            $(".ab-list .name:last").attr('href', "/school/" + data[i].id);
            $(".ab-list .logo:last").attr('src', data[i].logo);
            $(".ab-list .provinceName:last").text(data[i].provinceName);
            $(".ab-list .competentDept:last").text(data[i].competentDept);
            $(".ab-list .typeName:last").text(data[i].typeName);
            $(".ab-list .rank:last").text(data[i].rank);
            $(".ab-list .favCount:last").text(data[i].favCount);

            $(".ab-list .add-fav:last").hide();
            $(".ab-list .remove-fav:last").show();
            $(".ab-list .add-fav:last").attr('value', data[i].id);
            $(".ab-list .remove-fav:last").attr('value', data[i].id);
        }
        //初始化Fav状态
        common.initFavClick("fav-school/");
    }


});
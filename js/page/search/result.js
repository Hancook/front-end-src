define(["jquery", 'page/public/common'], function ($, common) {

    $("label.ab-btn.btn:first").click(function () {
        $("section.school-list").show();
        $("section.major-list").hide();
        $("label.ab-btn.btn:first").addClass("active");
        $("label.ab-btn.btn:last").removeClass("active");
    })

    //通过URL获取筛选集合
    var filter = common.getUrlParam(window.location.href);
    //公共api头部
    var apiHeader = "http://122.204.161.106:8080/gaokao/api/v1";
    //页面数
    var schoolPageno = 2;
    //初始化收藏按钮点击事件，传参为需要调用的接口
    common.initFavClick("fav-school/", 'schoolItem');
    //页面第一次打开时，获取收藏列表
    common.loadFav("fav-schools", 'schoolItem');
    //加载更多按钮点击事件
    $("#loadMoreSchoolBtn:last").click(function () {
        loadMoreSchool();
    });

    //获取数据列表
    function loadMoreSchool() {

        var urlParamString = "";
        if ("keyword" in filter) urlParamString = urlParamString + "name=" + filter["keyword"] + "&"
        if (schoolPageno) urlParamString = urlParamString + "pageno=" + schoolPageno + "&"

        $.ajax({
            url: apiHeader + '/schools?' + urlParamString,
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
                // isFinishLoad(data.count);
                common.isFinishLoad(data.count, schoolPageno, 10);
                //处理获取的列表数据
                initDataSchool(data.items);
                //加载过后页数+1
                schoolPageno++;
            }
        })
    }

    //处理获取的列表数据
    function initDataSchool(data) {
        for (var i = 0; i < data.length; i++) {
            $(".ab-list.school-list:last").after($(".ab-list.school-list:last").clone());
            //需要显示的相关数据
            $(".ab-list.school-list:last").show();
            $(".ab-list.school-list .name:last").text(data[i].name);
            $(".ab-list.school-list:last").attr('id', 'schoolItem' + data[i].id);
            $(".ab-list.school-list .name:last").attr('href', "/school/" + data[i].id);
            $(".ab-list.school-list .logo:last").attr('src', data[i].logo);
            $(".ab-list.school-list .provinceName:last").text(data[i].provinceName);
            $(".ab-list.school-list .competentDept:last").text(data[i].competentDept);
            $(".ab-list.school-list .typeName:last").text(data[i].typeName);
            $(".ab-list.school-list .rank:last").text(data[i].rank);
            $(".ab-list.school-list .favCount:last").text(data[i].favCount);

            $(".ab-list.school-list .add-fav:last").show();
            $(".ab-list.school-list .remove-fav:last").hide();
            $(".ab-list.school-list .add-fav:last").attr('value', data[i].id);
            $(".ab-list.school-list .remove-fav:last").attr('value', data[i].id);

        }
        common.initFavClick("fav-school/", 'schoolItem');
        common.initFavState('schoolItem');
    }


    $("label.ab-btn.btn:last").click(function () {
        $("section.school-list").hide();
        $("section.major-list").show();
        $("label.ab-btn.btn:last").addClass("active");
        $("label.ab-btn.btn:first").removeClass("active");
    })
    var majorPageno = 2;
    //初始化收藏按钮点击事件，传参为需要调用的接口
    common.initFavClick("fav-major/", 'majorItem');
    //页面第一次打开时，获取收藏列表
    common.loadFav("fav-majors", 'majorItem');
    //加载更多按钮点击事件
    $("#loadMoreMajorBtn:last").click(function () {
        loadMoreMajor();
    });
    //获取数据列表
    function loadMoreMajor() {
        var urlParamString = "isoriginal=1&iscategory=0&";
        if ("keyword" in filter) urlParamString = urlParamString + "name=" + filter["keyword"] + "&"
        if (majorPageno) urlParamString = urlParamString + "pageno=" + majorPageno

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
                common.isFinishLoad(data.count, majorPageno, 10);
                //处理获取的列表数据
                initDataMajor(data.items);
                //加载过后页数+1
                majorPageno++;
            }
        })
    }
    //处理获取的列表数据
    function initDataMajor(data) {
        for (var i = 0; i < data.length; i++) {
            $(".ab-list.major-list:last").after($(".ab-list.major-list:last").clone());
            //需要显示的相关数据
            $(".ab-list.major-list .name:last").text(data[i].name);
            //需要处理的点击事件
            $(".ab-list.major-list:last").attr('id', 'majorItem' + data[i].id);
            $(".ab-list.major-list .name:last").attr('href', "/major/" + data[i].id);
            $(".ab-list.major-list .parentMajorName:last").text(data[i].parentMajorName);
            $(".ab-list.major-list .rank:last").text(data[i].rank);
            $(".ab-list.major-list .favCount:last").text(data[i].favCount);

            $(".ab-list.major-list .add-fav:last").show();
            $(".ab-list.major-list .remove-fav:last").hide();
            $(".ab-list.major-list .add-fav:last").attr('value', data[i].id);
            $(".ab-list.major-list .remove-fav:last").attr('value', data[i].id);
        }
        common.initFavClick("fav-major/", 'majorItem');
        common.initFavState('majorItem');
    }

})
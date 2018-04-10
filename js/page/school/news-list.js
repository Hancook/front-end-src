define(["jquery"], function ($) {

    //公共api头部
    var apiHeader = "http://122.204.161.106:8080/gaokao/api/v1";
    //页面数
    var pageno = 2;

    $("#loadMoreBtn:last").click(function () {
        loadMore();
    });

    var channelid = $(".btn-group .btn .active").val();

    //获取数据列表
    function loadMore() {

        let urlParamString = "deleted=0&publishing=1&";
        urlParamString = urlParamString + "channelid=" + channelid + "&"
        urlParamString = urlParamString + "pageno=" + pageno + "&"

        $.ajax({
            url: apiHeader + '/articles?' + urlParamString,
            type: 'GET', //GET
            async: true,    //或false,是否异步
            // data: JSON.stringify({"pageno": 1, }),
            timeout: 5000,    //超时时间
            contentType: "application/json",
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data, textStatus, jqXHR) {
                //显示条目数目
                // $(".list-count").text(data.count)
                //判断是够已全部加载
                isFinishLoad(data.count);
                //处理获取的列表数据
                initData(data.items);
                //加载过后页数+1
                pageno++;
            }
        })
    }

    //处理获取的列表数据
    function initData(data) {
        // $("#listItem").removeClass("hidden")
        //获取需要克隆的view
        var sourceNode = document.getElementById("listItem"); // 获得被克隆的节点对象
        for (var i = 0; i < data.length; i++) {
            var clonedNode = sourceNode.cloneNode(true); // 克隆节点
            clonedNode.style.display = "";//显示
            clonedNode.classList.add("ab-list");//添加class
            // clonedNode.setAttribute("id", "listItem" + i); // 修改一下id 值，避免id 重复
            sourceNode.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点

            //需要显示的相关数据
            $(".ab-list .image:last").attr("src", data[i].image);//图片
            //需要处理的点击事件
            $(".ab-list .name:last").attr('href', "/news/detail/" + data[i].id);
            $(".ab-list .title:last").text(data[i].title);//标题
            $(".ab-list .summary:last").text(data[i].summary);//简介
            $(".ab-list .createdTime:last").text(data[i].createdTime);//发布时间

        }
    }

    //判断是够已全部加载
    function isFinishLoad(count) {
        if (count > pageno * 10) {
            $(".ab-bottom-loading").show();
        } else {
            $(".ab-bottom-loading").hide();
        }
    }

})

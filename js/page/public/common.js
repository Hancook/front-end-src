define(["jquery"], function ($) {

    console.log('已引入common.js.')

    let favs = [];

    //初始化筛选按钮的class
    var initFilterButton = function () {
        //获取筛选条件
        let filter = getUrlParam(window.location.href);
        //添加被选中的按钮active
        for (var key in filter) {
            if (filter[key]) $("input[name=" + key + "][value=" + filter[key] + "]").parent().addClass("active");
        }
    }

    //处理筛选条件
    var starFilter = function (key, value) {
        //获取筛选条件
        let filter = getUrlParam(window.location.href);
        //按钮改变的筛选条件
        if (key in filter) {
            filter[key] = value
        }
        let urlParamString = "";
        // 根据筛选条件处理url
        for (var key in filter) {
            if (filter[key]) urlParamString = urlParamString + key + "=" + filter[key] + "&";
        }
        var url = "/school?" + urlParamString
        window.location.href = url
    }

    //解析URL附带的参数，给出key返回value，不给返回集合
    var getUrlParam = function (sUrl, sKey) {
        var param = sUrl.split('#')[0].split('?')[1];
        if (sKey) {//指定参数名称
            var strs = param.split('&');
            var arrs = new Array();//如果存在多个同名参数，则返回数组
            for (var i = 0, len = strs.length; i < len; i++) {
                var tmp = strs[i].split('=');
                if (tmp[0] == sKey) {
                    arrs.push(tmp[1]);
                }
            }
            if (arrs.length == 1) {//返回该参数的值或者空字符串
                return arrs[0];
            } else if (arrs.length == 0) {
                return "";
            } else {
                return arrs;
            }
        } else {//不指定参数名称，返回全部的参数对象 或者 {}
            if (param == undefined || param == "") {
                return {};
            } else {
                var strs = param.split('&');
                var arrObj = {};
                for (var i = 0, len = strs.length; i < len; i++) {
                    var tmp = strs[i].split('=');
                    if (tmp[0] != "" && !(tmp[0] in arrObj)) {
                        arrObj[tmp[0]] = [];
                        arrObj[tmp[0]] = tmp[1];
                    }
                }
                console.log(arrObj);
                return arrObj;
            }
        }
    }


    //获取收藏列表
    var loadFav = function (url, itemIdHeader) {
        $.ajax({
            url: 'http://127.0.0.1:8080/api/v1/' + url + '?pagesize=0',
            type: 'GET', //GET
            async: true,    //或false,是否异步
            // data: JSON.stringify({"pageno": 1, }),
            timeout: 5000,    //超时时间
            contentType: "application/json",
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                favs = data.items;
                initFavState(itemIdHeader);
            }
        });
    }

    //初始化收藏与取消按钮的状态
    var initFavState = function (itemIdHeader) {
        if (!itemIdHeader) {
            itemIdHeader = ""
        }
        for (let i = 0; i < favs.length; i++) {
            if ($("#" + itemIdHeader + favs[i].id).length > 0) {
                $("#" + itemIdHeader + favs[i].id + " .add-fav").hide();
                $("#" + itemIdHeader + favs[i].id + " .remove-fav").show();
            }
        }
    }
    //给收藏按钮与取消按钮设置点击事件（url为收藏接口地址;itemIdHeader为ID公共部分,如无可不填写;）
    var initFavClick = function (url, itemIdHeader) {
        if (!itemIdHeader) {
            itemIdHeader = "";
        }
        $(".ab-list .add-fav").each(function () {
            $(this).click(function () {
                addFav(url, $(this).attr('value'), itemIdHeader + $(this).attr('value'));
            })
        });
        $(".ab-list .remove-fav").each(function () {
            $(this).click(function () {
                removeFav(url, $(this).attr('value'), itemIdHeader + $(this).attr('value'));
            })
        });
    }

    //添加收藏
    function addFav(url, key, itemId) {
        $("#" + itemId + " .add-fav").attr('disabled', "true");
        $("#" + itemId + " .remove-fav").attr('disabled', "true");
        $.ajax({
            url: 'http://127.0.0.1:8080/api/v1/' + url + key,
            type: 'POST', //GET
            async: true,    //或false,是否异步
            // data: JSON.stringify({"pageno": 1, }),
            timeout: 5000,    //超时时间
            contentType: "application/json",
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data, textStatus, jqXHR) {
            },
            complete: function (XMLHttpRequest) {
                if (XMLHttpRequest.status == "200") {
                    $("#" + itemId + " .add-fav").hide();
                    $("#" + itemId + " .remove-fav").show();
                    $("#" + itemId + " .favCount").text(Number($("#" + itemId + " .favCount").text()) + 1);
                }
                $("#" + itemId + " .add-fav").removeAttr("disabled");
                $("#" + itemId + " .remove-fav").removeAttr("disabled");
            },
        })
    }

    //删除收藏
    function removeFav(url, key, itemId) {
        $("#" + itemId + " .add-fav").attr('disabled', "true");
        $("#" + itemId + " .remove-fav").attr('disabled', "true");
        $.ajax({
            url: 'http://127.0.0.1:8080/api/v1/' + url + key,
            type: 'POST', //GET
            async: true,    //或false,是否异步
            // data: JSON.stringify({"pageno": 1, }),
            timeout: 5000,    //超时时间
            contentType: "application/json",
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data, textStatus, jqXHR) {
            },
            complete: function (XMLHttpRequest) {
                if (XMLHttpRequest.status == "200") {
                    $("#" + itemId + " .add-fav").show();
                    $("#" + itemId + " .remove-fav").hide();
                }
                $("#" + itemId + " .add-fav").removeAttr("disabled");
                $("#" + itemId + " .remove-fav").removeAttr("disabled");
            },
        })
    }

    //比较是否已加载完毕
    var isFinishLoad = function (count, pageno, pagesize, documentClass) {
        if (!documentClass) {
            documentClass = ".ab-bottom-loading"
        }
        if (count > pageno * pagesize) {
            $(documentClass).show();
        } else {
            $(documentClass).hide();
        }
    }

    //给收藏按钮与取消按钮设置点击事件（url为收藏接口地址;itemIdHeader为ID公共部分,0.如无可不填写;）
    var initCompareClick = function (itemIdHeader) {
        if (!itemIdHeader) {
            itemIdHeader = "";
        }
        $(".ab-list .add-compare").each(function () {
            $(this).click(function () {
                // addFav(url, $(this).attr('value'), itemIdHeader + $(this).attr('value'));
                for(let i = 0 ; i < compareList.length ;i++){
                    if($(this).attr('value') == compareList[i]){
                        console.log("该学校已在对比列表中");
                        return;
                    }
                }
                compareList.push($(this).attr('value'));
                // compareList = Array.from(new Set(compareList));
                console.log(compareList);
            })
        });
        // $(".ab-list .remove-compare").each(function () {
        //     $(this).click(function () {
        //         removeFav(url, $(this).attr('value'), itemIdHeader + $(this).attr('value'));
        //     })
        // });
    }

    return {
        initFilterButton: initFilterButton,
        starFilter: starFilter,
        getUrlParam: getUrlParam,
        loadFav: loadFav,
        initFavState: initFavState,
        initFavClick: initFavClick,
        addFav: addFav,
        removeFav: removeFav,
        isFinishLoad: isFinishLoad,
        initCompareClick: initCompareClick,
    };

});
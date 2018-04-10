define(["jquery"], function ($) {

    //公共api头部
    var apiHeader = "http://122.204.161.106:8080/gaokao/api/v1";
    // albumid
    let albumIdString = $('#albumIds').attr("value");
    let albumIds = [];

    initAlbumIds(albumIdString);

    function initAlbumIds(albumIdString) {
        for (let i = 0; i < (albumIdString.split('id=').length - 1); i++) {
            let albumId = albumIdString.split('id=')[i + 1].split(',')[0];
            albumIds.push(albumId);
        }
        loadPhotos(albumIds);
    }


    //获取数据列表
    function loadPhotos(albumIds) {
        for (let i = 0; i < albumIds.length - 1; i++) {
            $.ajax({
                url: apiHeader + '/photos?albumid=' + albumIds[i],
                type: 'GET', //GET
                async: true,    //或false,是否异步
                // data: JSON.stringify({"pageno": 1, }),
                timeout: 5000,    //超时时间
                contentType: "application/json",
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data, textStatus, jqXHR) {
                    // //处理获取的列表数据
                    initData(data.items);
                }
            })
        }

    }
    
    //显示照片
    function initData(data) {
        for (let i = 0; i < data.length - 1; i++) {
                $(".ab-list:last").after($(".ab-list:last").clone());
                //需要处理的点击事件
                // var id = data[i].id;
                $(".ab-list .photo:last").attr('src', data[i].url);
        }
    }

})
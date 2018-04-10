define(["jquery"], function ($) {
    //公共api头部
    var apiHeader = "http://122.204.161.106:8080/gaokao/api/v1";

    //获取验证码
    $(".message-code-btn:first").click(function () {
        let phoneNum = $(".phone-num:first").val();
        console.log("phoneNum"+phoneNum)
        getVCode(phoneNum);
    })

    //提交手机号和验证码
    $(".confirm:first").click(function () {
        let phoneNum = $(".phone-num:first").val();
        let vCode = $(".message-code:first").val();
        console.log("phoneNum"+phoneNum)
        console.log("vCode"+vCode)
        bindPhone(phoneNum, vCode);
    })

    //获取验证码
    function getVCode(phoneNum) {
        console.log(phoneNum);
        $.ajax({
            url: 'http://127.0.0.1:8080/api/v1' + '/sms-vcode?phone=' + phoneNum,
            type: 'GET', //GET
            async: true,    //或false,是否异步
            // data: JSON.stringify({"pageno": 1, }),
            timeout: 5000,    //超时时间
            contentType: "application/json",
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data, textStatus, jqXHR) {

            },
        })
    }

    //绑定手机号
    function bindPhone(phoneNum, vCode) {
        $.ajax({
            url: 'http://127.0.0.1:8080/api/v1' + '/bind-phone?'+"phone="+phoneNum+"&vcode="+vCode,
            type: 'POST', //GET
            async: true,    //或false,是否异步
            // data: {"phone": phoneNum.toString(), "vcode": vCode.toString()},
            timeout: 5000,    //超时时间
            contentType: "application/json",
            // dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data, textStatus, jqXHR) {

            },
            complete: function complete(XMLHttpRequest ,data) {
                console.log(XMLHttpRequest)
                console.log(data)
            }
        })
    }

})
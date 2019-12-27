// var urls = "http://www.90jvxing.com:8080/openSjjx";
var urls = "http://192.168.0.101:8088/openSjjx";
var imgSrc = "http://qiniuyun.91mmm.xin/";
var httpSrc = "https://p0.ssl.qhimgs1.com/sdr/400__/t01074c6ba1e42620fa.png";
var authorization = window.localStorage.getItem("authorization");

//获取用户信息
$(function () {

    function errorLogin() {
        if (window.localStorage.getItem('authorization') == null) {

            clearInterval(errorLogin);

            window.localStorage.setItem("upwd", "");

            top.location.href = "login.html"

        }
    }
    window.setInterval(function () {
        errorLogin()
    }, 1000);


    isVip();

    function isVip() {

        $.ajax({
            url: urls + "/openMember/getMemberDatil",
            type: "post",
            dataType: "json",
            headers: { "authorization": window.localStorage.getItem('authorization') },
            success: function (res) {
                if (res.code == 200) {
                    let vipTime = res.data.validTime;
                    let secondsTime = new Date(vipTime).getTime();//年月日转换为毫秒
                    let nowTime = Date.now() //获取当前毫秒
                    /*判断会员是否过期 点亮图标*/
                    $(".overdue").text(vipTime)
                    secondsTime > nowTime ? $(".person-name").children(".vip").eq(0).show() : $(".person-name").children(".vip").eq(1).show();

                    if (secondsTime - nowTime > 1000 * 60 * 60 * 24 * 7) {
                        $(".member-time").hide();
                    } else if (secondsTime - nowTime < 1000 * 60 * 60 * 24 * 7 && secondsTime - nowTime > 0) {
                        $(".member-time").show();
                        $(".isOver").text(vipTime).css("color", "red");
                    } else if (secondsTime - nowTime < 0) {
                        $(".member-time").children().remove();
                        let html = `<p style="color:red;margin-top:10px">您的会员已到期</p>`
                        $(".member-time").append(html);
                    }

                } else {
                    layer.msg(res.msg, { icon: 5 })
                }
            },
            error: function (res) {
                errorMsg(res);
            }
        })






    }

    $.ajax({
        type: "get",

        url: urls + "/openSjjxUser/getByUser",

        dataType: "json",

        headers: { "authorization": window.localStorage.getItem('authorization') },

        success: function (res) {

            if (res.code == 200) {

                $("#admin").text(res.data.userName);

                $("#userName").val(res.data.userName);

            } else {
                layer.msg(res.msg, { icon: 5 })
            }
        },
        error: function (result) {
            errorMsg(result)
        }
    })
})





//重新登录
function errorMsg(result) {

    if (result.responseText.indexOf('登录') != -1) {

        //window.localStorage.clear();

        window.localStorage.setItem("upwd", "");

        top.location.href = "login.html";

    } else {

        layer.msg(result.msg, { icon: 5 });

    }

}

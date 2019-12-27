$(function () {
    var urls = "http://192.168.0.101:8088/openSjjx/openSjjxUser/login";
    // var urls = "http://www.90jvxing.com:8080/openSjjx/openSjjxUser/login";

    /*初始化IP、位置信息*/
    var userIp = returnCitySN.cip;
    var ipAddress = returnCitySN.cname;
    var netType = returnCitySN.cid;

    //获取用户信息
    getStorage();


    //判断是否重新登录
    if (window.localStorage.getItem("upwd") == "") {

        layer.open({
            title: "重新登录",

            content: "登录过期 请重新登录",

            btn: ["确认"],

            icon: 7,

            yes: function (index, layero) {

                getStorage();

                layer.close(index);
            }
        });
    }


    $("#login").click(function () {
        let user = $("#user").val();
        let upwd = $("#upwd").val();
        if (!user && !upwd) {
            alert("登录信息不能为空")
        } else {
            if ($("#jzmm").is(":checked")) {
                setExpire("user_name", user, 1000 * 60 * 60 * 24 * 7);
                setExpire("upwd", upwd, 1000 * 60 * 60 * 24 * 7);
            } else {
                localStorage.removeItem("user_name");
                localStorage.removeItem("upwd");
            }
            login(user, upwd);
        }
    })

    function login(user, upwd) {
        $.ajax({
            type: "post",
            url: urls,
            data: {
                account: user,
                passWord: upwd,
                type: 1,
                userIp,
                ipAddress,
                netType
            },
            success: function (res) {
                if (res.code == 200) {
                    let authorization = res.data.data;
                    let time = res.data.time;
                    localStorage.setItem("authorization", authorization);
                    // localStorage.setItem("time", time);
                    let secondsTime = new Date(time).getTime();
                    let nowTime = Date.now()
                    if ((secondsTime - nowTime) < 1000 * 60 * 60 * 24 * 7) {
                        layer.msg(`登陆成功，您的套餐到期时间为：${time}`, { icon: 1, time: 3000 }, function () {
                            window.location.href = "main.html";
                        })
                    } else {
                        layer.msg("登录成功！", { icon: 1 }, function () {
                            window.location.href = "main.html";
                        })
                    }

                } else {
                    layer.msg(res.msg, { icon: 5 })
                }
            }
        })
    }

    /*  localstorage  */
    /* 设置  */
    function setExpire(key, value, expire) {
        let obj = {
            data: value,
            time: Date.now(),
            expire: expire
        };
        localStorage.setItem(key, JSON.stringify(obj));
    }

    /*  获取 */
    function getExpire(key) {
        let val = localStorage.getItem(key);
        if (!val) {
            return val;
        }
        val = JSON.parse(val);
        if (Date.now() - val.time > val.expire) {
            localStorage.removeItem(key);
            return null;
        }
        return val.data;
    }

    /*获取localstorage*/
    function getStorage() {
        var user_name = getExpire("user_name");
        var upwd = getExpire("upwd");
        if (user_name || upwd) {
            $("#user").val(user_name);
            $("#upwd").val(upwd);
            $("#jzmm").attr("checked", true);
        }
    }


    /*获取IP*/
    /*getTXIp()
    function getTXIp() {
        $.ajax({
            type: "GET",
            url: "https://apis.map.qq.com/ws/location/v1/ip",
            data: {
                key: "BNTBZ-57DCW-6OJR5-RU36Z-YUXR7-3ZFGW"
            },
            dataType: "jsonp",
            // jsonp: "callback",
            // jsonpCallback: "success_jsonpCallback",
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                console.log(res);
            },
            error: function (res) {
                console.log(res);
            }
        })
    }
    getIP();

    function getIP() {
        $.ajax({
            type: "GET",
            url: "http://api.map.baidu.com/location/ip",
            data: {
                ak: "aKpZHqZFMCQDZSRmjefP0jGuOGijEQG8",
            },
            dataType: "jsonp",
            success: function (res) {
                console.log(res)
            },
            error: function (res) {
                console.log(res);
            }
        })
    }*/

})




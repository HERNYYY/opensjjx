$(function () {
    var isname = false; var ispwd = false; var isaccount = false; var isphone = false;
    /*用户名称*/
    $(".user_name input").on("focus", function () {
        $(this).siblings(".inputInfo").show().siblings(".inputPrompt").hide().siblings(".inputSuccess").hide();
    });
    $(".user_name input").on("blur", function () {

        let user_name = $(".user_name input").val();
        let reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{2,10}$/;
        $(this).siblings(".inputInfo").hide();
        if (!user_name) {
            $(this).siblings(".inputPrompt").text("用户名不能为空").show();
        } else {
            if (reg.test(user_name) === false) {
                $(this).siblings(".inputPrompt").text("用户名只能输入6-12个的字母、数字").show();
            } else {
                $(this).siblings(".inputSuccess").show();
                isname = true;
            }
        }
        // return isname;

    });

    /*用户密码*/
    $(".user_pwd input").on("focus", function () {
        $(this).siblings(".inputInfo").show()
        $(this).siblings(".inputPrompt").hide()
        $(this).siblings(".inputSuccess").hide();
    });
    $(".user_pwd input").on("blur", function () {
        let user_pwd = $(".user_pwd input").val();
        $(this).siblings(".inputInfo").hide();
        if (!user_pwd) {
            $(this).siblings(".inputPrompt").text("密码不能为空").show();
        } else {
            if (user_pwd.length < 6 || user_pwd.length > 16) {
                $(this).siblings(".inputPrompt").text("请输入6~16位密码").show()
            } else {
                $(this).siblings(".inputSuccess").show();
            }
        }
    });

    $(".confirm_pwd input").on("focus", function () {
        $(this).siblings(".inputInfo").show()
        $(this).siblings(".inputPrompt").hide()
        $(this).siblings(".inputSuccess").hide();
    });
    $(".confirm_pwd input").on("blur", function () {

        let user_pwd = $(".user_pwd input").val();
        let confirm_pwd = $(".confirm_pwd input").val();
        $(this).siblings(".inputInfo").hide();
        if (!confirm_pwd) {
            $(this).siblings(".inputPrompt").text("请确认密码").show();
        } else {
            if (user_pwd !== confirm_pwd) {
                $(this).siblings(".inputPrompt").text("密码不一致").show();
            } else {
                $(this).siblings(".inputSuccess").show();
                ispwd = true;
            }
        }
        return ispwd;
    })
    // console.log($("#sex input[name='sex'][checked]").val());

    /*账户名称*/
    $(".account input").on("focus", function () {
        $(this).siblings(".inputInfo").show()
        $(this).siblings(".inputPrompt").hide()
        $(this).siblings(".inputSuccess").hide();
    });
    $(".account input").on("blur", function () {

        let account = $(".account input").val();
        let reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){3,19}$/;
        $(this).siblings(".inputInfo").hide();
        if (!account) {
            $(this).siblings(".inputPrompt").text("账户名称不能为空").show();
        } else {
            if (reg.test(account) === false) {
                $(this).siblings(".inputPrompt").text("账号只能输入4-20个的以字母开头、可带数字、'_'").show();
            } else {
                $(this).siblings(".inputSuccess").show();
                isaccount = true;
            }
        }
        return isaccount;
    })


    /*身份证号*/
    /*$(".idcard input").on("focus", function () {
        $(this).siblings(".inputInfo").show()
        $(this).siblings(".inputPrompt").hide()
        $(this).siblings(".inputSuccess").hide();
    });
    $(".idcard input").on("blur", function () {
        let idcard = $(".idcard input").val();
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        $(this).siblings(".inputInfo").hide();
        if (!idcard) {
            $(this).siblings(".inputPrompt").text("身份证号不能为空").show();
        } else {
            if (reg.test(idcard) === false) {
                $(this).siblings(".inputPrompt").text("身份证号错误").show()
            } else {
                $(this).siblings(".inputSuccess").show()
            }
            ;
        }
    })*/

    /*手机号*/
    $(".phone input").on("focus", function () {
        $(this).siblings(".inputInfo").show()
        $(this).siblings(".inputPrompt").hide()
        $(this).siblings(".inputSuccess").hide();
    });
    $(".phone input").on("blur", function () {

        let phone = $(".phone input").val();
        let reg = /^1[34578]\d{9}$/;
        $(this).siblings(".inputInfo").hide();
        if (!phone) {
            $(this).siblings(".inputPrompt").text("手机号不能为空").show();
        } else {
            if (reg.test(phone) === false) {
                $(this).siblings(".inputPrompt").text("手机号错误").show()
            } else {
                $(this).siblings(".inputSuccess").show();
                isphone = true;
            }
        }
        return isphone;
    })


    $("#submitReg").click(function () {
        let sex = $("#sex:checked").val();
        let userName = $(".user_name input").val();
        let account = $(".account input").val();
        let user_pwd = $(".user_pwd input").val();
        let confirm_pwd = $(".confirm_pwd input").val();
        // let idcard = $(".idcard input").val();
        let phone = $(".phone input").val();
        if (isname === false || isaccount === false || ispwd === false || isphone === false) {
            alert("请更正信息！！")
        } else {
            if (sex === undefined || !userName || !account || !user_pwd || !phone) {
                alert("请完善信息！！")
            } else {
                Reg();
            }
        }


    })

    function Reg() {
        $.ajax({
            type: "post",
            url: "http://192.168.0.101:8088/openSjjx/openSjjxUser/registeredAccount",
            data: {
                userName: $(".user_name input").val(),
                sex: $("#sex:checked").val(),
                account: $(".account input").val(),
                passWord: $(".user_pwd input").val(),
                // cardId: $(".idcard input").val(),
                phone: $(".phone input").val(),
                type: 1
            },
            success: function (res) {
                if (res.code == 200) {
                    layer.msg("注册成功，即将跳转登录页面", { time: 3000, icon: 6 }, function () {
                        location.href = "login.html"
                    })
                } else {
                    layer.msg(res.msg)
                }
            }

        })
    }

})
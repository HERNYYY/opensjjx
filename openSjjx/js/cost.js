$(function () {
    // let urls = "http://192.168.0.101:8088/openSjjx";
    let urls = "http://www.90jvxing.com:8080/openSjjx";


    /*获取url参数*/
    let terminalType = window.location.href.split("?")[1].split("&")[0].split("=")[1];
    let authorization = window.location.href.split("?")[1].split("&")[1].split("=")[1];
    console.log(terminalType)

    if (terminalType == 0) {
        $(".cost-head a").hide();
    }

    getPackage();
    getUserPackage();


    /*获取套餐参数*/
    function getPackage() {
        $.ajax({
            url: urls + `/openMember/selectMemberList?terminalType=${terminalType}`,
            type: "post",
            headers: { "authorization": authorization },
            success: function (res) {
                if (res.code == 200) {
                    if (res.data.result.length > 0) {
                        $.each(res.data.result, function (index, item) {
                            var html = `
                            <li class="proItem" data-proId="${item.id}">
                            <label class="proTime">${item.memberName}</label>
                            <span class="proPrice">
                                <span>￥</span>
                                <span class="Price">${item.payMoney / 100}</span>
                            </span>
                            <span class="proMonth">${item.setMealTime}个月</span>
                            <em class="iconActive"></em>
                        </li>
                            `;
                            $(".proList").append(html);
                            $(".proItem").eq(0).addClass("itemActive");
                            let price = $(".proItem.itemActive").children(".proPrice").children(".Price").text();
                            $(".AmountNum").text(price);
                        })
                    }
                } else {
                    alert(res.msg);
                }
            }
        })
    }


    /*获取用户信息*/
    function getUserPackage() {
        $.ajax({
            url: urls + "/openMember/getMemberDatil",
            type: "post",
            dataType: "json",
            headers: { "authorization": authorization },
            success: function (res) {
                if (res.code == 200) {
                    $(".accountName").text(res.data.account);
                    $(".validTime").text(res.data.validTime)
                } else {
                    alert(res.msg)
                }
            },
            error: function (res) {
                if (res.responseText.indexOf('登录') != -1) {
                    layer.msg("登录过期，请重新登录", { icon: 5 });
                }
            }
        })
    }

    $(".cost-title li").on("click", function () {
        let index = $(this).index();
        $(this).parent().siblings(".cost-content").children("div").eq(index).show().siblings().hide()
    })

    $("#web").on("click", ".proItem", function () {
        $(this).addClass("itemActive").siblings("li").removeClass("itemActive");
        let _price = $(this).children(".proPrice").children(".Price").text();
        $(".AmountNum").text(_price);
    })


    /*支付*/
    $("#pay").click(function () {
        pay()
    })
    function pay() {
        let memberId = $(".proItem.itemActive").attr("data-proId");

        let costType = $(".costItem input:checked").val();

        let zdType = terminalType;

        // let notifyUrl = "http://ee2d8a34.ngrok.io/openSjjx/aliPay/aliPayNotify";
        $.ajax({
            url: urls + "/payUtil/pay",
            type: "post",
            data: {
                memberId: memberId,
                terminalType: costType,
                type: zdType,
                // notifyUrl,
            },
            headers: { "authorization": authorization },
            dataType: "json",
            success: function (res) {
                if (res.code == 200) {
                    if (costType == 0) {
                        vxpay(res.data)
                        window.localStorage.setItem("vxcode", res.data)
                    } else {
                        $(".payCode").append(res.data);
                    }

                } else {
                    alert(res.msg)
                }
            },
            error: function (res) {
                errorMsg(res);
            }
        })

    }


    function vxpay(code) {
        console.log(code);
        layer.open({
            type: 2,
            title: '微信支付',
            shadeClose: true,
            shade: 0.8,
            area: ['400px', '500px'],
            content: "vxcode.html"
        })
    }

    /*微信支付二维码*/


})
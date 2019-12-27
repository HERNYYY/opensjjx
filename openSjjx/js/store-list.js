//获取店铺数据
$(function () {
    $.ajax({
        type: "get",

        url: urls + "/sjjxShop/shopAll",

        dataType: "json",

        headers: { "authorization": window.localStorage.getItem('authorization') },

        success: function (res) {

            if (res.code == 200) {

                $("#total").text(res.data.length);

                //localStorage.setItem("len",JSON.stringify(list.length));

                if (res.data.length > 0) {

                    $.each(res.data, function (index, item) {

                        var html = `
                        <tr class="text-c">
                            <td>${item.owner_id}</td>
                            <td>${item.mall_name}</td>
                            <td>${item.owner_name}</td>
                            <td>${item.expires_in}</td>
                            <td><button id="shopDel" class="btn btn-danger size-MINI" data-access_token="${item.access_token}">删除</button></td>
                        </tr>
                        `

                        $("#shopBody").append(html)
                    })

                } else {

                    $('#shopBody').append("<tr class='text-c'><td colspan='5'><mark>未查询到相关数据!</mark></td></tr>");

                }

            } else {

                layer.msg(res.msg, { icon: 5 });

            }
        },
        error: function (result) {
            if (result.responseText.indexOf('登录') != -1) {

                window.localStorage.clear();

                //top.location.href = "login.html"

            }
        }
    })
})




// 刷新店铺
$("#refresh").click(function () {
    $.ajax({
        type: "get",

        url: urls + "/sjjxShop/refreshShop",

        dataType: "json",

        headers: { "authorization": window.localStorage.getItem('authorization') },

        success: function (res) {
            if (res.code == 200) {
                //layer.msg("刷新成功", { icon: 6 },                   
                location.replace(location.href)

            } else {
                layer.msg(res.msg, { icon: 5 })
            }
        },
        error: function (result) {
            if (result.responseText.indexOf('登录') != -1) {

                window.localStorage.clear();

                //top.location.href = "login.html"

            }
        }
    })
})



// 点击添加店铺
$("#storeAdd").click(function () {
    var index = layer.open({
        type: 2,
        title: "添加店铺",
        content: "store-add.html"
    });
    layer.full(index);

    $(window).resize(function () {
        layer.full(index);
    })
})


//删除店铺
$("#shopBody").on("click", "#shopDel", function () {
    var accessToken = $(this).attr("data-access_token");
    var $tr = $(this).parent().parent(".text-c");
    console.log(accessToken, $tr)

    layer.confirm("是否删除店铺？", {
        btn: ['确定', '取消']
    }, function () {
        $.ajax({
            url: urls + "/sjjxShop/deleteShop",
            type: "post",
            data: { accessToken: accessToken },
            dataType: "json",
            headers: { "authorization": window.localStorage.getItem('authorization') },
            success: function (res) {
                if (res.code == 200) {
                    layer.msg("删除成功", { icon: 1, time: 1 }, function () {
                        $tr.remove();
                    });

                } else {
                    layer.msg(res.msg, { icon: 5 })
                }
            },
            error: function (res) {
                if (res.responseText.indexOf('登录') != -1) {
                    window.localStorage.clear();
                }
            }
        })
    })


})



//点击查看详情
$("#product_details").click(function () {
    var index = layer.open({
        type: 2,
        title: "商品详情",
        content: "product-details.html"
    });
    layer.full(index);

    $(window).resize(function () {
        layer.full(index);
    })
})




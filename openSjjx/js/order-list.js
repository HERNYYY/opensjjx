$(function () {
    //初始化
    var pageNum, totalPage;

    getOrder();

    function getOrder() {
        $.ajax({
            type: "post",
            url: urls + "/openPayOrder/payOrderList",
            data: {
                payType: $("#status").val(),
                beginTime: $("#beginDate").val(),
                endTime: $("#endDate").val(),
                pageSize: $("#pageSize").val(),
                pageNum: pageNum
            },
            dataType: "json",
            headers: { "authorization": authorization },
            success: function (res) {
                if (res.code == 200) {
                    totalPage = Math.ceil(res.data.count / parseInt($("#pageSize").val())) == 0 ? 1 : Math.ceil(res.data.count / parseInt($("#pageSize").val()));

                    createList(res.data.data);

                    footer(totalPage, res.data.count);

                    laypage({
                        cont: 'page',
                        skin: '#429842',
                        pages: totalPage,
                        curr: pageNum || 1,
                        skip: true,
                        pageSize: pageSize,
                        groups: 3,
                        first: '首页',
                        prev: '上一页',
                        next: '下一页',
                        last: '尾页',
                        jump: function (obj, first) {
                            if (!first) {
                                pageNum = obj.curr;
                                // getOrder(payType, beginTime, endTime, pageSize, pageNum)
                                getOrder()
                            }
                        }
                    })
                } else {
                    layer.msg(res.msg, { icon: 5 })
                }
            },
            error: function (res) {
                errorMsg(res);
            }
        })
    }

    function createList(res) {

        $(".remove").remove();

        if (res.length > 0) {
            let html = "";
            $.each(res, function (index, item) {
                var payType = item.payType == 0 ?
                    `<span class='btn btn-danger-outline radius'>未支付</span>` :
                    (item.payType == 1 ? `<span class='btn btn-success-outline radius'>已支付</span>` :
                        `<span class='btn btn-default-outline radius'>失&emsp;效</span>`);
                var terminalType = item.terminalType == 0 ? "微信" : "支付宝";
                html += `
                    <tr class="remove text-c">
                        <td>${item.orderNumber}</td>
                        <td>${item.memberId}</td>
                        <td>${item.createTime}</td>
                        <td>${item.payTime}</td>
                        <td>${item.deadline}</td>
                        <td>${payType}</td>
                        <td>${terminalType}</td>
                    </tr>
                `;
            });
            $("#orderPickets").append(html);
        } else {
            $('#orderPickets').append("<tr class='text-c remove'><td colspan='7'><mark>未查询到相关数据!</mark></td></tr>");
        }

    }

    function footer(totalPage, count) {
        let html = `
            共${totalPage}页,数据<span id="count">${count}</span>条&emsp;
        `
        $("#footer").html(html);
    }


    /*筛选*/
    $("#OrderBtn").on("click", function () {
        payType = $("#status").val();
        beginTime = $("#beginDate").val();
        endTime = $("#endDate").val();
        getOrder();
    })

    $("#pageSize").on("change", function () {
        getOrder();
    });
})
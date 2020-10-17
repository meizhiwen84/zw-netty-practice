//发送手机短信验证码
var wait = 0; //计算变量
var mobile_str = "";

function sendSMS(btnObj) {
    console.log("发送短信");
    var valObj = "#txt_mobile";
    var sendUrl = "/tools/submit_ajax.ashx?action=user_verify_smscode";
    if ($(valObj).val() == "") {
        layer_msg("请填写手机号码后再获取！", 4);
        return false;
    }
    mobile_str = $(valObj).val();
    //发送AJAX请求
    $.ajax({
        url: sendUrl,
        type: "POST",
        timeout: 60000,
        data: { "mobile": $(valObj).val() },
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            $(btnObj).unbind("click").removeAttr("onclick"); //移除按钮事件
            $(btnObj).css("color", "#eee");
        },
        success: function (data, type) {
            if (data.status == 1) {
                layer_msg(data.msg, 4);
                wait = data.time * 60; //赋值时间
                time(); //调用计算器
            } else {
                layer_msg(data.msg, 4);
                $(btnObj).removeClass("gray").text("获取验证码");
                $(btnObj).bind("click", function () {
                    sendSMS(btnObj, valObj, sendurl); //重新绑定事件
                    $(btnObj).css("color", "#000");
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer_msg(data.msg, 4);
            $(btnObj).removeClass("gray").text("获取验证码");
            $(btnObj).bind("click", function () {
                sendSMS(btnObj, valObj, sendUrl); //重新绑定事件
                $(btnObj).css("color", "#000");
            });

        }
    });
    //倒计时计算器
    function time() {
        if (wait == 0) {
            $(btnObj).removeClass("gray").text("获取验证码");
            $(btnObj).bind("click", function () {
                sendSMS(btnObj, valObj, sendurl); //重新绑定事件
            });
        } else {
            $(btnObj).addClass("gray").text("重新发送(" + wait + ")");
            wait--;
            setTimeout(function () {
                time(btnObj);
            }, 1000)
        }
    }
}

function login_ok(tt) {
    if ($("#txt_mobile").val() == "" || $("#txt_mobile").val() != mobile_str) {
        layer_msg("请填写正确的手机号码！", 4);
        return;
    }

    var code = $("#txt_code").val();
    var user_name = $("#txt_mobile").val();
    var mobile = $("#txt_mobile").val();

    if (code == "" || user_name == "" || mobile == "") {
        layer_msg("请填写正确的手机号码和验证码", 4);
        return;
    }

    $.ajax({
        type: "POST",
        url: "/tools/submit_ajax.ashx?action=user_login_register",
        data: { mobile: mobile, user_name: user_name, code: code },
        dataType: "json",
        jsonp: "callback",
        beforeSend: function () {
            //console.log("开始");
        },
        success: function (data) {
            console.log(data);
            if (data.status == 1) {

                $(".img_head").attr("src", data.avatar);
                $(".nick_name").text(data.nick_name)
                $.cookie('user_name', user_name, { expires: 300 });
                $.cookie('nick_name', data.nick_name, { expires: 300 });
                $.cookie('avatar', data.avatar, { expires: 300 });

                

                layer.closeAll();

                layer_msg(data.msg, 4);
            } else {
                layer_msg(data.msg, 4);
            }
        },
        complete: function (data) {
            //console.log("结束");
        }
    });

}

function btn_send(reply_id) {
    
    var user_name = $.cookie('user_name');
    var nick_name = $.cookie('nick_name');
    var avatar = $.cookie('avatar');
    
    if (user_name == undefined || user_name == "") {
        MessageShow(reply_id);
        return;
    }
    var content = $("#txt_content").val();
    if (content == "" || content == undefined) {
        layer_msg("请输入评论内容", 4);
        return;
    }
    
    $.ajax({
        type: "POST",
        url: "/tools/submit_ajax.ashx?action=ldy_add_reply",
        data: { user_name: user_name, content: content, reply_id: reply_id, dep_id: JmwInitJson.dep_id, wd_id: JmwInitJson.wd_id },
        dataType: "json",
        jsonp: "callback",
        beforeSend: function () {
            //console.log("开始");
        },
        success: function (data) {
            console.log(data);
            if (data.status == 1) {
                $("#txt_content").val("");
                layer.closeAll();
                layer_msg(data.msg, 2);
                //把数据保存到cookie，并且显示出来
                var reply_str = "{\"reply_id\":\"" + reply_id + "\",\"nick_name\":\"" + nick_name + "\",\"avatar\":\"" + avatar + "\",\"content\":\"" + content + "\",\"id\":\"" + data.id + "\"}";
                var reply_list = $.cookie(JmwInitJson.reply_list);
                if (reply_list != undefined && reply_list != "") {
                    reply_list = reply_list.replace("[", "").replace("]", "") + "," + reply_str;
                } else {
                    reply_list = reply_str;
                }
                $.cookie(JmwInitJson.reply_list, "[" + reply_list + "]", { expires: 300 });
                //console.log($.cookie('reply_list'));
                try {
                    //调用不同模板的显示评论的方法
                    replyLoad();
                } catch (e) {

                }
            } else if (data.status == 3) {
                MessageShow(reply_id);
                return;
            } else {
                layer_msg(data.msg, 4);
            }
        },
        complete: function (data) {
            //console.log("结束");
        }
    });

}


//上传头像修改昵称
function select_head() {
    $("#file_img").click();
}
function quxiao(tt) {
    //console.log("取消");
    $(".img_head").attr("src", temp_img_url);
    $("#file_img").val("");
    layer.close($(tt).parents('.layui-m-layer').attr("index"));
}
$(function () {
    $("#file_img").on("change", function () {
        var _this = $(this);
        var fr = new FileReader();
        fr.readAsDataURL(this.files[0]);

        fr.onload = function () {
            $(".img_head").attr("src", this.result);
        }
    });
});

function wancheng(tt) {
    if ($("#txt_nick_name").val() == "") {
        layer_msg("请输入昵称", 4);
        return;
    }
    if ($(".img_head").eq(0).attr("src") == "img/头像.png") {
        layer_msg("请上传头像", 4);
        return;
    }

    $.cookie('nick', $("#txt_nick_name").val(), { expires: 300 });
    var img_url2 = $(".img_head").eq(0).attr("src");
    if (temp_img_url != img_url2) {
        //console.log("重新上传头像了");
        update_head($(".img_head").eq(0).attr("src"));
    } else {
        //console.log("还是原来的头像");
        update_head("");
    }
    layer.close($(tt).parents('.layui-m-layer').attr("index"));
}

function update_head(avatar) {
    $.ajax({
        type: "POST",
        url: "/tools/submit_ajax.ashx?action=ldy_update_head",
        data: { avatar: avatar, nick_name: $("#txt_nick_name").val(), user_name: $.cookie('user_name') },
        dataType: "json",
        jsonp: "callback",
        beforeSend: function () {

        },
        success: function (data) {
            console.log(data);
            if (data.status == 1) {
                layer_msg(data.msg, 4);
                
                $(".img_head").attr("src", data.avatar);
                $(".nick_name").text(data.nick_name);
                $.cookie('avatar', data.avatar, { expires: 300 });
                $.cookie('nick_name', data.nick_name, { expires: 300 });

                var reply_cookie = $.cookie('reply_list');
                if (reply_cookie != undefined && reply_cookie != "") {
                    var reply_list = JSON.parse(reply_cookie);
                    if (reply_list.length > 0) {
                        for (var i = 0; i < reply_list.length; i++) {
                            reply_list[i].nick_name = data.nick_name;
                            reply_list[i].avatar = data.avatar;
                        }
                    }
                }
                $.cookie('reply_list', JSON.stringify(reply_list), { expires: 300 });

            } else {
                layer_msg(data.msg, 4);
            }
        },
        complete: function (data) {

        }
    });
}


function layer_msg(msg,time) {
    var equi = document.getElementById('jmwReply').getAttribute('data-equi');
    if (equi == "mobile") {
        layer.open({
            content: msg
            , skin: 'msg'
            , time: time
        });
    } else if (equi == "pc") {
        layer.msg(msg);
    }
}

//点赞↓
var json_tl_zan = {};
var json_hf_zan = {};
var json_other = {};

$(function () {
    var json_hf_zan_str = $.cookie('json_hf_zan');
    var json_tl_zan_str = $.cookie('json_tl_zan');
    var json_other_str = $.cookie('json_other');

    if (json_hf_zan_str != undefined && json_hf_zan_str != "{}" && json_hf_zan_str != "") {
        json_hf_zan = JSON.parse($.cookie('json_hf_zan'));
        for (var key in json_hf_zan) {
            var hf_id = key;
            var zan = json_hf_zan[key];
            $(".jmw_zan[data-hf=" + hf_id + "]").text(zan);
        }
    }
    if (json_tl_zan_str != undefined && json_tl_zan_str != "{}" && json_tl_zan_str != "") {
        json_tl_zan = JSON.parse($.cookie('json_tl_zan'));
        for (var key in json_tl_zan) {
            var tl_id = key;
            var zan = json_tl_zan[key];
            $(".jmw_tlzan[data-tl=" + tl_id + "]").text(zan);
        }
    }

    if (json_other_str != undefined && json_other_str != "{}" && json_other_str != "") {
        json_other = JSON.parse($.cookie('json_other'));
        for (var key in json_other) {
            var zan = json_other[key];
            var class_str = "." + key;
            $(class_str).text(zan);
        }
    }

    $(".jmw_tlzan_parent").click(function () {
        var zan_num = parseInt($(this).find(".jmw_tlzan").text());
        var tl_id = $(this).find(".jmw_tlzan").attr("data-tl");
        if (zan_num == json_tl_zan[tl_id]) {//判断是否重复点击赞

            layer_msg("您已点过赞了", 2);
            return;
        }
        $(this).find(".jmw_tlzan").text(zan_num + 1);
        
        layer_msg("点赞成功", 2);
        json_tl_zan[tl_id] = zan_num + 1;
        $.cookie('json_tl_zan', JSON.stringify(json_tl_zan), { expires: 300 });

        $.ajax({
            type: "GET",
            url: "/tools/lp.ashx",
            data: { action: "tl_zan", tl_id: tl_id },
            dataType: "json",
            jsonp: "callback",
            success: function (data) {
                if (data.status == 1) {
                    //赞成功
                }
                else {
                    //赞失败
                }
            }
        });
    });

    $(".jmw_zan_parent").click(function () {
        
        var zan_num = parseInt($(this).find(".jmw_zan").text());
        var hf_id = $(this).find(".jmw_zan").attr("data-hf");
        if (zan_num == json_hf_zan[hf_id]) {//判断是否重复点击赞

            layer_msg("您已点过赞了", 2);
            return;
        }
        $(this).find(".jmw_zan").text(zan_num + 1);

        layer_msg("点赞成功", 2);
        json_hf_zan[hf_id] = zan_num + 1;
        $.cookie('json_hf_zan', JSON.stringify(json_hf_zan), { expires: 300 });

        $.ajax({
            type: "GET",
            url: "/tools/lp.ashx",
            data: { action: "zan_hf", hf_id: hf_id },
            dataType: "json",
            jsonp: "callback",
            success: function (data) {
                if (data.status == 1) {
                    //赞成功
                }
                else {
                    //赞失败
                }
            }
        });
    });

    $(".jmw_ding").click(function () {
        var ding_num = parseInt($(".jmw_ding_num").text());
        if (ding_num == json_other["jmw_ding_num"]) {
            layer_msg("请不要重复点击哦", 2);
            return;
        }
        $(".jmw_ding_num").text(ding_num + 1);
        layer_msg("谢谢支持", 2);
        json_other["jmw_ding_num"] = ding_num + 1;
        $.cookie('json_other', JSON.stringify(json_other), { expires: 300 });
    });

    $(".jmw_shoucang").click(function () {
        var shoucang_num = parseInt($(".jmw_shoucang_num").text());
        if (shoucang_num == json_other["jmw_shoucang_num"]) {
            layer_msg("请不要重复点击哦", 2);
            return;
        }
        $(".jmw_shoucang_num").text(shoucang_num + 1);
        layer_msg("谢谢支持", 2);
        json_other["jmw_shoucang_num"] = shoucang_num + 1;
        $.cookie('json_other', JSON.stringify(json_other), { expires: 300 });
    });

    $(".jmw_guanzhu").click(function () {
        layer_msg("已关注", 2);
    });
});
//点赞↑


//点击回复头像
$(".jmw_hfrtx,.jmw_tlrtx,.jmw_twrtx").click(function () {
    var equi = document.getElementById('jmwReply').getAttribute('data-equi');
    var hf_id = $(this).attr("data-hf");
    var img_src = $(this).attr("src");
    if (equi == "mobile") {
        var win = layer.open({
            content: ''
            , btn: ['回复他/她', '再看看']
            , skin: 'footer'
            , yes: function (index) {
                layer.close(win);
                MessageShow(hf_id);
            }
        });
        $(".layui-m-layercont").css("height", "6px").css("padding", "0px");
        $(".layui-m-layerbtn span[no]").css("border", "0px").css("height", "44px").css("line-height", "40px");
        $(".layui-m-layerbtn span[yes]").css("color", "#40AFFE");
    } else if (equi == "pc") {
        var win = layer.confirm('未登录不能查看个人信息', {
            title:"提示",
            btn: ['去登陆', '取消'] //按钮
        }, function () {
                layer.close(win);
                click_login();
        }, function () {
                layer.close(win);
        });
    }
});
